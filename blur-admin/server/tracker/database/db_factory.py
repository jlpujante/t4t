import logging
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
from db_model import Base

logger = logging.getLogger(__name__)

DATABASE_POOL_SIZE = 2


def singleton(class_):
    instances = {}

    def get_instance(*args, **kwargs):
        if class_ not in instances:
            instances[class_] = class_(*args, **kwargs)
        return instances[class_]
    return get_instance


@singleton
class ApplicationDatabaseFactory:

    def __init__(self, configuration):
        if not configuration:
            raise Exception('No configuration found. Configuration should be set the first time that '
                            'ApplicationDatabase object is called. It is possible to create ApplicationDatabase'
                            'objects using always the configuration parameter.')
        Base.metadata.bind = self.engine = create_engine(configuration['database'], pool_size=DATABASE_POOL_SIZE)
        self._session_factory = sessionmaker(bind=self.engine, expire_on_commit=False, autocommit=False)
        # logger.debug("*****************************************************************")
        # logger.debug("dropping all tables in database. Delete for production mode")
        # logger.debug("*****************************************************************")
        # Base.metadata.drop_all(self.engine)
        # Base.metadata.create_all(self.engine)

    def get_session(self):
        return self._session_factory()
