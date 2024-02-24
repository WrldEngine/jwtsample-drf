from django.db import models
from django.contrib.auth.models import AbstractUser


class Users(AbstractUser):
    bio_link = models.TextField(null=True)
    location = models.TextField(null=True)

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "user"


class Posts(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField()
    author = models.ForeignKey(Users, on_delete=models.CASCADE)
    likes = models.ManyToManyField(Users, related_name="liked_posts", blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Post"
