/* config-overrides.js */
const path = require('path');
const { override, addWebpackExternals, addWebpackAlias, addLessLoader, overrideDevServer } = require('customize-cra');

// 本地开发时允许主框架跨域访问
const allowCORS = () => config => {
	// Default config: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpackDevServer.config.js
	config.headers = { 'Access-Control-Allow-Origin': '*' };
	return config
}

module.exports = {
	webpack: override(
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
	),
	devServer: overrideDevServer(
		allowCORS()
	)
}
