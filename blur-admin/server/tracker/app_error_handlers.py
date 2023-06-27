import logging
from flask import Blueprint
from app import csrf
from app_wrappers import wrapper_error

logger = logging.getLogger(__name__)

mod_error = Blueprint('error_handlers', __name__)

ERRORS = {
    "400": "Bad request",
    "403": "Access denied",
    "404": "Resource not found",
    "500": "Internal Server error"
}

# Error pages
@mod_error.app_errorhandler(400)
def error400(error):
    return wrapper_error(code=400, error="Bad Request", msg=error.message)


@mod_error.app_errorhandler(403)
def error403(error):
    return wrapper_error(code=403, error="Access denied", msg=error.message)


@mod_error.app_errorhandler(404)
def error404(error):
    return wrapper_error(code=404, error="Page not found", msg=error.message)


@mod_error.app_errorhandler(500)
def error500(error):
    return wrapper_error(code=500, error="Internal Server Error", msg=error.message)


@mod_error.app_errorhandler(503)
def error503(error):
    return wrapper_error(code=503, error="Service unavailable", msg=error.message)


@csrf.error_handler
def csrf_error(reason):
    return wrapper_error(code=400, error="Bad Request", msg=reason)


def create_error(code, description="", error=None):
    if not error:
        error = "" if str(code) not in ERRORS.keys() else ERRORS[str(code)]
    return wrapper_error(code, error, description)
