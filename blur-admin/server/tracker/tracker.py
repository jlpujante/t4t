# import json
# import os
import logging
# import binascii
# import traceback
from base_application.base import BaseApplication

# from base_application.app_response import AppResponse
# from base_application.app_utils import tuple_to_dict
# from drhouse_queue.queue_publisher import QueuePublisher
# from uploader import UploaderComponent
# import cloud_common

logger = logging.getLogger(__name__)


class TrackerApp(BaseApplication, object):
    APP_ROLES = ['Viewer']
    APP_NAME = "tracker"
    APP_NAME_LONG = "Track Your Truck"
    APP_HOME_URL = "/home"
    NO_ERROR = 0

    # _MONTH_DICT = {
    #     'January': '1',
    #     'February': '2',
    #     'March': '3',
    #     'April': '4',
    #     'May': '5',
    #     'June': '6',
    #     'July': '7',
    #     'August': '8',
    #     'September': '9',
    #     'October': '10',
    #     'November': '11',
    #     'December': '12'
    # }

    def __init__(self, config):
        BaseApplication.__init__(self, config)
        self.APP_LOGIN_URL = config['application_url'] + "/auth/login"
        self.APP_LOGOUT_URL = config['application_url'] + "/auth/logout"

        ###############################################################################
        ###############################################################################
