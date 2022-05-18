import asyncio
from collections import defaultdict

from fastapi import Depends
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from pydantic import BaseModel
from sqlalchemy import delete, func, select
from sqlalchemy.engine import Result

from core.db import Session
from core.depends import login_required
from models.repo import RepoTag, Tag

router = InferringRouter()


class TagSchema(BaseModel):
    tag: str


class SetTagSchema(BaseModel):
    tags: list[str]
    repos: list[int]


@cbv(router)
class TagView:
    uid: int = Depends(login_required)

    async def get_tags(self, session: Session) -> list[Tag]:
        stmt = select(Tag).where(Tag.uid == self.uid)
        ret: Result = await session.execute(stmt)
        return ret.scalars().all()

    async def get_tags_repo_count(self, session: Session) -> dict[str, int]:
        stmt = select(
            RepoTag.tag,
            func.count(RepoTag.id),
        ).where(RepoTag.uid == self.uid).group_by(RepoTag.tag)
        ret: Result = await session.execute(stmt)
        return {tag: count for tag, count in ret.all()}

    @router.get('/')
    async def get_all_tags(self):
        async with Session() as session:
            tags, tags_stats = await asyncio.gather(
                self.get_tags(session),
                self.get_tags_repo_count(session),
            )
            return [
                {'tag': t.name, 'repo_count': tags_stats.get(t.name, 0)}
                for t in tags
            ]

    @router.post('/')
    async def create_tag(self, data: TagSchema):
        async with Session() as session:
            tag = Tag(name=data.tag, uid=self.uid)
            session.add(tag)
            await session.commit()

        return {'success': 1}

    @router.post('/set_tag')
    async def set_tag(self, data: SetTagSchema):
        async with Session() as session:
            stmt = delete(RepoTag).where(
                RepoTag.uid == self.uid, RepoTag.repo_id.in_(data.repos))
            await session.execute(stmt),
            all_tags = await self.get_tags(session)
            all_tags_name = {t.name for t in all_tags}
            not_exist_tags = [
                Tag(uid=self.uid, name=t)
                for t in data.tags if t not in all_tags_name
            ]
            if not_exist_tags:
                session.add_all(not_exist_tags)
            objs = [
                RepoTag(uid=self.uid, repo_id=repo, tag=t)
                for t in data.tags
                for repo in data.repos
            ]
            session.add_all(objs)
            await session.commit()

        return {'success': 1}

    @router.get('/get_repo_tags')
    async def get_repo_tags(self):
        resp = defaultdict(list)
        async with Session() as session:
            stmt = select(RepoTag).where(RepoTag.uid == self.uid)
            ret: Result = await session.execute(stmt)
            for obj in ret.scalars().all():
                resp[obj.repo_id].append(obj.tag)

        return dict(resp)

    @router.delete('/')
    async def delete_tag(self, data: TagSchema):
        async def del_tag(session):
            await session.execute(
                delete(Tag).filter(Tag.uid == self.uid, Tag.name == data.tag))

        async def del_repo_tag(session):
            await session.execute(
                delete(RepoTag).filter(RepoTag.uid == self.uid,
                                       RepoTag.tag == data.tag))

        async with Session() as session:
            await asyncio.gather(
                del_repo_tag(session),
                del_tag(session)
            )
            await session.commit()

        return {'success': 1}
