/**
 * 创建非项目订单（含设备／工程／IT）
 * 调整非项目采购需求（LocalPM 拒绝后退回到RGM的的页面）
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import SimpleUserCard from '../../components/Common/SimpleUserCard';
import { AlertBase, ConfirmBase } from '../../components/Common/EpsModal';
import { MemoDialog ,EvaluateDialog} from '../../components/Common/EpsModal';
import { List, InputItem, TextareaItem, Picker } from 'jw-components-mobile';
import { getDict, getUsers,isRightRoter} from '../../constants';
import request from '../../utils/EpsRequest';


let PRStoreInfo = getDict('PRStoreInfo');
let PRTypeInfo = getDict('PRTypeInfo');
class Create extends Component {
	constructor(props) {
		super(props);
		// console.log('CreatePO:======',this.props.params.objecttype);
		this.createHandler = this.createHandler.bind(this);
		this.state = {
			loading: true, // loading
			mobile: '', // 移动电话
			purchasingReason: PRTypeInfo[0]['value'],  // 采购原由
			operateMarks: '', // 需求说明
		}
		// 获取订单信息
		if(this.props.params.orderid){
			this.getOrderInfo();
		}
	}
	// 获取餐厅信息（PR订单）
  getOrderInfo(nextPageNum){
		let self = this;
		request('/McdEpsApi/joywok/noproject/getOrderStoreInfo',{
    	method:'POST',
    	body:JSON.stringify({
    		param:{
    				eid:eid,
		    		condition:{
		    			orderNumber:self.props.params.orderid
		    		}
    		}			
    	})
    }).then(function(resp){
    	if(resp['data']['success']==false){
    	}else{
    		let data = resp['data']['body'];
    		self.setState({orderState:data["orderState"],orderNumber:data["orderNumber"],updateDate:data["updateDate"],'purchasingReason' : data['purchasingReason'], 'mobile':data['mobile'], 'operateMarks':data['operateMarks'], 'loading':false,fileCount:data['fileCount'],uploadPhaseName:data['uploadPhaseName']});
    	}
    })
  }
	
	cacelHandler(){
		console.log('cacelHandler',this,'123123123123');
		let self = this;
		if(this.state.orderState){
			let rejectDialog = MemoDialog({
				title:'是否取消该订单?',
				defaultValue: self.cancelMemo ?  self.cancelMemo : '',
				btnIconClass:'icon-reject',
	      btnVal: '取消',
				placeholder: '取消订单必须输入备注...', 
	      memorequired: true,
				changeData:function(){},
	      onBtnClick: (memo,callback)=>{  
	      	let datas = {
		    		param:{
	    				eid:eid,
			    		record:{
			    			updateDate:self.state.updateDate,
			    			orderNumber:self.state.orderNumber,
			    			orderState:self.state.orderState
			    		}
		    		}			
		    	}
				  request('/McdEpsApi/joywok/noproject/cancelSave',{
			    	method:'POST',
			    	body:JSON.stringify(datas)
			    }).then(function(resp){
			    	if(resp['data']['success']==false){
			    	}else{
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
	      onClose: (memo)=>{  
	      	self.cancelMemo = memo;
					// console.log('approve reject onClose:')
	      },
			});
		}else{
			jw.closeWebView();
		}
	}
	// 表单校验
	checkData(){
		let datas = this.state;
		console.log('checkData:',datas);
		// 校验电话号码
		if(datas.mobile=='' || $.trim( datas.mobile )==''){
			this.errorAlert('请输入移动电话');
			return false;
		}else if(!(/^[0-9]{8,11}$/.test(datas.mobile))){
			this.errorAlert('请输入正确的移动电话');
			return false;
		}
		// 校验需求说明
		if(datas.operateMarks=='' || $.trim( datas.operateMarks )=='' ){
			this.errorAlert('请输入需求说明');
			return false;
		}
		// 校验采购原由，如果采购原由为1，那么通过，采购原由为2，提示"请在pc端操作"，之后将采购原由的值置为1
		// if(datas.purchasingReason=='2'){
		// 	this.errorAlert('更新/报废的采购请在pc端操作');
		// 	// this.setState({'purchasingReason' : '1'})
		// 	return false;
		// }
		return true;
	}

	// 错误弹框
	errorAlert(msg){
		AlertBase({
			tip: msg,
			icon: 'icon-save-error',
			onOk: ()=>{}
		});
	}
	
	createHandler(){
		console.log('createHandler')
		let self = this;
		// 校验数据是否正确
		if(this.checkData() == false) return;
		// 确认提交
		ConfirmBase({
			tip: '确认要提交非项目订单？',
			icon: 'icon-repair-alert',
			onOk: ()=>{
				// 数据保存中
				let saving = AlertBase({
					tip: '正在提交非项目订单',
					icon: 'icon-saving',
					okBtn: {
						text: '提交中...'
					},
					onOk: ()=>{
						console.log('onOk')
					}
				});
				let record={
					storeNumber: PRStoreInfo.storeNumber,
					mobile: this.state.mobile,
					email: PRStoreInfo.email,
					purchasingReason: this.state.purchasingReason,
					// scrapNumber:报废单号,（采购原由是报废时必填）
					// scrapRemark:报废备注,
					operateMarks: this.state.operateMarks
				};
				if(self.props.params.orderid){
					record.orderNumber = self.props.params.orderid;
				}
				let PostUrlArray = {'equipment':'/McdEpsApi/joywok/noproject/submitEQPRInfo', 'project':'/McdEpsApi/joywok/noproject/submitCOPRInfo', 'it':'/McdEpsApi/joywok/noproject/submitITPRInfo'};
				request(PostUrlArray[this.props.params.objecttype],{
					method:'POST',
					body:JSON.stringify({
            param:{
              eid:eid,
              record:record,
            }
        }),
					credentials: 'same-origin',
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(function(data){
					console.log('submitNonProjectOrder data:======',data);
					saving.close();
			    console.log(data.data.success,"data");
			    if(data.data.success){
			    	AlertBase({
							tip: '已成功提交',
							icon: 'icon-save-success',
							onOk: ()=>{
								// return;
								setTimeout(function(){
									jw.closeWebView();
								},500)
							}
						});
			    }
				}).catch(function(error) {
			  })
				// setTimeout(()=>{
				// 	saving.close();
				// 	// 提交成功
				// 	AlertBase({
				// 		tip: '已成功提交',
				// 		icon: 'icon-save-success',
				// 		onOk: ()=>{
				// 			console.log('onOk')
				// 		}
				// 	});
				// },500)
			},
			onCancel: ()=>{
				saving.close();
				// jw.closeWebView();
				// 提交失败
				// AlertBase({
				// 	tip: '这里是错误示例',
				// 	icon: 'icon-save-error',
				// 	onOk: ()=>{
				// 		console.log('onOk')
				// 	}
				// });
			}
		});
	}
	
	// 组件加载完毕
  componentDidMount(){
    let self = this;
    this.setHeight();
    let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
    $(window).resize(function(){
    	self.setHeight();
    	setTimeout(function(){
    		let clientHeightNow = document.documentElement.clientHeight || document.body.clientHeight;
    		if(clientHeight>clientHeightNow){
    			$('.eps-create-nonproject-c').stop().animate({scrollTop:'100000px'})
    		}else{
    		}
    	},100)
    })
  }
  componentDidUpdate(){
    let self = this;
    this.setHeight();
  }
  setHeight(){
    let self = this;
    setTimeout(function(){
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let footer = $('.eps-footer').height() || 0;
      let fileHeight = $('.file-num-specail').height()||0;
      $('.eps-create-nonproject-c').css({height:clientHeight-footer-fileHeight+'px'});
    },0)
  }
  openFileView(data){
		var url = EpsWebRoot+'/#'+data;
		let datas = this.state;
		window.upTabsData('file','cache',datas);
		jw.pushWebView(url);
	}
	render(){
		let self = this;
	 	let typename;
	 	let data = this.state;
	 	switch(this.props.params.objecttype){
	 		case 'equipment':
	 			typename = '设备';
	 			break;
	 		case 'project':
	 			typename = '工程';
	 			break;
	 		case 'it':
	 			typename = 'IT';
	 			break;
	 		default :
	 			typename = '设备'
	 			break;
	 	}
	 	// 组织显示内容
		if(this.props.params.orderid && this.state.loading){
		return (<div className="todos-loading">
				<img src="images/loading.gif" />
				<span>加载中</span>
			</div>)
		}else{
			let orderid = window.location.href.split('?updateDate')[0].split('/');
			orderid = orderid[orderid.length-1];
			let fileUrl = '/file/'+orderid;
			if(window.isUnfinishedOrHistory()){
				fileUrl = '/filehistory/'+orderid
			}
			let fileList;
			if(this.props.params.orderid){
				fileList = <div className="file-num-specail border-line-h before" onClick={(e)=>this.openFileView(fileUrl)}>
					<i className="icon-file"></i>
					<span className="preview-file">查看附件{ data['fileCount'] && data['fileCount']!=0?('('+data['fileCount']+')'):''}</span>
				</div>
			}else{

			}
			return (
				<div className="eps-create-nonproject">
					<div className="eps-create-nonproject-c">
						<header className="header" ref="header">
							<div className="header-bg"></div>
							<div className="header-bg-2"></div>
							<div className="header-c">
								<SimpleUserCard userinfo={ userinfo }/>
							</div>
						</header>
						<div className="eps-create-body">
							<div className="eps-box-wrap">
								<div className="eps-box">
									<div className="eps-item-info"><dt><label>餐厅编号</label></dt><dd><font>{ PRStoreInfo.storeNumber }</font></dd></div>
									<div className="eps-item-info"><dt><label>餐厅名称</label></dt><dd><font>{ PRStoreInfo.storeName }</font></dd></div>
									<div className="eps-item-info"><dt><label>公司编号</label></dt><dd><font>{ PRStoreInfo.companyCode }</font></dd></div>
									<div className="eps-item-info"><dt><label>邮件地址</label></dt><dd><font>{ PRStoreInfo.email }</font></dd></div>
									<div className="eps-item-info"><dt><label>餐厅电话</label></dt><dd><font>{ PRStoreInfo.tel }</font></dd></div>
									<div className="eps-item-info"><dt><label>餐厅地址</label></dt><dd><font>{ PRStoreInfo.address }</font></dd></div>
									<div className="eps-item-info"><dt><label>采购类型</label></dt><dd><font>{ typename }</font></dd></div>
									<div className="eps-item-info">
										<dt><label><font>移动电话</font><i className="icon-required"></i></label></dt>
										<dd>
											<InputItem className="jw-inline" type="number" placeholder="" value={ this.state.mobile } onChange={ v => { self.setState( {'mobile' : v} ); } }></InputItem>
										</dd>
									</div>
									<div className="eps-item-info">
										<dt><label><font>采购原由</font><i className="icon-required"></i></label></dt>
										<dd>
											<List style={{ backgroundColor: 'white' }}  className="picker-list jw-list eps-inline">
												<Picker data={ PRTypeInfo } cols={1} className="forss" value={ [this.state.purchasingReason] } onChange={ v => { self.setState( {'purchasingReason' : v[0]} ); } }>
								          <List.Item arrow="horizontal"></List.Item>
								        </Picker>
							        </List>
							      </dd>
							    </div>
								</div>
							</div>
							<div className="eps-box-wrap eps-box-item">
								<div className="eps-box eps-purchase-desc">
									<label><font>需求说明</font><i className="icon-required"></i></label>
									<div className="eps-textarea-3l"><TextareaItem placeholder="请输入需求描述。" value={ this.state.operateMarks } autoHeight rows="3" onChange={ (v) => { self.setState( {'operateMarks' : v} ); } }></TextareaItem></div>
								</div>
							</div>
						</div>
					</div>
					{fileList}
					<div className="eps-footer">
						<div className="eps-btn-wrap">
							<div className="eps-btn eps-btn-default-small" onClick={(e)=>this.cacelHandler(e)}>取消</div>
							<div className="eps-btn eps-btn-warning-large" onClick={ this.createHandler }>提交</div>
						</div>
					</div>
				</div>
			);
		}
	}
}
export default connect(function(state){return state})(Create);