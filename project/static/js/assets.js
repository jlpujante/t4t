function get_asset(name) {
	if (typeof(ASSETS_INFO) !== 'undefined') {
		var ret = ASSETS_INFO[name];
		if (ret) return ret;
		console.log('Invalid asset: ' + name);
	}
	return name;
};

