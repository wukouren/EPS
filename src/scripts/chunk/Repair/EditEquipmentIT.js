/**
 * 设备信息编辑
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { getDict } from '../../constants';

import Form from "jw-form/dist/mobile";

let equipmentOperation = getDict('equipmentOperation');

class EditEquipmentIT extends Component {
	constructor(props) {
		super(props);
		let dispatch = this.props.dispatch;
		// 从localstorage拿即将编辑的IT设备信息
		let ITEquipment = getDict('EditEquipmentITData');
		console.log('ITEquipment====:',ITEquipment)
		// 存储
		dispatch({
			type:'editequipmentit/changeData',
			payload:{
				ITEquipment: ITEquipment,
			}
		})
		this.callJWFuncs = this.callJWFuncs.bind(this);
	}

	FormChange(values,schema){
		console.log("values:",values,"FormChange:",schema);
	}
	changeData(data){
		// let dispatch = this.props.dispatch;
		// dispatch({
		// 	type:'form/changeData',
		// 	data:{
		// 		schema:data
		// 	}
		// })
	}
	render(){
		let self = this;
		let equipmentdata = this.props.editequipmentit.ITEquipment;
		const formData={
			schema:[
				// {
				// 	name: 'form_2', element:'Input',
				// 	label:'设备序列号',
				// 	defaultValue: 'wwww',
				// 	attr:{
				// 		type: 'text',
				// 		className:'xxxxxxx',
				// 		disabled: 'disabled'
				// 	},
				// 	events:{
				// 		onBlur:function(){},
				// 		onFocus:function(e){},
				// 		onChange:function(e){
				// 			console.log('onChange',e)
				// 		}
				// 	}
				// },
				{
					name: 'form_3', element:'Select',label:'建议操作',
					defaultValue:[equipmentdata["deviceOperate"]],
					options: equipmentOperation,
					attr:{
						cols:1,
					},
					events:{
						onChange:function(data){
							console.log('form rate:',data)
							let dispatch = self.props.dispatch;
							dispatch({
								type:'editequipmentit/changeData',
								payload:{
									ITEquipment: _.extend(equipmentdata,{
										deviceOperate: data[0][0]
									})
								}
							})
						}
					}
				},
				{
					name: 'form_8', element:'Input',
					label:'维修描述',
					defaultValue: equipmentdata["maintenanceRemarks"],
					attr:{
						type: 'text',
						placeholder:'请输入维修描述',
						className:'edit-equipment-it-input'
					},
					events:{
						onChange:function(e){
							let dispatch = self.props.dispatch;
							dispatch({
								type:'editequipmentit/changeData',
								payload:{
									ITEquipment: _.extend(equipmentdata,{
										maintenanceRemarks: e[0]
									})
								}
							})
						}
					}
				},
			],
			buttons:false,
			changeData:this.changeData.bind(this)
		}
		return (
			<div className="root-container">
				<div className="root-container-w">
					<header className="header specail" ref="header">
						<div className="header-bg"></div>
						<div className="header-bg-2"></div>
						<div className="header-c">
						</div>
					</header>
					<sesstion className="main">
						<div className="main-c">
							<div className="money-edit">
								<Form formData={formData} onChange={(values,schema)=>this.FormChange(values,schema)}/>
							</div>
						</div>
					</sesstion>
				</div>
			</div>
		);
	}
	callJWFuncs(){
		jw.setFuncBtns([{
			type:'11',
			name:'完成'
		}])
	}
	// 组件加载完毕
	componentDidMount(){
		let self = this;
		if(JWReady == true){
			this.callJWFuncs();
		}else{
			window.EpsEvents.off('jwready:ok').on('jwready:ok',()=>{
				self.callJWFuncs()
			})	
		}
		NProgress.done();
		// console.log(initCommonDict)
		window.onJwNavBtnClick = function(){
			// alert('xxxxxxx');
			let data = self.props.editequipmentit.ITEquipment;
			let datas = {
				deviceOperate:data['deviceOperate'],
				maintenanceRemarks:data['maintenanceRemarks']
			}
			window.upTabsData('editequipmentit','publish',datas);
			jw.closeWebView();
		}
	}
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(EditEquipmentIT);