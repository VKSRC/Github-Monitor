#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Tuuu Nya<song@secbox.cn>

from datetime import datetime
from dateutil import tz


def utc2local(utc_time):
    from_zone = tz.tzutc()
    to_zone = tz.tzlocal()

    utc = datetime.strptime(utc_time, '%Y-%m-%dT%H:%M:%SZ')
    utc = utc.replace(tzinfo=from_zone)
    central = utc.astimezone(to_zone).strftime('%Y-%m-%d %H:%M:%S')
    return central
