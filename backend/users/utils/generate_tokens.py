import os
from datetime import timedelta

import jwt
from django.forms.models import model_to_dict
from django.utils import timezone


def generate_tokens(user):
  user_dict = model_to_dict(user)
  for key, value in user_dict.items():
    if isinstance(value, timezone.datetime):
      user_dict[key] = int(value.timestamp())

  current_time = timezone.now()

  access_token = jwt.encode(
    {
      "sub": str(user.uuid),
      "user": user_dict,
      "iat": int(current_time.timestamp()),
      "exp": int((current_time + timedelta(minutes=15)).timestamp()),
      "type": "access",
    },
    os.getenv("SECRET_KEY"),
    algorithm="HS256",
  )

  refresh_token = jwt.encode(
    {
      "sub": str(user.uuid),
      "iat": int(current_time.timestamp()),
      "exp": int((current_time + timedelta(days=7)).timestamp()),
      "type": "refresh",
    },
    os.getenv("SECRET_KEY"),
    algorithm="HS256",
  )

  return access_token, refresh_token
