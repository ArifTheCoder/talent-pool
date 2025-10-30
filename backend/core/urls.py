from rest_framework.routers import DefaultRouter
from django.urls import path
from .views import RegisterView

router = DefaultRouter()

urlpatterns = [
    *router.urls,
    path("auth/register/", RegisterView.as_view(), name="register"),
]
