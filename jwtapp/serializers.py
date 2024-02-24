from rest_framework import serializers
from .models import Users, Posts


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            "id",
            "first_name",
            "last_name",
            "username",
            "email",
            "password",
            "bio_link",
            "location",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Users.objects.create_user(**validated_data)
        return user


class UserShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ("id", "username", "bio_link", "location")


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posts
        fields = "__all__"
