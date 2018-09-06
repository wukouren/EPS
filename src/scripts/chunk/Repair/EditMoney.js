/**
 * 维修费用编辑
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import Form from "jw-form/dist/mobile";
import { getDict } from '../../constants';
import { AlertBase} from '../../components/Common/EpsModal';
let taxlist = getDict('taxlist')
class EditMoney extends Component {
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:editmoney');
		var cache = store.find({id:'tab:cache'}) || {};
		if(cache['id']){
			props['editmoney'] = _.extend({},props['editmoney'],cache["data"])
			let dispatch = props.dispatch;
			dispatch({
				type:'editmoney/changeData',
				payload:cache["data"]
			})
		}
		super(props);
		this.callJWFuncs = this.callJWFuncs.bind(this);
	}
	FormChange(values,schema){
	}
	changeData(data){
	}
	componentDidUpdate(){
    let self = this;
    this.setHeight()
  }
	setHeight(){
    let self = this;
    setTimeout(function(){
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let header = $('.header').height() ||0;
      let top = $('.main-c').height() || 0;
			$('.main-c').css({maxHeight:clientHeight-header+'px',overflowY:'auto'});
      $('.money-edit').css({minHeight:clientHeight-header-top+'px'});
			console.log('ContainerHeight:',clientHeight,header,top);
			// $('.eps-empty-tip-arrow').css({height:clientHeight-header-top-footer-upload-30+'px'});
    },0)
  }
	render(){
		let dispatch = this.props.dispatch;
		let data = this.props.editmoney;
		let maintenanceLaborRate = '';
		if(data['maintenanceLaborRate'] == '11%' || data['maintenanceLaborRate'] == '17%'){
			let nowData = ''
			if(data['maintenanceLaborRate'] == '11%'){
				nowData = '10%';
			}else{
				nowData = '16%';
			}
			dispatch({
				type:'editmoney/changeData',
				payload:{
					maintenanceLaborRate:nowData
				}
			})
		}else{
			maintenanceLaborRate = _.findWhere(taxlist,{label:data["maintenanceLaborRate"]});
			maintenanceLaborRate = maintenanceLaborRate?maintenanceLaborRate['value']:'-1';
		}
		let maintenanceAccommodationRate = '';
		if(data['maintenanceAccommodationRate'] == '11%' || data['maintenanceAccommodationRate'] == '17%'){
			let nowData = ''
			if(data['maintenanceAccommodationRate'] == '11%'){
				nowData = '10%';
			}else{
				nowData = '16%';
			}
			dispatch({
				type:'editmoney/changeData',
				payload:{
					maintenanceAccommodationRate:nowData
				}
			})
		}else{
			maintenanceAccommodationRate = _.findWhere(taxlist,{label:data["maintenanceAccommodationRate"]});
			maintenanceAccommodationRate = maintenanceAccommodationRate?maintenanceAccommodationRate['value']:'-1'
		}

		let maintenanceRate = '';
		if(data['maintenanceRate'] == '11%' || data['maintenanceRate'] == '17%'){
			let nowData = ''
			if(data['maintenanceRate'] == '11%'){
				nowData = '10%';
			}else{
				nowData = '16%';
			}
			dispatch({
				type:'editmoney/changeData',
				payload:{
					maintenanceRate:nowData
				}
			})
		}else{
			maintenanceRate = _.findWhere(taxlist,{label:data["maintenanceRate"]});
			maintenanceRate = maintenanceRate?maintenanceRate['value']:'-1'
		}
		let maintenanceOtherCostTaxRate = '';
		if(data['maintenanceOtherCostTaxRate'] == '11%' || data['maintenanceOtherCostTaxRate'] == '17%'){
			let nowData = ''
			if(data['maintenanceOtherCostTaxRate'] == '11%'){
				nowData = '10%';
			}else{
				nowData = '16%';
			}
			dispatch({
				type:'editmoney/changeData',
				payload:{
					maintenanceOtherCostTaxRate:nowData
				}
			})
		}else{
			maintenanceOtherCostTaxRate = _.findWhere(taxlist,{label:data["maintenanceOtherCostTaxRate"]});
			maintenanceOtherCostTaxRate = maintenanceOtherCostTaxRate?maintenanceOtherCostTaxRate['value']:'-1'
		}
		console.log(data,'输出下这个里面的值有啥');

		// if(data['maintenanceCost'] =='0'){
		// 	data['maintenanceCost'] ='0.00'
		// }
		// if(data['maintenanceAccommodation'] =='0'){
		// 	data['maintenanceAccommodation'] ='0.00'	
		// }
		// if(data['maintenanceTravel'] =='0'){
		// 	data['maintenanceTravel'] ='0.00'
		// }
		// if(data['maintenanceOtherCost'] =='0'){
		// 	data['maintenanceOtherCost'] ='0.00'
		// }
		

		const formData={
			schema:[
				{
					name: 'form_4', element:'Input',
					label:'人工费 ¥ (不含税)',
					attr:{
						type: 'text',
						placeholder:'请输入人工费',
						className:'edit-equipment-it-input',
						step:"0.1"
					},
					defaultValue:data['installationFeeNotax'],
					events:{
						onChange:function(data){
							// console.log(data[0],'这个里面有什么呢');
							dispatch({
								type:'editmoney/changeData',
								payload:{
									installationFeeNotax:window.replaceNnum(data[0])
								}
							})
						}
					}
				},{
					name: 'form_5', element:'Select',label:'人工费税率',
					defaultValue:[maintenanceLaborRate],
					options: taxlist,
					attr:{
						cols:1,
					},
					events:{
						onChange:function(data){
							let nowData = _.findWhere(taxlist,{value:data[0][0]})["label"];
							if(nowData == '请选择'){
								nowData = ''
							}
							dispatch({
								type:'editmoney/changeData',
								payload:{
									maintenanceLaborRate:nowData
								}
							})
						}
					}
				},{
					name: 'form_6', element:'Input',
					label:'住宿费 ¥ (不含税)',
					defaultValue: data["hotelCostNotax"],
					attr:{
						placeholder:'请输入住宿费',
						type: 'text',
						className:'edit-equipment-it-input'
					},
					events:{
						onChange:function(data){
							dispatch({
								type:'editmoney/changeData',
								payload:{
									hotelCostNotax:window.replaceNnum(data[0])
								}
							})
						}
					}
				},{
					name: 'form_7', element:'Select',label:'住宿费税率',
					defaultValue:[maintenanceAccommodationRate],
					options: taxlist,
					attr:{
						cols:1,
					},
					events:{
						onChange:function(data){
							let nowData = _.findWhere(taxlist,{value:data[0][0]})["label"];
							if(nowData == '请选择'){
								nowData = ''
							}
							dispatch({
								type:'editmoney/changeData',
								payload:{
									maintenanceAccommodationRate:nowData
								}
							})
						}
					}
				},{
					name: 'form_8', element:'Input',
					label:'差旅费 ¥ (不含税)',
					defaultValue:data["carCostNotax"],
					attr:{
						type: 'text',
						placeholder:'请输入差旅费',
						className:'edit-equipment-it-input'
					},
					events:{
						onChange:function(data){
							dispatch({
								type:'editmoney/changeData',
								payload:{
									carCostNotax:window.replaceNnum(data[0])
								}
							})
						}
					}
				},{
					name: 'form_9', element:'Select',label:'差旅费税率',
					defaultValue:[maintenanceRate],
					options: taxlist,
					attr:{
						cols:1,
					},
					events:{
						onChange:function(data){
							let nowData = _.findWhere(taxlist,{value:data[0][0]})["label"];
							if(nowData == '请选择'){
								nowData = ''
							}
							dispatch({
								type:'editmoney/changeData',
								payload:{
									maintenanceRate:nowData
								}
							})
						}
					}
				},{
					name: 'form_10', element:'Input',
					label:'其他费用 ¥ (不含税)',
					defaultValue: data['otherCostNotax'],
					attr:{
						type: 'text',
						placeholder:'请输入其他费用',
						className:'edit-equipment-it-input'
					},
					events:{
						onChange:function(data){
							dispatch({
								type:'editmoney/changeData',
								payload:{
									otherCostNotax:window.replaceNnum(data[0])
								}
							})
						}
					}
				},{
					name: 'form_11', element:'Select',label:'其他费税率',
					defaultValue:[maintenanceOtherCostTaxRate],
					options: taxlist,
					attr:{
						cols:1,
					},
					events:{
						onChange:function(data){
							let nowData = _.findWhere(taxlist,{value:data[0][0]})["label"];
							if(nowData == '请选择'){
								nowData = ''
							}
							dispatch({
								type:'editmoney/changeData',
								payload:{
									maintenanceOtherCostTaxRate:nowData
								}
							})
						}
					}
				},{
					name: 'form_12',
					element:'Textarea',
					defaultValue:data["otherCostRemark"],
					attr:{
						placeholder:'其他费用备注',
						autoHeight:true
					},
					events:{
						onChange:function(data){
							dispatch({
								type:'editmoney/changeData',
								payload:{
									otherCostRemark:data[0]
								}
							})
						}
					}
				}
			],
			buttons:false,
			changeData:this.changeData.bind(this)
		}
		return (
			<div className="root-container">
				<div className="root-container-w">
					<header className="header specail" ref="header">
					<div className="header-bg-specail">
						<div className="header-bg"></div>
						<div className="header-bg-2"></div>
					</div>
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
		window.onJwNavBtnClick = function(){
			// alert('xxxxxxx');
			let data = self.props.editmoney;
			let datas = {
				installationFeeNotax:data['installationFeeNotax'],
				maintenanceLaborRate:data['maintenanceLaborRate'],
				carCostNotax:data['carCostNotax'],
				maintenanceRate:data['maintenanceRate'],
				hotelCostNotax:data['hotelCostNotax'],
				maintenanceAccommodationRate:data['maintenanceAccommodationRate'],
				otherCostNotax:data['otherCostNotax'],
				maintenanceOtherCostTaxRate:data['maintenanceOtherCostTaxRate'],
				otherCostRemark:data['otherCostRemark']
			}

			console.log(datas,'这个订单里面的钱');
			// alert('xxxxxxxxxxxxxxxxxx');
			if(typeof(datas['installationFeeNotax']) == 'undefined' || datas['installationFeeNotax'].length == 0 || isNaN(datas['installationFeeNotax'])){
				AlertBase({
					tip: '请正确输入人工费!',
					icon: 'icon-save-error'
				});
				return 
			}

			if(datas['installationFeeNotax']> 0 && ( typeof(datas['maintenanceLaborRate']) == 'undefined' || datas['maintenanceLaborRate']=='请选择' || datas['maintenanceLaborRate'].length==0)){
				AlertBase({
					tip: '请选择人工费税率!',
					icon: 'icon-save-error'
				});
				return 
			}

			if(datas['maintenanceLaborRate'] == '请选择'){
				datas['maintenanceLaborRate'] = ''
			}


			if(typeof(datas['hotelCostNotax']) == 'undefined' || datas['hotelCostNotax'].length == 0 || isNaN(datas['hotelCostNotax'])){
				AlertBase({
					tip: '请正确输入住宿费!',
					icon: 'icon-save-error'
				});
				return 
			}

			if(datas['hotelCostNotax']>0 && ( typeof(datas['maintenanceAccommodationRate']) == 'undefined'||datas['maintenanceAccommodationRate']=='请选择' || datas['maintenanceAccommodationRate'].length==0)){
				AlertBase({
					tip: '请选择住宿费税率!',
					icon: 'icon-save-error'
				});
				return 
			}

			if(datas['maintenanceAccommodationRate'] == '请选择'){
				datas['maintenanceAccommodationRate'] = ''
			}

			if(typeof(datas['carCostNotax']) == 'undefined' || datas['carCostNotax'].length == 0 || isNaN(datas['carCostNotax'])){
				AlertBase({
					tip: '请正确输入差旅费!',
					icon: 'icon-save-error'
				});
				return 
			}

			if(datas['carCostNotax']>0 && ( typeof(datas['maintenanceRate']) == 'undefined'||datas['maintenanceRate']=='请选择'||datas['maintenanceRate'].length==0)){
				AlertBase({
					tip: '请选择差旅费税率!',
					icon: 'icon-save-error'
				});
				return 
			}

			if(datas['maintenanceRate'] == '请选择'){
				datas['maintenanceRate'] = ''
			}

			if(typeof(datas['otherCostNotax']) == 'undefined' || datas['otherCostNotax'].length == 0 || isNaN(datas['otherCostNotax'])){
				AlertBase({
					tip: '请正确输入其他费用!',
					icon: 'icon-save-error'
				});
				return 
			}

			if(datas['otherCostNotax']>0 && ( typeof(datas['maintenanceOtherCostTaxRate']) == 'undefined'||datas['maintenanceOtherCostTaxRate']=='请选择' || datas['maintenanceOtherCostTaxRate'].length==0)){
				AlertBase({
					tip: '请选择其他费税率!',
					icon: 'icon-save-error'
				});
				return 
			}
			if(datas['maintenanceOtherCostTaxRate'] == '请选择'){
				datas['maintenanceOtherCostTaxRate'] = ''
			}
			if(datas['maintenanceOtherCost']>0){
				if(typeof(datas['otherCostRemark']) == 'undefined' || datas['otherCostRemark'].length == 0){
					AlertBase({
						tip: '其他费用备注不能为空',
						icon: 'icon-save-error',
						onOk: ()=>{
						}
					});
					return
				}
			}
			datas['maintenanceCost'] = Number(data['installationFeeNotax']) + data['installationFeeNotax']/100*parseFloat(data['maintenanceLaborRate'])
			datas['maintenanceTravel'] = Number(data['carCostNotax']) + data['carCostNotax']/100*parseFloat(data['maintenanceRate'])
			datas['maintenanceAccommodation'] = Number(data['hotelCostNotax']) + data['hotelCostNotax']/100*parseFloat(data['maintenanceAccommodationRate'])
			datas['maintenanceOtherCost'] = Number(data['otherCostNotax']) + data['otherCostNotax']/100*parseFloat(data['maintenanceOtherCostTaxRate'])

			window.upTabsData('editmoney','publish',datas);
			jw.closeWebView();
		}
		this.setHeight()
    if(isAndroid()) {
    	console.log('x1')
      $( window ).resize(function() {
      	console.log('window resize')
        self.setHeight();
      });
    }

    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		$(window).resize(function(){
    	self.setHeight();
    })
	}
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(EditMoney);