from typing import List

from django.http import HttpRequest
from ninja import NinjaAPI, Swagger

from .models import DummyModel
from .schemas import (
  DummyModelRequestSchema,
  DummyModelResponseSchema,
  ErrorSchema,
)

api = NinjaAPI(
  urls_namespace="dummy:api", docs=Swagger(), docs_url="/docs/"
)


@api.post(
  "create-dummy-data",
  response={200: DummyModelResponseSchema, 400: ErrorSchema},
)
def create_dummy_data(
  request: HttpRequest, data: DummyModelRequestSchema
):
  try:
    dummy_object = DummyModel.objects.create(name=data.name)
    return {"id": dummy_object.id, "name": dummy_object.name}
  except Exception as exception:
    return 400, {"message": str(exception)}


@api.get("get-dummy-data", response=List[DummyModelResponseSchema])
def get_dummy_data(request: HttpRequest):
  dummy_data = DummyModel.objects.all()
  return [
    {"id": dummy_object.id, "name": dummy_object.name}
    for dummy_object in dummy_data
  ]
