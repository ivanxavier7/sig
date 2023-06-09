from django.contrib import admin
from listings.models import Listing, Poi

from .forms import PoisForm

# Register your models here.

class PoiAdmin(admin.ModelAdmin):
    form = PoisForm

admin.site.register(Listing)
admin.site.register(Poi, PoiAdmin)
