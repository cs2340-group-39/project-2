from django.http import HttpRequest

from ..schemas import UserErrorResponseSchema, UserResponseSchema
from . import api


@api.post("refresh", response={200: UserResponseSchema, 400: UserErrorResponseSchema})
def refresh(request: HttpRequest):
    pass
