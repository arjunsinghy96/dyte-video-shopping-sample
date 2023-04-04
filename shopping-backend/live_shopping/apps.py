import requests
from django.core.exceptions import ImproperlyConfigured
from django.apps import AppConfig


class DytePresetDoesNotExist(Exception):
    pass


class LiveShoppingConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "live_shopping"

    def ready(self):
        from .dyte_api_client import DyteAPIClient
        from django.conf import settings

        try:
            all_presets = DyteAPIClient.fetch_all_presets()
        except requests.exceptions.HTTPError:
            raise ImproperlyConfigured(
                f"Failed to get available Dyte presets. Make sure you have set 'DYTE_ORG_ID' and 'DYTE_API_KEY' in settings."
            )
        preset_exists = list(
            filter(lambda x: x["name"] == settings.DYTE_ORG_PRESET_NAME, all_presets)
        )
        if not preset_exists:
            raise DytePresetDoesNotExist(
                f"The preset '{settings.DYTE_ORG_PRESET_NAME}' does not exists. "
                "See https://docs.dyte.io/getting-started#preset for more info"
            )
