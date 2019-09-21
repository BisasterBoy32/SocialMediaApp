from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path("",include("frontend.urls")),
    path('auth/',include('accounts.urls')),
    path('posts/',include('posts.urls')),
    path('comments/',include('comments.urls')),
    path('likes/',include('comments.likes_url'))
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

if settings.DEBUG:
    import debug_toolbar
    urlpatterns += [path('__debug__/', include(debug_toolbar.urls))]