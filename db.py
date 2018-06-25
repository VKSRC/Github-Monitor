#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Tuuu Nya<song@secbox.cn>

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.dialects.mysql import LONGTEXT
from sqlalchemy.orm import sessionmaker


engine = create_engine('mysql+pymysql://root:hacksb@127.0.0.1/github-monitor?charset=utf8', encoding='utf-8')
Base = declarative_base()
Session = sessionmaker(bind=engine)
Timezone = 'Asia/Shanghai'


class Leakage(Base):
    __tablename__ = 'leakage'

    id = Column(Integer, primary_key=True)
    project_name = Column(String(100))
    file_name = Column(Text)
    type = Column(String(50))
    code = Column(LONGTEXT)
    datetime = Column(DateTime(timezone=Timezone))
    account = Column(String(50))
    account_avatar = Column(Text)


class Keywords(Base):
    __tablename__ = 'keywords'

    id = Column(Integer, primary_key=True)
    name = Column(String(50))


class WhiteList(Base):
    __tablename__ = 'whitelist'

    id = Column(Integer, primary_key=True)
    name = Column(String(100))


Base.metadata.create_all(engine)
