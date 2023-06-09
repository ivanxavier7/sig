from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    email = models.EmailField(unique=True)

class Profile(models.Model):
    seller = models.OneToOneField(User, on_delete=models.CASCADE)
    agency_name = models.CharField(max_length=100, null=True, blank=True)
    phone_number = models.CharField(max_length=25, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    profile_picture = models.ImageField(upload_to = 'profile_pictures/%Y/%m/%d/', null=True, blank=True)

    def __str__(self):
        return f'Profile of {self.seller.username}'
    

