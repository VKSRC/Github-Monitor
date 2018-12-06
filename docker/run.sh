#!/bin/bash
python3 /home/docker/Github-Monitor/server/manage.py migrate
supervisord -n
