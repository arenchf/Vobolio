
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenRefreshSerializer, TokenObtainPairSerializer
from .models import User
from django.db.models import Q


class UserSelfSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = User
        exclude = ("id","password","is_superuser","is_active","is_verified","groups","user_permissions")
        


class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("id","password","is_superuser","is_active","email","is_verified","groups","user_permissions")

class UserPrivateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User        
        exclude = ("id","password","last_login","is_superuser","name","location","is_staff","is_active","date_joined","email","is_verified","groups","user_permissions","main_language")



class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self,data):
        validated_data = super().validate(data)
        if not self.user.is_verified:
            raise serializers.ValidationError({'detail': ['The user has not been verified.']})
        return validated_data
        

    @classmethod
    def get_token(cls, user):
        token = super(CustomTokenObtainPairSerializer, cls).get_token(user)
        print("AAA",user.username)
        token["username"] = user.username
        token["main_language"] = user.main_language
        if(user.img):
            token["img"] = user.img.url
        else:
            token["img"] = None

        return token


class UserCreateSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True,write_only=True)
    username = serializers.CharField(required=True,write_only=True)
    password = serializers.CharField(min_length=8,required=True,write_only=True)
    # password_confirm = serializers.CharField(min_length=8,required=True)
    
    # class Meta:
    #     model = User
    #     extra_kwargs = {
    #         'password': {'write_only': True},
    #         "email":{"write_only":True},
    #         "username":{"write_only":True}
    #     }
    #     fields = ("email","password","username")

    def validate(self,data):
    #     # print(value)
    #     print("11")
        user = User.objects.filter(Q(email=data["email"]) | Q(username=data["username"])).first()
    #     print("user",user)
        if user:
            raise serializers.ValidationError("Email or username already exists.")
    #     # if data["password"] != data["password_confirm"]:
    #     #     raise serializers.ValidationError("Passwords don't match.")
        
    #     print("aa")
        return data
    
    def create(self, validated_data):
        print("create",validated_data)
        # del validated_data["password_confirm"]
        # validated_data.pop("password_confirm")
        # user = User(email=validated_data["email"],password=validated_data["password"],username=validated_data["username"])
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        # user.set_password(validated_data['password'])
        user.save()
        
        return user

class RefreshPasswordSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    new_password_confirm = serializers.CharField(required=True)

    def validate(self, data):
        if data["new_password"] != data["new_password_confirm"]:
            raise serializers.ValidationError(
                {'new_password_confirm': "The two password fields didn't match."})
        return data