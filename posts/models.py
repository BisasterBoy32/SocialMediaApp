from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Post(models.Model):
    title = models.CharField(max_length= 112)
    content = models.TextField()
    owner = models.ForeignKey(User ,on_delete = models.CASCADE)
    p_date = models.DateTimeField( editable=False ,null = True)
    u_date = models.DateTimeField( null  = True)

    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.p_date = timezone.now()
        self.u_date = timezone.now()
        return super(Post, self).save(*args, **kwargs)