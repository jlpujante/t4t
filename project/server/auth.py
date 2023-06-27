import logging
from flask import Blueprint, render_template, request, redirect
from tracker.app import app, tracker_app
from tracker.app import csrf

logger = logging.getLogger(__name__)

mod_auth = Blueprint('auth', __name__, url_prefix='/auth')

ORIGIN_PARAMETER = 'origin'


@mod_auth.route('/login', methods=['GET', 'POST'])
def login():
    """
    Login/Logout operations
    """
    if request.method == 'POST':
        logger.info("POST login (%s)" % (request.url))
        return redirect(tracker_app.APP_HOME_URL)
    else:
        logger.info("Login (%s)" % (request.url))
        return render_template('login.html',
                               bundles=app.bundles
                               )


@csrf.exempt
@mod_auth.route('/logout', methods=['POST'])
def logout():
    logger.info("Logout (%s)" % (request.url))
    logger.debug("Destroying session...")
    return redirect(tracker_app.APP_LOGIN_URL)

