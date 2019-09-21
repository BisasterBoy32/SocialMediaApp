from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User

from .models import Post 
from .serializers import PostSer
from .custom_permissions import isOwnerOrReadOnly
from rest_framework import filters
from rest_framework import pagination

from .pagination import MyPagination

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSer
    permission_classes = [
        permissions.IsAuthenticatedOrReadOnly ,
        isOwnerOrReadOnly,    
    ]
    pagination_class = MyPagination
    filter_backends = [filters.OrderingFilter]
    ordering = ['-p_date']

    def perform_create(self ,serializer):
        serializer.save(owner = self.request.user)

    @action(detail = True)
    def get_user_posts(self , request ,pk = None):
        owner = get_object_or_404(User , pk = pk)
        owner_posts = Post.objects.filter(owner = owner.id)
        serializer = PostSer(owner_posts , many = True)
        return Response(serializer.data)

