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

from datetime import timedelta
from typing import List

from pydantic import BaseModel


class ArtistSchema(BaseModel):
  name: str
  photo_url: str
  top_song: str
  time_listened: timedelta


class AlbumSchema(BaseModel):
  name: str
  album_cover_url: str
  song_names: List[str]


class GenreSchema(BaseModel):
  fav_song: str
  num_listened: int
  image_url: str
