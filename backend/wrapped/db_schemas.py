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

from pydantic import BaseModel


class ArtistSchema(BaseModel):
  name: str
  photo_url: str


class TrackSchema(BaseModel):
  track_name: str
  track_cover_url: str
  artist_name: str
  track_type: str
