/**
 * 设备信息编辑
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import Form from "jw-form/dist/mobile";
import { AlertBase } from '../../components/Common/EpsModal';
class EditEquipment extends Component {
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:editequipment');
		var cache = store.find({id:'tab:cache'}) || {};
		if(cache['id']){
			let dispatch = props.dispatch;
			window.equipmentOperation = cache['data']['equipmentOperation']
			dispatch({
				type:'editequipment/changeData',
				payload:cache["data"]['datas']
			})
		}
		super(props);
		this.callJWFuncs = this.callJWFuncs.bind(this);
	}
	FormChange(values,schema){
	}
	changeData(data){
	}
	render(){
		let dispatch = this.props.dispatch;
		let data = this.props.editequipment;
		const formData={
			schema:[
				{
					name: 'form_1', element:'Input',
					label:'维修数量',
					defaultValue:data["devceMaintenanceNum"],
					attr:{
						type: 'number',
						placeholder:'请输入维修数量',
						className:'edit-equipment-it-input'
					},
					events:{
						onChange:function(data){
							dispatch({
								type:'editequipment/changeData',
								payload:{
									devceMaintenanceNum:data[0]
								}
							})
						}
					}
				},{
					name: 'form_2', element:'Input',
					label:'设备序列号',
					defaultValue:data["deviceSerialNumber"],
					attr:{
						type: 'text',
						placeholder:'请输入设备序列号',
						className:'edit-equipment-it-input'
					},
					events:{
						onChange:function(data){
							dispatch({
								type:'editequipment/changeData',
								payload:{
									deviceSerialNumber:data[0]
								}
							})
						}
					}
				},{
					name: 'form_3', element:'Select',label:'建议操作',
					defaultValue:[data["deviceOperate"]],
					options: equipmentOperation,
					attr:{
						cols:1,
					},
					events:{
						onChange:function(data){
							dispatch({
								type:'editequipment/changeData',
								payload:{
									deviceOperate:data[0][0]
								}
							})
						}
					}
				},{
					name: 'form_8', element:'Input',
					label:'维修描述',
					defaultValue: data["deviceMark"],
					attr:{
						type: 'text',
						placeholder:'请输入维修描述',
						className:'edit-equipment-it-input'
					},
					events:{
						onChange:function(data){
							dispatch({
								type:'editequipment/changeData',
								payload:{
									deviceMark:data[0]
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
								<Form formData={formData} />
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
			let data = self.props.editequipment;
			let datas = {
				devceMaintenanceNum:data['devceMaintenanceNum'],
				deviceSerialNumber:data['deviceSerialNumber'],
				deviceOperate:data['deviceOperate'],
				deviceMark:data['deviceMark']
			}


			if(typeof(datas['devceMaintenanceNum']) == 'undefined'  || datas['devceMaintenanceNum'] == 0){
				if(datas['deviceOperate'] != '4'){
					AlertBase({
						tip: '请正确输入维修数量!',
						icon: 'icon-save-error'
					});
					return 
				}
			}
			if(typeof(datas['deviceSerialNumber']) == 'undefined' || datas['deviceSerialNumber'].length==0){
				AlertBase({
					tip: '请输入序列号!',
					icon: 'icon-save-error'
				});
				return 
			}
			if(typeof(datas['deviceOperate']) == 'undefined' || datas['deviceOperate']=='-1'){
				AlertBase({
					tip: '请选择建议操作!',
					icon: 'icon-save-error'
				});
				return 
			}

			window.upTabsData('editequipment','publish',datas);
			jw.closeWebView();
		}
	}
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(EditEquipment);