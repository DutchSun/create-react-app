/* config-overrides.js */
const path = require('path');
const { override, addWebpackExternals, addWebpackAlias } = require('customize-cra');

module.exports = override(
	addWebpackExternals({
		React: 'React'
	}),
	addWebpackAlias({
		'@': path.resolve(__dirname, 'src')
	})
);
