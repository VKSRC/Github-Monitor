#!/usr/bin/env bash
supervisord
tail -f /var/log/supervisor/*.log