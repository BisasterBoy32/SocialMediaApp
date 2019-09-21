from rest_framework import serializers 

from .models import Comment 
from .models import Like
from accounts.serializers import GetUserSerializer

class CommentSer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    class Meta():
        model = Comment 
        fields = '__all__'
        read_only_fields = ['owner','u_date','p_date']
    
    def get_owner(self ,obj):
        return GetUserSerializer(obj.owner).data

class CommentUpdateSer(serializers.ModelSerializer):
    owner = serializers.SerializerMethodField()
    class Meta():
        model = Comment 
        fields = '__all__'
        read_only_fields = ['post','owner','u_date','p_date']

    def get_owner(self ,obj):
        return GetUserSerializer(obj.owner).data

# like serializer 
class LikeSer(serializers.ModelSerializer):
    class Meta():
        model = Like 
        fields = '__all__'
        read_only_fields = ['owner',]
    
    def validate(self ,data):
        owner_id = self.context['request'].user.id
        post = data['post']

        like = Like.objects.filter(owner = owner_id ,post = post.id)
        if like.exists():
            raise serializers.ValidationError("this like with this user and post already exists")
        return data


# like Update serializer 
class LikeUpdateSer(serializers.ModelSerializer):
    class Meta():
        model = Like 
        fields = '__all__'
        read_only_fields = ['owner','post']
