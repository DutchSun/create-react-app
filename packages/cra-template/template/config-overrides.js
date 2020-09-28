/* config-overrides.js */
module.exports = function override(config) {
	config.resolve.alias = {
		...config.resolve.alias,
		'@': path.resolve(__dirname, 'src')
	}
	return config;
}
