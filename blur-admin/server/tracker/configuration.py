# File: conf.py
# Purpose: handling config file for the different applications
# Authors: LuisM Pena, JL Pujante
# Version: 23th January 2017

import json
# import coloredlogs
import logging
import logging.handlers
import os
import sys


class Configuration:
    def __init__(self, config_file_relative_path, required_conf_definitions=None, log_packages=None):
        self.log_packages = log_packages or [""]
        self.conf_error = None
        self.configuration = self._init(
            os.path.abspath(config_file_relative_path),
            required_conf_definitions or [])

    def get_configuration(self):
        return self.configuration

    def _read_configuration_file(self, conf_file, read_files):
        try:
            with open(conf_file) as f:
                configuration = json.load(f)
        except IOError:
            if not read_files:
                raise
            self.conf_error = 'Configuration file (%s) not available / readable' % conf_file
            return None

        read_files.append(conf_file)
        ref_conf_file = configuration.get('server_config_file')
        if ref_conf_file and ref_conf_file not in read_files:
            recursive = self._read_configuration_file(ref_conf_file, read_files)
        else:
            recursive = None

        return recursive or (conf_file, configuration)

    def _init(self, conf_file, required_conf_definitions):
        conf_file, configuration_read = self._read_configuration_file(conf_file, [])

        configuration = configuration_read
        if 'environment' in configuration_read:
            configuration = configuration.get(configuration.get('environment'))

        for each in required_conf_definitions:
            if each not in configuration:
                raise Exception('Configuration %s does not define parameter %s' % (conf_file, each))

        log_level = dict(
            info=logging.INFO,
            debug=logging.DEBUG,
            error=logging.ERROR,
            warning=logging.WARNING
        ).get(configuration.get('log_level', '').lower(), logging.INFO)

        configuration['server_config_file'] = conf_file
        configuration['log_level'] = log_level
        log_file = configuration.get('log_file')
        if log_file:
            log_path = os.path.abspath(os.path.join(os.path.dirname(conf_file), log_file))
            log_handler = logging.handlers.TimedRotatingFileHandler(log_path, when='midnight')
            log_handler.setFormatter(logging.Formatter('[%(asctime)-15s] %(levelname)s-%(message)s'))
        else:
            log_handler = logging.StreamHandler(stream=sys.stdout)
            log_handler.setFormatter(logging.Formatter('******** [%(asctime)-15s] %(levelname)s-%(message)s'))

        existing_loggers = logging.Logger.manager.loggerDict.keys()

        def new_get_logger(name):
            ret = get_logger(name)
            for each in self.log_packages:
                if name.startswith(each):
                    print "Setting Logger [%s] with log level [%s]" % (name, str(log_level))
                    ret.setLevel(log_level)
                    ret.addHandler(log_handler)
                    break
                else:
                    print "Logger [%s] with default log level" % name
            return ret

        get_logger = logging.getLogger
        logging.getLogger = new_get_logger
        logger = logging.getLogger(__name__)
        for each in existing_loggers:
            logger.debug('Logger already existing, no valid log level for it: %s' % each)

        if self.conf_error:
            logger.warn(self.conf_error)
            del self.conf_error

        logger.debug('--------> Configuration file loaded: %s' % conf_file)
        logger.debug('Environment: %s' % configuration_read.get('environment'))
        logger.info('Configuration file loaded: %s' % (json.dumps(configuration, sort_keys=True)))
        return configuration
