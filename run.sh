#!/usr/bin/env bash
nohup celery -A scanner worker -l info &
nohup celery -A scanner beat -l info &
python ./GithubMonitor.py