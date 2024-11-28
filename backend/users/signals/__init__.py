# ruff: noqa: E402 F403

from django.contrib.auth import get_user_model

User = get_user_model()


from .create_profile import *
from .send_verification_email import *
