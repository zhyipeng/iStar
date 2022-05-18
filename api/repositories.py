from fastapi_utils.inferring_router import InferringRouter

from core.depends import GitHubClient
from utils.github_server import GithubServer

router = InferringRouter()


_cache = {}


def clean_dict(d: dict, *keys: str) -> dict:
    return {
        k: v for k, v in d.items() if k in keys
    }


@router.get('/starred')
async def get_starred(cli: GithubServer = GitHubClient, force: bool = False):
    if force or cli.access_token not in _cache:
        starred = await cli.get_starred()
        _cache[cli.access_token] = starred = [
            clean_dict(item, 'id', 'name', 'html_url', 'forks_count',
                       'watchers_count', 'topics', 'language', 'url',
                       'stargazers_count', 'description', 'owner', 'updated_at')
            for item in starred
        ]
    else:
        starred = _cache[cli.access_token]
    return starred
