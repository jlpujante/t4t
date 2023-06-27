import logging
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from db_model import Base
import db_implementation

logger = logging.getLogger(__name__)

DATABASE_POOL_SIZE = 2


class ApplicationDatabase:
    def __init__(self, configuration):
        Base.metadata.bind = self.engine = create_engine(configuration['database'], pool_size=DATABASE_POOL_SIZE)
        self._session_factory = sessionmaker(bind=self.engine, expire_on_commit=False, autocommit=False)
        # logger.debug("*****************************************************************")
        # logger.debug("dropping all tables in database. Delete for production mode")
        # logger.debug("*****************************************************************")
        # Base.metadata.drop_all(self.engine)
        # Base.metadata.create_all(self.engine)

    def _create_session(self):
        return db_implementation.DrHouseDbSession(self._session_factory())

    ###############################################################################
    ###############################################################################

    # def get_user(self, uid, order_type=ORDER_ASC):
    #     with self._create_session() as session:
    #         return session.get_all_user_files(uid=uid, order_type=order_type)
