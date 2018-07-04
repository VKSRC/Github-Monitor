#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Tuuu Nya<song@secbox.cn>

from flask import Flask, render_template, request, abort
from flask_restful import Resource, Api, reqparse
from flask_cors import CORS
from models import Leakage, db

app = Flask(__name__)
app.debug = True
api = Api(app)
CORS(app)


@app.route('/')
def index():
    return render_template('index.html')


class LeakageList(Resource):

    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, default=1, help="Which page with data")
        parser.add_argument('page_size', type=str, default=10, help="Which page count with data")
        parser.add_argument('status', type=str, help="data status")
        parser.add_argument('language', type=str, help="which type with data")
        args = parser.parse_args()

        db_leakages = Leakage.query

        if args.get('status') and args.get('status') != '全部':
            db_leakages = db_leakages.filter(Leakage.status == args.get('status'))

        if args.get('language') and args.get('language') != '全部':
            db_leakages = db_leakages.filter(Leakage.language == args.get('language'))

        db_leakages = db_leakages.order_by(db.desc(Leakage.add_time))\
            .paginate(page=args.get('page'), per_page=args.get('page_size'))
        leakages = {
            'count': db_leakages.total,
            'pages': db_leakages.pages,
            'current_page': db_leakages.page,
            'per_page': db_leakages.per_page,
            'items': [],
        }

        for i in db_leakages.items:
            leakages['items'].append(i.to_json())

        return leakages


api.add_resource(LeakageList, '/api/leakage')


class LeakageDetail(Resource):
    def get(self, id):
        return Leakage.query.get_or_404(id).to_json()

    def put(self, id):
        req = request.get_json()
        if req.get('status') in [1, 2, 3, 4]:
            leakage = Leakage.query.get_or_404(id)
            leakage.status = req.get('status')
            db.session.commit()
            return leakage.to_json()
        else:
            return abort("status error")


api.add_resource(LeakageDetail, '/api/leakage/<string:id>')


class LanguageList(Resource):
    def get(self):
        language = db.session.query(Leakage.language, db.func.count('*').label("language_count"))\
            .group_by(Leakage.language).order_by(db.desc('language_count')).limit(10).all()
        return language


api.add_resource(LanguageList, '/api/language')


if __name__ == '__main__':
    app.run()
