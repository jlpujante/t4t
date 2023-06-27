import logging
import json
from flask import Blueprint, make_response

logger = logging.getLogger(__name__)

mod_api_frontend = Blueprint('frontend', __name__, url_prefix='')


@mod_api_frontend.route('/session')
def get_session():
    d = dict(id=1,
             first_name="Jose Luis",
             last_name="Pujante",
             email="joseluispujante@gmail.com",
             locale="en_US",
             role="admin",
             company_id=1
             )
    return make_response(json.dumps(d))
