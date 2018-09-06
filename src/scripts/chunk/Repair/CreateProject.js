/**
 * 创建工程维修
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { List, InputItem, Picker } from 'jw-components-mobile';
import EpsDatePicker from '../../components/Common/EpsDatePicker';
import SimpleUserCard from '../../components/Common/SimpleUserCard';
import {AlertBase,ConfirmBase,AlertInfoBase} from '../../components/Common/EpsModal';
import ProjectList from '../../components/Repair/ProjectList';

import UploadFile from '../../components/Common/UploadFile';

import request from '../../utils/EpsRequest';

class CreateProject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'timedisabled' : false,
			'memo' : '',
			'repairstore': ''
		};
		this.gotoAddProject = this.gotoAddProject.bind(this);
		this.gotoAddStore = this.gotoAddStore.bind(this);
	}
	// 打开添加供应商页面
	gotoAddStore(){
		let data = this.props.repairproject;
		let url = EpsWebRoot+'/#/repairing/add-edit/repairstore';
    console.log('url:',url,data)
    jw.pushWebView(url);
    setTimeout(function(){
    	window.upTabsData('select:repairstore','publish',{
    		storeNumber:data['record']['storeNumber'],
    		storeName:data['record']['storeName']
    	})
    },800)
	}
	cacelHandler(){
		jw.closeWebView();
	}
	createHandler(){
		// 确认提交
		// let orderid = this.props.params.orderid.split("&")[0];
		let data = this.props.repairproject["record"];
		let record = _.clone(data);

		if(record['vendorNumber'][0]=='-1'){
			AlertBase({
				tip: '请选择维修商！',
				icon: 'icon-save-error',
				onOk: ()=>{}
			});
			return
		}

		if(typeof(record['memo']) == 'undefined' || record['memo'].length==0){
			AlertBase({
				tip: '备注不能为空！',
				icon: 'icon-save-error',
				onOk: ()=>{}
			});
			return
		}

		if(record['engineeringList'].length==0){
			AlertBase({
				tip: '维修工程不能为空！',
				icon: 'icon-save-error',
				onOk: ()=>{}
			});
			return
		}

		ConfirmBase({
			tip: '确认要提交维修订单？',
			icon: 'icon-repair-alert',
			onOk: ()=>{
				// 数据保存中
				let saving = AlertBase({
					tip: '正在提交维修订单',
					icon: 'icon-saving',
					okBtn: {
						text: '提交中...'
					},
					onOk: ()=>{
						console.log('onOk')
					}
				});
				
				record['storeNumber'] = userinfo['storeCode'];
				record['dateAppointment'] = moment(data['dateAppointment']*1000).format('YYYY-MM-DD HH:mm');
				record['engineeringList'] = _.map(record['engineeringList'],function(i){
					return _.extend({
						faCategory:i['categoryCode'],
						subCategory:i['subCategoryCode'],
					})
				})
				record['rmrk'] = record['memo'];
				delete record['memo']
				record['vendorNumber'] = record['vendorNumber'];
				request('/McdEpsApi/joywok/repair/submitCOOrder',{
					method:"POST",
					body:JSON.stringify({
						param:{
							eid:eid,
							code:window.code,
							record:record
						}
					})
				}).then(function(resp){
					saving.close();
					console.log(resp,'这个里面的返回是什么');
					if(resp['data']['success']==false){
		    	}else{
						// 提交成功
						AlertBase({
							tip: '已成功提交',
							icon: 'icon-save-success',
							onOk: ()=>{
								jw.closeWebView()
							}
						});
		    	}
				})
				
			},
			onCancel: ()=>{
				// 取消提交
			}
		});
	}
	// header fixed开关
  headerFixedHandle(){
    $(document).on('scroll',(e)=>{
      if($(document).scrollTop() >= this.headerOffset.top){
        $('.eps-create-device-body .eps-box-wrap').addClass('fixed');
      }else{
        if($(document).scrollTop() <= (this.headerOffset.top+50)){
          $('.eps-create-device-body .eps-box-wrap').removeClass('fixed');
        }
      }
    })
  }
	// 组件加载完毕
	render(){
		let data = this.props.repairproject;
		// <SimpleUserCard userinfo={ userinfo } className="hide"/>
    console.log('Marlin3',data)
		return (
			<div className="root-container eps-create-project">
				<div className="root-container-w">
					<header className="header clear-margin specail" ref="header">
						<div className="header-bg"></div>
						<div className="header-bg-2"></div>
						<div className="header-c">
						</div>
					</header>
					<sesstion className="main">
						<div className="main-c" ref="listC" style={{
							height:data['containerHeight'] || 'auto',
							padding:0,
							overflowY:'visible'
						}}>
							<div className="main-w">
								<div className="eps-create-device-body">
									<div className="eps-box-wrap">
										<div className="eps-box eps-box-with-addbtn">
											<div className="box-title">报修类型</div>
											<div className="box-content">
												<div className="select-time-radio" ref="timeRadio">
													<div className="time-option option-order">
														<i className="icon-radio-normal" onClick={ (e)=>{this.selectTime(e,'order')} }></i>
														<EpsDatePicker dateChange={(e)=>this.dateChange(e)} value={data.record['dateAppointment']} disabled={data.record['repairType']=="1"?true:false}><label>预约</label></EpsDatePicker>
													</div>
													<div className="time-option option-urgent">
														<i className="icon-radio-checked" onClick={ (e)=>{this.selectTime(e,'urgent')} }></i><label>紧急</label>
													</div>
												</div>
											</div>
											<div className="repairstores">
												<div className="am-list-item am-list-item-middle">
													<div className="am-list-line">
														<div className="am-list-content">供应商</div>
														<div className="am-list-extra" onClick={ this.gotoAddStore.bind(this) } >{ data.vendorName ? data.vendorName : '请选择' }</div>
														<div className="am-list-arrow am-list-arrow-horizontal" onClick={ this.gotoAddStore.bind(this) } aria-hidden="true"></div>
													</div>
												</div>
							        </div>
											<div className="repairstores-specail">
												<InputItem className="jw-inline eps-form-memo" placeholder="" value={ data["record"]["memo"] } onChange={(e)=>this.memoChange(e)}>备注</InputItem>
											</div>
											<div className="btn-wrap"><i className="icon-add-graybg" onClick={ this.gotoAddProject }></i></div>
										</div>
									</div>
									<div className="eps-cs-content">
										<ProjectList style={data["style"]} deleteBtnShow={ true } list={data['record']['engineeringList']} removeItem={(data,index)=>this.removeItemCard(data,index)}/>
									</div>
									<UploadFile fix={false} fileData={data["record"]["file"]} addPic={(e)=>this.addPic(e)} removePic={(e)=>this.removePic(e)} changePic={(index,id)=>this.changePic(index,id)}></UploadFile>
								</div>
							</div>
						</div>
					</sesstion>
					<div className="eps-footer">
						<div className="eps-btn-wrap">
							<div className="eps-btn eps-btn-default-small" onClick={(e)=>this.cacelHandler(e)}>取消</div>
							<div className="eps-btn eps-btn-warning-large" onClick={(e)=>this.createHandler(e)}>提交</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
	componentDidMount(){
    let self = this;
		NProgress.done();
    let dispatch = this.props.dispatch
    // 安卓或者web端 可监听scorll来设置导航是否fixed
    // this.headerOffset = $('.eps-create-device-body .eps-box-wrap').offset();
    // if (!(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent))) {
    //   this.headerFixedHandle();
    // }
    PubSub.subscribe('get:child:select:project',function(evt,data){
    	let oldData = self.props.repairproject['record'];
    	let nowData = oldData['engineeringList']
    	// .concat(data['data']);
    	let isFlag=false;

    	_.each(data['data'],function(i){
    		if(_.findWhere(nowData,{id:i['id']})){
    			isFlag = true
    		}
    		console.log(i,_.findWhere(nowData,{id:i['id']}),'这个里面有什么数据呢');
    		nowData.push(i)
    	})

    	if(isFlag){
    		AlertBase({
	        tip: '设备重复添加！',
	        icon: 'icon-save-error',
	        onOk: ()=>{}
	      });

        // AlertInfoBase({
        //   text:'以下设备已被添加,此次不会重复添加:',
        //   deviceNames:nowData,
        // })
      }
    	nowData = _.uniq(nowData,function(item){
    		return item['projectName']
    	})
    	_.extend(oldData,{
    		engineeringList:nowData
    	})
			dispatch({
				type:'repairproject/changeData',
				payload:{
					record:oldData
				}
			})
    })

    // 订阅选择供应商事件
    PubSub.subscribe('get:child:select:repairstore',function(evt,data){
    	console.log("subscribe('get:child:select:repairstore':",data['data'][0])
    	self.repairstoreChange(data['data'][0]);
    })
    // request('/McdEpsApi/joywok/repair/getMaintainerList',{
    // 	method:'POST',
    // 	body:JSON.stringify({
    // 		param:{
    // 			eid:eid	
    // 		}
		  // })
    // }).then(function(resp){
    // 	if(resp['data']['success']==false){
    // 	}else{
    // 		let hasId = {};
    // 		let data = [];
    // 		_.each(resp['data']['body']['vendorInfoList'],function(i){
    // 			i['value'] = i['vendorNumber'];
    // 			if(hasId[i['value']]){
    // 			}else{
    // 				hasId[i['value']] = true;
    // 				i['label'] = i['vendorName']
    // 				i['value'] = i['vendorNumber']
    // 				data.push(i)
    // 			}
    // 		});
    // 		data.unshift({label:'请选择',value:'-1'})
    // 		dispatch({
    // 			type:'repairproject/changeData',
				// 	payload:{
				// 		repairstores:data
				// 	}
	   //  	})	
    // 	}
    // })
		this.setHeight();
		if(isAndroid()){
      console.log('isAndroid',isAndroid())
      $( window ).resize(function() {
        console.log('window resize')
        self.setHeight();
      });
    }
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
			let top = $('.eps-box-wrap').height() || 0;
			let upload = $('.upload-file').height()||0;
			let footer = $('.eps-footer').height() || 0;
			$('.eps-create-device-body').css({maxHeight:clientHeight-header-footer+'px',overflowY:'auto'});
			console.log(clientHeight-header-top-footer-upload,'zxczxczxczxczxczxczxczxczxczxczxczxc');
			$('.eps-cs-content').css({minHeight:clientHeight-header-top-footer-upload+'px'});
			// $('.eps-empty-tip-arrow').css({height:clientHeight-header-top-footer-upload-30+'px'});
		},0)

		// setTimeout(function(){
		// 	let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		// 	let header = $('.header').height() ||0;
		// 	let top = $('.div-sticky').height() || 0;
		// 	let upload = $('.upload-file').height()||0;
		// 	let footer = $('.eps-footer').height() || 0;
		// 	$('.eps-empty-tip-arrow').css({height:clientHeight-header-top-footer-upload-30+'px'});
		// 	$('.eps-device-list').css({height:clientHeight-header-top-footer-upload-30+'px'});
		// },0)
	}
	removeItemCard(data,targetIndex){
		let dispatch = this.props.dispatch;
		let datas = this.props.repairproject;
		let record = datas['record'];
		let newData = [];
		_.each(_.clone(record['engineeringList']),function(i,index){
			if(targetIndex !=index){
				newData.push(i);
			}
		})
		record['engineeringList'] = newData
		dispatch({
			type:'repairproject/changeData',
			payload:{
				record:record
			}
		})
	}
	addPic(datas){
		let dispatch = this.props.dispatch;
		let data = this.props.repairproject;
		let record = data['record'];
		record['file'] = record['file'].concat(datas);
		dispatch({
			type:'repairproject/changeData',
			payload:{
				record:record
			}
		})
	}
	removePic(resid){
		let dispatch = this.props.dispatch;
		let data = this.props.repairproject;
		let record = data['record'];
		let nowData = []
		_.each(record['file'],function(i,index){
			if(resid != i["resid"]){
				nowData.push(i)
			}
		})
		console.log(resid,nowData,'zxczxczxczxczxczxczxczxczxczxczxczxc')
		record['file'] = nowData;
		dispatch({
			type:'repairproject/changeData',
			payload:{
				record:record
			}
		})
	}
	changePic(resid,id){
		let dispatch = this.props.dispatch;
		let data = this.props.repairproject;
		let record = data['record'];
		let nowData = []
		_.each(record['file'],function(i,index){
			if(resid == i['resid']){
				i['serverId'] = id
				i['url'] = window.jwurl+'/file/download?code='+window.code+'&file_id='+id;
			}
			nowData.push(i);
		})

		record['file'] = nowData;
		console.log(resid,id,nowData,'nowDatanowDatanowDatanowDatanowData')
		dispatch({
			type:'repairproject/changeData',
			payload:{
				record:record
			}
		})
	}
	gotoAddProject(){
		let data = this.props.repairproject;
		let url = EpsWebRoot+'/#/repairing/add-edit/project';
    jw.pushWebView(url);
    setTimeout(function(){
    	window.upTabsData('select:project','publish',{
    		engineeringList:data['record']['engineeringList']
    	})
    },800)
	}
	selectTime(e, key){
		let dispatch = this.props.dispatch;
		let data = this.props.repairproject;
		let record = data['record'];
		record['repairType'] = (key == 'urgent'?'1':'0');
		dispatch({
			type:'repairproject/changeData',
			payload:{
				record:record
			}
		})
		$(ReactDOM.findDOMNode(this.refs.timeRadio)).find('i').removeClass('icon-radio-checked').addClass('icon-radio-normal');
		$(e.target).closest('.time-option').find('i').removeClass('icon-radio-normal').addClass('icon-radio-checked');
	}
	dateChange(date){
		let dispatch = this.props.dispatch;
		let data = this.props.repairproject;
		let record = data['record'];
    console.log('date',date)
		record['dateAppointment'] = date;
		dispatch({
			type:'repairproject/changeData',
			payload:{
				record:record
			}
		})
	}
	repairstoreChange(data){
		let dispatch = this.props.dispatch;
		let repairproject = this.props.repairproject;
		let record = repairproject['record'];
		record['vendorNumber'] = data.vendorNumber;
		dispatch({
			type:'repairproject/changeData',
			payload:{
				record:record,
				vendorName: data.vendorName
			}
		})
	}
	memoChange(e){
    const text = e.trim()
    let dispatch = this.props.dispatch;
		let repairproject = this.props.repairproject;
		let record = repairproject['record'];
		record['memo'] = text;
		dispatch({
			type:'repairproject/changeData',
			payload:{
				record:record
			}
		})
	}
}

export default connect(function(state){return state})(CreateProject);