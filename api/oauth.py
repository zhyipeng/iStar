from asyncio import gather

import aiohttp
from fastapi.responses import RedirectResponse
from fastapi_utils.inferring_router import InferringRouter

from core.cache import gen_signature, set_access_token
from core.settings import settings
from models.user import User
from utils.github_server import GithubServer

router = InferringRouter()


@router.get('/authorize')
async def oauth_authorize():
    redirect_uri = f'{settings.HOST}/oauth/redirect'
    return RedirectResponse(
        f'https://github.com/login/oauth/authorize?'
        f'client_id={settings.GITHUB_CLIENT_ID}'
        f'&redirect_uri={redirect_uri}'
    )


@router.get('/redirect')
async def oauth_redirect(code: str, state: str = ''):
    async with aiohttp.ClientSession() as session:
        resp = await session.post(
            'https://github.com/login/oauth/access_token',
            json={
                'client_id': settings.GITHUB_CLIENT_ID,
                'client_secret': settings.GITHUB_CLIENT_SECRET,
                'code': code,
                'redirect_uri': ''
            },
            headers={
                'Accept': 'application/json'
            },
            ssl=False,
        )
        resp_data = await resp.json()
        access_token = resp_data['access_token']

        server = GithubServer(access_token)
        userinfo = await server.get_user()
        uid = userinfo['id']
        username = userinfo['login']

        _, user, sign = await gather(
            set_access_token(uid, access_token),
            User.update_or_create_user(uid, username),
            gen_signature(uid),
        )
        host = settings.HOST
        if settings.DEBUG:
            host = 'http://localhost:3001'
        return RedirectResponse(
            f'{host}/?sign={sign}&token={access_token}'
        )
