/**
 * 创建设备维修
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import EpsDatePicker from '../../components/Common/EpsDatePicker';
import SimpleUserCard from '../../components/Common/SimpleUserCard';
import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';
import DeviceList from '../../components/Repair/DeviceList';
import { InputItem } from 'jw-components-mobile';
import request from '../../utils/EpsRequest';
import UploadFile from '../../components/Common/UploadFile';
// import { openChart } from '../../constants';

class CreateDevice extends Component {
	constructor(props) {
		super(props);
		this.state = {
			'timedisabled' : true,
			'memo': ''
		};
		this.gotoAddDevice = this.gotoAddDevice.bind(this);
		this.dateChange = this.dateChange.bind(this);
		this.addPic = this.addPic.bind(this);
		this.removePic= this.removePic.bind(this);

	}
	selectTime(e, key){
		console.log('selectTime:',key, key == 'urgent')
		key == 'urgent' ? this.setState({'timedisabled': true}) : this.setState({'timedisabled': false});
		$(ReactDOM.findDOMNode(this.refs.timeRadio)).find('i').removeClass('icon-radio-checked').addClass('icon-radio-normal');
		$(e.target).closest('.time-option').find('i').removeClass('icon-radio-normal').addClass('icon-radio-checked');
		let dispatch=this.props.dispatch;
		dispatch({
			type:'repairdevice/changeRepair',
			payload:{
				isRepair:key=='urgent'?'1':'0',
			}
		})
	}
	cacelHandler(){
		console.log('cacelHandler')
		jw.closeWebView();
	}
	// 打开添加设备页面
	gotoAddDevice(){
		let url = EpsWebRoot+'/#/repairing/add-edit/equipment';
    console.log('url:',url)
    jw.pushWebView(url);
	}
	createHandler(){
		console.log('createHandler');
		let record=_.clone(this.props.repairdevice.record);
		let equipmentList = record['equipmentList'];
		let hasId = {};
		let hasSame = true;
    console.log(record,"rmrk")
    if(record.rmrk==''){
      console.log("走了吗？")
      AlertBase({
        tip: '备注不能为空！',
        icon: 'icon-save-error',
        onOk: ()=>{}
      });
      return 
    }
		if(typeof(equipmentList) == 'undefined' || equipmentList.length==0){
			AlertBase({
				tip: '维修设备不能为空！',
				icon: 'icon-save-error',
				onOk: ()=>{}
			});
			return
		}

		_.each(equipmentList,function(item,index){
			if(index!=0){
				if(hasId[item['vendorNumber']]){
				}else{
					hasSame = false
				}
			}else{
				hasId[item['vendorNumber']] = true;
			}
		})
		console.log(this.props.repairdevice,'这个里面的数据是设呢');
		if(hasSame == false){
			AlertBase({
				tip: '维修商不同，请选择相同维修商！',
				icon: 'icon-save-error',
				onOk: ()=>{}
			});
			return
		}
    if(equipmentList.length<1){
      AlertBase({
        tip: '至少要选择一个设备！',
        icon: 'icon-save-error',
        onOk: ()=>{}
      });
      return
    }
		let self=this;
		// 确认提交
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

        // if(record['isRepair'] == '0'){
        record['dateAppointment'] = moment(record['dateAppointment']*1000).format('YYYY-MM-DD HH:mm'); 
        // }else{
        //   record['dateAppointment'] = '';
        // }
        record['storeNumber'] = userinfo['storeCode'];
         _.map(record.equipmentList,function(item){
          delete  item.epsid;
         }) 
				let url='/McdEpsApi/joywok'+'/repair/submitEQOrder';
				console.log(record,"submitEQOrder:data")
				request(url,{
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
					saving.close();
			    console.log(data.data.success,"data");
			    if(data.data.success){
			    	AlertBase({
							tip: '已成功提交',
							icon: 'icon-save-success',
							onOk: ()=>{
								setTimeout(function(){
									jw.closeWebView()
								},500)
							}
						});
			    }
				}).catch(function(error) {
			  })
			},
			onCancel: ()=>{
				//取消提交
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

 //添加图片
  addPic(datas){
    let dispatch = this.props.dispatch;
    let data = this.props.repairdevice;
    let record = data['record'];
    record['file'] = record['file'].concat(datas);
    dispatch({
      type:'repairdevice/changeData',
      payload:{
        record:record
      }
    })
  }
  removePic(resid){
    let dispatch = this.props.dispatch;
    let data = this.props.repairdevice;
    let record = data['record'];
    let nowData = []
    _.each(record['file'],function(i,index){
      if(resid != i["resid"]){
        nowData.push(i)
      }
    })
    record['file'] = nowData;
    dispatch({
      type:'repairdevice/changeData',
      payload:{
        record:record
      }
    })
  }
  changePic(resid,id){
    let dispatch = this.props.dispatch;
    let data = this.props.repairdevice;
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
    dispatch({
      type:'repairdevice/changeData',
      payload:{
        record:record
      }
    })
  }
  //添加备注
  memoChange(e){
    const text = e.trim()
    let dispatch = this.props.dispatch;
    let data = this.props.repairdevice;
    let record = data['record'];
    record['rmrk'] = text;
    dispatch({
      type:'repairdevice/changeData',
      payload:{
        record:record
      }
    })
  }

	// 组件加载完毕
  componentDidMount(){
    let self = this;
    console.log(_,'这个可以输出是什么')
   // 安卓或者web端 可监听scorll来设置导航是否fixed
    this.headerOffset = $('.eps-create-device-body .eps-box-wrap').offset();

    // 监听添加设备事件
		PubSub.subscribe('get:child:select:device',function(evt,data){
      console.log("subscribe('get:child:select:device':",data['data'])
      let newData=[];
      let dispatch=self.props.dispatch;
      let devicedata = self.props.repairdevice;
      let record = devicedata['record'];
      let keys=[];
      _.each(record.equipmentList,function(i){
        keys.push(i.epsid);
      })
      let deviceNames=[];
      let indexFlag=0;
      let isFlag=true;
      _.map(data['data'],function(i){
        let item={};
        item.subCategory=i.subCategoryCode,
        item.faCategory=i.categoryCode,
        item.vendorNumber=i.vendorNumber,
        item.deviceNumber=i.deviceNumber,
        item.vendorName=i.vendorName,
        item.equipmentType=i.equipmentType,
        item.equipmentBrand=i.equipmentBrand,
        item.epsid=i.epsid,
        item.deviceName=i.deviceName;
        item.deviceNumber=i.deviceNumber;
        _.each(keys,function(j){
          if(j==i.epsid){
            isFlag=false;
            deviceNames.push(i.deviceName);
          }
        })
        newData.push(item);
        console.log(deviceNames,"deviceNames")
      })
      if(!isFlag){
          AlertInfoBase({
            text:'以下设备已被添加,此次不会重复添加:',
            deviceNames:deviceNames,
          })
        }
			let UnionData=_.union(newData,record.equipmentList)
			UnionData = _.uniq(UnionData,function(i){
				return i['epsid']
			});
      console.log(UnionData,'过滤的数据');
			record.equipmentList=UnionData;
			dispatch({
				type:'repairdevice/changeData',
				payload:{
					record:record,
				}
			})
		});
    this.setHeight()
    if(isAndroid()){
      $( window ).resize(function() {
        console.log('window resize')
        self.setHeight();
      });
    }
  }
  dateChange(value){
    let dispatch = this.props.dispatch;
    let data = this.props.repairdevice;
    let record = data['record'];
    // console.log(value,"aaaaaaaa",data,Date.parse(new Date()))
    // let presentDate=Date.parse(new Date())/1000;
    // console.log(presentDate,value)
    // // let initialDate=_.clone(record['dateAppointment']);
    // if(parseInt(value)-presentDate>14400){
    //   console.log('true')
    // }else{
    //   console.log('false')
    // }
    record['dateAppointment'] = value;
    dispatch({
      type:'repairdevice/changeData',
      payload:{
        record:record
      }
    })
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
			console.log('setHeight', clientHeight-header-top-footer-upload);
      $('.eps-cs-content').css({minHeight:clientHeight-header-top-footer-upload+'px'});
			// $('.eps-empty-tip-arrow').css({height:clientHeight-header-top-footer-upload-30+'px'});
    },0)
  }
	render(){
		let self = this;
	 	
	 	let data=this.props.repairdevice;
    console.log('Marlin x', data);
		return (
			<div className="eps-create-device">
				<header className="header clear-margin specail">
          <div className="header-bg"></div>
          <div className="header-bg-2"></div>
          <div className="header-c"></div>
        </header>
				<div className="eps-create-device-body">
					<div className="eps-box-wrap">
						<div className="eps-box eps-box-with-addbtn">
							<div className="box-title">报修类型</div>
							<div className="box-content">
								<div className="select-time-radio" ref="timeRadio">
									<div className="time-option option-order">
										<i className="icon-radio-normal" onClick={ (e)=>{this.selectTime(e,'order')} }></i>
									</div>
									<EpsDatePicker dateChange={this.dateChange} value={data.record['dateAppointment']} disabled={ this.state.timedisabled }><label>预约</label></EpsDatePicker>
									<div className="time-option option-urgent ">
										<i className="icon-radio-checked" onClick={ (e)=>{this.selectTime(e,'urgent')} }></i><label>紧急</label>
									</div>
								</div>
							</div>
							<div className="repairstores-specail">
								<InputItem className="jw-inline eps-form-memo" placeholder="" value={ data.record.rmrk }  onChange={(e)=>this.memoChange(e)}>备注</InputItem>
							</div>
							<div className="btn-wrap"><i className="icon-add-graybg" onClick={ this.gotoAddDevice }></i></div>
						</div>
					</div>
					<div className="eps-cs-content">
						<DeviceList equipmentList={this.props.repairdevice.record.equipmentList} deleteBtnShow={ true } />
					</div>
					<UploadFile
						fix={false}
						fileData={data["record"]["file"]}
						addPic={(e)=>this.addPic(e)}
						removePic={(e)=>this.removePic(e)}
						changePic={(index,id)=>this.changePic(index,id)}>
					</UploadFile>
				</div>
				<div className="eps-footer">
					<div className="eps-btn-wrap">
						<div className="eps-btn eps-btn-default-small" onClick={ this.cacelHandler }>取消</div>
						<div className="eps-btn eps-btn-warning-large" onClick={()=> this.createHandler() }>提交</div>
					</div>
				</div>
			</div>
		);
	}
}
export default connect(function(state){ return state})(CreateDevice);