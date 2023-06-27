import logging
# import json
# import os
# from traceback import format_exc
from ..database.db import ApplicationDatabase
# from ..core_api.connector import CoreConnection
from app_response import AppResponse

logger = logging.getLogger(__name__)


class BaseApplication:
    HTTP_SUCCESS = 200
    HTTP_NOT_FOUND_ERROR = 404
    HTTP_FORBIDDEN_ERROR = 403
    HTTP_SERVER_ERROR = 500
    HTTP_SERVICE_UNAVAILABLE = 503

    def __init__(self, config, app_roles=[]):
        self.configuration = config
        self._db = ApplicationDatabase(config)
        # self._core_conn = CoreConnection(
        #     url=self.configuration['core_url'],
        #     roles=app_roles
        # )
        # self._locales = dict()
        # self._app_locales_path = app_locales_path
        # self.app_id = self.get_core_app_id()
        # (conf_parameter, app_url) = self._get_application_url()
        # logger.info("*****************************************************************************************")
        # app_id_msg = "APP ID: %s (%s = %s)" % (str(self.app_id), conf_parameter, app_url)
        # logger.info(app_id_msg) if self.app_id else logger.warning("APP ID not found")
        # logger.info("*****************************************************************************************")

    ###############################################################################
    ###############################################################################

    def is_core_available_decorator(func):
        def decorated_view(self, *args, **kwargs):
            # logger.debug("*************decorated_view")
            # logger.debug(func)
            # logger.debug(args)
            # logger.debug("len.args=" + str(len(args)))
            # logger.debug(kwargs)
            # logger.debug("len.kwargs=" + str(len(kwargs)))
            self.app_id = self.get_core_app_id()
            if not self.app_id:
                return AppResponse(code=self.HTTP_SERVICE_UNAVAILABLE)
            return func(self, *args, **kwargs)

        return decorated_view

    ###############################################################################
    ###############################################################################

    # def _get_application_url(self):
    #     param = 'application_url' if not self.configuration.get('mimic_application_url', None) else 'mimic_application_url'
    #     return param, self.configuration.get(param)

    # """
    # Core Management
    # """
    # def get_core_app_id(self):
    #     try:
    #         logger.debug("Getting application Id from user management")
    #         return self._core_conn.get_app_id(app_url=self._get_application_url()[1])
    #     except Exception, e:
    #         logger.error(format_exc())
    #         logger.error("Core system is down")
    #         pass
    #
    # def is_core_available(self):
    #     self.app_id = self.get_core_app_id()
    #     return True if self.app_id else False
    #
    # @is_core_available_decorator
    # def get_core_user_by_email(self, user_session):
    #     return AppResponse(code=self.HTTP_SUCCESS, responseContent=self._core_conn.get_user_by_email(user_session['email']))
    #
    # @is_core_available_decorator
    # def get_core_user_by_id(self, user_session):
    #     return AppResponse(code=self.HTTP_SUCCESS, responseContent=self._core_conn.get_user_by_id(user_session['id']))
    #
    # @is_core_available_decorator
    # def get_core_user_groups(self, user_session):
    #     return AppResponse(code=self.HTTP_SUCCESS,responseContent=self._core_conn.get_user_groups(user_session['id']))
    #
    # @is_core_available_decorator
    # def get_core_users(self, user_session, params=None):
    #     return AppResponse(code=self.HTTP_SUCCESS, responseContent=self._core_conn.get_all_users(user_session['id'], params))
    #
    # @is_core_available_decorator
    # def get_core_groups(self, user_session, params=None):
    #     return AppResponse(code=self.HTTP_SUCCESS, responseContent=self._core_conn.get_user_groups(user_session['id'], params))
    #
    # @is_core_available_decorator
    # def get_core_group(self, user_session, gid):
    #     return AppResponse(code=self.HTTP_SUCCESS, responseContent=self._core_conn.get_group(user_session['id'], gid))
    #
    # @is_core_available_decorator
    # def get_user_notifications(self, user_session, params=None):
    #     return AppResponse(code=self.HTTP_SUCCESS, responseContent=self._core_conn.get_user_notifications(user_session['id'], params))
    #
    # @is_core_available_decorator
    # def put_user_notifications_ack(self, user_session, id, params=None):
    #     return AppResponse(code=self.HTTP_SUCCESS, responseContent=self._core_conn.put_user_notifications_ack(user_session.id, id, params))

    ###############################################################################
    ###############################################################################
    """
    Locales Management
    """
    # def _load_locale(self, locale):
    #     locale_filename = os.path.join(self._LOCALES_PATH, locale + '.json')
    #     if not os.path.exists(locale_filename):
    #         return False
    #
    #     with open(locale_filename, 'r') as f:
    #         data = json.loads(f.read())
    #         self._locales[locale] = data
    #     return True
    #
    # def _get_locale(self, locale, code):
    #     if not locale in self._locales:
    #         if not self._load_locale(locale):
    #             return ''
    #     if not code in self._locales[locale]:
    #         return code + ' not found'
    #     return self._locales[locale][code]
    #
    # def set_locale(self, keysession, locale, deltats=None):
    #     if not self._app_locales_path:
    #         return AppResponse(code=self.HTTP_NOT_FOUND_ERROR)
    #     session = self._db.get_session_by_key(key=keysession)
    #     if session != -1 and len(session) == 1:
    #         session = session[0]
    #         return AppResponse(code=0, responseContent='done')
    #     return AppResponse(code=self.HTTP_NOT_FOUND_ERROR)
    #
    # def get_locales(self, locale):
    #     if not self._load_locale(locale):
    #         return {}
    #     return self._locales[locale]
