import axios from 'axios';
import { message } from 'antd';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import storeConfig from '../store/storeConfig';

// To add to window  解决promise 在ie中未定义的问题
if (!window.Promise) {
	window.Promise = Promise;
}

NProgress.configure({
	minimum: 0.1,
	easing: 'ease',
	speed: 800,
	showSpinner: false
});
let needLoadingRequestCount = 0;
export function showFullScreenLoading() {
	if (needLoadingRequestCount === 0) {
		NProgress.start();
	}
	needLoadingRequestCount++;
}

export function tryHideFullScreenLoading() {
	if (needLoadingRequestCount <= 0) return;
	needLoadingRequestCount--;
	if (needLoadingRequestCount === 0) return NProgress.done();
}

axios.interceptors.request.use(
	(config) => {
		showFullScreenLoading();
		return config;
	},
	(err) => {
		return Promise.reject(err);
	}
);

// http response 拦截器
axios.interceptors.response.use(
	(response) => {
		tryHideFullScreenLoading();
		return response;
	},
	(err) => {
		tryHideFullScreenLoading();
		if (err && err.response) {
			switch (err.response.status) {
				case 400:
					err.message = '请求错误(400)';
					message.error(err.message);
					break;
				case 401:
					err.message = '未授权，请重新登录(401)';
					if (storeConfig.store.getState().updateUser.isFirstLogin) {
						break;
					} else {
						message.error(err.message);
						setTimeout(() => {
							storeConfig.store.dispatch({ type: 'DO_LOGOUT' });
						}, 3000);
						break;
					}
				case 403:
					err.message = '拒绝访问(403)';
					message.error(err.message);
					break;
				case 404:
					err.message = '请求出错(404)';
					message.error(err.message);
					break;
				case 408:
					err.message = '请求超时(408)';
					message.error(err.message);
					break;
				case 417:
					err.message = '登录用户已切换';
					message.warning(err.message);
					storeConfig.store.dispatch({
						type: 'CHANGE_UASER',
						data: err.response.data
					});
					break;
				case 500:
					err.message = '服务器错误(500)';
					if (storeConfig.store.getState().updateUser.isFirstLogin) {
						break;
					} else {
						message.error(
							err.response.data.constructor === String &&
								err.response.data !== '' &&
								err.response.data.length < 100
								? err.response.data
								: err.message
						);
						if (
							err.response.data.constructor === String &&
							err.response.data === '该租户名已存在'
						) {
							storeConfig.store.dispatch({ type: 'TENANT_EXIT' });
						}
						break;
					}
				case 501:
					err.message = '服务未实现(501)';
					message.error(err.message);
					break;
				case 502:
					err.message = '网络错误(502)';
					message.error(err.message);
					break;
				case 503:
					err.message = '服务不可用(503)';
					message.error(err.message);
					break;
				case 504:
					err.message = '网络超时(504)';
					message.error(err.message);
					break;
				case 505:
					err.message = 'HTTP版本不受支持(505)';
					message.error(err.message);
					break;
				default:
					err.message = `连接出错(${err.response.status})!`;
			}
		} else {
			err.message = '连接服务器失败!';
			// message.error(err.message);
		}
		return Promise.reject(err);
	}
);

export default axios;
