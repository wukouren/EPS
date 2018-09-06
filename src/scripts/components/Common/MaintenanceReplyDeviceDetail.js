import React, { Component } from 'react';
import { connect } from 'dva';
import Form from "jw-form/dist/mobile";
import { getDict } from '../../constants';
let fittingOperation = getDict('fittingOperation');
let taxlist = getDict('taxlist');

class MaintenanceReplyDeviceDetail extends Component {
	FormChange(values, schema) {
		console.log("values:", values, "FormChange:", schema);
	}
	changeData(data) {
	}
	render() {
		let self = this;
		let data = this.props.data;
		console.log(data, '这个里面有啥值呢', taxlist);
		let isProject = /project/.test(location.href);
		let dispatch = this.props.dispatch;
		let index = this.props.index;
		// let labourTax = _.findWhere(taxlist, { label: data["labourTax"] });
		// let labourNum = data['labourCostNotax'] * parseInt(labourTax["label"]) / 100;
		// labourTax = labourTax ? labourTax['value'] : '-1';
		let labourTax = _.findWhere(taxlist, { label: data["labourTaxNew"] });
		let labourNum = labourTax ? data['labourCostNotax'] * parseInt(labourTax["label"]) / 100 : 0;
		labourTax = labourTax ? labourTax['value'] : '-1';
		// let accessoriesTax = _.findWhere(taxlist, { label: data["accessoriesTax"] });
		// let accessNum = data['accessoriesCostNotax'] * parseInt(accessoriesTax["label"]) / 100;
		// accessoriesTax = accessoriesTax ? accessoriesTax['value'] : '-1';
		let accessoriesTax = _.findWhere(taxlist, { label: data["accessoriesTaxNew"] });
		// console.log('22-=-=', labourTax, accessoriesTax);
		let accessNum = accessoriesTax ? data['accessoriesCostNotax'] * parseInt(accessoriesTax["label"]) / 100 : 0;
		accessoriesTax = accessoriesTax ? accessoriesTax['value'] : '-1';
		let startTime = parseInt(data["maintenancePlanningTime"]);
		let sunCost = (data["accessoriesTaxNew"] ? data['accessoriesCostNotax'] : 0) + (data["labourTaxNew"] ? data['labourCostNotax'] : 0) + accessNum + labourNum;
		// console.log('====', sunCost, (data["accessoriesTaxNew"] ? data['accessoriesCostNotax'] : 0), (data["labourTaxNew"] ? data['labourCostNotax'] : 0), accessNum, labourNum);
		const formData = {
			schema: [
				{
					name: 'form_1', element: 'Input',
					label: isProject ? '工程名称' : '设备名称',
					defaultValue: data["equipmentName"],
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_2', element: 'Input',
					label: '保养计划时间',
					defaultValue: data["maintenancePlanningTime"],
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_10', element: 'Input',
					label: isProject ? '保养材料费(不含税)' : '保养配件费(不含税)',
					// label:'配件费用',
					defaultValue: Number(data['accessoriesCostNotax']).formatMoney(2, '', ''),
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_3', element: 'Input',
					label: '保养人工费(不含税)',
					// label:'人工费用',
					defaultValue: Number(data['labourCostNotax']).formatMoney(2, '', ''),
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_4', element: 'Select',
					label: '人工费税率',
					// defaultValue: '',
					defaultValue: labourTax ? [labourTax] : '',
					options: taxlist,
					className: 'has-border text-left',
					attr: {
						cols: 1,
						className: ''
					},
					events: {
						onChange: function (data) {
							let nowData = _.findWhere(taxlist, { value: data[0][0] })["label"];
							if (nowData == '请选择') {
								nowData = ''
							}
							self.props.changeData(index, {
								labourTaxNew: nowData
								// labourTax: nowData
							})
						}
					}
				}, {
					name: 'form_9', element: 'Input',
					label: '人工税金',
					defaultValue: labourNum ? Number(labourNum).formatMoney(2, '', '') : '-',
					// defaultValue: Number(data['labourTaxMoney']).formatMoney(2, '', ''),
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_5', element: 'Select',
					label: isProject ? '材料费税率' : '配件费税率',
					defaultValue: accessoriesTax ? [accessoriesTax] : '',
					options: taxlist,
					className: 'has-border text-left',
					attr: {
						cols: 1,
						className: ''
					},
					events: {
						onChange: function (data) {
							let nowData = _.findWhere(taxlist, { value: data[0][0] })["label"];
							if (nowData == '请选择') {
								nowData = ''
							}
							self.props.changeData(index, {
								// accessoriesTax: nowData
								accessoriesTaxNew: nowData
							})
						}
					}
				}, {
					name: 'form_12', element: 'Input',
					label: isProject ? '工程税金' : '设备税金',
					defaultValue: accessNum ? Number(accessNum).formatMoney(2, '', '') : '-',
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_11', element: 'Input',
					label: '价税合计',
					defaultValue: sunCost ? Number(sunCost).formatMoney(2, '', '') : '-',
					attr: {
						disabled: 'disabled',
						className: 'text-left'
					}
				}, {
					name: 'form_6', element: 'DatePicker',
					label: '上门保养日期',
					className: 'has-border text-left',
					defaultValue: (data['aboveMaintenanceTime'] || ''),
					attr: {
						cols: 1,
						className: '',
						extra: '请选择',
						minDate: (isNaN(startTime) ? moment({ y: new Date().getFullYear(), M: new Date().getMonth() + 1, d: 1 }) : moment({ y: new Date().getFullYear(), M: startTime - 1, d: 1 })),
						maxDate: moment({ y: new Date().getFullYear(), M: 12 }).endOf('month'),
						format: function (val) {
							return val.format('YYYY-MM-DD')
						}
					},
					events: {
						onChange: function (data) {
							self.props.changeData(index, {
								aboveMaintenanceTime: data[0].format('X')
							})
						}
					}
				}, {
					name: 'form_7', element: 'Input',
					label: '联系人',
					className: 'has-border text-left',
					defaultValue: (data['contactsMans'] || ''),
					events: {
						onChange: function (data) {
							self.props.changeData(index, {
								contactsMans: $.trim(data[0])
							})
						}
					}
				}, {
					name: 'form_8', element: 'Input',
					label: '联系方式',
					className: 'has-border text-left',
					attr: {
						type: 'number'
					},
					defaultValue: (data['tel'] || ''),
					events: {
						onChange: function (data) {
							self.props.changeData(index, {
								tel: data[0]
							})
						}
					}
				}
			],
			buttons: false,
			changeData: this.changeData.bind(this)
		}
		let showAllData = this.props.showAllData;
		let showMoreBtn = data['showMoreBtn'];
		return (<div className="maintenance-device animated zoomIn">
			<div className="maintenance-device-c">
				<div className="maintenance-device-title">
					<i></i>
					<span className="">{isProject ? '工程明细' : '设备明细'}</span>
				</div>
				<div className="maintenance-device-info">
					<Form formData={formData} />
				</div>
				{
					(showMoreBtn ? <div className="maintenance-device-btn border-line-h before" onClick={(e) => this.props.openView(e)}>
						<span className="color-yellow">填写更多设备明细</span>
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

export default connect((state) => { return state })(MaintenanceReplyDeviceDetail);
