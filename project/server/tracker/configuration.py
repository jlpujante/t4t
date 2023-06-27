# File: conf.py
# Purpose: handling config file for the different applications
# Author: LuisM Pena
# Modified by: Jose Luis Pujante
# Version: 1.11, November, 2016
import json
import coloredlogs
import logging
import logging.handlers
import os
import sys

coloredlogs.install()

class Configuration:
    def __init__(self, config_file_relative_path, config_min_parameter=None, log_packages=None):
        self.log_packages = log_packages or [""]
        self.configuration = self._init(
            os.path.abspath(config_file_relative_path),
            config_min_parameter or [])

    def get_configuration(self):
        return self.configuration

    def _get_configuration(self, confFile, read=None):
        if not read:
            read = [confFile]
        else:
            read.append(confFile)
        try:
            with open(confFile) as f:
                configuration = json.load(f)
        except:
            return None

        priorityConfFile = configuration.get('server_config_file')
        if priorityConfFile and priorityConfFile not in read:
            recursive = self._get_configuration(priorityConfFile, read)
            if not recursive:
                raise Exception('Configuration file (%s) not available / readable' % priorityConfFile)
            return recursive

        return confFile, configuration

    def _get_logging_level(self, config):
        level = config.get('log_level', 'info').lower()
        return dict(
            info=logging.INFO,
            debug=logging.DEBUG,
            error=logging.ERROR,
            warning=logging.WARNING
        ).get(level, logging.INFO)

    def _set_default_config(self, config):
        if not 'log_level' in config:
            config['log_level'] = 'info'
        return config

    def _init(self, confFile, confParameter):
        read = self._get_configuration(confFile)
        if not read:
            raise Exception('Configuration file (%s) not available / readable' % confFile)

        confFile, configuration = read
        conf_dir = os.path.dirname(confFile)

        for each in confParameter:
            if not each in configuration:
                raise Exception('Configuration %s does not define parameter %s' % (confFile, each))

        configuration = self._set_default_config(configuration)
        configuration['server_config_file'] = confFile

        log_level = self._get_logging_level(configuration)
        log_file = configuration.get('log_file')
        if log_file:
            log_path = os.path.abspath(os.path.join(conf_dir, log_file))
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
        for name in existing_loggers:
            logger.debug('Logger already existing, no valid log level for it: %s' % name)

        logger.info('Configuration file loaded: %s' % (json.dumps(configuration, sort_keys=True)))

        return configuration
