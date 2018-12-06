from .dev import *

if os.environ.get('RUN_IN_DOCKER'):
    from .docker import *
else:
    try:
        from .prod import *
    except ImportError:
        pass
