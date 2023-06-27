import binascii
import os
import urllib
import logging

logger = logging.getLogger(__name__)

SESSION_KEY_LENGTH = 15


def get_all_api_header_parameters(request):
    keys = [
        'secret',
        'keyfile',
        'filename',
        'sessionkey',
        'tag',
        'path',
        'drhousekey',
        'caseid',
        'commentid'
    ]
    param = {}
    for k in keys:
        param[k] = get_header_parameter(request, k)
    return param


def get_url_parameter(request, param):
    if not param in request.args:
        return None
    value = request.args[param]
    return value


def get_header_parameter(request, param):
    if not param in request.headers:
        return None
    value = request.headers[param]
    return value


def is_valid_secret(request, secret):
    mysecret = get_header_parameter(request, 'satmed-secret-api')
    if not mysecret or mysecret != secret:
        return False
    return True


def add_cross_origin_resource_sharing(response, origin_domain):
    response.headers.add('Access-Control-Allow-Origin', ' https://*.' + origin_domain)
    response.headers.add('Access-Control-Allow-Headers', '*')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST')
    return response


def add_parameters_to_url(url, params, param_quoted=True):
    url_params = ''
    nparam = 0
    if params and len(params.keys()) > 0:
        for keyparam in sorted(params.keys()):
            param_value = urllib.quote_plus(params[keyparam]) if param_quoted else params[keyparam]
            url_params += str(keyparam + '=' + param_value) if not nparam else str('&' + keyparam + '=' + param_value)
            nparam += 1
    url_separator = '?' if url.find('?') == -1 else '&'
    url_partial = "%s%s%s" % (url, url_separator, url_params) if url_params != '' else url
    return url_partial


def exists_url_arg(request, url_arg):
    arg = get_url_parameter(request, url_arg)
    if arg:
        return True
    return False


def tuple_to_dict(obj_tuple):
    return dict(zip(obj_tuple.keys(), obj_tuple))


def get_all_url_parameters(args):
    param = dict()
    for keyparam in args:
        param[keyparam] = args[keyparam]
    return param


def generate_cookie_session_id():
    return binascii.b2a_hex(os.urandom(SESSION_KEY_LENGTH))
