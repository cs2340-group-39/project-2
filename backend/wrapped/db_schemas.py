from pydantic import BaseModel


class ArtistSchema(BaseModel):
  name: str
  photo_url: str


class TrackSchema(BaseModel):
  track_name: str
  track_cover_url: str
  artist_name: str
  track_type: str
