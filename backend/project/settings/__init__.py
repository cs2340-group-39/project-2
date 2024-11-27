# ruff: noqa: E402 F403

import os
from pathlib import Path

from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent.parent

if not os.getenv("PRODUCTION"):
    load_dotenv(dotenv_path=BASE_DIR / ".env.local")

from .application import *
from .authentication import *
from .cors import *
from .database import *
from .defaults import *
from .email import *
from .internationalization import *
from .password import *
from .public import *
from .startup import *
from .supabase import *
