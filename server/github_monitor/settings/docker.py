import os

DEBUG = False

ALLOWED_HOSTS = os.environ.get('ALLOWED_HOSTS').split(",")

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'github',
        'USER': 'root',
        'PASSWORD': 'vipkid@2018',
        'HOST': 'mysql',
        'PORT': '3306',
        'OPTIONS': {'charset': 'utf8mb4'},
    }
}

LOG_FILE = '/var/log/github_monitor.log'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'filters': {
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'formatters': {
        'verbose': {
            'format': ('[%(asctime)s] %(levelname)-8s '
                       '%(name)s %(pathname)s %(funcName)s '
                       '%(lineno)d %(process)d %(thread)d '
                       '%(threadName)s: %(message)s')
        },
        'brief': {
            'format': ('[%(name)s] [%(funcName)s] [%(lineno)d] '
                       '%(process)d %(thread)d %(threadName)s: %(message)s')
        }
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            # Actived when DEBUG=True
            'filters': ['require_debug_true'],
            'formatter': 'brief',
        },
        'file': {
            'level': 'WARNING',
            'class': 'logging.handlers.RotatingFileHandler',
            # Actived when DEBUG=False
            'filters': ['require_debug_false'],
            'formatter': 'verbose',
            'filename': LOG_FILE,
            'maxBytes': 10485760,
            'backupCount': 5,
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
        },
        'github_monitor': {
            'handlers': ['file', 'console'],
            'level': 'DEBUG',
        },
    }
}