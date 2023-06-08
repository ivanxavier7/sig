from listings.models import Listing
from rest_framework import generics

from .serializers import ListingSerializer


class ListingList(generics.ListAPIView):
    queryset = Listing.objects.all().order_by('-date_posted')
    serializer_class = ListingSerializer

class ListingCreate(generics.CreateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class ListingDetail(generics.RetrieveAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class ListingDelete(generics.DestroyAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

class ListingUpdate(generics.UpdateAPIView):
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer
