from rest_framework import serializers 
from django.contrib.auth.models import User 
from django.contrib.auth import authenticate

from .models import Profile

#ProfileSerializer
class ProfileSerializer(serializers.ModelSerializer):
    image_path = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ['user','image' ,'sex' ,'image_path' ,'id']
        extra_kwargs = {
            'image': {
                'write_only' : True,
            }
        }
    
    def get_image_path(self ,obj):
        return obj.image.url

#userInfoSerializer
class GetUserSerializer(serializers.ModelSerializer):
    profile = serializers.SerializerMethodField()
    class Meta:
        model = User 
        fields = ['id','username' ,'email' ,'first_name' ,'last_name','profile']

    def get_profile(self ,obj):
        try :
            profile = obj.profile
            return ProfileSerializer(profile).data
        except :
            return None


#login serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self ,data):
        user = authenticate(**data)
        if not user:
            raise serializers.ValidationError("username or password Incorrect")
        
        return data 

#Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required = True)
    image = serializers.ImageField()
    sex = serializers.CharField(required = True)

    class Meta:
        model = User 
        fields = ['username' ,'password','email' ,'first_name' ,'last_name' ,'image','sex']
        write_only_fields = ['password']
    
    def validate(self ,data):
        print(data)
        users_qs = User.objects.filter(email = data['email'])
        if users_qs.exists():
            raise serializers.ValidationError('user with this email already exists')
        else :
            return data

    def create(self ,data):
        user = User.objects.create_user(
            username = data['username'],
            email = data['email'],
            first_name = data['first_name'],
            last_name = data['last_name']
        )

        user.set_password(data['password'])
        user.save()

        return user

#userVerificationSerializer
class UserValidationSer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.CharField()

    def validate(self , data):
        user = User.objects.filter(username = data["username"])
        if user.exists() :
            raise serializers.ValidationError({"username":"user with this username already exists"})

        user = User.objects.filter(email = data["email"])
        if user.exists() :
            raise serializers.ValidationError({"email":"user with this email already exists"})

        return data
    
#User Update Serializer
class UpdateUserSer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username' ,'email' ,'first_name' ,'last_name','id']

    def validate(self ,data):
        c_user_id = self.context['request'].user.id
        user = User.objects.filter(username = data['username']).exclude(id = c_user_id)
        if user.exists() :
            raise serializers.ValidationError({'error' : 'user with this username already exists'})

        user = User.objects.filter(email = data['email']).exclude(id = c_user_id)
        if user.exists() :
            raise serializers.ValidationError({'error' : 'user with this email already exists'})

        return data

#Profile Update Serializer
class UpdateProfileSer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['sex',]

class UpdateImageProfileSer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['image',]

