import React from 'react';
import ReactDOM from 'react-dom';
import { isInIcestark, registerAppEnter, registerAppLeave, getMountNode } from '@ice/stark-app';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

if (isInIcestark()) {
	registerAppEnter(() => {
		ReactDOM.render(
			<React.StrictMode>
				<App />
			</React.StrictMode>, getMountNode()
		);
	});
	registerAppLeave(() => {
		ReactDOM.unmountComponentAtNode(getMountNode());
	});
} else {
	ReactDOM.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
		document.getElementById('root')
	);
}


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
