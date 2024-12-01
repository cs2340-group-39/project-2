from datetime import timedelta

from django.http import HttpRequest
from ninja import NinjaAPI, Swagger
from users.authenticators import SpotifyLinkedTokenAuthenticator

from .api_schemas import WrappedResponseSchema
from .db_schemas import AlbumSchema, ArtistSchema
from .utils import call_spotify

api = NinjaAPI(
  urls_namespace="wrapped:api", docs=Swagger(), docs_url="/docs/"
)


@api.get(
  "get-wrapped-data",
  response={200: WrappedResponseSchema},
  auth=SpotifyLinkedTokenAuthenticator(),
)
def get_wrapped_data(request: HttpRequest):
  user = request.auth

  artist_response = call_spotify(
    user=user,
    query="artists",
    time_range="long_term",
    limit=3,
    offset=0,
  )
  album_response = call_spotify(
    user=user, query="albums", time_range="long_term", limit=3, offset=0
  )

  return 200, WrappedResponseSchema(
    artists=[
      ArtistSchema(
        name=artist["name"],
        photo_url=(
          artist["images"][0]["url"]
          if len(artist["images"]) != 0
          else ""
        ),
        top_song="",
        time_listened=timedelta(seconds=0),
      )
      for artist in artist_response["artists"]
    ],
    albums=[
      AlbumSchema(name=album["name"], album_cover_url=album[""])
      for album in album_response["albums"]
    ],
  )


# https://api.spotify.com/v1/me/top/{type}
# url = "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=3&offset=0"


"""
{
  "artists": [
    {
      "external_urls": {
        "spotify": "string"
      },
      "followers": {
        "href": "string",
        "total": 0
      },
      "genres": ["Prog rock", "Grunge"],
      "href": "string",
      "id": "string",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "name": "string",
      "popularity": 0,
      "type": "artist",
      "uri": "string"
    }
  ]
}




{
  "albums": [
    {
      "album_type": "compilation",
      "total_tracks": 9,
      "available_markets": ["CA", "BR", "IT"],
      "external_urls": {
        "spotify": "string"
      },
      "href": "string",
      "id": "2up3OPMp9Tb4dAKM2erWXQ",
      "images": [
        {
          "url": "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
          "height": 300,
          "width": 300
        }
      ],
      "name": "string",
      "release_date": "1981-12",
      "release_date_precision": "year",
      "restrictions": {
        "reason": "market"
      },
      "type": "album",
      "uri": "spotify:album:2up3OPMp9Tb4dAKM2erWXQ",
      "artists": [
        {
          "external_urls": {
            "spotify": "string"
          },
          "href": "string",
          "id": "string",
          "name": "string",
          "type": "artist",
          "uri": "string"
        }
      ],
      "tracks": {
        "href": "https://api.spotify.com/v1/me/shows?offset=0&limit=20",
        "limit": 20,
        "next": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
        "offset": 0,
        "previous": "https://api.spotify.com/v1/me/shows?offset=1&limit=1",
        "total": 4,
        "items": [
          {
            "artists": [
              {
                "external_urls": {
                  "spotify": "string"
                },
                "href": "string",
                "id": "string",
                "name": "string",
                "type": "artist",
                "uri": "string"
              }
            ],
            "available_markets": ["string"],
            "disc_number": 0,
            "duration_ms": 0,
            "explicit": false,
            "external_urls": {
              "spotify": "string"
            },
            "href": "string",
            "id": "string",
            "is_playable": false,
            "linked_from": {
              "external_urls": {
                "spotify": "string"
              },
              "href": "string",
              "id": "string",
              "type": "string",
              "uri": "string"
            },
            "restrictions": {
              "reason": "string"
            },
            "name": "string",
            "preview_url": "string",
            "track_number": 0,
            "type": "string",
            "uri": "string",
            "is_local": false
          }
        ]
      },
      "copyrights": [
        {
          "text": "string",
          "type": "string"
        }
      ],
      "external_ids": {
        "isrc": "string",
        "ean": "string",
        "upc": "string"
      },
      "genres": [],
      "label": "string",
      "popularity": 0
    }
  ]
}
"""
