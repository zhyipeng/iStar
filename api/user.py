from fastapi_utils.inferring_router import InferringRouter

from core.depends import GitHubClient
from utils.github_server import GithubServer

router = InferringRouter()


@router.get('/userinfo')
async def get_userinfo(cli: GithubServer = GitHubClient):
    userinfo = await cli.get_user()
    return {
        'avatar': userinfo['avatar_url'],
        'followers': userinfo['followers'],
        'following': userinfo['following'],
    }
