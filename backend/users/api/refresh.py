import jwt
from django.http import HttpRequest
from jwt import (
  ExpiredSignatureError,
  InvalidAlgorithmError,
  InvalidSignatureError,
  InvalidTokenError,
)
from ninja.errors import ValidationError

from ..schemas import RefreshSchema, UserErrorResponseSchema
from ..utils import generate_tokens, get_token_secret_key
from . import User, api


@api.post(
  "refresh", response={200: RefreshSchema, 400: UserErrorResponseSchema}
)
def refresh(request: HttpRequest, data: RefreshSchema):
  try:
    payload = jwt.decode(
      data.refresh_token,
      algorithms=["HS256"],
      options={"verify_signature": False},
    )

    if payload.get("type") != "refresh":
      return 400, UserErrorResponseSchema(detail="Invalid token type.")

    try:
      uuid = payload["sub"]
      user = User.objects.get(pk=uuid)
    except (KeyError, User.DoesNotExist):
      return 400, UserErrorResponseSchema(
        detail="Invalid refresh token."
      )

    try:
      jwt.decode(
        data.refresh_token,
        get_token_secret_key(user),
        algorithms=["HS256"],
        options={"verify_signature": True},
      )
    except (
      InvalidTokenError,
      ExpiredSignatureError,
      InvalidSignatureError,
      InvalidAlgorithmError,
    ):
      return 400, UserErrorResponseSchema(
        detail="Invalid refresh token."
      )

    access_token, refresh_token = generate_tokens(user)

    return RefreshSchema(
      access_token=access_token, refresh_token=refresh_token
    )
  except ValidationError:
    return 400, UserErrorResponseSchema(detail="Malformed request.")
  except Exception as e:
    print(f"Unexpected error refreshing access token: {e}")
    return 400, UserErrorResponseSchema(
      detail="A server error occurred refreshing the access token."
    )
