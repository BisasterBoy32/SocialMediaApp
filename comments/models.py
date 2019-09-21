from django.db import models
from django.contrib.auth.models import User 
from posts.models import Post 
from django.utils import timezone

# Create your models here.
class Comment(models.Model):
    owner = models.ForeignKey(User ,on_delete = models.CASCADE,related_name='comments')
    post = models.ForeignKey(Post ,on_delete = models.CASCADE ,related_name='comments')
    content = models.TextField()
    p_date = models.DateTimeField(editable=False ,null = True)
    u_date = models.DateTimeField(null = True)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.p_date = timezone.now()
        self.u_date = timezone.now()
        return super(Comment, self).save(*args, **kwargs)


class Like(models.Model):
    owner = models.ForeignKey(User ,on_delete = models.CASCADE,related_name='likes')
    post = models.ForeignKey( Post ,on_delete = models.CASCADE ,related_name='likes' )
    like = models.BooleanField()
    