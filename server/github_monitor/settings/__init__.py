from .dev import *
try:
    from .prod import *
except ImportError:
    pass
