import requests


def call_spotify(
  user, query: str, time_range: str, limit: int, offset: int
):
  url = (
    f"https://api.spotify.com/v1/me/top/{query}"
    f"?time_range={time_range}"
    f"&limit={str(limit)}"
    f"&offset={str(offset)}"
  )

  response = requests.get(
    url,
    headers={
      "Authorization": f"Bearer {user.profile_for_user.spotify_access_token}"
    },
  )
  response.raise_for_status()

  return response.json()
