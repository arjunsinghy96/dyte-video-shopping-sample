from django.db import models
from django.contrib.auth import get_user_model

UserModel = get_user_model()


class LiveVideoRequest(models.Model):
    PENDING = "PENDING"
    ACTIVE = "ACTIVE"
    DONE = "DONE"
    STATUS_CHOICES = [
        (PENDING, "Pending"),
        (ACTIVE, "Active"),
        (DONE, "Done"),
    ]
    user_email = models.EmailField()
    user_name = models.CharField(max_length=128)
    support_user = models.ForeignKey(UserModel, on_delete=models.DO_NOTHING, null=True)
    dyte_meeting_id = models.UUIDField(unique=True)
    user_dyte_participant_id = models.UUIDField(unique=True)
    support_user_dyte_participant_id = models.UUIDField(null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default=PENDING)
    feedback = models.TextField()
    product = models.JSONField()
