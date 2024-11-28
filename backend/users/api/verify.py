from datetime import timedelta

from django.http import HttpRequest
from django.utils import timezone

from ..schemas import UserErrorResponseSchema, UserResponseSchema, UserVerifyRequestSchema
from ..utils import generate_tokens
from . import User, api


@api.patch("verify", response={200: UserResponseSchema, 400: UserErrorResponseSchema})
def verify(request: HttpRequest, data: UserVerifyRequestSchema):
    try:
        user = User.objects.filter(email_verification_code=data.code).first()

        if not user:
            return 400, UserErrorResponseSchema(detail="Invalid or expired verification code.")

        if user.email_verification_code_created_at:
            time_diff = timezone.now() - user.email_verification_code_created_at
            if time_diff.total_seconds() > timedelta(days=1).total_seconds():
                return 400, UserErrorResponseSchema(detail="Verification code has expired. Please request a new one.")

        try:
            user.email_verification_code = None
            user.email_verification_code_created_at = None
            user.email_verified_at = timezone.now()
            user.is_active = True
            user.save()
        except Exception as e:
            print(f"Error updating user verification status: {str(e)}")
            return 400, UserErrorResponseSchema(detail="Failed to verify email. Please try again.")

        try:
            access_token, refresh_token = generate_tokens(user)
        except Exception as e:
            print(f"Error generating tokens: {str(e)}")
            return 400, UserErrorResponseSchema(detail="Failed to generate authentication tokens.")

        return 200, UserResponseSchema(uuid=str(user.uuid), username=user.username, email=user.email, access_token=access_token, refresh_token=refresh_token)
    except Exception as e:
        print(f"Unexpected error in verify: {str(e)}")
        return 400, UserErrorResponseSchema(detail="An unexpected error occurred. Please try again.")
