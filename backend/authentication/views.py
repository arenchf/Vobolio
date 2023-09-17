from django.shortcuts import render
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework_simplejwt.views import TokenObtainPairView



from .models import User
from .serializers import UserSelfSerializer, UserPrivateSerializer, UserPublicSerializer,UserCreateSerializer,CustomTokenObtainPairSerializer
from django.db.models import Q
# Create your views here.




class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request,*args,**kwargs)
        # print("Aaaa")
        return response

class UserCreateView(APIView):
    permission_classes = (permissions.AllowAny,)    

    def post(self, request, format='json'):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            if request.data["password"] != request.data["password_confirm"]:
                raise APIException("Passwords don't match.")
            serializer.save()
            login_serializer = CustomTokenObtainPairSerializer(data=request.data)

            try:
                login_serializer.is_valid(raise_exception=True)
            except TokenError as e:
                raise InvalidToken(e.args[0])

            return Response(login_serializer.validated_data, status=status.HTTP_200_OK)
            
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
            


class UserDetailView(APIView):

    def get(self, request, *args, **kwargs):
        version = request.version
        username = kwargs.get("username")

        user = User.objects.filter(Q(username=username)).first()

        if not user:
            return Response(status=status.HTTP_404_NOT_FOUND)
        
        if request.user == user:
            serializer = UserSelfSerializer(user)
        elif user and user.public:
            serializer = UserPublicSerializer(user)
        elif user and not user.public:
            serializer = UserPrivateSerializer(user)
        
        return Response(serializer.data, status=status.HTTP_200_OK)
        
        

        

    def put(self,request,*args,**kwargs):
        version = request.version


class UserListView(APIView):
    
    # def get(self,request,*args,**kwargs):
    #     version = request.version

    
    def post(self,request,*args,**kwargs):
        version = request.version


# class UserDashboardInfo(APIView):
#     def get(self,request,*args,**kwargs):
