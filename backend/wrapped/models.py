from django.db import models
from users.models import Profile

from .fields import AlbumField, ArtistField, GenreField


class WrappedManager(models.Manager):
  def create(self):
    wrapped = self.model()
    wrapped.save()
    return wrapped

  def get():
    super.create()


class Wrapped(models.Model):
  profile = models.ForeignKey(
    Profile,
    on_delete=models.CASCADE,
    related_name="wrapped_for_profile",
  )

  artist_1 = ArtistField()
  artist_2 = ArtistField()
  artist_3 = ArtistField()

  album_1 = AlbumField()
  album_2 = AlbumField()

  genre_1 = GenreField()
  genre_2 = GenreField()

  llm_summary = models.TextField()

  """
  Top 3 artists
  - Name
  - Photo
  - Name of the Song from the artist
  - Time spent listening to artist
  Top 2 albums
  - Name
  - Album cover - picture
  - Top 3 listened to songs form the albums - na
  Top 2 Genres
  - Favorite song from the genre 
    - how many times did the listen?
  - Image (?)
  LLM Summary
  - Description - text
  """

  objects = WrappedManager()
