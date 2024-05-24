from django.urls import path

from .views import RegisterView, JobListingApiView, JobListingDetailApiView, AllJobsApiView, SaveJobApiView, SaveJobDetailApiView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('job-listing/', JobListingApiView.as_view()),
    path('job-listing/<int:pk>/', JobListingDetailApiView.as_view()), 
    path('all-jobs/', AllJobsApiView.as_view()),
    path('save-job/', SaveJobApiView.as_view()),
    path('save-job/<int:pk>/', SaveJobDetailApiView.as_view()),   
]