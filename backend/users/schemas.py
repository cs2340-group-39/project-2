from ninja import Schema


class UserSchema(Schema):
    uuid: str
    username: str
    email: str
