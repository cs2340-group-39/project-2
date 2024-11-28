import uuid
from datetime import timedelta

import jwt
from django.conf import settings
from django.utils import timezone


def generate_tokens(user):
  current_time = timezone.now()

  access_token = jwt.encode(
    {
      "sub": str(user.uuid),
      "iat": int(current_time.timestamp()),
      "exp": int((current_time + timedelta(minutes=15)).timestamp()),
      "type": "access",
      "jti": str(uuid.uuid4()),
    },
    settings.SECRET_KEY,
    algorithm="HS256",
  )

  refresh_token = jwt.encode(
    {
      "sub": str(user.uuid),
      "iat": int(current_time.timestamp()),
      "exp": int((current_time + timedelta(days=7)).timestamp()),
      "type": "refresh",
      "jti": str(uuid.uuid4()),
    },
    settings.SECRET_KEY,
    algorithm="HS256",
  )

  return access_token, refresh_token
