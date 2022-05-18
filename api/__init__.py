from fastapi import FastAPI

from . import oauth, user, repositories, tags


def initial_api(app: FastAPI):
    app.include_router(oauth.router, prefix='/oauth', tags=['oauth'])
    app.include_router(user.router, prefix='/user', tags=['user'])
    app.include_router(repositories.router, prefix='/repo', tags=['repository'])
    app.include_router(tags.router, prefix='/tag', tags=['tag'])
