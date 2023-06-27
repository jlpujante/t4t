import logging
import binascii
import os
# import traceback
# import time
# import json
from flask import make_response, abort, request, render_template, redirect, Response
from app import configuration, app
# from app import drwatson_app, configuration, app, app_redis_session
# from base_application.app_utils import get_all_api_header_parameters, is_valid_secret

logger = logging.getLogger(__name__)

ERROR_TICKET_LENGTH = 30


###############################################################################
###############################################################################

# def _generate_response_for_satmed_core_down():
#     message = "Application cannot operate correctly. Connection with SATMED Core System is not possible."
#     return make_response(
#         wrapper_error(code=drwatson_app.HTTP_SERVICE_UNAVAILABLE, error="Service unavailable", msg=message))
#
#
# def wrapper_api(func, kwargs={}):
#     try:
#         # if not drwatson_app.is_core_available():
#         #     return _generate_response_for_satmed_core_down()
#
#         if not is_valid_secret(request, configuration['secret_key']):
#             return make_response(wrapper_error(code=drwatson_app.HTTP_FORBIDDEN_ERROR,
#                                                error="Operation not allowed",
#                                                msg="API connection rejected"))
#
#         # api_headers = get_all_api_header_parameters(request)
#         # kwargs['headers'] = api_headers
#         result = func(**kwargs)
#
#         if result.isJson:
#             return Response(unicode(result.response_content), mimetype='application/json')
#         if result.code == drwatson_app.HTTP_SUCCESS:
#             return make_response(unicode(result.response_content))
#         if result.code == drwatson_app.HTTP_FORBIDDEN_ERROR:
#             return make_response(
#                 wrapper_error(code=result.code,
#                               error="Access denied",
#                               msg="You cannot access to this resource"
#                               )
#             )
#         if result.code == drwatson_app.HTTP_SERVER_ERROR:
#             message = "Internal server error: " + str(result.response_content)
#             return make_response(wrapper_error(code=result.code,
#                                                error="Server error",
#                                                msg=message
#                                                )
#                                  )
#         message = "Internal server error: code:" + str(result.code) + ' content:' + str(result.response_content)
#         return make_response(wrapper_error(code=drwatson_app.HTTP_SERVER_ERROR,
#                                            error="Server error",
#                                            msg=message
#                                            )
#                              )
#     except Exception:
#         logger.error(traceback.format_exc())
#         abort(drwatson_app.HTTP_SERVER_ERROR, traceback.format_exc())
#
#
# ###############################################################################
# ###############################################################################
#
# def wrapper_application(func, kwargs={}):
#     try:
#         if not drwatson_app.is_core_available():
#             return _generate_response_for_satmed_core_down()
#
#         if not app_redis_session.is_valid_current_session():
#             return Response(status=drwatson_app.HTTP_FORBIDDEN_ERROR)
#
#         user_session = app_redis_session.get_current_session()
#         # deltats = request.headers.get('deltats')
#         # if deltats:
#         #     kwargs['deltats'] = deltats
#         #     logger.debug("****************************** DELTATS=[%s]" % str(deltats))
#
#         kwargs['user_session'] = user_session
#         result = func(**kwargs)
#         annotate_operation_in_history(user_session['id'], func.__name__, kwargs, result)
#
#         if result.isJson:
#             resp = Response(str(result.response_content), mimetype='application/json')
#             resp.headers['Satmed-Request-Timestamp'] = time.time()
#             return resp
#         if result.isRedirect:
#             return make_response(redirect(result.redirect_url))
#         if result.code == drwatson_app.HTTP_SUCCESS:
#             return make_response(unicode(result.response_content))
#         if result.code == drwatson_app.HTTP_FORBIDDEN_ERROR:
#             message = "You cannot access to this resource"
#             return make_response(wrapper_error(code=result.code, error="Access denied", msg=message))
#         if result.code == drwatson_app.HTTP_NOT_FOUND_ERROR:
#             return make_response(wrapper_error(code=result.code, error="Not found"))
#         if result.code == drwatson_app.HTTP_SERVICE_UNAVAILABLE:
#             message = "Application cannot operate correctly. Connection with SATMED Core System is not possible."
#             return make_response(wrapper_error(code=result.code, error="Service unavailable", msg=message))
#         if result.code == drwatson_app.HTTP_SERVER_ERROR:
#             message = "Internal server error: " + str(result.response_content)
#             return make_response(wrapper_error(code=result.code, error="Server error", msg=message))
#         if result.code == -1:
#             message = "Internal server error: " + str(result.response_content)
#             return make_response(wrapper_error(code=drwatson_app.HTTP_SERVER_ERROR, error="Server error", msg=message))
#         if result.code != 0:
#             response = "Code(" + str(result.code) + ")  Func(" + str(func.__name__) + ")"
#             return make_response(wrapper_error(code=result.code, error="Error", msg=response))
#         logger.debug("_wrapper_.response --> response_code: " + str(result.code))
#         logger.debug("_wrapper_.response --> response_content: " + str(result.response_content))
#         return make_response(result.response_content)
#     except Exception, e:
#         if app_redis_session.is_valid_current_session():
#             user_session = app_redis_session.get_current_session()
#             annotate_operation_in_history(user_session['id'], func.__name__, kwargs, None, exception=e)
#         logger.error(traceback.format_exc())
#         abort(drwatson_app.HTTP_SERVER_ERROR, traceback.format_exc())
#
#
# ###############################################################################
# ###############################################################################
#
# def wrapper_uploader(func, kwargs={}):
#     try:
#         if not drwatson_app.is_core_available():
#             return _generate_response_for_satmed_core_down()
#
#         if not app_redis_session.is_valid_current_session():
#             return Response(render_template('errorFileTemplate.html'), status=404)
#
#         user_session = app_redis_session.get_current_session()
#         kwargs['user_session'] = user_session
#         result = func(**kwargs)
#
#         if result.isFile:
#             # filename = result.file['name']
#             filebinary = result.file['data'] if 'data' in result.file else None
#             filemimetype = result.file['mimetype']
#             response = make_response(filebinary)
#             response.headers['Content-Type'] = filemimetype
#             response.headers['Content-Length'] = str(len(filebinary))
#             return response
#
#         if result.code == int(drwatson_app.HTTP_NOT_FOUND_ERROR):
#             return Response(render_template('errorFileTemplate.html'), status=404)
#         return make_response(
#             wrapper_error(code=drwatson_app.HTTP_SERVER_ERROR, error="Operation not supported", msg=''))
#     except Exception, e:
#         logger.error(traceback.format_exc())
#         abort(drwatson_app.HTTP_SERVER_ERROR, traceback.format_exc())
#
#
# ###############################################################################
# ###############################################################################
#
# def _get_history_parameters(kwargs):
#     caseid = kwargs['caseid'] if 'caseid' in kwargs else None
#
#     if 'forms' in kwargs:
#         if not caseid:
#             caseid = kwargs['forms']['caseid'] if 'caseid' in kwargs['forms'] else None
#
#     data1 = kwargs['uid'] if 'uid' in kwargs else None
#     if not data1:
#         data1 = kwargs['gid'] if 'gid' in kwargs else None
#     if not data1:
#         data1 = kwargs['fileid'] if 'fileid' in kwargs else None
#     if not data1:
#         data1 = kwargs['poolid'] if 'poolid' in kwargs else None
#     if not data1:
#         data1 = kwargs['commentid'] if 'commentid' in kwargs else None
#     data2 = None
#     return (caseid, data1, data2)
#
#
# def annotate_operation_in_history(user_id, op_name, op_args, op_result, exception=None):
#     (caseid, data1, data2) = _get_history_parameters(op_args)
#     error_codes = [drwatson_app.HTTP_FORBIDDEN_ERROR, drwatson_app.HTTP_SERVER_ERROR]
#     op_auth = False
#     if not exception:
#         op_auth = False if (op_result.code in error_codes or op_result.code != 0) and \
#                            op_result.code != drwatson_app.HTTP_SUCCESS else True
#         if op_name == 'create_case':
#             caseid = json.loads(op_result.response_content)['id']
#         if op_name == 'create_comment':
#             data1 = op_result.response_content
#     drwatson_app.annotate_history(uid=user_id,
#                                   operation=op_name,
#                                   authorized=op_auth,
#                                   case_id=caseid,
#                                   data_1=data1,
#                                   data_2=data2)

###############################################################################
###############################################################################


def _generate_error_ticket():
    return binascii.b2a_hex(os.urandom(ERROR_TICKET_LENGTH))


def wrapper_error(code=None, error="", msg=""):
    logger.error("wrapper_error.code: " + str(code))
    logger.error("wrapper_error.error: " + str(error))
    logger.error("wrapper_error.msg: " + str(msg))
    msg_error = ticket_error = None

    if configuration['log_level'] == logging.DEBUG:
        msg_error = msg

    # if code == 503:
    #     msg_error = msg if msg else "Application cannot operate correctly. Connection with SATMED Core System is not possible."

    if code == 500 or code == 503:
        ticket_error = _generate_error_ticket()
        logger.error("TICKET ERROR:" + ticket_error)

    return render_template('error.html',
                           revision=app.config['REVISION'],
                           contact_email=configuration.get('contact_email'),
                           code=code,
                           error=error,
                           msg=msg_error,
                           ticket=ticket_error), code
