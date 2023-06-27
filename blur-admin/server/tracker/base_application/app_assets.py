import json
import logging
import os
# from flask_assets import Environment, Bundle

logger = logging.getLogger(__name__)

BUNDLE_SUBPATH = 'public/bundle.result.json'


class AppAssets:
    def __init__(self, application_root_path):
        self.assets = None
        self.path = application_root_path
        self._bundles = dict()

    def get_assets(self):
        return self.assets

    def get_bundles(self):
        assets_file = os.path.join(self.path, BUNDLE_SUBPATH)
        # self.assets = Environment(application)
        # self.assets.url = ''
        # self.assets.directory = 'public'
        # self.assets.debug = False
        # self.assets.auto_build = False
        # self.assets.url_expire = False
        # self.assets.versions = False
        # self.assets.manifest = False
        # self.assets.cache = False
        if os.path.exists(assets_file):
            logger.debug("Opening assets file: %s" % (assets_file))
            try:
                with open(assets_file) as f:
                    self._bundles = json.load(f)
            except:
                logger.error("Error loading bundles file: %s" % (assets_file))
                self._bundles = dict()

            for bk in self._bundles.keys():
                logger.info("Bundle loaded: [%s]" % str(bk))
                for k in self._bundles[bk]:
                    logger.info("   Asset loaded: [%s]=[%s]" % (str(k), str(self._bundles[bk][k])))
        return self._bundles

        # try:
        #     with open(assets_file) as f:
        #         for key, value in json.loads(f.read()).items():
        #             logger.debug("Asset key (%s)  value (%s)" % (key, value))
        #             self.assets.register(key, Bundle(output=value))
        #     return self.assets
        # except IOError, e:
        #     logger.warning(e)
        #     logger.warning("Assets could not be loaded!")
        #     pass
