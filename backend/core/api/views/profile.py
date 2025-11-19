from rest_framework.generics import ListAPIView
from ...api.serializers import ReadOnlyProfileSerializer
from ...models import Profile


class ReadOnlyProfileView(ListAPIView):
    """
    API view to get all profiles.
    """

    serializer_class = ReadOnlyProfileSerializer
    queryset = Profile.objects.all()
