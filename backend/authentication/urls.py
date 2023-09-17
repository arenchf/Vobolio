from django.urls import path

from .views import UserListView, UserDetailView,UserCreateView,CustomTokenObtainPairView
# from .serializers import CustomTokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenRefreshView,TokenObtainPairView


urlpatterns = [
    path('token/obtain/', CustomTokenObtainPairView.as_view(), name='token_create'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('users/', UserListView.as_view()),
    path('users/<str:username>/', UserDetailView.as_view()),
    path('token/create/', UserCreateView.as_view(), name="create_user"),
    # path("users/<str:username>/")
]