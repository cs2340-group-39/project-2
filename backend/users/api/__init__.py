# ruff: noqa: E402 F403

from django.contrib.auth import get_user_model
from ninja import NinjaAPI, Swagger

User = get_user_model()

api = NinjaAPI(urls_namespace="users:api", docs=Swagger(), docs_url="/docs/")

from .authenticate_with_spotify import *
from .delete import *
from .get import *
from .login import *
from .logout import *
from .refresh import *
from .signup import *
from .verify import *
from .verify_access_token import *
