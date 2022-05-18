from pathlib import Path

from pydantic import BaseSettings, RedisDsn, AnyHttpUrl

ROOT = Path(__file__).parent.parent


class Settings(BaseSettings):
    DEBUG: bool = False
    HOST: AnyHttpUrl = 'http://localhost:8000'
    MYSQL_DSN: str = 'mysql+asyncmy://root:root@localhost/istar'
    REDIS_DSN: RedisDsn = 'redis://localhost:6379/0'

    # github
    GITHUB_CLIENT_ID: str = ''
    GITHUB_CLIENT_SECRET: str = ''


settings = Settings(_env_file=ROOT / Path('.env'), _env_file_encoding='utf-8')
