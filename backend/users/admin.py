from django.contrib import admin

from .models import Profile, SupabaseUser

admin.site.register(SupabaseUser)
admin.site.register(Profile)
