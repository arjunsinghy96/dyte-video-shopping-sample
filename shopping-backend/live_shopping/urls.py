from rest_framework.routers import SimpleRouter

from .views import LiveVideoRequestViewSet

router = SimpleRouter()
router.register(r"live-requests", LiveVideoRequestViewSet, basename="live_requests")

urlpatterns = router.urls
