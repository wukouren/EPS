import React, { Component } from 'react';
import { connect } from 'dva';


import Form from "jw-form/dist/mobile";
import { DatePicker, List } from 'jw-components-mobile';
import { openWebView, getDict, DataLength } from '../../constants';
import { AlertBase, ConfirmBase, AlertInfoBase } from '../../components/Common/EpsModal';
class MaintenanceConfirmDeviceDetail extends Component {
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
		let showAllData = this.props.showAllData;
		let showMoreBtn = data['showMoreBtn'];
		let time = data["aboveMaintenanceTime"];
		let modelType = self.props.modelType;
		let isConfirm = self.props.isConfirm;
		console.log('modelType', modelType);
		return (<div className="maintenance-device animated zoomIn">
			<div className="maintenance-device-c">
				<div className="maintenance-device-title">
					<i></i>
					<span className="">{modelType == 'equipment' ? '设备' : '工程'}明细</span>
				</div>
				<div className="maintenance-device-info">
					<div className="maintenance-device-info-i">
						<div className="maintenance-device-info-i-l width-max">
							<div className="maintenance-device-info-i-l-label more">{modelType == 'equipment' ? '设备' : '工程'}名称</div>
							<div className="maintenance-device-info-i-l-val ellipsis" onClick={() => self.NameInfo(data["equipmentName"])}>{data["equipmentName"]}</div>
						</div>
						<div className="maintenance-device-info-i-r width-max">
							<div className="maintenance-device-info-i-l-label more" >保养计划时间</div>
							<div className="maintenance-device-info-i-l-val ellipsis" >{data["maintenancePlanningTime"] || '-'}</div>
						</div>
					</div>
					<div className="maintenance-device-info-i">
						<div className="maintenance-device-info-i-l width-max">
							<div className="maintenance-device-info-i-l-label more">保养{modelType == 'equipment' ? '配件' : '材料'}费(不含税)</div>
							{/* <div className="maintenance-device-info-i-l-label more">配件费用</div> */}
							<div className="maintenance-device-info-i-l-val ellipsis" >{data['accessoriesCostNotax'] ? Number(data['accessoriesCostNotax']).formatMoney(2, '', '') : '-'}</div>
						</div>
						<div className="maintenance-device-info-i-r width-max">
							<div className="maintenance-device-info-i-l-label more">{modelType == 'equipment' ? '配件' : '材料'}费税率</div>
							<div className="maintenance-device-info-i-l-val ellipsis">{data['accessoriesTax'] || '-'}</div>
						</div>
						{/* <div className="maintenance-device-info-i-r">
							<div className="maintenance-device-info-i-l-label more">人工费用</div>
							<div className="maintenance-device-info-i-l-val ellipsis">{Number(data['labourCost']).formatMoney(2,'','')|| '-'}</div>
						</div> */}
					</div>
					<div className="maintenance-device-info-i">
						<div className="maintenance-device-info-i-l width-max">
							<div className="maintenance-device-info-i-l-label more">保养人工费(不含税)</div>
							<div className="maintenance-device-info-i-l-val ellipsis" onClick={() => self.NameInfo(Number(data['labourCostNotax']).formatMoney(2, '', ''))}>{data['labourCostNotax'] ? Number(data['labourCostNotax']).formatMoney(2, '', '') : '-'}</div>
						</div>
						<div className="maintenance-device-info-i-r width-max">
							<div className="maintenance-device-info-i-l-label more">人工费税率</div>
							{/* <div className="maintenance-device-info-i-l-label more">保养费用</div> */}
							<div className="maintenance-device-info-i-l-val ellipsis">{data['labourTax'] || '-'}</div>
						</div>
						{/* <div className="maintenance-device-info-i-r">
							<div className="maintenance-device-info-i-l-label more">上门保养日期</div>
							<div className="maintenance-device-info-i-l-val ellipsis">
								{
									this.props.disabledAbovetime?(time?moment(time).format('YYYY-MM-DD'):'-'):(time?<DatePicker value ={moment(time)} minDate={moment(Date.parse(new Date())+86400000)} mode="date" format={val => val.format('YYYY-MM-DD')} onChange={(e)=>this.onChange(e)}>
				          <List.Item arrow="horizontal"></List.Item>
				        </DatePicker>:'-')
								}
							</div>
						</div> */}
					</div>
					<div className="maintenance-device-info-i">
						<div className="maintenance-device-info-i-l width-max">
							<div className="maintenance-device-info-i-l-label more">{modelType == 'equipment' ? '设备' : '工程'}税金</div>
							<div className="maintenance-device-info-i-l-val ellipsis">{data['accessoriesTaxMoney'] ? Number(data['accessoriesTaxMoney']).formatMoney(2, '', '') : '-'}</div>
						</div>
						<div className="maintenance-device-info-i-r width-max">
							<div className="maintenance-device-info-i-l-label more">人工税金</div>
							<div className="maintenance-device-info-i-l-val ellipsis">{data['labourTaxMoney'] ? Number(data['labourTaxMoney']).formatMoney(2, '', '') : '-'}</div>
						</div>
					</div>
					<div className="maintenance-device-info-i">
						<div className="maintenance-device-info-i-l">
							<div className="maintenance-device-info-i-l-label more">价税合计</div>
							<div className="maintenance-device-info-i-l-val ellipsis">{data['sumCost'] ? Number(data['sumCost']).formatMoney(2, '', '') : '-'}</div>
						</div>
						<div className="maintenance-device-info-i-r">
							<div className="maintenance-device-info-i-l-label more">上门保养日期</div>
							<div className={"maintenance-device-info-i-l-val ellipsis " + (!isConfirm ? '' : 'line-bottom')}>
								{
									!isConfirm ? (time ? moment(time).format('YYYY-MM-DD') : '-') : (time ? <DatePicker value={moment(time)} minDate={moment(Date.parse(new Date()) + 86400000)} mode="date" format={val => val.format('YYYY-MM-DD')} onChange={(e) => this.onChange(e)}>
										<List.Item arrow="horizontal"></List.Item>
									</DatePicker> : '-')
								}
							</div>
						</div>
					</div>
					<div className="maintenance-device-info-i">
						<div className="maintenance-device-info-i-l">
							<div className="maintenance-device-info-i-l-label more">联系人</div>
							<div className="maintenance-device-info-i-l-val ellipsis">{data["contactsMans"] || '-'}</div>
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

export default connect((state) => { return state })(MaintenanceConfirmDeviceDetail);
