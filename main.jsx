import React from 'react';
import ReactDOM from 'react-dom';
// moment for antd
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import { DatePicker } from 'antd';
import 'antd/dist/antd.css';
import './style.css';

function disabledDate(current) {
  // can not select days before today and after 2017-08-31
  // if (!current) return true
  // if (current.valueOf() < new Date( Date.now() - 24*60*60*1000 )) return true;
  // if (current.valueOf() > new Date(2017, 8, 1)) return true; // 2017, 8, 1 === 2017.09.01
  return current && !(current.valueOf() > new Date( Date.now() - 24*60*60*1000 ) && current.valueOf() < new Date(2017, 8, 1));
}
function getWelcomeString() {
	var currentHour = new Date().getHours();
	var m = new Map([[6, '凌晨'], [9, '早上'], [12, '上午'], [18, '下午'], [25, '晚上']]);
	for (var v of m){
		if (currentHour < v[0]) return v[1] + '好！';
	}
}

ReactDOM.render(
	<h1>{getWelcomeString()}</h1>,
	document.querySelector('#main')
	);

ReactDOM.render(
	<DatePicker
	defaultValue={moment()}
	disabledDate={disabledDate}
	/>,
	document.querySelector('#antd')
	);