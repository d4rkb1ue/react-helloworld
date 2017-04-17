import React from 'react';
import ReactDOM from 'react-dom';
// moment for antd
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import DatePicker from 'antd/lib/date-picker';
import 'antd/lib/date-picker/style/css';
import './style.css';

function disabledDate(current) {
  // can not select days before today and after 2017-08-31
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