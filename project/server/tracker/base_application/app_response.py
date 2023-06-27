# File: app_response.py
# Purpose: Object to encapsulate the responses returned by the applications
# Author: jose.luis.pujante@ses.com
# Version: 1.1, May, 2015

import json

class AppResponse:

    def __init__(self, code=0, redirectUrl=None, responseContent=None, fileInfo=None):
        self.code = code
        self.response_content = responseContent
        self.isJson = self._is_json(responseContent)
        self.redirect_url = redirectUrl
        self.isRedirect = False if redirectUrl is None else True
        self.isFile = False if fileInfo is None else True
        if self.isFile and not isinstance(fileInfo, dict):
            self.isFile = False
        else:
            self.file = fileInfo

    def _is_json(self, content):
        if not content or not isinstance(content, str):
            return False
        try:
            json.loads(content)
        except Exception:
            return False
        return True
