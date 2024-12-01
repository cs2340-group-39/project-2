from django.contrib.postgres.fields import ArrayField
from django.db import models
from users.models import Profile

from .db_schemas import AlbumSchema, ArtistSchema, GenreSchema
from .fields import PydanticJSONField


class Wrapped(models.Model):
  profile = models.ForeignKey(
    Profile,
    on_delete=models.CASCADE,
    related_name="wrapped_for_profile",
  )

  artists = ArrayField(
    PydanticJSONField(pydantic_model=ArtistSchema), size=3
  )
  albums = ArrayField(
    PydanticJSONField(pydantic_model=AlbumSchema), size=2
  )
  genres = ArrayField(
    PydanticJSONField(pydantic_model=GenreSchema), size=2
  )
