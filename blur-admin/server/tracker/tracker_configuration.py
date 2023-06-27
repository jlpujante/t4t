import os
from .configuration import Configuration

CONFIGURATION_FILE = 'tracker.json'
config_path = os.path.join(os.path.dirname(__file__), os.pardir, os.pardir, 'configs', CONFIGURATION_FILE)
config_parameters_to_check = ['database']
log_packages = ["server", "tracker", "auth", "views", "api_"]
configuration = Configuration(config_path, config_parameters_to_check, log_packages).get_configuration()

