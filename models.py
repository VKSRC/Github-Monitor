#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Tuuu Nya<song@secbox.cn>

from datetime import datetime
from sqlalchemy.dialects.mysql import LONGTEXT
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = \
    'mysql+pymysql://root:hacksb@127.0.0.1/github-monitor?charset=utf8&autocommit=true'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
Timezone = 'Asia/Shanghai'


class Leakage(db.Model):
    __tablename__ = 'leakage'

    id = db.Column(db.Integer, primary_key=True)
    project_name = db.Column(db.String(100))
    project_url = db.Column(db.Text)
    file_name = db.Column(db.Text)
    file_url = db.Column(db.Text)
    language = db.Column(db.String(50))
    code = db.Column(LONGTEXT)
    add_time = db.Column(db.DateTime(timezone=Timezone))
    update_time = db.Column(db.DateTime(timezone=Timezone))
    handle_time = db.Column(db.DateTime(timezone=Timezone))
    account = db.Column(db.String(50))
    account_avatar = db.Column(db.Text)
    account_url = db.Column(db.Text)
    # 1:待确认  2:待处理  3:已处理  4:无风险
    status = db.Column(db.Integer, default=1)

    def to_json(self):
        return {
            'id': self.id,
            'project_url': self.project_url,
            'project_name': self.project_name,
            'file_url': self.file_url,
            'file_name': self.file_name,
            'language': self.language,
            'code': self.code,
            'add_time': datetime.strftime(self.add_time, '%Y-%m-%d %H:%M:%S' if self.add_time else None),
            'update_time': datetime.strftime(self.update_time, '%Y-%m-%d %H:%M:%S') if self.update_time else None,
            'handle_time': datetime.strftime(self.handle_time, '%Y-%m-%d %H:%M:%S') if self.handle_time else None,
            'account': self.account,
            'account_url': self.account_url,
            'account_avatar': self.account_avatar,
            'status': self.status,
        }


class Keywords(db.Model):
    __tablename__ = 'keywords'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))


class WhiteList(db.Model):
    __tablename__ = 'whitelist'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))


db.create_all()
