from django.contrib.postgres.fields import ArrayField
from django.db import models
from users.models import Profile

from .db_schemas import ArtistSchema, TrackSchema
from .fields import PydanticJSONField


class Wrapped(models.Model):
  profile = models.ForeignKey(
    Profile,
    on_delete=models.CASCADE,
    related_name="wrapped_for_profile",
  )

  public = models.BooleanField(default=False)

  artists = ArrayField(
    PydanticJSONField(pydantic_model=ArtistSchema), size=3
  )
  tracks = ArrayField(
    PydanticJSONField(pydantic_model=TrackSchema), size=2
  )
