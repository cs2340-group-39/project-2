# ruff: noqa: E402 F403

from django.contrib.auth import get_user_model

User = get_user_model()

from .generate_tokens import *
from .send_verification_email import *
