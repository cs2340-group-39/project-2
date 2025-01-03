import random
from typing import List

from django.db.models import QuerySet
from django.http import HttpRequest
from ninja import NinjaAPI, Swagger
from users.authenticators import SpotifyLinkedTokenAuthenticator, TokenAuthenticator

from .api_schemas import WrappedRequestSchema, WrappedResponseSchema
from .db_schemas import ArtistSchema, TrackSchema
from .models import Wrapped
from .utils import request_spotify

api = NinjaAPI(urls_namespace="wrapped:api", docs=Swagger(), docs_url="/docs/")


@api.post(
    "create-wrapped-data",
    response={201: WrappedResponseSchema},
    auth=SpotifyLinkedTokenAuthenticator(),
)
def create_wrapped_data(request: HttpRequest):
    user = request.auth

    try:
        artist_response = request_spotify(
            user=user,
            query="artists",
            time_range="medium_term",
            limit=3,
            offset=random.randint(0, 10),
        )
    except Exception as e:
        print(e)

    try:
        track_response = request_spotify(
            user=user,
            query="tracks",
            time_range="medium_term",
            limit=3,
            offset=random.randint(0, 10),
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

    new = Wrapped.objects.create(profile=user.profile_for_user)
    new.artists.extend([artist.model_dump() for artist in artists])
    new.tracks.extend([track.model_dump() for track in tracks])
    new.save()

    return 201, WrappedResponseSchema(
        id=new.id, username=user.username, artists=artists, tracks=tracks
    )


@api.delete("delete-wrapped-data", auth=TokenAuthenticator())
def delete_wrapped_data(request: HttpRequest, data: WrappedRequestSchema):
    user = request.auth

    try:
        wrapped_objects = user.profile_for_user.wrapped_for_profile.all()
        wrapped_objects.filter(pk=data.wrapped_id).delete()
    except Exception as e:
        print(f"Unexpected error deleting `Wrapped` object: {e}")
        return 500

    return 200


@api.post("make-wrapped-data-public", auth=TokenAuthenticator())
def make_wrapped_data_public(request: HttpRequest, data: WrappedRequestSchema):
    user = request.auth

    try:
        wrapped_objects = user.profile_for_user.wrapped_for_profile.all()
        wrapped_objects.filter(pk=data.wrapped_id).update(public=True)
    except Exception as e:
        print(f"Unexpected error updating `Wrapped` object: {e}")
        return 500

    return 200


@api.get("get-wrapped-data-for-current-user", auth=SpotifyLinkedTokenAuthenticator())
def get_wrapped_data_for_current_user(request: HttpRequest):
    user = request.auth

    wrapped_objects: QuerySet[Wrapped] = user.profile_for_user.wrapped_for_profile.all()

    return 200, {
        "items": [
            WrappedResponseSchema(
                id=item.id, username=user.username, artists=item.artists, tracks=item.tracks
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
                id=item.id,
                username=item.profile.user.username,
                artists=item.artists,
                tracks=item.tracks,
            ).model_dump()
            for item in wrapped_objects
        ]
    }
