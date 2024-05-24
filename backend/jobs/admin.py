from django.contrib import admin
from .models import CustomUser, JobListing, SaveJob

# Register your models here.

admin.site.register(CustomUser)
admin.site.register(JobListing)
admin.site.register(SaveJob)