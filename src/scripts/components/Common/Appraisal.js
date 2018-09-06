import React, { Component } from 'react';
import { connect } from 'dva';

import Form from "jw-form/dist/mobile";
class Appraisal extends Component {
	FormChange(values, schema) {
		console.log("values:", values, "FormChange:", schema);
	}
	changeData() { }
	render() {
		const formData = {
			schema: [
				{
					name: 'rate_1', element: 'Rate',
					label: '是否及时到店',
					defaultValue: 0,
					attr: {
						empty: <i className="icon-star"></i>,
						full: <i className="icon-star-active"></i>
					},
					rules: []
				}, {
					name: 'rate_2', element: 'Rate',
					label: '服务人员主动出示证件',
					defaultValue: 0,
					attr: {
						empty: <i className="icon-star"></i>,
						full: <i className="icon-star-active"></i>
					},
					rules: []
				}, {
					name: 'rate_3', element: 'Rate',
					label: '服务商响应时间',
					defaultValue: 0,
					attr: {
						empty: <i className="icon-star"></i>,
						full: <i className="icon-star-active"></i>
					},
					rules: []
				}, {
					name: 'rate_4', element: 'Rate',
					label: '服务态度',
					defaultValue: 0,
					attr: {
						empty: <i className="icon-star"></i>,
						full: <i className="icon-star-active"></i>
					},
					rules: []
				}, {
					name: 'rate_5', element: 'Rate',
					label: '服务质量',
					defaultValue: 0,
					attr: {
						empty: <i className="icon-star"></i>,
						full: <i className="icon-star-active"></i>
					},
					rules: []
				}, {
					name: 'rate_6', element: 'Rate',
					label: '现场清理',
					defaultValue: 0,
					attr: {
						empty: <i className="icon-star"></i>,
						full: <i className="icon-star-active"></i>
					},
					rules: []
				}, {
					name: 'feedback', element: 'Textarea',
					defaultValue: '',
					attr: {
						className: 'appraisal-form-feedback',
						placeholder: '请输入备注'
					},
					rules: []
				}
			],
			buttons: false,
			changeData: this.changeData.bind(this)
		}
		return (
			<div className="appraisal-form">
				<Form formData={formData} onChange={(values, schema) => this.FormChange(values, schema)} />
			</div>
		)
	}
};

export default connect((state) => { return state })(Appraisal);
