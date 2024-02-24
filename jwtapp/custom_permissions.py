from rest_framework import permissions
from django.shortcuts import get_object_or_404

from .models import Posts


class IsOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        post = get_object_or_404(Posts, pk=view.kwargs["pk"])
        return post.author == request.user


class IsNotOwner(permissions.BasePermission):

    def has_permission(self, request, view):
        post = get_object_or_404(Posts, pk=view.kwargs["pk"])
        return post.author != request.user
