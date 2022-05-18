import aioredis
from zhtools.enum import Enum
from zhtools.random import uuid4_hex

from core.settings import settings


class CacheKey(Enum):
    GITHUB_ACCESS_TOKEN = 'GITHUB_ACCESS_TOKEN'
    SIGNATURE = 'SIGNATURE'


def get_redis_client() -> aioredis.Redis:
    return aioredis.from_url(
        settings.REDIS_DSN, encoding='utf-8', decode_responses=True)


async def set_access_token(uid: int, access_token: str):
    cli = get_redis_client()
    await cli.set(f'{CacheKey.GITHUB_ACCESS_TOKEN.value}:{uid}', access_token)


async def get_access_token(uid: int) -> str | None:
    cli = get_redis_client()
    return await cli.get(f'{CacheKey.GITHUB_ACCESS_TOKEN.value}:{uid}')


async def gen_signature(uid: int) -> str:
    cli = get_redis_client()
    sign = uuid4_hex()
    await cli.set(f'{CacheKey.SIGNATURE}:{sign}', uid)
    return sign


async def check_signature(sign: str) -> int | None:
    cli = get_redis_client()
    return await cli.get(f'{CacheKey.SIGNATURE}:{sign}')
