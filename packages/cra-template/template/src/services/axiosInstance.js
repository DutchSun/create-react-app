import axios from 'axios';
import { message } from 'antd';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import errorCode from './errorCode';

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

axios.interceptors.request.use(
	(config) => {
		NProgress.start();
		return config;
	},
	(err) => {
		NProgress.done();
		return Promise.reject(err);
	}
);

// http response 拦截器
axios.interceptors.response.use(
	(response) => {
		NProgress.done();
		return response;
	},
	(err) => {
		NProgress.done();
		if (err && err.response) {
			err.message =
				errorCode[err.response.status] ||
				`${err.response.data}(${err.response.status})`;
		} else {
			err.message = '连接服务器失败!';
		}
		message.error(err.message);
		return Promise.reject(err);
	}
);

export default axios;
