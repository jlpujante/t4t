from sqlalchemy import Column, Integer, Boolean, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
import time

Base = declarative_base()

DB_DEFAULT_LOCALE = 'en_US'

###############################################################################
###############################################################################

"""
DATABASE MODEL
"""


class Company(Base):
    __tablename__ = 'company'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String())
    creation = Column(Integer, default=int(time.time()))
    last_access = Column(Integer, default=int(time.time()), onupdate=int(time.time()))

    def to_dict(self):
        return dict(id=self.id,
                    name=self.name,
                    creation=self.creation,
                    last_access=self.last_access)


class TrackerDevice(Base):
    __tablename__ = 'tracker_device'
    id = Column(Integer, primary_key=True, autoincrement=True)
    serial = Column(String())
    version = Column(String())
    company_id = Column(Integer, ForeignKey('company.id'))
    creation = Column(Integer, default=int(time.time()))

    def to_dict(self):
        return dict(id=self.id,
                    serial=self.serial,
                    version=self.version,
                    company_id=self.company_id,
                    creation=self.creation)


class ApiClientKey(Base):
    __tablename__ = 'api_client_key'
    id = Column(Integer, primary_key=True, autoincrement=True)
    key = Column(String())
    company = Column(String())
    tracker_device_id = Column(Integer, ForeignKey('tracker_device.id'))
    creation = Column(Integer, default=int(time.time()))
    last_access = Column(Integer, default=int(time.time()), onupdate=int(time.time()))

    def to_dict(self):
        return dict(id=self.id,
                    key=self.key,
                    tracker_device_id=self.tracker_device_id,
                    creation=self.creation,
                    last_access=self.last_access)


class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    first_name = Column(String())
    last_name = Column(String())
    email = Column(String())
    locale = Column(String())
    active = Column(Boolean, default=True)
    role = Column(String(), default="normal")
    company_id = Column(Integer, ForeignKey('company.id'))

    def to_dict(self):
        return dict(id=self.id,
                    first_name=self.first_name,
                    last_name=self.last_name,
                    locale=self.locale,
                    email=self.email,
                    company_id=self.company_id,
                    active=self.active,
                    creation=self.creation,
                    last_access=self.last_access)


class SessionPasswordReset(Base):
    __tablename__ = 'session_password_reset'
    id = Column(Integer, primary_key=True, autoincrement=True)
    key = Column(String())
    user_id = Column(Integer, ForeignKey('user.id'))
    # user_id = Column(Integer)
    creation = Column(Integer, default=int(time.time()))
    last_access = Column(Integer, default=int(time.time()), onupdate=int(time.time()))

    def to_dict(self):
        return dict(id=self.id,
                    key=self.key,
                    user_id=self.user_id,
                    creation=self.creation,
                    last_access=self.last_access)


class Event(Base):
    __tablename__ = 'event'
    id = Column(Integer, primary_key=True, autoincrement=True)
    type = Column(Integer)
    user_id = Column(Integer, ForeignKey('user.id'))
    company_id = Column(Integer, ForeignKey('company.id'))
    description = Column(String())
    creation = Column(Integer, default=int(time.time()))

    def to_dict(self):
        return dict(id=self.id,
                    type=self.type,
                    description=self.description,
                    user_id=self.user_id,
                    company_id=self.company_id,
                    creation=self.creation,
                    last_access=self.last_access)


class SettingsCompany(Base):
    __tablename__ = 'settings_company'
    id = Column(Integer, primary_key=True, autoincrement=True)
    company_id = Column(Integer, ForeignKey('company.id'))
    value = Column(String())
    creation = Column(Integer, default=int(time.time()))
    last_access = Column(Integer, default=int(time.time()), onupdate=int(time.time()))

    def to_dict(self):
        return dict(id=self.id,
                    user_id=self.user_id,
                    value=self.value,
                    creation=self.creation,
                    last_access=self.last_access)


class SettingsUser(Base):
    __tablename__ = 'settings_user'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('user.id'))
    value = Column(String())
    creation = Column(Integer, default=int(time.time()))
    last_access = Column(Integer, default=int(time.time()), onupdate=int(time.time()))

    def to_dict(self):
        return dict(id=self.id,
                    user_id=self.user_id,
                    value=self.value,
                    creation=self.creation,
                    last_access=self.last_access)

# class Migration(Base):
#     __tablename__ = 'db_migration'
#     id = Column(Integer, primary_key=True, autoincrement=True)
#     migration = Column(String())
