from rest_framework import serializers
from .models import CustomUser, JobListing, SaveJob
from django.contrib.auth import get_user_model
from rest_framework.status import HTTP_400_BAD_REQUEST
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['id', 'username', 'email', 'user_type']

class AllJobsSerializer(serializers.ModelSerializer):
    company_name = serializers.SerializerMethodField()
    company_email = serializers.SerializerMethodField()
    def get_company_name(self, obj):
        return obj.company.username
    def get_company_email(self, obj):
        return obj.company.email
    
    class Meta:
        model = JobListing
        fields = ['id', 'title', 'description', 'company_name', 'company_email' , 'create_at']

class JobListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobListing
        fields = ['id', 'title', 'description', 'create_at']


class SaveJobSerializer(serializers.ModelSerializer):
    title = serializers.SerializerMethodField()
    description = serializers.SerializerMethodField()
    company = serializers.SerializerMethodField()
    class Meta:
        model = SaveJob
        fields = ['id', 'job', 'saved_at',  'title', 'description', 'company']
        
    def get_title(self, obj):
        return obj.job.title
    
    def get_description(self, obj):
        return obj.job.description
    def get_company(self, obj):
        return obj.job.company.username
    
    def validate(self, attrs):
        candidate = self.context['request'].user
        job = attrs.get('job')
        if SaveJob.objects.filter(candidate=candidate, job=job).exists():
            raise serializers.ValidationError("This job is already saved.")
        return attrs

        
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(write_only=True, required=True)
    user_type = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = CustomUser
        fields = ['username', 'email', 'password', 'user_type']

    def validate(self, attrs):
        if attrs['user_type'] not in ['candidate', 'company']:
            raise serializers.ValidationError({'user_type': 'This field must be either candidate or company'})
        return attrs

    def create(self, validated_data):
        user = User.objects.create_user(
            user_type=validated_data['user_type'],
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user