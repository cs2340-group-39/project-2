# ruff: noqa: E402 F403


from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent.parent


from .application import *
from .authentication import *
from .cors import *
from .database import *
from .defaults import *
from .email import *
from .internationalization import *
from .password import *
from .public import *
from .site import *
from .spotify import *
from .startup import *
