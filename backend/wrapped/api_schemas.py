from typing import List

from ninja import Schema

from .db_schemas import ArtistSchema, TrackSchema


class WrappedResponseSchema(Schema):
  id: int
  username: str
  artists: List[ArtistSchema]
  tracks: List[TrackSchema]


class WrappedRequestSchema(Schema):
  wrapped_id: int
