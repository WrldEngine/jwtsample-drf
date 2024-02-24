from django.contrib import admin
from django.urls import path, include

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from jwtapp.views import register_user, show_users, PostsList, post_delete, like_post

user_patterns = [
    path("register/", register_user, name="register_user"),
    path("show/", show_users, name="show_users"),
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
