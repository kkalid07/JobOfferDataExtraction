from django.db import models

from django.db import models

class JobListing(models.Model):
    job_title = models.CharField(max_length=255, null=True, blank=True)
    company_name = models.CharField(max_length=255, null=True, blank=True)
    location = models.CharField(max_length=255, null=True, blank=True)
    salary = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    benefits = models.TextField(null=True, blank=True)
    duration = models.CharField(max_length=255, null=True, blank=True)
    skills_qualifications = models.JSONField(default=list, null=True, blank=True)  # Uses JSONField to store a list
    opportunities = models.TextField(null=True, blank=True)
    contract_type = models.CharField(max_length=50, null=True, blank=True)
    language = models.JSONField(default=list, null=True, blank=True)  # Uses JSONField to store a list
    genre = models.CharField(max_length=50, null=True, blank=True)
    experience = models.CharField(max_length=255, null=True, blank=True)
    date_of_beginning = models.DateField(null=True, blank=True)
    date_of_expiration = models.DateField(null=True, blank=True)
    phone_number = models.CharField(max_length=20, null=True, blank=True)  # Added for phone number
    email = models.EmailField(max_length=255, null=True, blank=True)  # Added for email

    def __str__(self):
        return f'{self.job_title} at {self.company_name}'
