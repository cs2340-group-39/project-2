from typing import Optional

from django.conf import settings
from supabase import Client, ClientOptions, create_client


class SupabaseClient:
    _instance: Optional[Client] = None

    @classmethod
    def get_client(cls) -> Client:
        if cls._instance is None:
            cls._instance = create_client(
                settings.SUPABASE_URL,
                settings.SUPABASE_KEY,
                options=ClientOptions(
                    auto_refresh_token=False, persist_session=False
                ),
            )
        return cls._instance

    @classmethod
    def reset_client(cls) -> None:
        cls._instance = None


supabase = SupabaseClient.get_client()
