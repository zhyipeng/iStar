from __future__ import annotations

import time

from sqlalchemy import BigInteger, Column, String, select

from core.db import BaseModel, Session


def default_ts():
    return int(time.time())


class User(BaseModel):
    id = Column(BigInteger, primary_key=True)
    username = Column(String(64))
    created_at = Column(BigInteger, default=default_ts)

    @classmethod
    async def update_or_create_user(cls, uid: int, username: str) -> User:
        async with Session() as session:
            stmt = select(User).where(User.id == uid).limit(1)
            ret = await session.execute(stmt)
            user = ret.scalars().first()
            if not user:
                user = User(id=uid)
            user.username = username
            session.add(user)
            await session.commit()
            return user
