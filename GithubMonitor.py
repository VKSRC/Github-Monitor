#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Tuuu Nya<song@secbox.cn>

import json
from flask import Flask, render_template
from flask_restful import Resource, Api, reqparse
import db
import datetime

app = Flask(__name__)
api = Api(app)

db_session = db.Session()


@app.route('/')
def index():
    return render_template('index.html')


class Leakage(Resource):
    def get(self):
        parser = reqparse.RequestParser()
        parser.add_argument('page', type=int, default=1, help="Which page with data")
        parser.add_argument('page_size', type=int, default=10, help="Which page count with data")
        parser.add_argument('status', type=int, help="data status")
        parser.add_argument('type', type=str, help="which type with data")
        args = parser.parse_args()

        db_leakages = db_session.query(db.Leakage).order_by(-db.Leakage.datetime).limit(10)
        leakages = []

        for i in db_leakages:
            leakages.append(i.to_json())

        return leakages


api.add_resource(Leakage, '/api/leakage')


if __name__ == '__main__':
    app.run()
