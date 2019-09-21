from django.urls import path
from . import api
from knox.urls import views as knoxviews

urlpatterns = [
    path('user/',api.GetUserAPI.as_view() ,name='get_user'),
    path('log-in/',api.LoginAPI.as_view() ,name='log-in'),
    path('register/',api.RegisterAPI.as_view() ,name='register'),
    path('log-out/',knoxviews.LogoutView.as_view() ,name='log-out'),
    path('profile/',api.ProfileAPI.as_view() ,name='profile'),
    path('validation/',api.userValidtaionApi.as_view() ,name="validation"),
    path('update-user/<int:id>/',api.UpdateUserApi.as_view() ,name='update-user'),
    path('update-image/<int:id>/',api.UpdateProfileImageApi.as_view() ,name="update-user-image")
]
