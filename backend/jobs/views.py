from django.shortcuts import render
from rest_framework import viewsets, permissions, generics, status
from .models import CustomUser, JobListing, SaveJob
from .serializers import UserSerializer, JobListingSerializer, SaveJobSerializer, RegisterSerializer, AllJobsSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
# Create your views here.

class IsCompany(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
            return False
        return request.user.user_type == 'company'

class IsCandidate(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.is_anonymous:
            return False
        return request.user.user_type == 'candidate'

class AllJobsApiView(generics.ListAPIView):
    queryset = JobListing.objects.all()
    serializer_class = AllJobsSerializer
    
class JobListingApiView(generics.ListCreateAPIView):
    queryset = JobListing.objects.all()
    serializer_class = JobListingSerializer
    permission_classes = [IsCompany]
    
    def perform_create(self, serializer):
        serializer.save(company=self.request.user)
        
    def get_queryset(self):
        return self.queryset.filter(company=self.request.user)

class JobListingDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = JobListing.objects.all()
    serializer_class = JobListingSerializer
    permission_classes = [IsCompany]
    
    def get_queryset(self):
        return self.queryset.filter(company=self.request.user)

class SaveJobApiView(generics.ListCreateAPIView):
    queryset = SaveJob.objects.all()
    serializer_class = SaveJobSerializer
    permission_classes = [IsCandidate]
    
    def perform_create(self, serializer):
        serializer.save(candidate=self.request.user)
    
    def get_queryset(self):
        return self.queryset.filter(candidate=self.request.user)
    
    def post(self, request, *args, **kwargs):
        job_id = request.query_params.get('job')
        if not job_id:
            return Response({'error': 'Job ID is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            job = JobListing.objects.get(id=job_id)
        except JobListing.DoesNotExist:
            return Response({'error': 'Job not found'}, status=status.HTTP_404_NOT_FOUND)
        
        data = {'job': job.id, 'candidate': request.user.id}
        serializer = self.get_serializer(data=data, context={'request': request})
        if serializer.is_valid():
            serializer.save(candidate=request.user, job=job)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class SaveJobDetailApiView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SaveJob.objects.all()
    serializer_class = SaveJobSerializer
    permission_classes = [IsCandidate]
    
    def get_queryset(self):
        return self.queryset.filter(candidate=self.request.user)

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [permissions.AllowAny]
    serializer_class = RegisterSerializer
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        try:
            user = CustomUser.objects.get(email=email)  # Optimize with get()
        except CustomUser.DoesNotExist:
            return Response({'error': 'Invalid credentials'}, status=401)  # Specific error

        if not user.check_password(password):
            return Response({'error': 'Invalid credentials'}, status=401)

        # Generate access and refresh tokens securely
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)  # Convert to string

        # Return user info in a secure and well-structured format
        user_info = {
            'email': user.email,
            'username': user.username,
            'user_type': user.user_type,
            # Include other relevant sanitized user fields as needed
        }

        return Response({
            'message': 'Login successful',
            'access_token': access_token,
            'refresh_token': str(refresh),  # Return the entire refresh token (secure storage required)
            'user_info': user_info,
        })
    

