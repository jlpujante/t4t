import logging
import time
from sqlalchemy.sql import func
from sqlalchemy import cast
from db_model import *

logger = logging.getLogger(__name__)

###############################################################################
###############################################################################

class DrHouseDbSession:
    '''Class to facilitate the connections between the web applications
        and the database. This class used a pool of sessions to manage the
        operations.'''
    def __init__(self, session):
        self.session = session

    def __enter__(self):
        return self

    def __exit__(self, type, value, traceback):
        if type is None:
            self.session.commit()
        else:
            logger.error(traceback)
            self.session.rollback()

        self.session.close()
        if not type is None:
            raise value

################################################################################

    def add(self, obj):
        '''Adds a general object in the database (SQL INSERT)'''
        self.session.add(obj)
        self.session.flush()
        self.session.refresh(obj)
        key = obj.id
        logger.debug("object (" + str(key) + ") added to database")
        return key

################################################################################

    def delete(self, obj, field, field_value):
        '''Deletes a general object in the database (SQL DELETE)'''
        obj_found = self.session.query(obj).filter(field == field_value).first()
        if obj_found:
            logger.debug("Deleting obj:" + str(obj_found))
            self.session.query(obj).filter(field == field_value).delete()

################################################################################

    # def delete_cloud_file_by_key(self, file_key):
    #     file = self.session.query(File).filter(File.key_name == file_key).first()
    #     file_id = file.id
    #     return self.delete_cloud_file(file_id)

    #Internal functions
    def get(self, obj, field, field_value, order_field=None, order_type=None):
        '''Returns a object from the database (SQL SELECT).
            Details:
                obj: object defined in the database model
                field: object attribute used to find the elements required
                field_value: object attribute value to ckeck
                order_field: object attribute to order the output
                order_type: object attribute value to order the output
        '''
        return self._get_and_fields(obj, field, field_value, None, None, order_field, order_type)

    def _get_and_fields(self, obj, field_1, value_1, field_2, value_2, order_field=None, order_type=None):
        '''Returns a object from the database (SQL SELECT) checking two attributes.
            Details:
                obj: object defined in the database model
                field_1: object attribute used to find the elements required
                field_value_1: object attribute value to ckeck
                field_2: object attribute used to find the elements required
                field_value_2: object attribute value to ckeck
                order_field: object attribute to order the output
                order_type: object attribute value to order the output
        '''
        sql_obj = self.session.query(obj).filter(and_(field_1 == value_1, field_2 == value_2))
        if order_field:
            if order_type and order_type == ORDER_DESC:
                return self._get_query(sql_obj.order_by(order_field.desc()).subquery(), field=None, order_type=None)
            return self._get_query(sq = sql_obj.order_by(order_field).subquery(), field=None, order_type=None)
        return self._get_query(sql_obj.subquery(), field=None, order_type=None)

    def _get_query(self, query, field, order_type):
        '''Runs a query object in the database and returns the result'''
        if order_type:
            if order_type and order_type == ORDER_DESC:
                return self.session.query(query).order_by(field.desc()).all()
            return self.session.query(query).order_by(field).all()
        return self.session.query(query).all()

################################################################################
################################################################################

    # def get_pool_file_by_id(self, idkey):
    #     '''Returns a temporary file stored in the cloud using the id given'''
    #     return self.get(Pool, Pool.id, idkey)
