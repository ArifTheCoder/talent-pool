from rest_framework import serializers
from ...models import Profile


class ReadOnlyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"
