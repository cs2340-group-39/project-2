import threading

from django.conf import settings
from django.utils.functional import SimpleLazyObject
from supabase import Client, ClientOptions, create_client

_supabase_local = threading.local()


def _get_supabase() -> Client:
    if not hasattr(_supabase_local, "client"):
        _supabase_local.client = create_client(
            settings.SUPABASE_URL,
            settings.SUPABASE_KEY,
            options=ClientOptions(auto_refresh_token=False, persist_session=False),
        )
    return _supabase_local.client


supabase: Client = SimpleLazyObject(_get_supabase)
