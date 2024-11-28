# ruff: noqa: E402 F403

from django.contrib.auth import get_user_model
from ninja import NinjaAPI, Swagger

User = get_user_model()

api = NinjaAPI(urls_namespace="users:api", docs=Swagger(), docs_url="/docs/")

from .delete import *
from .login import *
from .logout import *
from .refresh import *
from .signup import *
from .verify import *
