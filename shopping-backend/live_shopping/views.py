from django.shortcuts import get_object_or_404
from django.conf import settings

from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework import status
from rest_framework.response import Response

from live_shopping.dyte_api_client import DyteAPIClient
from live_shopping.models import LiveVideoRequest
from live_shopping.serializers import LiveVideoRequestSerializer


class LiveVideoRequestViewSet(ViewSet):
    def create(self, request):
        data = request.data
        serializer = LiveVideoRequestSerializer(data=data)
        if serializer.is_valid():
            product = serializer.validated_data.get("product")
            user_email = serializer.validated_data.get("user_email")
            user_name = serializer.validated_data.get("user_name")
            dyte_meeting = DyteAPIClient.create_meeting(
                f"Live shopping for: {product.get('title')}",
                "ap-south-1",
                False,
            )
            participant = DyteAPIClient.add_participant(
                dyte_meeting["id"],
                user_name,
                preset_name=settings.DYTE_ORG_PRESET_NAME,
                custom_participant_id=user_email,
            )
            live_request = LiveVideoRequest.objects.create(
                dyte_meeting_id=dyte_meeting["id"],
                user_name=user_name,
                user_email=user_email,
                status=LiveVideoRequest.PENDING,
                user_dyte_participant_id=participant["id"],
                product=data["product"],
            )
            live_request_serializer = LiveVideoRequestSerializer(live_request)
            return Response(
                live_request_serializer.data, status=status.HTTP_201_CREATED
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        live_requests = LiveVideoRequest.objects.filter(status=LiveVideoRequest.PENDING)
        serializer = LiveVideoRequestSerializer(live_requests, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        live_request = get_object_or_404(LiveVideoRequest, pk=pk)
        serializer = LiveVideoRequestSerializer(live_request)
        return Response(serializer.data)

    @action(methods=["post"], detail=True)
    def start(self, request, pk=None):
        live_request = get_object_or_404(LiveVideoRequest, pk=pk)
        if live_request.support_user_dyte_participant_id:
            token = DyteAPIClient.refresh_participant_token(
                live_request.dyte_meeting_id,
                live_request.support_user_dyte_participant_id,
            )
            return Response({"dyte_auth_token": token["token"]})
        participant = DyteAPIClient.add_participant(
            live_request.dyte_meeting_id,
            "Customer Support",
            settings.DYTE_ORG_PRESET_NAME,
            "customer_support",
        )
        live_request.support_user_dyte_participant_id = participant["id"]
        live_request.status = LiveVideoRequest.ACTIVE
        live_request.save()
        return Response(
            {"dyte_auth_token": participant["token"]}, status=status.HTTP_201_CREATED
        )

    @action(methods=["post"], detail=True)
    def done(self, request, pk=None):
        live_request = get_object_or_404(LiveVideoRequest, pk=pk)
        live_request.status = LiveVideoRequest.DONE
        live_request.save()
        serializer = LiveVideoRequestSerializer(live_request)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    @action(methods=["get"], detail=True, url_path="user-token")
    def user_token(self, request, pk=None):
        live_request = get_object_or_404(LiveVideoRequest, pk=pk)
        token = DyteAPIClient.refresh_participant_token(
            live_request.dyte_meeting_id, live_request.user_dyte_participant_id
        )
        return Response({"dyte_auth_token": token["token"]})
