import React, { Component } from 'react';
import { connect } from 'dva';


import Form from "jw-form/dist/mobile";
import { DatePicker, List } from 'jw-components-mobile';
import { openWebView, getDict, DataLength } from '../../constants';
import { AlertBase, ConfirmBase, AlertInfoBase } from '../../components/Common/EpsModal';
class MaintenanceConfirmDevice extends Component {
	FormChange(values, schema) {
		console.log("values:", values, "FormChange:", schema);
	}
	onChange(data) {
		let self = this;
		let index = this.props.index;
		this.props.changeData(index, {
			aboveMaintenanceTime: data.format('YYYY-MM-DD')
		})
	}
	NameInfo(name, length) {
		AlertInfoBase({
			text: name,
		});
	}
	turnMoney(data) {
		return Number(data).formatMoney(2, '', '')
	}
	render() {
		let self = this;
		let data = this.props.data;
		let isConfirm = this.props.isConfirm;
		console.log('wwrr', data)
		let showAllData = this.props.showAllData;
		let showMoreBtn = data['showMoreBtn'];
		let time = data["aboveMaintenanceTime"];
		let modelType = self.props.modelType;
		return (<div className="maintenance-device animated zoomIn">
			<div className="maintenance-device-c">
				<div className="maintenance-device-title">
					<i></i>
					<span className="">{modelType == 'equipment' ? '设备' : '工程'}明细</span>
				</div>
				<div className="maintenance-device-info">
					<div className="maintenance-device-info-i">
						<div className="maintenance-device-info-i-l">
							<div className="maintenance-device-info-i-l-label more">{modelType == 'equipment' ? '设备' : '工程'}名称</div>
							<div className="maintenance-device-info-i-l-val ellipsis" onClick={() => self.NameInfo(data["equipmentName"])}>{data["equipmentName"]}</div>
						</div>
						<div className="maintenance-device-info-i-r">
							<div className="maintenance-device-info-i-l-label more">保养计划时间</div>
							<div className="maintenance-device-info-i-l-val ellipsis">{data["maintenancePlanningTime"] || '-'}</div>
						</div>
					</div>
					{/* 4月28号 */}
					{/* <div className="maintenance-device-info-i">
						<div className="maintenance-device-info-i-l">
							<div className="maintenance-device-info-i-l-label more">配件费用</div>
							<div className="maintenance-device-info-i-l-val ellipsis">{Number(data['accessoriesCost']).formatMoney(2,'','')|| '-'}</div>
						</div>
						<div className="maintenance-device-info-i-r">
							<div className="maintenance-device-info-i-l-label more">人工费用</div>
							<div className="maintenance-device-info-i-l-val ellipsis">{Number(data['labourCost']).formatMoney(2,'','')|| '-'}</div>
						</div>
					</div> */}
					<div className="maintenance-device-info-i">
						<div className="maintenance-device-info-i-l">
							<div className="maintenance-device-info-i-l-label more">价税合计</div>
							{/* <div className="maintenance-device-info-i-l-label more">保养费用</div> */}
							<div className="maintenance-device-info-i-l-val ellipsis">{Number(data['sumCost']).formatMoney(2, '', '') || '-'}</div>
						</div>
						<div className="maintenance-device-info-i-r">
							<div className="maintenance-device-info-i-l-label more">上门保养日期</div>
							<div className={'maintenance-device-info-i-l-val ellipsis ' + (!isConfirm ? '' : 'line-bottom')}>
								{/* <div className={'maintenance-device-info-i-l-val ellipsis ' + (isAssess ? '' : 'line-bottom')}> */}
								{
									!isConfirm ? (time ? moment(time).format('YYYY-MM-DD') : '-') : (time ? <DatePicker value={moment(time)} minDate={moment(Date.parse(new Date()) + 86400000)} mode="date" format={val => val.format('YYYY-MM-DD')} onChange={(e) => this.onChange(e)}>
										{/* this.props.isAssess ? (time ? moment(time).format('YYYY-MM-DD') : '-') : (time ? <DatePicker value={moment(time)} minDate={moment(Date.parse(new Date()) + 86400000)} mode="date" format={val => val.format('YYYY-MM-DD')} onChange={(e) => this.onChange(e)}> */}
										{/* this.props.disabledAbovetime ? (time ? moment(time).format('YYYY-MM-DD') : '-') : (time ? <DatePicker value={moment(time)} minDate={moment(Date.parse(new Date()) + 86400000)} mode="date" format={val => val.format('YYYY-MM-DD')} onChange={(e) => this.onChange(e)}> */}
										<List.Item arrow="horizontal"></List.Item>
									</DatePicker> : '-')
								}
							</div>
						</div>
					</div>
					<div className="maintenance-device-info-i">
						<div className="maintenance-device-info-i-l">
							<div className="maintenance-device-info-i-l-label more">联系人</div>
							<div className="maintenance-device-info-i-l-val ellipsis" onClick={() => self.NameInfo(data["contactsMans"])}>{data["contactsMans"] || '-'}</div>
						</div>
						<div className="maintenance-device-info-i-r">
							<div className="maintenance-device-info-i-l-label more">联系方式</div>
							<div className="maintenance-device-info-i-l-val ellipsis">{
								data["tel"] ? <a href={'tel:' + data["tel"]} className="phone-number">{data["tel"]}</a> : '-'
							}</div>
						</div>
					</div>
				</div>
				{
					(showMoreBtn ? <div className="maintenance-device-btn border-line-h before specail-color" onClick={(e) => this.props.openView(e)}>
						<span>查看更多设备明细</span>
					</div> : '')
				}
			</div>
		</div>)
	}
	openWebView(data) {
		var url = EpsWebRoot + '/#' + data;
		jw.pushWebView(url);
	}
};

export default connect((state) => { return state })(MaintenanceConfirmDevice);
