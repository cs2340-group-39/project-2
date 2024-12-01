from typing import List

from ninja import Schema

from .db_schemas import AlbumSchema, ArtistSchema


class WrappedResponseSchema(Schema):
  artists: List[ArtistSchema]
  albums: List[AlbumSchema]
