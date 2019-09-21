from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework import permissions 
from rest_framework.response import Response 
from rest_framework.decorators import action
from rest_framework import pagination
from rest_framework import filters

from .models import Comment ,Like 
from .serializers import CommentSer ,CommentUpdateSer ,LikeSer ,LikeUpdateSer
from posts.custom_permissions import isOwnerOrReadOnly
from posts.models import Post
from posts.serializers import PostSer


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSer 
    permission_classes = [
        permissions.IsAuthenticated,
        isOwnerOrReadOnly,
    ]
    filter_backends = [filters.OrderingFilter]
    ordering = ['-p_date']

    def perform_create(self ,serializer):
        return serializer.save(owner = self.request.user)

    def update(self ,request , pk=None):
        comment = get_object_or_404(Comment ,id = pk)
        self.check_object_permissions(request , comment)
        serializer = CommentUpdateSer(comment ,data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        comment = serializer.data
        return Response(comment)

    @action(detail=True)
    def get_comments(self ,request ,pk = None):
        post = get_object_or_404(Post ,pk = pk)
        comments = Comment.objects.filter(post = post).order_by('-p_date')
        return Response( CommentSer(comments ,many = True).data )

class LikeViewSet(viewsets.ModelViewSet):
    queryset = Like.objects.all()
    serializer_class = LikeSer
    permission_classes = [
        permissions.IsAuthenticated,
        isOwnerOrReadOnly,
    ]

    def perform_create(self ,serializer):
        return serializer.save(owner = self.request.user)

    def create(self ,request , pk=None):
        serializer = self.get_serializer(data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(owner = self.request.user)
        post_id = serializer.data["post"]
        post = Post.objects.get(id = post_id)
        return Response(PostSer(post).data)

    def update(self ,request , pk=None):
        like = get_object_or_404(Like ,id = pk)
        post = like.post
        self.check_object_permissions(request , like)
        serializer = LikeUpdateSer(like ,data = request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(PostSer(post).data)

    def destroy(self ,request , pk=None):
        like = get_object_or_404(Like ,id = pk)
        post = like.post
        self.check_object_permissions(request , like)
        like.delete() 
        return Response(PostSer(post).data)



