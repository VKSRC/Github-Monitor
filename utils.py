#!/usr/bin/env python
# -*- coding: utf-8 -*-
# Author: Tuuu Nya<song@secbox.cn>
import os
import configparser
from datetime import datetime
from dateutil import tz


base_path = os.path.split(os.path.realpath(__file__))[0]
conf_path = '{}/config.ini'.format(base_path)


def get_conf(section, option):
    config = configparser.ConfigParser()
    config.read(conf_path)
    return config.get(section=section, option=option)


def utc2local(utc_time):
    from_zone = tz.tzutc()
    to_zone = tz.gettz(get_conf('Common', 'TIMEZONE'))

    utc = datetime.strptime(utc_time, '%Y-%m-%dT%H:%M:%SZ')
    utc = utc.replace(tzinfo=from_zone)
    central = utc.astimezone(to_zone).strftime('%Y-%m-%d %H:%M:%S')
    return central
