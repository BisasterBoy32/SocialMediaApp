from .models import Post
from rest_framework import serializers 
from accounts.serializers import GetUserSerializer
from comments.serializers import LikeSer

class PostSer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    comments_count = serializers.SerializerMethodField()
    likes_count = serializers.SerializerMethodField()
    delikes_count = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    class Meta():
        model = Post 
        fields = '__all__'

    def get_owner(self ,obj):
        return GetUserSerializer(obj.owner).data

    def get_comments_count(self ,obj):
        return obj.comments.count()

    def get_likes_count(self ,obj):
        return obj.likes.filter(like = True).count()

    def get_delikes_count(self ,obj):
        return obj.likes.filter(like = False).count()

    def get_likes(self,obj):
        return LikeSer(obj.likes ,many = True).data
    
