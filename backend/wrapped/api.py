from typing import List

from django.db.models import QuerySet
from django.http import HttpRequest
from ninja import NinjaAPI, Swagger
from users.authenticators import SpotifyLinkedTokenAuthenticator

from .api_schemas import WrappedResponseSchema
from .db_schemas import ArtistSchema, TrackSchema
from .models import Wrapped
from .utils import call_spotify

api = NinjaAPI(
  urls_namespace="wrapped:api", docs=Swagger(), docs_url="/docs/"
)


@api.post(
  "create-wrapped-data",
  response={201: WrappedResponseSchema},
  auth=SpotifyLinkedTokenAuthenticator(),
)
def create_wrapped_data(request: HttpRequest):
  user = request.auth

  try:
    artist_response = call_spotify(
      user=user,
      query="artists",
      time_range="medium_term",
      limit=3,
      offset=0,
    )
  except Exception as e:
    print(e)

  try:
    track_response = call_spotify(
      user=user,
      query="tracks",
      time_range="medium_term",
      limit=3,
      offset=0,
    )
  except Exception as e:
    print(e)

  artists: List[ArtistSchema] = []
  for artist in artist_response["items"]:
    name = artist["name"]
    photo_url = ""

    if len(artist["images"]) != 0:
      photo_url = artist["images"][0]["url"]

    artist_object = ArtistSchema(name=name, photo_url=photo_url)
    artists.append(artist_object)

  tracks: List[TrackSchema] = []
  for track in track_response["items"]:
    track_name = track["name"]
    track_cover_url = ""
    artist_name = ""
    track_type = track["album"]["album_type"]

    if len(track["album"]["images"]) != 0:
      track_cover_url = track["album"]["images"][0]["url"]

    if len(track["artists"]) != 0:
      artist_name = track["artists"][0]["name"]

    track_object = TrackSchema(
      track_name=track_name,
      track_cover_url=track_cover_url,
      artist_name=artist_name,
      track_type=track_type,
    )
    tracks.append(track_object)

  Wrapped.objects.create(
    profile=user.profile_for_user,
    artists=[artist.model_dump() for artist in artists],
    tracks=[track.model_dump() for track in tracks],
  )

  return 201, WrappedResponseSchema(
    username=user.username, artists=artists, tracks=tracks
  )


@api.get(
  "get-wrapped-data-for-current-user",
  auth=SpotifyLinkedTokenAuthenticator(),
)
def get_wrapped_data_for_current_user(request: HttpRequest):
  user = request.auth

  wrapped_objects: QuerySet[Wrapped] = (
    user.profile_for_user.wrapped_for_profile.all()
  )

  return 200, {
    "items": [
      WrappedResponseSchema(
        username=user.username, artists=item.artists, tracks=item.tracks
      ).model_dump()
      for item in wrapped_objects
    ]
  }


@api.get("get-public-wrapped-data")
def get_public_wrapped_data(request: HttpRequest):
  wrapped_objects = Wrapped.objects.filter(public=True)

  return 200, {
    "items": [
      WrappedResponseSchema(
        username=item.profile.user.username,
        artists=item.artists,
        tracks=item.tracks,
      ).model_dump()
      for item in wrapped_objects
    ]
  }
