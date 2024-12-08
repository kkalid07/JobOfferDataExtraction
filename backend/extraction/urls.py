from django.urls import path
from .views import ListJobListings, CreateJobListing

urlpatterns = [
    path('job-listings/', ListJobListings.as_view(), name='list_job_listings'),  # List all job listings
    path('job-listings/create/', CreateJobListing.as_view(), name='create_job_listing'),  # Create a new job listing
]
