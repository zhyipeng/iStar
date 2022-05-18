from sqlalchemy import BigInteger, Column, Integer, String

from core.db import BaseModel


class Tag(BaseModel):
    id = Column(Integer, primary_key=True)
    uid = Column(BigInteger, index=True)
    name = Column(String(64), index=True)


class RepoTag(BaseModel):
    id = Column(Integer, primary_key=True)
    uid = Column(Integer, index=True)
    repo_id = Column(Integer)
    tag = Column(String(64))
