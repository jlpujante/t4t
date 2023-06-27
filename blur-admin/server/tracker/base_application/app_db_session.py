# File: app_db_session.py
# Purpose: handling session operations for the different applications
# Author: Jose Luis Pujante
# Version: 1.14, August, 2015

import logging

logger = logging.getLogger(__name__)

class SessionManager:
    '''Class to facilitate the implementation of sessions in Satmed.'''

    def __init__(self, database):
        self._db = database

    def create_session(self, keysession, ticket, user):
        '''Creates a session using the information given in the JSON object'''
        return self._db.add_session(
            key=keysession,
            user_id=user['id'],
            user_email=user['email'],
            user_info=user['firstName'] + ' ' + user['lastName'],
            user_title=user['title'],
            user_locale=user['locale'],
            user_role=user['role'],
            ticket=ticket
        )

    def destroy_session_by_key(self, keysession):
        '''Deletes a session using the key session given'''
        return self._db.delete_session_by_key(keysession)

    def destroy_session_by_ticket(self, ticket):
        '''Deletes a session using the ticket session given'''
        return self._db.delete_session_by_ticket(ticket)

    def update_last_access_session(self, keysession):
        '''Updates the session information using the key session given.
            If session does not exist, nothing happens'''
        session = self._db.get_session_by_key(keysession)
        if session and len(session) == 1:
            session = session[0]
        return self._db.update_session(
            key=session.key,
            user_id=session.user_id,
            user_email=session.user_email,
            user_info=session.user_info,
            user_title=session.user_title,
            user_locale=session.locale
        )

    def get_session_by_key(self, keysession):
        '''Returns the session information using the key session given'''
        session_userdata = self._db.get_session_by_key(keysession)
        if session_userdata:
            return session_userdata[0]

    def get_session_by_ticket(self, ticket):
        '''Returns the session information using the ticket session given'''
        session_userdata = self._db.get_session_by_ticket(ticket)
        if session_userdata:
            return session_userdata[0]
