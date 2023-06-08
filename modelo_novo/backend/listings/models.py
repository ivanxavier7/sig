from random import choices

from django.contrib.auth import get_user_model
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point
from django.utils import timezone

User = get_user_model()

class Listing(models.Model):
    seller = models.ForeignKey(User, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    choices_area = (
        ('Inner London', 'Inner London'),
        ('Outer London', 'Outer London'),
    )
    area = models.CharField(max_length=20, blank=True, null=True, choices=choices_area)
    borough = models.CharField(max_length=50, blank=True, null=True)
    choices_listing_type = (
        ('Curricular', 'Curricular'),
        ('Profissional ', 'Profissional '),
        ('Voluntário', 'Voluntário'),
    ) 
    listing_type = models.CharField(max_length=20, choices=choices_listing_type)
    choices_internship_status = (
        ('Presencial', 'Presencial'),
        ('Remoto', 'Remoto'),
        ('Híbrido', 'Híbrido'),
    )
    internship_status = models.CharField(max_length=20, blank=True, null=True, choices=choices_internship_status)
    vacancies = models.DecimalField(max_digits=2, decimal_places=0)
    choices_internship_bachelor = (
        ('CTeSP', 'CTeSP'),
        ('Licenciatura', 'Licenciatura'),
        ('Mestrado', 'Mestrado'),
        ('Doutoramento', 'Doutoramento'),
    )
    internship_bachelor = models.CharField(max_length=20, blank=True, null=True, choices=choices_internship_bachelor)
    total_hours = models.IntegerField(blank=True, null=True)

    programming_lang_python = models.BooleanField(default=False)
    programming_lang_java = models.BooleanField(default=False)
    programming_lang_c_1 = models.BooleanField(default=False)
    programming_lang_c_2 = models.BooleanField(default=False)
    programming_lang_javascript = models.BooleanField(default=False)

    programming_lang_sql = models.BooleanField(default=False)
    programming_lang_php = models.BooleanField(default=False)
    programming_lang_go = models.BooleanField(default=False)
    programming_lang_kotlin = models.BooleanField(default=False)
    programming_lang_matlab = models.BooleanField(default=False)
    programming_lang_swift = models.BooleanField(default=False)
    programming_lang_rust = models.BooleanField(default=False)
    programming_lang_ruby = models.BooleanField(default=False)
    programming_lang_dart = models.BooleanField(default=False)
    programming_lang_scala = models.BooleanField(default=False)

    programming_fw_frontend_angular = models.BooleanField(default=False)
    programming_fw_frontend_jquery = models.BooleanField(default=False)
    programming_fw_frontend_react = models.BooleanField(default=False)
    programming_fw_frontend_ruby = models.BooleanField(default=False)
    programming_fw_frontend_vuejs = models.BooleanField(default=False)

    programming_fw_backend_aspnet = models.BooleanField(default=False)
    programming_fw_backend_django = models.BooleanField(default=False)
    programming_fw_backend_express = models.BooleanField(default=False)
    programming_fw_backend_laravel = models.BooleanField(default=False)
    programming_fw_backend_nodejs = models.BooleanField(default=False)
    programming_fw_backend_spring = models.BooleanField(default=False)
    

    date_posted = models.DateTimeField(default=timezone.now)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    picture1 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")
    picture2 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")
    picture3 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")
    picture4 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")
    picture5 = models.ImageField(blank=True, null=True, upload_to="pictures/%Y/%m/%d/")


    def __str__(self):
        return self.title
    
class Poi(models.Model):
    name = models.CharField(max_length=120, blank=True, null=True)
    choices_type = (
        ('University', 'University'),
        ('Hospital', 'Hospital'),
        ('Stadium', 'Stadium'),
    )
    type = models.CharField(max_length=50, choices =choices_type)
    location = models.PointField(srid=4326, blank=True, null=True)

    def __str__(self):
        return self.name