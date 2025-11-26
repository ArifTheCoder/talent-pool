from django.http import Http404
from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from ...api.serializers import ReadOnlyProfileSerializer, ProfileSerializer
from ...models import Profile


class ReadOnlyProfileView(ListAPIView):
    """
    API view to get all profiles.
    """

    serializer_class = ReadOnlyProfileSerializer
    queryset = Profile.objects.all()


class ProfileView(ModelViewSet):
    """
    API view which is used by the authenticated user
    to create/update their profile.
    """

    permission_classes = [IsAuthenticated]
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()
    http_method_names = ["get", "post", "put", "patch"]

    def get_object(self):
        user = self.request.user
        try:
            return Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            raise Http404("Profile does not exist.")
