from django.urls import path
from .views import AuthURL

urlpatterns = {
    path('get-auth-url', AuthURL.as_view()),
    path('spotify/auth-url/', views.AuthURL.as_view(), name='auth_url'),
    path('spotify/callback/', views.spotify_callback, name='spotify_callback'),
    path('spotify/current-song/', views.CurrentSong.as_view(), name='current_song'),
}