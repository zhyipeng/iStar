import logging
from typing import Optional
from urllib.parse import urljoin

import aiohttp
from zhtools.api_service import APIPath, RequestMethod, Service, AsyncGetAPI
from zhtools.exceptions import *


class GithubAPI(APIPath):
    USER = '/user'
    STARRED = '/user/starred'


class GithubServer(Service):
    HOST = 'https://api.github.com'

    def __init__(self, access_token: str):
        super().__init__()
        self.access_token = access_token

    async def async_request(self,
                            api: APIPath,
                            method: RequestMethod = RequestMethod.POST,
                            data: dict = None,
                            form_data: dict = None):
        data, headers = self.prepare_request(data, method)
        url = urljoin(self.HOST, api.value)
        params = _data = None
        if method == RequestMethod.GET:
            params = data
        else:
            _data = data

        logging.info('async http request: %s, data: %s', url, data)
        async with aiohttp.ClientSession() as session:
            async with session.request(method.value,
                                       url,
                                       params=params,
                                       json=_data,
                                       data=form_data,
                                       timeout=5,
                                       headers=headers or None,
                                       ssl=False) as resp:
                if resp.status == 404:
                    logging.info('response got 404: %s', resp.url)
                    raise NotFoundError()
                elif resp.status == 401:
                    raise Unauthorized()
                elif resp.status == 400:
                    raise ParameterError()
                elif resp.status == 403:
                    raise PermissionDenied()
                elif resp.status >= 500:
                    raise ExternalServiceError(error_code=str(resp.status))
                elif resp.status >= 400:
                    logging.info('response got 4xx: %s', resp.content)
                    raise ExternalServiceError(error_code=str(resp.status))

                try:
                    ret = await resp.json()
                except Exception:
                    raise ResponseIsNotJSONable()

                return self.handle_result(ret)

    def prepare_request(self,
                        data: Optional[dict],
                        method: RequestMethod) -> tuple[dict, dict]:
        return data or {}, {
            'Authorization': f'token {self.access_token}',
            'Accept': 'application/vnd.github.v3+json',
        }

    get_user = AsyncGetAPI(GithubAPI.USER)
    get_starred = AsyncGetAPI(GithubAPI.STARRED, 'page', 'per_page')
