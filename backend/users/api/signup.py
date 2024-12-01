from django.core.exceptions import ValidationError
from django.http import HttpRequest

from ..schemas import UserErrorResponseSchema, UserRequestSchema, UserResponseSchema
from . import User, api


@api.post("signup", response={201: UserResponseSchema, 400: UserErrorResponseSchema})
def signup(request: HttpRequest, data: UserRequestSchema):
    try:
        if User.objects.filter(email=data.email).exists():
            return 400, UserErrorResponseSchema(
                detail="User with this email already exists."
            )

        if User.objects.filter(username=data.username).exists():
            return 400, UserErrorResponseSchema(detail="Username is already taken.")

        user = User.objects.create_user(
            username=data.username, email=data.email, password=data.password
        )

        return 201, UserResponseSchema(
            uuid=str(user.uuid), username=user.username, email=user.email
        )

    except ValidationError as e:
        return 400, UserErrorResponseSchema(detail=str(e))
    except Exception:
        return 400, UserErrorResponseSchema(
            detail="Failed to create user. Please try again."
        )
