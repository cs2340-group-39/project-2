from django.core.exceptions import ValidationError
from django.http import HttpRequest

from ..schemas import (
  UserErrorResponseSchema,
  UserRequestSchema,
  UserResponseSchema,
)
from ..utils import generate_tokens
from . import User, api


@api.post(
  "login",
  response={200: UserResponseSchema, 400: UserErrorResponseSchema},
)
def login(request: HttpRequest, data: UserRequestSchema):
  try:
    try:
      user = User.objects.get(email=data.email)
    except User.DoesNotExist:
      return 400, UserErrorResponseSchema(
        detail="Invalid email or password."
      )

    if not user.check_password(data.password):
      return 400, UserErrorResponseSchema(
        detail="Invalid email or password."
      )

    try:
      access_token, refresh_token = generate_tokens(user)
    except Exception as e:
      print(f"Error generating tokens: {str(e)}")
      return 400, UserErrorResponseSchema(
        detail="Failed to generate authentication tokens."
      )

    return 200, UserResponseSchema(
      uuid=str(user.uuid),
      username=user.username,
      email=user.email,
      access_token=access_token,
      refresh_token=refresh_token,
    )
  except ValidationError as e:
    return 400, UserErrorResponseSchema(detail=str(e))
  except Exception:
    return 400, UserErrorResponseSchema(
      detail="Failed to login user. Please try again."
    )
