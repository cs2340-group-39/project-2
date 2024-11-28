from typing import Optional

from ninja import Schema


class UserRequestSchema(Schema):
    username: Optional[str] = None
    email: str
    password: str


class UserResponseSchema(Schema):
    uuid: str
    username: str
    email: str
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None


class UserVerifyRequestSchema(Schema):
    code: str


class UserErrorResponseSchema(Schema):
    detail: str
