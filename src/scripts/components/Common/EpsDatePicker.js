/**
 * eps专用时间选择器
 * 12小时制，只到半点(0分和30分)
 */
import React, { Component } from 'react';
import { DatePicker } from 'jw-components-mobile';

const zhNow = moment().locale('zh-cn').utcOffset(8);
const dateFormat = 'YYYY-MM-DD HH:mm';
class EpsDatePicker extends Component {
	constructor(props) {
		super(props);
	}
	state = {
    date: zhNow,
    dpValue: null,
    visible: false,
  }
	CustomChildren(props) {
	  return (<div
	    onClick={props.onClick}
	    style={{ }}
	  >
	    {props.children}
	    <span style={{ float: 'right', color: '#666666' }}>{props.extra}</span>
	  </div>);
	}
 	setDate(value){
		this.props.dateChange(Date.parse(new Date(value._d))/1000);
	}
	VisibleChange(){
		// setTimeout(function(){
		// 	$('.am-picker .am-picker-item').eq(2).addClass('hide')
		// },0)
	}
	render(){	
		let disabled = this.props.disabled == true ? 'disabled' : '';
		let next_day = moment(Date.parse(new Date())+86400000).format('YYYY/MM/DD HH:00');
    let presentDate= (Date.parse(new Date(next_day))-68400000);
		if(this.props.disabled == true){
			return (
				<div className="eps-datepicker disabled">
					<DatePicker
	          mode="datetime"
	          title=""
	         	disabled
	          value={moment(this.props.value*1000)}
	          onChange={v => this.setState({ dpValue: v })}
	          onVisibleChange={v => this.VisibleChange()}
	        >
	          <this.CustomChildren><label className="eps-dp-label">预约</label></this.CustomChildren>
	        </DatePicker>
				</div>
			);
		}else{
			return (
				<div className="eps-datepicker">
					<DatePicker
	          mode="datetime"
	          title=""
	          value={moment(this.props.value*1000)}
	          minDate={moment(presentDate)}
	          onChange={(value) => this.setDate(value)}
	          onVisibleChange={v => this.VisibleChange()}
	          minuteStep={30}
	        >
	          <this.CustomChildren><label className="eps-dp-label">预约</label></this.CustomChildren>
	        </DatePicker>
				</div>
			);
		}
		
	}
}

export default EpsDatePicker;
