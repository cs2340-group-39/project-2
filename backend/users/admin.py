from django.contrib import admin

from .models import Profile, TokenBlacklist, User

admin.site.register(User)
admin.site.register(Profile)
admin.site.register(TokenBlacklist)
