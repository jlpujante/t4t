# File: app_redis_session.py
# Purpose: handling Redis sessions in flask application
# Author: jose.luis.pujante@ses.com
# Version: 1.0, July, 2016

import redis, json, time, binascii, os
import logging
from flask import session

logger = logging.getLogger(__name__)

SESSION_REDIS_KEY = "user"
SESSION_REDIS_TICKET = "ticket"
SESSION_REDIS_CREATION = "creation"
SESSION_REDIS_LAST_ACCESS = "last_access"
SESSION_REDIS_KEYSESSION = "keysession"


class ApplicationRedisSession:
    def __init__(self, configuration, prefix="session:", redis_key=None, redis_ticket=None):
        self._session_redis_key = redis_key or SESSION_REDIS_KEY
        self._session_redis_ticket = redis_ticket or SESSION_REDIS_TICKET
        self._pool = RedisPool(configuration)
        self._prefix = prefix

    def get_current_session(self):
        s = session.get(self._session_redis_key, None)
        logger.debug('Obtaining current session [%s]' % self._session_redis_key)
        if not s:
            logger.debug('No session found for current user')
            return None

        try:
            ret = json.loads(s)
        except:
            logger.warning('Error loading session, no valid session')
            return None

        if 'id' not in ret:
            logger.debug('Current session is not valid (no ID found)')
            return None

        user_email = ret.get('email', None)
        logger.debug('Updating last access for: [%s]' % user_email)
        session[SESSION_REDIS_LAST_ACCESS] = int(time.time())
        return ret

    def get_current_session_user_id(self):
        s = self.get_current_session()
        return s and s['id']

    def get_current_session_ticket(self):
        return session.get(self._session_redis_ticket, None)

    def is_valid_current_session(self):
        return self.get_current_session() is not None

    def create_new_session(self, user, ticket):
        u = json.loads(user)
        u[SESSION_REDIS_KEYSESSION] = str(binascii.b2a_hex(os.urandom(15)))
        session[self._session_redis_key] = json.dumps(u)
        session[self._session_redis_ticket] = ticket
        session[SESSION_REDIS_CREATION] = session[SESSION_REDIS_LAST_ACCESS] = int(time.time())
        logger.debug("Created new session [%s][%s]" % (session.get(self._session_redis_key), self._session_redis_key))
        # session["permanent"] = True
        return True

    def destroy_current_session(self):
        logger.debug("Destroying current session")
        current_user = session.get(self._session_redis_key, None)
        if current_user:
            session.pop(current_user, None)
        ticket = session.get(self._session_redis_ticket, None)
        if ticket:
            session.pop(ticket, None)
        session.clear()

    def destroy_session_by_ticket(self, ticket):
        logger.debug("Destroying current session by ticket %s" % ticket)
        c = self._pool.get_connection()
        s = c.get_session_by_ticket(self._prefix, ticket)
        if s:
            logger.info("ApplicationRedisSession - Removing session [%s] with ticket [%s]" % (s, ticket))
            c.delete_session_by_key(s)
            return True
        logger.info("ApplicationRedisSession - Session with ticket not found [%s]. Nothing to do" % (ticket))
        return False


class RedisPool:
    def __init__(self, configuration):
        self.pool = redis.ConnectionPool(host=configuration.get('REDIS_HOST', 'localhost'),
                                         port=int(configuration.get('REDIS_PORT', 6379)),
                                         db=int(configuration.get('REDIS_DB', 0)))

    def get_connection(self):
        return RedisSessionConnection(self.pool)


class RedisSessionConnection:
    """Redis implementation. It stores:
            [PREFIX]SESSION_KEY   -> {USER_INFORMATION, TICKET}
    """

    def __init__(self, pool):
        self.r = redis.StrictRedis(connection_pool=pool)

    def get_session_by_ticket(self, prefix, ticket):
        """Returns the session associated to the given ticket"""
        try:
            keys = self.r.keys("%s*" % (prefix))
            for i in range(len(keys)):
                v = self.r.get(keys[i])
                if v.find(ticket) != -1:
                    return keys[i]
        except:
            return None

    def delete_session_by_key(self, key):
        """Deletes the session from database"""
        if self.r.get(key):
            self.r.delete(key)
