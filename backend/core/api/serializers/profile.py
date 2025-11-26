from rest_framework import serializers
from ...models import Profile


class ReadOnlyProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"


class ProfileSerializer(serializers.ModelSerializer):
    """
    Serializer which is used to create/update a profile.
    """

    class Meta:
        model = Profile
        fields = (
            "id",
            "name",
            "email",
            "phone",
            "address",
            "city",
            "state",
            "zip_code",
            "country",
            "skills",
            "created_at",
            "updated_at",
            "user",
        )
        read_only_fields = ("id", "user", "created_at", "updated_at")

    def create(self, validated_data):
        user = self.context["request"].user

        if Profile.objects.filter(user=user).exists():
            raise serializers.ValidationError("Profile already exists for this user.")
        validated_data["user"] = user

        return super().create(validated_data)

    def update(self, instance, validated_data):
        user = self.context["request"].user

        if instance.user != user:
            raise serializers.ValidationError(
                "You are not allowed to update this profile."
            )

        # Prevent reassigning the profile to a different user
        validated_data.pop("user", None)

        return super().update(instance, validated_data)
