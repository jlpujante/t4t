import logging
from flask import Blueprint, redirect, make_response, render_template, send_from_directory
from tracker.app import app, tracker_app, app_redis_session, configuration, STATIC_FILES

logger = logging.getLogger(__name__)

mod_views = Blueprint('views', __name__, url_prefix='')


@mod_views.route('/')
def index():
    return redirect(tracker_app.APP_LOGIN_URL)

@mod_views.route('/<name>.html')
def html(name):
    return render_template('%s.html' % name)


@mod_views.route('/<path:path>')
def static_get(path):
    # Note: this method could be never invoked (if NGINX serves static files, for example)
    response = make_response(send_from_directory(STATIC_FILES, path))
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response


@mod_views.route('/home')
def home():
    # if not app_redis_session.is_valid_current_session():
    #     return redirect("%s?origin=%s" % (traker_app.APP_LOGIN_URL, request.path))
    # print app.bundles
    s = app_redis_session.get_current_session() or {}
    return render_template('app.html',
                           userid=s.get('id', 0),
                           username=s.get('firstName', '') + " " + s.get('lastName', ''),
                           title=s.get('title', ''),
                           appname=tracker_app.APP_NAME_LONG,
                           revision=app.config['REVISION'],
                           bundles=app.bundles,
                           domain=configuration['same_origin_policy_domain']
                           )
