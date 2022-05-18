from fastapi import Depends, HTTPException, Header
from starlette import status

from core.cache import check_signature, get_access_token
from utils.github_server import GithubServer

Uid = int


async def login_required(x_token: str = Header(...)) -> Uid:
    if not x_token:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)

    uid = await check_signature(x_token)
    if not uid:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)
    return uid


async def github_client(x_token: str = Header(...)) -> GithubServer:
    uid = await login_required(x_token)
    access_token = await get_access_token(uid)
    if not access_token:
        raise HTTPException(status.HTTP_401_UNAUTHORIZED)

    return GithubServer(access_token)


GitHubClient = Depends(github_client)
