/* config-overrides.js */
const path = require('path');
const { override, addWebpackExternals, addWebpackAlias, addLessLoader } = require('customize-cra');

module.exports = override(
	addWebpackExternals({
		React: 'React'
	}),
	addLessLoader({
		lessOptions: {
			modifyVars: {
				// 'primary-color': '#fff'
			},
			javascriptEnabled: true
		}
	}),
	addWebpackAlias({
		'@': path.resolve(__dirname, 'src')
	})
);
