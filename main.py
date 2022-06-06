import os

import typer
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from starlette.responses import RedirectResponse
from starlette.staticfiles import StaticFiles

from api import initial_api

app = FastAPI()

app.mount('/static', StaticFiles(directory='static'), name='static')
app.mount('/assets', StaticFiles(directory='static/assets'), name='assets')

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

initial_api(app)


@app.get('/')
async def index(sign: str = None, token: str = None):
    url = 'static/index.html'
    if sign:
        url += f'?sign={sign}&token={token}'
    return RedirectResponse(url)


cli = typer.Typer()


@cli.command()
def initdb():
    os.system('alembic upgrade head')


@cli.command()
def genmigration(message: str = None):
    if not message:
        input('Input migration message: ')
    os.system(f"alembic revision --autogenerate -m '{message}'")


if __name__ == '__main__':
    cli()
