import logging
import uuid
import json
from flask import Blueprint, render_template, request, redirect
from tracker.app import app, tracker_app, app_redis_session
from tracker.app import csrf
from tracker.app_error_handlers import create_error
import tracker.crypto as crypto

logger = logging.getLogger(__name__)

mod_auth = Blueprint('auth', __name__, url_prefix='/auth')

# ORIGIN_PARAMETER = 'origin'

credentials_hacked = [
    dict(id=1,
         first_name="Jose Luis",
         last_name="Pujante",
         password="af6aa57d1993f15e4c179b41ee06da0a2b3f469a894bff06bc0240ada9435c92:b12609f5ccdb4ee88137cbbbfb01a3c2",
         email="jose.luis.pujante@track4truck.com",
         locale="en_US",
         role="admin",
         phone="(+352) 661 130 641",
         location="Luxembourg",
         company_id=1),
    dict(id=2,
         first_name="David",
         last_name="Toledano",
         password="0c089a5e11fdb8381487d3c4637c7d7905d6a3cbaf8e5c3450e4b6c88f389cd0:0d398d9d9571455ba0ce94a198060851",
         email="david.toledano@track4truck.com",
         locale="es_ES",
         role="user",
         phone="(+34) 123 456 789",
         location="Spain",
         company_id=1)
]


def is_user_valid(username, password):
    for c in credentials_hacked:
        if c['email'] == username and crypto.check_password(c['password'], password):
            return c.copy()
    return None


@mod_auth.route('/login', methods=['GET', 'POST'])
def login():
    """
    Login/Logout operations
    """
    if request.method == 'POST':
        logger.info("POST login (%s)" % request.url)
        email = request.form['email']
        passwd = request.form['password']
        logger.debug("login.email=%s" % str(email))
        logger.debug("login.passwd=%s" % str(passwd))
        user = is_user_valid(email, passwd)
        if user:
            user['password'] = ''
            user_str = json.dumps(user)
            ticket = str(uuid.uuid4())
            logger.debug("Ticker generated:   " + ticket)
            if app_redis_session.create_new_session(user_str, ticket):
                return redirect(tracker_app.APP_HOME_URL)
        return create_error(403, description="Invalid credentials")
    else:
        logger.info("Login (%s)" % request.url)
        origin_arg = request.args.get('origin', None)
        logger.info("Origin=%s" % origin_arg)
        if not app_redis_session.is_valid_current_session():
            return render_template('auth.html', bundles=app.bundles)
        if origin_arg:
            logger.info("User login successfully!. Redirecting to origin (" + origin_arg + ")")
            return redirect(origin_arg)
        return redirect(tracker_app.APP_HOME_URL)


@csrf.exempt
@mod_auth.route('/logout', methods=['GET', 'POST'])
def logout():
    logger.debug("Destroying session...")
    app_redis_session.destroy_current_session()
    logger.info("Logout - Redirecting to portal...")
    return redirect(tracker_app.APP_LOGIN_URL)
