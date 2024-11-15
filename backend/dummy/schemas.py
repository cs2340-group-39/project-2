from ninja import Schema


class DummyModelRequestSchema(Schema):
    name: str


class DummyModelResponseSchema(Schema):
    id: int
    name: str


class ErrorSchema(Schema):
    message: str
