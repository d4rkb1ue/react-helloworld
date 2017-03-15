import React from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';

ReactDOM.render(
	<h1>Hello, world!</h1>,
	document.querySelector('#main')
);

ReactDOM.render(
	<DatePicker />,
	document.querySelector('#antd')
);