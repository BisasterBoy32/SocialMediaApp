from django.contrib.auth.models import User 
from rest_framework import generics ,permissions
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from knox.models import AuthToken


from .serializers import (
    GetUserSerializer,
    RegisterSerializer,
    LoginSerializer,
    ProfileSerializer,
    UserValidationSer,
    UpdateUserSer,
    UpdateProfileSer,
    UpdateImageProfileSer

)
from .models import Profile 
from .custom_permissions import isTheSameUser


class GetUserAPI(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = GetUserSerializer
    permission_classes = [
        permissions.IsAuthenticated,
    ]

    def get_object(self):
        return self.request.user
    # if you used a genericapiview you can do that to get the user info
    # def get(self ,request ,*args ,**kwargs):
    #     serializer = self.get_serializer(request.user)
    #     return Response( serializer.data )

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self ,request , *args ,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data['username']
        user = User.objects.get(username=username)

        return Response({
            'user' : GetUserSerializer(user).data,
            'token' : AuthToken.objects.create(user)[1]
        })

class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self ,request , *args ,**kwargs):
        profile_data = {"image":request.data["image"] ,"sex" : request.data["sex"]}
        user_serializer = self.get_serializer(data = request.data)
        user_serializer.is_valid(raise_exception=True)
        user = user_serializer.save()
        profile_data["user"] = user.id
        prfile_serialize = ProfileSerializer(data = profile_data)
        prfile_serialize.is_valid(raise_exception=True)
        prfile_serialize.save()

        return Response({
            'user' : GetUserSerializer(user).data,
            'token' : AuthToken.objects.create(user)[1]
        })

class ProfileAPI(generics.CreateAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

#api to check the unique username and email
class userValidtaionApi(generics.GenericAPIView):
    serializer_class = UserValidationSer
    queryset = User.objects.all()

    def post(self ,request ,*args ,**kwargs):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        return Response({
            "success" : True
        })
        
#Update User and Profile Api
class UpdateUserApi(generics.GenericAPIView):
    serializer_class = UpdateUserSer
    queryset = User.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
        isTheSameUser,
    ]

    def post(self ,request ,*args ,**kwargs):
        # get the profile chaned data
        sex = request.data.pop('sex')
        profile_data = {}
        profile_data['sex'] = sex
        # get the user
        user = get_object_or_404(User, id = kwargs['id'])
        # check if the authenticated user is the same
        # of the targeted user ( the ones we want to change his information)
        self.check_object_permissions(request, user)
        user_serializer = self.get_serializer(user ,data = request.data)
        # validation
        profile_serializer = UpdateProfileSer(user.profile ,data=profile_data)
        user_serializer.is_valid(raise_exception=True)
        profile_serializer.is_valid(raise_exception = True)

        # if validation succed change information
        user_instance = user_serializer.save()
        profile_serializer.save()

        return Response(
            GetUserSerializer(user_instance).data
        )

class UpdateProfileImageApi(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = UpdateImageProfileSer
    permission_classes = [
        permissions.IsAuthenticated,
        isTheSameUser
    ]

    def post(self ,request ,*args ,**kwargs):
        user = get_object_or_404(User ,id = kwargs["id"])
        u_profile = user.profile 
        self.check_object_permissions(request , user)
        p_serializer = self.get_serializer(u_profile ,data = request.data)
        p_serializer.is_valid(raise_exception = True)
        p_serializer.save()
        return Response({
            "user" : GetUserSerializer(user).data
        })