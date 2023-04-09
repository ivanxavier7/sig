from django.utils import timezone
from django.contrib.gis.db import models
from django.contrib.gis.geos import Point

class Listing(models.Model):
    choices_area = (
        ('Inner London', 'Inner London'),
        ('Outer London', 'Outer London')
    )
    choices_listing_type = (
        ('House', 'House'),
        ('Apartment', 'Apartment'),
        ('Office', 'Office'),
    )
    choices_company_status = (
        ('Sale', 'Sale'),
        ('Rent', 'Rent'),
    )
    choices_rental_frequency = (
        ('Month', 'Month'),
        ('Week', 'Week'),
        ('Day', 'Day'),
    )
    
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    area = models.CharField(max_length=20, blank=True, null=True, choices=choices_area)
    borough = models.CharField(max_length=50, blank=True, null=True)
    listing_type = models.CharField(max_length=20, choices=choices_listing_type)
    company_status = models.CharField(max_length=20, blank=True, null=True, choices=choices_company_status)
    price = models.DecimalField(max_digits=50, decimal_places=0)
    rental_frequency = models.CharField(max_length=20, blank=True, null=True, choices=choices_rental_frequency)
    rooms = models.IntegerField(blank=True, null=True)
    furnished = models.BooleanField(default=False)
    pool = models.BooleanField(default=False)
    elevator = models.BooleanField(default=False)
    cctv = models.BooleanField(default=False)
    parking = models.BooleanField(default=False)
    date_posted = models.DateField(default=timezone.now)
    location = models.PointField(blank=True, null=True, srid=4326)
