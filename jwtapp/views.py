from rest_framework.decorators import permission_classes, api_view, renderer_classes
from rest_framework.response import Response
from rest_framework import status

from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from .custom_permissions import IsOwner, IsNotOwner

from rest_framework.renderers import JSONRenderer
from rest_framework.views import APIView

from django.shortcuts import get_object_or_404

from .serializers import UserSerializer, UserShowSerializer, PostSerializer
from .models import Users, Posts


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsOwner])
def post_delete(request, pk):
    post = get_object_or_404(Posts, pk=pk)
    post.delete()

    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(["PUT"])
@permission_classes([IsAuthenticated, IsNotOwner])
def like_post(request, pk):
    post = get_object_or_404(Posts, pk=pk)

    if request.user in post.likes.all():
        post.likes.remove(request.user)
        liked = False
    else:
        post.likes.add(request.user)
        liked = True

    serializer = PostSerializer(post)
    return Response({"content": serializer.data, "liked": liked})


class UsersList(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk=None):
        if pk is not None:
            user = Users.objects.get(pk=pk)
            serializer = UserShowSerializer(user)
        else:
            users = Users.objects.all()
            serializer = UserShowSerializer(users, many=True)

        return Response(serializer.data)


class PostsList(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):
        if pk is not None:
            post = Posts.objects.get(pk=pk)
            serializer = PostSerializer(post)
        else:
            posts = Posts.objects.all()
            serializer = PostSerializer(posts, many=True)

        return Response(serializer.data)

    def post(self, request):
        request_data = request.data.copy()
        request_data["author"] = request.user.id

        serializer = PostSerializer(data=request_data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
