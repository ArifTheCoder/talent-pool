from rest_framework.routers import DefaultRouter
from django.urls import path
from .api.views import RegisterView, ReadOnlyProfileView

router = DefaultRouter()

urlpatterns = [
    *router.urls,
    path("auth/register/", RegisterView.as_view(), name="register"),
    path("profiles/", ReadOnlyProfileView.as_view(), name="read-only-profiles"),
]
