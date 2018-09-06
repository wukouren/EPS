/**
 * 餐厅确认评价  此文件没用 废弃
 * #/nonproject/storeconfirm/equipment 非项目采购设备订单确认及评价
 * #/nonproject/storeconfirm/project 非项目采购工程订单确认及评价
 * #/nonproject/storeconfirm/it 非项目采购IT订单确认
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import HeaderCard from './../../components/NonProject/HeaderCard';
import { AlertBase, ConfirmBase } from '../../components/Common/EpsModal';
import TableList from './../../components/NonProject/TableList';
import { List, InputItem, Picker } from 'jw-components-mobile';
import { EvaluateDialog } from '../../components/Common/EpsModal';

class StoreConfirm extends Component {
	constructor(props) {
		super(props);
		this.type = this.props.params.type;
		this.state = {
			telphone: '',
			reason: ''
		}
		this.formDataValue = {};
	}

	openWebView(data){
		var url = window.location.origin+'/#'+data
		jw.pushWebView(url);
	}

	// 拒绝订单
	reject(){
		console.log('reject')
		let self = this;
		let rejectDialog = MemoDialog({
			title:'是否拒绝该订单?',
			defaultValue: self.rejectMemo ?  self.rejectMemo : '',
			btnIconClass:'icon-reject',
      btnVal: '拒绝',
			placeholder: '拒绝必须输入备注...', 
      memorequired: true, 
      onBtnClick: (memo)=>{  
      	self.rejectMemo = memo;
        console.log('storeconfirm reject onBtnClick:',memo)
      },
      onClose: (memo)=>{  
      	self.rejectMemo = memo;
				console.log('storeconfirm reject onClose:')
      },
		});
	}

	// 通过订单
	agree(){
		let self = this;
		let agreeDialog = MemoDialog({
			title:'是否确认通过？',
			defaultValue: self.agreeMemo ?  self.agreeMemo : '',
      btnVal: '通过',
			placeholder: '选择输入备注...', 
      memorequired: false, 
      onBtnClick: (memo)=>{  
      	self.agreeMemo = memo;
        console.log('storeconfirm agree onBtnClick:',memo)
      },
      onClose: (memo)=>{  
      	self.agreeMemo = memo;
				console.log('storeconfirm agree onClose:',memo)
      },
		});
	}

	// 评价信息change
	changeEvaluateData(values, schema){
		console.log('storeconfirm changeEvaluateData',values)
		let self = this;
		_.each(values,(item)=>{
			self.formDataValue[item.name] = item.defaultValue;
		})
	}

	// 评价
	evaluate(){
		let self = this;
		let formData = {
			schema:[
				{
					name: 'rate_1', element:'Rate',
					label:'工作人员标准制服',
					defaultValue: this.formDataValue['rate_1'] ? this.formDataValue['rate_1'] : 1,
					attr:{
						empty:<i className="icon-star"></i>,
						full:<i className="icon-star-active"></i>
					},
					rules:[]
				},{
					name: 'rate_2', element:'Rate',
					label:'佩戴工卡',
					defaultValue: this.formDataValue['rate_2'] ? this.formDataValue['rate_2'] : 1,
					attr:{
						empty:<i className="icon-star"></i>,
						full:<i className="icon-star-active"></i>
					},
					rules:[]
				},{
					name: 'rate_3', element:'Rate',
					label:'服务商响应时间',
					defaultValue: this.formDataValue['rate_3'] ? this.formDataValue['rate_3'] : 1,
					attr:{
						empty:<i className="icon-star"></i>,
						full:<i className="icon-star-active"></i>
					},
					rules:[]
				},{
					name: 'rate_4', element:'Rate',
					label:'工作人员服务态度',
					defaultValue: this.formDataValue['rate_4'] ? this.formDataValue['rate_4'] : 1,
					attr:{
						empty:<i className="icon-star"></i>,
						full:<i className="icon-star-active"></i>
					},
					rules:[]
				},{
					name: 'rate_5', element:'Rate',
					label:'服务质量',
					defaultValue: this.formDataValue['rate_5'] ? this.formDataValue['rate_5'] : 1,
					attr:{
						empty:<i className="icon-star"></i>,
						full:<i className="icon-star-active"></i>
					},
					rules:[]
				},{
					name: 'rate_6', element:'Rate',
					label:'现场清理',
					defaultValue: this.formDataValue['rate_6'] ? this.formDataValue['rate_6'] : 1,
					attr:{
						empty:<i className="icon-star"></i>,
						full:<i className="icon-star-active"></i>
					},
					rules:[]
				},{
					name:'feedback',element:'Textarea',
					defaultValue:this.formDataValue['feedback'] ? this.formDataValue['feedback'] : '',
					attr:{
						className:'appraisal-form-feedback',
						placeholder:'请输入备注...'
					},
					rules:[]
				}
			],
			buttons:false,
			changeData:this.changeEvaluateData.bind(this)
		}
		let evaluateDialog = EvaluateDialog({
			title:'请您评价',
			formData: formData,
      onBtnClick: (data)=>{
      	this.formDataValue = _.extend(this.formDataValue,data);
        console.log('storeconfirm evaluate onBtnClick:',data)
      },
      onClose: (data)=>{  
      	this.formDataValue = _.extend(this.formDataValue,data);
				console.log('storeconfirm evaluate onClose:',data)
      },
		});
	}

	onOk(){
		// it 无需评价
		if(this.type == 'it'){
			this.agree();
		// 需评价
		}else{
			this.evaluate();
		}
	}
	
	// 组件加载完毕
  componentDidMount(){
    let self = this;
  }
	render(){
		let self = this;
		return (
			<div className="eps-nonproject-store">
				<header className="header" ref="header">
					<div className="header-bg-specail">
						<div className="header-bg"></div>
						<div className="header-bg-2"></div>
					</div>
					<div className="header-c">
						<HeaderCard></HeaderCard>
					</div>
				</header>
				<div className="eps-ns-header">
					<div className="eps-box-wrap">
						<i className="eps-list-card-bgicon"></i>
						<div className="eps-box small-padding">
							<div className="box-title"><font>{ this.props.params.type=='it' ? '餐厅确认信息' : '餐厅评价信息' }</font></div>
							<div className="eps-item-info-inline">
								<div className="eps-item-info"><dt><label>流程单号</label></dt><dd><font>201610310001</font></dd></div>
								<div className="eps-item-info"><dt><label>供应商</label></dt><dd><font>申双铁</font></dd></div>
							</div>
							<div className="eps-item-info"><dt><label>下单日期</label></dt><dd><font>2016.10.31 12:51</font></dd></div>
							<div className="eps-item-info"><dt><label>联系电话</label></dt><dd><font>18500254455</font></dd></div>
						</div>
					</div>
					<div className="eps-box-wrap eps-box-item">
						<div className="eps-box">
						<TableList />
						</div>
					</div>
				</div>
				<footer className="footer">
					<div className="log-btn" onClick={(e)=>this.openWebView('/approval')}>
						<i className="icon-log"></i>
						<span>流程日志</span>
					</div>
					<div className="eps-btn-wrap">
						<div className="eps-btn eps-btn-default-small" onClick={(e)=>this.reject(e)}>拒绝</div>
						<div className="eps-btn eps-btn-warning-large" onClick={(e)=>this.onOk(e)}>确认</div>
					</div>
				</footer>
			</div>
		);
	}
}
export default connect()(StoreConfirm);