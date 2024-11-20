from django.http import HttpRequest
from ninja import NinjaAPI, Swagger

from .authenticators import SupabaseTokenAuthenticator
from .schemas import UserSchema

api = NinjaAPI(
    urls_namespace="users:api", docs=Swagger(), docs_url="/docs/"
)


@api.get(
    "get-user", response=UserSchema, auth=SupabaseTokenAuthenticator()
)
def get_user(request: HttpRequest):
    user = request.auth
    return UserSchema(
        uuid=str(user.uuid), username=user.username, email=user.email
    )
