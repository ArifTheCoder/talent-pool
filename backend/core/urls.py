from rest_framework.routers import DefaultRouter
from django.urls import path
from .api.views import RegisterView, ReadOnlyProfileView, ProfileView

router = DefaultRouter()

urlpatterns = [
    *router.urls,
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("profiles/", ReadOnlyProfileView.as_view(), name="read-only-profiles"),
    path(
        "profile/",
        ProfileView.as_view(
            {
                "get": "retrieve",
                "post": "create",
                "put": "update",
                "patch": "partial_update",
            }
        ),
        name="my-profile",
    ),
]
