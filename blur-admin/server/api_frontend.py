import logging
import json
from flask import Blueprint, make_response
from tracker.app import app_redis_session

logger = logging.getLogger(__name__)

mod_api_frontend = Blueprint('frontend', __name__, url_prefix='')


@mod_api_frontend.route('/me')
def get_session():
    # d = dict(id=1,
    #          first_name="Jose Luis",
    #          last_name="Pujante",
    #          email="jose.luis.pujante@track4truck.com",
    #          locale="en_US",
    #          role="admin",
    #          phone="(+352) 661 130 641",
    #          location="Luxembourg",
    #          company_id=1)
    # return make_response(json.dumps(d))
    logger.debug("Session******************")
    logger.debug(json.dumps(app_redis_session.get_current_session()))
    return make_response(json.dumps(app_redis_session.get_current_session()))


@mod_api_frontend.route('/map/styling')
def get_map_styling():
    l = list([
        "default",
         "aubergine",
         "dark",
         "night",
         "retro",
         "silver"])
    return make_response(json.dumps(l))
