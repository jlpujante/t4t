"""Main entry point into the SatMed Flask application."""
from tracker.app import application
# from drhouse.app_error_handlers import mod_error
from auth import mod_auth
from views import mod_views
from api_frontend import mod_api_frontend
from api_backend import mod_api_backend

application.register_blueprint(mod_auth)
application.register_blueprint(mod_views)
application.register_blueprint(mod_api_frontend)
application.register_blueprint(mod_api_backend)
# application.register_blueprint(mod_error)

app = application