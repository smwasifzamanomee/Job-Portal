from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.

USER_TYPE_CHOICES = (
        ('company', 'Company'),
        ('candidate', 'Candidate')
    )

class CustomUser(AbstractUser):   
    user_type = models.CharField(choices=USER_TYPE_CHOICES, max_length=20)

class JobListing(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    company = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='jobs')
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class SaveJob(models.Model):
    candidate = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='saved_jobs', null=True)
    job = models.ForeignKey(JobListing, on_delete=models.CASCADE, related_name='saved_jobs')
    saved_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.job.title