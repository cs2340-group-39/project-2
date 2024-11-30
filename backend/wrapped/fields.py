from django.db import models
from django.utils.translation import gettext_lazy as _


class ArtistField(models.Field):
  description = _(
    "Stores artist information including name, photo, and listening stats"
  )

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

  def db_type(self, connection):
    return "jsonb"

  def from_db_value(self, value, expression, connection):
    if value is None:
      return value
    return value

  def to_python(self, value):
    if isinstance(value, dict):
      return value
    if value is None:
      return {
        "name": "",
        "photo_url": "",
        "top_song": "",
        "listening_time": 0,
      }
    return value

  def get_prep_value(self, value):
    if value is None:
      return None
    return value


class AlbumField(models.Field):
  description = _(
    "Stores album information including name, cover, and top songs"
  )

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

  def db_type(self, connection):
    return "jsonb"

  def from_db_value(self, value, expression, connection):
    if value is None:
      return value
    return value

  def to_python(self, value):
    if isinstance(value, dict):
      return value
    if value is None:
      return {
        "name": "",
        "cover_url": "",
        "top_songs": [
          {"name": "", "play_count": 0},
          {"name": "", "play_count": 0},
          {"name": "", "play_count": 0},
        ],
      }
    return value

  def get_prep_value(self, value):
    if value is None:
      return None
    return value


class GenreField(models.Field):
  description = _(
    "Stores genre information including favorite song and play count"
  )

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)

  def db_type(self, connection):
    return "jsonb"

  def from_db_value(self, value, expression, connection):
    if value is None:
      return value
    return value

  def to_python(self, value):
    if isinstance(value, dict):
      return value
    if value is None:
      return {
        "name": "",
        "favorite_song": {"name": "", "play_count": 0},
        "image_url": "",
      }
    return value

  def get_prep_value(self, value):
    if value is None:
      return None
    return value
