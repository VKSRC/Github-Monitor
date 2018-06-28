#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Tuuu Nya<song@secbox.cn>

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.dialects.mysql import LONGTEXT
from sqlalchemy.orm import sessionmaker
from datetime import datetime


engine = create_engine('mysql+pymysql://root:hacksb@127.0.0.1/github-monitor?charset=utf8', encoding='utf-8')
Base = declarative_base()
Session = sessionmaker(bind=engine)
Timezone = 'Asia/Shanghai'


class Leakage(Base):
    __tablename__ = 'leakage'

    id = Column(Integer, primary_key=True)
    project_name = Column(String(100))
    file_name = Column(Text)
    language = Column(String(50))
    code = Column(LONGTEXT)
    add_time = Column(DateTime(timezone=Timezone))
    account = Column(String(50))
    account_avatar = Column(Text)
    # 1:待确认  2:待处理  3:已处理  4:无风险
    status = Column(Integer, default=1)

    def to_json(self):
        return {
            'id': self.id,
            'project_name': self.project_name,
            'file_name': self.file_name,
            'type': self.language,
            'code': self.code,
            'datetime': datetime.strftime(self.add_time, '%Y-%m-%d %H:%M:%S'),
            'account': self.account,
            'account_avatar': self.account_avatar,
            'status': self.status,
        }


class Keywords(Base):
    __tablename__ = 'keywords'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))


class WhiteList(Base):
    __tablename__ = 'whitelist'

    id = Column(Integer, primary_key=True)
    name = Column(String(100))


Base.metadata.create_all(engine)
