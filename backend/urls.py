from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from jwtapp.views import register_user, PostsList, post_delete, like_post, UsersList

user_patterns = [
    path("register/", register_user, name="register_user"),
    path("show/<int:pk>", UsersList.as_view(), name="show_user"),
    path("show/", UsersList.as_view(), name="show_users"),
]

post_patterns = [
    path("<int:pk>/", PostsList.as_view(), name="post_detail"),
    path("<int:pk>/delete/", post_delete, name="post_delete"),
    path("<int:pk>/like/", like_post, name="post_like"),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/posts/", PostsList.as_view(), name="posts"),
    path("api/users/", include(user_patterns)),
    path("api/post/", include(post_patterns)),
]
