#!/bin/bash
./wait-for-it.sh -t 0 mysql:3306
python3 /home/docker/Github-Monitor/server/manage.py migrate
python3 /home/docker/Github-Monitor/server/manage.py init_admin
supervisord -n
