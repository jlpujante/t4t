from .tracker_configuration import configuration  # important: this should be loaded at the very beginning
import logging
import os
from datetime import timedelta
from flask import Flask
from flask_redisSession import RedisSession
from flask_wtf.csrf import CsrfProtect
from tracker import TrackerApp
from base_application.app_redis_session import ApplicationRedisSession
from base_application.app_assets import AppAssets

CONTACT_EMAIL_DEFAULT_VALUE = "contact@traker.lu"

TEMPLATE_FILES = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, os.pardir, 'release'))
STATIC_FILES = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, os.pardir, 'release'))
# DISABLE_CACHE = False

COOKIE_NAME = "tracker-session"
SESSION_REDIS_PREFIX = "tracker:"

logger = logging.getLogger(__name__)

###############################################################################
###############################################################################

tracker_app = TrackerApp(configuration)

###############################################################################
###############################################################################

application = app = Flask(__name__, static_folder=STATIC_FILES, static_url_path='', template_folder=TEMPLATE_FILES)

try:
    execfile(os.path.join(os.path.dirname(__file__), os.pardir, "build_info.py"), {}, app.config)
except IOError:
    app.config['REVISION'] = app.config['BUILD_TIME'] = ""

logger.info("Application Revision: #" + app.config['REVISION'])
logger.info("Application Build Time: " + app.config['BUILD_TIME'])

for k, v in configuration.items():
    app.config[k.upper()] = v

# Application Assets
application_base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), os.pardir, os.pardir))
application.bundles = AppAssets(application_base_path).get_bundles()

# CSRF
tracker_app.configuration['USE_SECRET_KEY'] = False
app.secret_key = configuration['secret_key']
csrf = CsrfProtect()
csrf.init_app(app)

# SESSIONS
app.session_cookie_name = COOKIE_NAME
app.session_cookie_prefix = SESSION_REDIS_PREFIX
app.config['SESSION_KEY_PREFIX'] = SESSION_REDIS_PREFIX
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=1)
app_redis_session = ApplicationRedisSession(configuration=app.config, prefix=app.session_cookie_prefix)
session_interface = RedisSession(app)
