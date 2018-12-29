#!/bin/bash
/bin/bash /home/docker/Github-Monitor/docker/wait-for-it.sh -t 0 mysql:3306
export PYTHONPATH=/home/docker/Github-Monitor/server/
python3 /home/docker/Github-Monitor/server/manage.py migrate
python3 /home/docker/Github-Monitor/server/manage.py init_admin
supervisord -n
