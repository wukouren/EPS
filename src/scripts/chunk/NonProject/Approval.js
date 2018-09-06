/**
 * 非项目订单审批流程（含设备／工程／IT）(审批节点含： OC审批，OM审批，DO审批，GM审批，DOA审批，送货调整DOA审批)
 * 除IT采购的OC审批流程有表单需填写外，其它流程都一样
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import HeaderCard from './../../components/NonProject/HeaderCard';
import TableList from './../../components/NonProject/TableList';
import Form from "jw-form/dist/mobile";

import { List } from 'jw-components-mobile';
import { MemoDialog,AlertBase, ConfirmBase ,EvaluateDialog} from '../../components/Common/EpsModal';
import request from '../../utils/EpsRequest';

import { getDict,getUsers,openChart,orderStatus} from '../../constants';

class Approval extends Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.type = this.props.params.type;
		this.combinePurchaseContent = this.combinePurchaseContent.bind(this);
    this.EvaluateRefuse = this.EvaluateRefuse.bind(this);
    this.callback = this.callback.bind(this);
	}

  turnMoney(data){
    return Number(data).formatMoney(2,'','')
  }

	// 拒绝订单
	reject(){
		console.log('reject')
		let self = this;
    let type=this.props.location.query.type;
    let objecttype=this.props.params.objecttype;
    if(type=='4'){
     //这里调用餐厅评价接口
     if(objecttype=='it'){
        //调用it餐厅评价
         let approveFlg='REFUSE';
         let agreeDialog = MemoDialog({
            title:'是否拒绝该订单',
            value: self.agreeMemo ?  self.agreeMemo : '',
            btnVal: '拒绝',
            btnIconClass:'icon-reject',
            placeholder: '拒绝必须输入备注！', 
            memorequired: true,  
            onBtnClick: (memo,callback)=>{  
              self.agreeMemo = memo;
              self.ITEvaluate(memo,approveFlg,callback);
              
            },
            onClose: (memo)=>{  
              self.agreeMemo = memo;
              console.log('approve agree onClose:',memo)
            },
          });
       }else{ 
          self.EvaluateRefuse();
       }     
    }else{
      let rejectDialog = MemoDialog({
        title:'是否拒绝该订单?',
        value: self.rejectMemo ?  self.rejectMemo : '',
        btnIconClass:'icon-reject',
        btnVal: '拒绝',
        placeholder: '拒绝必须输入备注...', 
        memorequired: true, 
        onBtnClick: (memo,callback)=>{  
          self.rejectMemo = memo;
          let approveFlg='REFUSE';
          console.log('approve reject onBtnClick:',memo ,type);
          self.submitOrder(memo,approveFlg,callback);
        },
        onClose: (memo)=>{  
          self.rejectMemo = memo;
          console.log('approve reject onClose:')
        },
      });
    }

	}

	// 通过订单
	agree(){
		let self = this;
		let type=this.props.location.query.type;
    let objecttype=this.props.params.objecttype;
    if(type=='4'){
      // 餐厅评价 IT订单也增加五星评价
      self.EvaluateAgree()
      return;

     //这里调用餐厅评价接口
       // if(objecttype=='it'){
       //  //调用it餐厅评价
       //   let approveFlg='PASS';
       //   let agreeDialog = MemoDialog({
       //      title:'请您评价',
       //      value: self.agreeMemo ?  self.agreeMemo : '',
       //      btnVal: '完成',
       //      placeholder: '请输入备注......', 
       //      memorequired: false, 
       //      onBtnClick: (memo,callback)=>{  
       //        self.agreeMemo = memo;
       //        self.ITEvaluate(memo,approveFlg,callback); 
       //      },
       //      onClose: (memo)=>{  
       //        self.agreeMemo = memo;
       //        console.log('approve agree onClose:',memo)
       //      },
       //    });
       // }else{ 
       //   self.EvaluateAgree()
       // }
      
    }else{
      let agreeDialog = MemoDialog({
        title:'是否确认通过？',
        value: self.agreeMemo ?  self.agreeMemo : '',
        btnVal: '确认',
        placeholder: '选择输入备注...', 
        memorequired: false, 
        onBtnClick: (memo,callback)=>{  
          self.agreeMemo = memo;
          let approveFlg='PASS';
          self.submitOrder(memo,approveFlg,callback);
        },
        onClose: (memo)=>{  
          self.agreeMemo = memo;
          console.log('approve agree onClose:',memo)
        },
      });
    }

	}

   //IT 餐厅评价
  ITEvaluate(memo,approveFlg,callback){
   console.log(memo,approveFlg,"it餐厅评价")
   let self=this;
      request('/McdEpsApi/joywok/noproject/submitITStoreEvaluate',{
        method:'POST',
        body:JSON.stringify({
          param:{
            eid:eid,
            record:{
              orderNumber: self.props.approval.orderNumber,
              updateDate: self.props.approval.updateDate,
              orderState: self.props.approval.orderState,
              approveFlg: approveFlg,
              operateMarks: memo,
            }
          }
        })
      }).then(function(resp){
        // 把提交中按钮置为原样
        if(typeof(callback)=='function'){
          callback(true);
        }
        if(resp['data']['success']==false){
        }else{
          AlertBase({
            tip: '已成功提交',
            icon: 'icon-save-success',
            onOk: ()=>{
              jw.closeWebView();
            }
          });
        }
      })
  }

 //餐厅评价
  EvaluateAgree(){
    let objecttype=this.props.params.objecttype;
    let EvaluateUrl='';
    switch(objecttype){
      case 'equipment' :
      EvaluateUrl='/McdEpsApi/joywok/noproject/submitEQStoreEvaluate' ;
      break ;
      case 'project' :
      EvaluateUrl='/McdEpsApi/joywok/noproject/submitCOStoreEvaluate' ;
      break ;
      case 'it' :
      EvaluateUrl='/McdEpsApi/joywok/noproject/submitITStoreEvaluate' ;
      break ;
    }
    console.log(window.NoProjectEvaluate,"NoProjectEvaluate");
    let self=this;
    if(this.showScrapTip!=0){
      let storeScrapList = self.props.approval['storeScrapList'];
      let ScrapList = [];
      ScrapList = self.props.approval['partList']
      let ScrapError = ''
      for(var i in ScrapList){
        if(_.filter(storeScrapList,function(item){
          return item['deviceName'] == ScrapList[i]['deviceName']
        }).length!=0){

        }else{
          ScrapError = ScrapList[i]['deviceName'];
          break;
        }
      }
      console.log(ScrapError,this.showScrapTip,'这个是啥')
      if(ScrapError.length!=0){
        AlertBase({
          tip: <div className="">请参照 “ <span style={{color:'#4174d9'}} onClick={(e)=>{
            // alert('等待Mcd提供连接！！');
            jw.previewDoc({
               url:'http://ssi.mcd.com.cn:8080/McdEpsApi/joywok/common/getFile?fileId=TMP00000000000000000000000000030',
               name:'资产查找指引',
               type:'application/pdf'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
             },{
               success:function(){
               }
             })
          }}> 资产查找指引</span> ” {
            ScrapError
          }<br/>挑选对应的报废资产，如果<br/>没有对应选项，请联系<br/>EPS Support<br/> (eps@cn.mcd.com)</div>,
          onOk: ()=>{}
        });
        return 
      }
    }

    // if(this.showScrapTip!=0 && storeScrapList.length==0){
    //   AlertBase({
    //     tip: '资产报废不能为空！！',
    //     icon: 'icon-save-error',
    //     onOk: ()=>{}
    //   });
    //   return 
    // }
    EvaluateDialog({
      title:'请输入评价',
      btnIconClass:'icon-check',
      btnVal: '完成',
      formData:{
        schema:_.map(window.NoProjectEvaluate,function(val,key){ 
          return {
            name: key, element:'Rate',
            label:val,
            defaultValue:(typeof(window.EvaluateCache)!='undefined'?window.EvaluateCache[key]:0),
            attr:{
              empty:<i className="icon-star"></i>,
              full:<i className="icon-star-active"></i>
            },
            rules:[]
          }
        }).concat({
          name:'operateMarks',element:'Textarea',
          defaultValue:(typeof(window.EvaluateCache)!='undefined'?window.EvaluateCache['operateMarks']:''),
          attr:{
            className:'appraisal-form-feedback',
            placeholder:'请输入备注...'
          },
          rules:[]
        }),
        buttons:false,
        changeData:this.changeData.bind(this)
      },
      rules:function(data){
        for(var i in window.NoProjectEvaluate){
          if(data[i]==0){
            AlertBase({
              tip: '请输入'+window.NoProjectEvaluate[i]+'的评价!',
              icon: 'icon-save-error',
              onOk: ()=>{}
            });
            return false;
          }
        }
        let hasOne = false;
        _.each(window.NoProjectEvaluate,function(i,key){
          if(data[key]<=2){
            hasOne = true
          }
        })
        if(hasOne && data['operateMarks'].length==0){
          AlertBase({
            tip: '由于评星较低，请输入备注！！',
            icon: 'icon-save-error',
            onOk: ()=>{}
          });
          return false
        }
        return true
      },
      onBtnClick:(data,callback)=>{
        console.log(data,"data");
        let orderid=self.props.params.orderid;
        let eid=userinfo.employee_id;
        let updateDate=self.props.approval['updateDate'];
          request(EvaluateUrl,{
            method:'POST',
            body:JSON.stringify({
              param:{
                  eid:eid,
                  record:_.extend({
                    orderNumber: self.props.approval.orderNumber,
                    updateDate: self.props.approval.updateDate,
                    orderState: self.props.approval.orderState,
                    approveFlg: 'PASS',
                    storeScrapList:self.props.approval.storeScrapList || []
                  },data)
              }     
            })
          }).then(function(resp){
            // 把提交中按钮置为原样
            if(typeof(callback)=='function'){
              callback(true);
            }
            if(resp['data']['success']==false){
              
            }else{
              AlertBase({
                tip: '已成功提交',
                icon: 'icon-save-success',
                onOk: ()=>{
                  jw.closeWebView();
                }
              });
            }
          })
       },
       onClose: (memo)=>{  
          // self.rejectMemo = memo;
          console.log('approve reject onClose:')
       },
    });
  }

  //餐厅拒绝评价
  EvaluateRefuse(){
    let EvaluateUrl='';
    let objecttype=this.props.params.objecttype;
    switch(objecttype){
      case 'equipment' :
      EvaluateUrl='/McdEpsApi/joywok/noproject/submitEQStoreEvaluate' ;
      break ;
      case 'project' :
      EvaluateUrl='/McdEpsApi/joywok/noproject/submitCOStoreEvaluate' ;
      break ;
      case 'it' :
      EvaluateUrl='/McdEpsApi/joywok/noproject/submitITStoreEvaluate' ;
      break ;

    }
    let orderid=this.props.params.orderid;
    let eid=userinfo.employee_id;
    let self=this;
    let approvalData=this.props.approval;
    let epsDialog = MemoDialog({
      title:'是否拒绝该订单',
      value: self.rejectMemo ?  self.rejectMemo : '',
      btnIconClass:'icon-reject',
      btnVal: '拒绝',
      placeholder: '拒绝必须输入备注...',
      changeData:function(){},
      memorequired: true, 
      onBtnClick: (memo,callback)=>{ 
        console.log(memo,'memo')
          request(EvaluateUrl,{
            method:'POST',
            body:JSON.stringify({
              param:{
                eid:eid,
                record:{
                  orderNumber: self.props.approval.orderNumber,
                  updateDate: self.props.approval.updateDate,
                  orderState: self.props.approval.orderState,
                  approveFlg: 'REFUSE',
                  operateMarks: memo,
                }
              }
            })
          }).then(function(resp){
            // 把提交中按钮置为原样
            if(typeof(callback)=='function'){
              callback(true);
            }
            if(resp['data']['success']==false){
            }else{
              AlertBase({
                tip: '已成功提交',
                icon: 'icon-save-success',
                onOk: ()=>{
                  jw.closeWebView();
                }
              });
            }
          })
      },
      onClose: (memo)=>{  
        self.rejectMemo = memo;
        console.log('approve reject onClose:')
      },
    });

  }

  	//提交审批订单
	submitOrder(memo,approveFlg,callback){
		let objecttype=this.props.params.objecttype;
		let type=this.props.location.query.type;
		console.log("objecttype",this.props.params.objecttype)
		let dispatch=this.props.dispatch;
		let self=this;
    let isoc=this.props.approval.isoc;
		if(objecttype=='it'&&type=='10'){
      console.log(this.props.approval,"it:approval")
      //it 的OC/OM,DO,GM 审批
      let data=this.props.approval;
      let fixedAssets;
      let oldAssets;
      let inSales;
      let toIncrease;
      let profitIncrease;
      let toBeROI;
      
      if(isoc){
        //如果为it的oc审批，提交表单数据
        console.log(this.props.approval,'走这里了吗1111111')
        this.refs.itform.validateFields((errors,value)=>{
          console.log(errors,value,'value')
          fixedAssets=value.fixedAssets?value.fixedAssets:0;
          oldAssets=value.oldAssets?value.oldAssets:0;
          inSales=value.inSales?value.inSales[0]:0;
          toIncrease=value.toIncrease?value.toIncrease:0;
          profitIncrease=value.profitIncrease?value.profitIncrease:0;
          if(value.profitIncrease&&value.fixedAssets&&inSales==1){
            if(value.profitIncrease=='0.00'||value.profitIncrease==''){
             toBeROI=0;
            }else if(value.fixedAssets=='0.00'||value.fixedAssets==''){
             toBeROI=0;
            }
            toBeROI=((value.profitIncrease/value.fixedAssets)*100).toFixed(2);
          }else{
            toBeROI=0;
          }
        })
        // console.log(JSON.stringify({
        //     param:{
        //       eid: userinfo.employee_id,
        //       record: {
        //           updateDate:self.props.approval.updateDate ,
        //           orderNumber:self.props.approval.orderNumber,
        //           orderState: self.props.approval.orderState,
        //           approveFlg:approveFlg,
        //           operateMarks: memo,
        //           fixedAssets: fixedAssets,
        //           oldAssets: oldAssets,
        //           inSales: inSales,
        //           toIncrease: toIncrease,
        //           profitIncrease: profitIncrease,
        //           toBeROI: toBeROI,
        //       }
        //     }
        //   }),"3333")
        request('/McdEpsApi/joywok/noproject/submitOrderInfo',{
          method:'POST',
          body:JSON.stringify({
            param:{
              eid: userinfo.employee_id,
              record: {
                  updateDate:self.props.approval.updateDate ,
                  orderNumber:self.props.approval.orderNumber,
                  orderState: self.props.approval.orderState,
                  approveFlg:approveFlg,
                  operateMarks: memo,
                  fixedAssets: fixedAssets,
                  oldAssets: oldAssets,
                  inSales: inSales,
                  toIncrease: toIncrease,
                  profitIncrease: profitIncrease,
                  toBeROI: toBeROI,
              }
            }
          })
        }).then(function(resp){
          console.log(resp,"resp","it的审批")
          // 把提交中按钮置为原样
          if(typeof(callback)=='function'){
            callback(true);
          }
          if(resp.data.success){
            AlertBase({
              tip: '已成功提交',
              icon: 'icon-save-success',
              onOk: ()=>{
                jw.closeWebView()
              }
            });
          }else{
           self.rejectMemo = memo;
           console.log("fail")
          }
        })
      }else{
        console.log(this.props.approval,"approval:om")
        //it 的审批非 oc 审批
        request('/McdEpsApi/joywok/noproject/submitOrderInfo',{
          method:'POST',
          body:JSON.stringify({
            param:{
              eid: userinfo.employee_id,
              record: {
                  updateDate:self.props.approval.updateDate ,
                  orderNumber:self.props.approval.orderNumber,
                  orderState: self.props.approval.orderState,
                  approveFlg:approveFlg,
                  operateMarks: memo,
                  fixedAssets: self.props.approval.fixedAssets?self.props.approval.fixedAssets:0,
                  oldAssets: self.props.approval.oldAssets?self.props.approval.oldAssets:0,
                  inSales: self.props.approval.inSales?self.props.approval.inSales:0,
                  toIncrease: self.props.approval.toIncrease?self.props.approval.toIncrease:0,
                  profitIncrease: self.props.approval.profitIncrease?self.props.approval.profitIncrease:0,
                  toBeROI: self.props.approval.toBeROI?self.props.approval.toBeROI:0,
              }
            }
          })
        }).then(function(resp){
          console.log(resp,"resp","it的审批")
          // 把提交中按钮置为原样
          if(typeof(callback)=='function'){
            callback(true);
          }
          if(resp.data.success){
            AlertBase({
              tip: '已成功提交',
              icon: 'icon-save-success',
              onOk: ()=>{
                jw.closeWebView()
              }
            });
          }else{
            self.rejectMemo = memo;
            console.log("fail")
          }
        })
      }
		}else{

			//it 的DOA审批， 设备、工程的OC/OM,DO,GM 、DOA审批 为同一个接口
      console.log("走这里了吗？")
			request('/McdEpsApi/joywok/noproject/submitNonOrderInfo',{
	      method:'POST',
	      body:JSON.stringify({
	        param:{
	          eid: userinfo.employee_id,
	          record: {
	              updateDate:self.props.approval.updateDate ,
	              orderNumber:self.props.approval.orderNumber,
	              orderState: self.props.approval.orderState,
	              approveFlg:approveFlg,
	              operateMarks: memo,
	          }
	        }
	      })
	    }).then(function(resp){
	    	console.log(resp,"resp")
        // 把提交中按钮置为原样
        if(typeof(callback)=='function'){
          callback(true);
        }
        if(resp.data.success){
        	 AlertBase({
        	 tip: '已成功提交',
        	 icon: 'icon-save-success',
        	 onOk: ()=>{
        		 jw.closeWebView()
        	 }
         });
        }else{
        	 self.rejectMemo = memo;
         console.log("fail")
        }
	    })
		}
	}
	
	openLog(){

		let url = EpsWebRoot+'/#/log/'+this.props.params['orderid'];
		let data = this.props.approval;
   
    let subProcess=data.subProcess;
    data['logType'] ={key:'nonproject',subkey:subProcess};
		window.upTabsData('log','cache',data)
    jw.pushWebView(url);
	}


  // 组织采购内容 如果是非项目IT采购的 OC审批，内容为表单，其余的都为静态展示
  combinePurchaseContent(){
  	console.log(this.props,"approval");
    let isoc=this.props.approval.isoc;

  	if(this.props.params.objecttype == 'it'&&isoc){
  		// 组织表单
  		return this.combinePurchaseForm();
  	}else{
  		const Item = List.Item;
      let BusinessInfo=this.props.approval.BusinessInfo;
      console.log(BusinessInfo,"BusinessInfo")
  		return (
	  		<div className="purchase-show">
					<List  className="my-list jw-list">
			      <Item extra={BusinessInfo.fixedAssets+" ¥"} onClick={() => {}}>预估固定资产投资总金额</Item>
			      <Item extra={BusinessInfo.oldAssets+" ¥"} onClick={() => {}}>预计旧资产报废</Item>
			      <Item extra={BusinessInfo.inSales} onClick={() => {}}>是否增加销售额？</Item>
			      <Item extra={BusinessInfo.toIncrease?(BusinessInfo.toIncrease+" ¥"):''}onClick={() => {}}>预计增加销售额</Item>
			      <Item extra={BusinessInfo.profitIncrease?(BusinessInfo.profitIncrease+" ¥"):''} onClick={() => {}}>预计增加年利润额</Item>
			      <Item extra={BusinessInfo.toBeROI?BusinessInfo.toBeROI+' %':''} onClick={() => {}}>预计投资回报率(ROI%)</Item>
			     </List>
				</div>);
  	}
  	
  }

  // 组织审批表单
  combinePurchaseForm(){
  	let self = this;
    let dispatch=this.props.dispatch;
    let data=this.props.approval;
    let fixedAssets=(data.fixedAssets==null?'0.00':data.fixedAssets);
    let oldAssets=(data.oldAssets==null?'0.00':data.oldAssets);
    let inSales=(data.inSales==null?['0']:data.inSales);
    let  toIncrease=(data.toIncrease==null?'0.00':data.toIncrease);
     let  profitIncrease=(data.profitIncrease==null?'0.00':data.profitIncrease);
    
    let  ROI=(data.toBeROI==null?'0':data.toBeROI);
      if(data.fixedAssets&&data.profitIncrease){
        ROI=((data.profitIncrease/data.fixedAssets)*100).toFixed(2);
      }else{
        ROI='0'
      }
      console.log(fixedAssets,toIncrease,data,ROI,"ROI",data.fixedAssets?data.fixedAssets:'0.00')
      this.state.formData = {
        schema:[
          {
            name: 'fixedAssets', element:'Input',
            label:'预估固定资产投资总金额',
            defaultValue:fixedAssets,
            attr:{
              type: 'text',
              className:'',
            },
            events:{
              onBlur:function(){},
              onFocus:function(e){
                console.log('onFocus')
              },
              onChange:function(e){
                console.log(e['0'],'投资总金额')
                let fixedAssets=e['0'];
                dispatch({
                  type:'approval/changeData',
                  data:{
                    fixedAssets:fixedAssets
                  }
                })
              },
              onClick:function(){
                console.log('dsfsfsfsfdsfs:=========')
              }
            }
          },
          {
            name: 'oldAssets', element:'Input',
            label:'预计旧资产报废',
            defaultValue: oldAssets,
            attr:{
              type: 'text',
              className:'',
            },
            events:{
              onBlur:function(){},
              onFocus:function(e){},
              onChange:function(e){
                dispatch({
                  type:'approval/changeData',
                  data:{
                    oldAssets:window.replaceNnum(e['0'])
                  }
                })
              }
            }
          },
          {
            name: 'inSales', element:'Radio',label:'是否增加销售额？',
            defaultValue:inSales,
            options: [
              { label: '是',value:'1'},
              { label: '否',value: '0'},
            ],
            attr:{
              className:''
            },
            events:{
              onBlur:function(){},
              onFocus:function(e){},
              onChange:function(e){
                console.log('onChange,是否增加销售额？:',e)
                // let formData = this.state.formData;

                if(e[0]=='1'){
                  $('.toggle-filed').closest('.ant-form-item').show();
                  // this.setState({});
                }else{
                  $('.toggle-filed').closest('.ant-form-item').hide();
                }
                dispatch({
                  type:'approval/changeData',
                  data:{
                    inSales:e['0']
                  }
                })
              }
            }
          },
          {
            name: 'toIncrease', element:'Input',
            label:'预计增加销售额',
            defaultValue: toIncrease,
            attr:{
              type: 'text',
              className:'toggle-filed',
            },
            events:{
              onBlur:function(){},
              onFocus:function(e){},
              onChange:function(e){
                console.log('onChange',e)
                dispatch({
                  type:'approval/changeData',
                  data:{
                    toIncrease:window.replaceNnum(e['0'])
                  }
                })
              }
            }
          },
          {
            name: 'profitIncrease', element:'Input',
            label:'预计增加年利润额',
            defaultValue:profitIncrease,
            attr:{
              type: 'text',
              className:'toggle-filed',
            },
            events:{
              onBlur:function(){},
              onFocus:function(e){},
              onChange:function(e){
                console.log('onChange',e)
                dispatch({
                  type:'approval/changeData',
                  data:{
                    profitIncrease:window.replaceNnum(e['0'])
                  }
                })
              }
            }
          },
          {
            name: 'toBeROI', element:'Input',label:'预计投资回报率(ROI%)',
            defaultValue:ROI+' %',
            attr:{
              className:'toggle-filed',
              disabled:true,
            },
            events:{
              onBlur:function(){},
              onFocus:function(e){},
              onChange:function(e){
              }
            }
          },
        ],
        buttons:false,
        changeData:this.changeData.bind(this)
      };
      console.log('this.state.formData:',this.state)
      return (<div className="purchase-form">
          <Form formData={ this.state.formData } ref="itform" onChange={(values,schema)=>this.FormChange(values,schema)}/>
        </div>);
  }

  FormChange(values,schema){
		console.log("values:",values,"FormChange:",schema);
	}

	changeData(data){

	}
  callback(value){
    let dispatch=this.props.dispatch;
    dispatch({
      type:'approval/changeData',
      data:{
        loading1:false,
        loading2:false,
        avatar:value
      }
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
      let header = $('.header').height() || 0;
      let footer = $('.footer').height() || 0;
      let price = $('.np-total-price').height() || 0;
      $('.eps-nonproject-approval-c').css({height:clientHeight-footer-price+'px'});
    },0)
  }
	componentDidMount(){
    NProgress.done();

    // this.setHeight()
    if(JWReady == true){
      jw.setFuncBtns([{type:4}]);
    }else{
      window.EpsEvents.off('jwready:ok').on('jwready:ok',()=>{
        jw.setFuncBtns([{type:4}]);
      })  
    } 
		let dispatch=this.props.dispatch;
		let self=this;
    if(isAndroid()){
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      $( window ).resize(function() {
        console.log('window resize')
        self.setHeight();
        setTimeout(function(){
          let clientHeightNow = document.documentElement.clientHeight || document.body.clientHeight;
          // alert(clientHeight+'------'+clientHeightNow);
          if(clientHeight>clientHeightNow){
            $('.eps-nonproject-approval').stop().animate({scrollTop:'100000px'})
          }else{

          }

        },100)
      });
    }
		let eid=userinfo.employee_id;
	  let objecttype=this.props.params.objecttype;
    let type=this.props.location.query.type;
    let view=this.props.params.view;
    let orderid=this.props.params.orderid;
    let requestUrl={
      'equipment':{
        '1':'/McdEpsApi/joywok/noproject/getEQSupplierDOAInfo',
        '4':'/McdEpsApi/joywok/noproject/getEQSupplierDOAInfo',
        '3':'/McdEpsApi/joywok/noproject/getEQSupplierDOAInfo',
        '10':'/McdEpsApi/joywok/noproject/getEQSupplierInfo'
      },
      'it':{
        '1':'/McdEpsApi/joywok/noproject/getITSupplierDOAInfo',
        '4':'/McdEpsApi/joywok/noproject/getITSupplierDOAInfo',
        '3':'/McdEpsApi/joywok/noproject/getITSupplierDOAInfo',
        '10':'/McdEpsApi/joywok/noproject/getITSupplierInfo'
      },
      'project':{
        '1':'/McdEpsApi/joywok/noproject/getCOSupplierDOAInfo',
        '4':'/McdEpsApi/joywok/noproject/getCOSupplierDOAInfo',
        '3':'/McdEpsApi/joywok/noproject/getCOSupplierDOAInfo',
        '10':'/McdEpsApi/joywok/noproject/getCOSupplierInfo'
      },
    }
    //打开群聊
    window.onJwNavBtnClick = function(data){
      if(data['type'] == '4'){
        openChart(eid,orderid,'测试')
      }
    }
    if(view&&view=='view'){
      dispatch({
        type:'approval/viewInfo',
        payload:{
          param:{
            eid:eid,
            condition:{
              orderNumber:self.props.params.orderid,
            },
            pager:{pageNum:'1',pageSize:'10'}
          }
        },
         objecttype:objecttype,
         callback:self.callback
      })
    }else if(view&&view=='vieworder'){
      dispatch({
        type:'approval/viewOrderInfo',
        payload:{
          param:{
            eid:eid,
            condition:{
              orderNumber:self.props.params.orderid,
            },
            pager:{pageNum:'1',pageSize:'10'}
          }
        },
        objecttype:objecttype,
        callback:self.callback
      })
    }else{
      //正常流程中的页面展示
      //获取供应商设备报价列表 
      request(requestUrl[objecttype][type],{
        method:'POST',
        body:JSON.stringify({
          param:{
            eid: eid,
            condition:{
              orderNumber:self.props.params.orderid,
            },
            pager:{pageNum:'1',pageSize:'10'}
          }
        })
      }).then(function(resp){
        if(resp['data']['success']==false){
        }else{
          let venderList;
          let data=resp['data']['body'];
          console.log(data,"data:project")
          let partList = [],deviceList = [];
          let list = data['pageInfo']['list'];
          if(objecttype == 'project'){
            if(data['purchasingReason'] == '2'){
              _.each(list,function(i){
                partList.push(i)
              })
            }  
          }else if(objecttype == 'it'){
            _.each(list,function(i){
              if(i["tsiType"] == true && data['purchasingReason'] == '2'){
                partList.push(i)
              }
            })
          }else{
            _.each(list,function(i){
              if(( i["type"] == 'supplier'  || i['type'] == 'all'  )&& data['purchasingReason'] == '2'){
                partList.push(i)
              }
            })
          }
          // _.each(data['pageInfo']['list'],function(i){
          //   partList.push(i)
          // })
          console.log(partList,'12312312312');
          dispatch({
            type:'approval/changeData',
            data:_.extend({
              vendorList:data.pageInfo.list,
              loading1:false,
              partList:partList,
              deviceList:deviceList,
              storeScrapList:data['scrapPageInfo']['list']
            },resp['data']['body'])
          })
     
        }
      })
      // 获取 非项目 订单详情（BusinessInfo信息）
      let OrderInfoUrl='';
      if(type=='1'||type=='4'||type=='3'){
        //type:1 Doa审批 4:餐厅评价
          OrderInfoUrl='/McdEpsApi/joywok/noproject/getDOAOrderInfo';
      }else if(type=='10'){
        //type:10  OC ,OM ,DO ,GM
          OrderInfoUrl='/McdEpsApi/joywok/noproject/getOrderInfo';
      }
      request(OrderInfoUrl,{
        method:'POST',
        body:JSON.stringify({
          param:{
            eid: eid,
            condition:{
              orderNumber:self.props.params.orderid,
            },
          }
        })
      }).then(function(resp){
        if(resp['data']['success']==false){
        }else{
          let data=resp['data']['body'];
          let BusinessInfo={};
          let creatorinfo={};
          creatorinfo.eid=data.createBy;
          creatorinfo.createName=data.storeMan;
          creatorinfo.isoc=data.isoc;
          creatorinfo.storeNumber=data.storeNumber;
          creatorinfo.storeName=data.storeName;
          let isoc=data.isoc?data.isoc:false;

          //判断是否IT的oc审批，IT的oc审批无返回BusinessInfo，需要填写表单数据（BusinessInfo信息）
          if(objecttype=='it'&&isoc){
             dispatch({
              type:'approval/changeData',
              data:_.extend({
                 creatorinfo:creatorinfo,
              },resp['data']['body'])
            })
          }else{
            console.log(data.LumpSumPrice,'data.LumpSumPrice')
            BusinessInfo.LumpSumPrice=data.LumpSumPrice.toFixed(2);
            BusinessInfo.fixedAssets=data.fixedAssets?data.fixedAssets.toFixed(2):'0.00';
            BusinessInfo.oldAssets=data.oldAssets?data.oldAssets.toFixed(2):'0.00';
            BusinessInfo.inSales=data.inSales=='1'?'是':'否';
            BusinessInfo.toIncrease=data.toIncrease?data.toIncrease.toFixed(2):'0.00';
            BusinessInfo.profitIncrease=data.profitIncrease?data.profitIncrease.toFixed(2):'0.00';
            BusinessInfo.toBeROI=data.toBeROI?data.toBeROI:'0';
            dispatch({
            type:'approval/changeData',
            data:_.extend({
              BusinessInfo:BusinessInfo,
              creatorinfo:creatorinfo,
              },resp['data']['body'])
            })
          }
          //获取创建人的头像信息
          if(data['createBy']){
            getUsers(data['createBy'],'num',function(resp){
              let userdata = resp['data'][0];
              dispatch({
                type:'approval/changeData',
                data:{
                  avatar:userdata['avatar'],
                  loading2:false,
                }
              })
            })
          }
          
        }
      })

      //获取评价项：新增IT订单的评价项
      if(type=='4'&&(objecttype=='equipment'||objecttype=='project'||objecttype=='it')){
          request('/McdEpsApi/joywok/common/getEvaluate',{
          method: 'POST',
          body:JSON.stringify({
            param:{
              eid:eid,
              condition: {
                orderNumber:self.props.params.orderid,
              }
            }
          })
        }).then(function(resp){
          window.NoProjectEvaluate = resp['data']['body'];
        })
      }
      
    }

    PubSub.subscribe('add:scrapped',function(evt,data){
      dispatch({ type: 'approval/changeData', data:{
        storeScrapList:_.map(data,function(i){return i})
      }});
    });
	}
  footerRender(data){
    let objecttype=this.props.params.objecttype;
    let rejectText='拒绝';
    let subProcess=this.props.approval.subProcess;
    if( isUnfinishedOrHistory() ){
      console.log('Marlin',subProcess,data,orderStatus["nonproject"])
      let strOrderSta = data['orderState'] && orderStatus["nonproject"][subProcess][data['orderState']]?orderStatus["nonproject"][subProcess][data['orderState']]:{'label':''};
      return <footer className="footer">
          <div className="log-btn" onClick={(e)=>this.openLog()}>
            <i className="icon-log"></i>
            <span>流程日志</span>
          </div>
          <div className="todo-info-status" onClick={(e)=>this.openProcessTable()}>
            <i className="icon-time-b"></i>
            <div className="todo-status-c">
            <span className="todo-status-title">{strOrderSta["label"]}</span>
            <span className="todo-status-tip">{strOrderSta["val"]}</span>
          </div>
          </div>;
        </footer>
    }else{
      console.log(objecttype,this.props.approval.orderState,"确认拒绝且关单");
      if(this.props.approval.orderState=='1'){
        rejectText="拒绝且关单";
      }else{
        rejectText="拒绝";
      }
      return <footer className="footer">
          <div className="log-btn" onClick={(e)=>this.openLog()}>
            <i className="icon-log"></i>
            <span>流程日志</span>
          </div>
          <div className="eps-btn-wrap">
            <div className="eps-btn eps-btn-default-small" onClick={(e)=>this.reject(e)}>{rejectText}</div>
            <div className="eps-btn eps-btn-warning-large" onClick={(e)=>this.agree(e)}>确认</div>
          </div>
        </footer>
    }
  }
  openProcessTable(){
    let data = this.props.approval;
    let subProcess=data.subProcess; 
    data['logType'] ={key:'nonproject',subkey:subProcess};
    window.upTabsData('log','cache',data)
    var url = EpsWebRoot+'/#approval/'+this.props.params['orderid'];
    console.log(url,"url")
    jw.pushWebView(url);
  }
  openWebView(objecttype,type){
    let orderid=this.props.approval.orderNumber;
    var url ='';
    console.log(this.props.approval.view,"view")
    if(this.props.approval.view=='vieworder'){
      url= EpsWebRoot+'/#/nonproject/vendor-info/'+orderid+'/'+objecttype+'/4';
    }else if(this.props.approval.view=='view'){
      console.log('zoule11111?')
      url = EpsWebRoot+'/#/nonproject/vendor-info/'+orderid+'/'+objecttype+'/10';
    }else{
      url = EpsWebRoot+'/#/nonproject/vendor-info/'+orderid+'/'+objecttype+'/'+type;
    }
    console.log(url,"url")
    jw.pushWebView(url);
  }
	render(){
		let self = this;
		let data=this.props.approval;
		let objecttype=this.props.params.objecttype;
		let type=this.props.location.query.type;
    let LumpSumPrice;
    let showFlag='show';
	 	// 组织显示内容
	 	if(data.loading1||data.loading2){
	 		return (<div className="todos-loading">
							<img src="images/loading.gif" />
							<span>加载中</span>
						</div>)
	 	}else{
      console.log(data.BusinessInfo,"data.BusinessInfo.LumpSumPrice")
      if(objecttype=='it'){
        console.log("当前订单是IT订单吗?")
        LumpSumPrice=data.LumpSumPrice.toFixed(2);
        if(data.LumpSumPrice<100000){
           console.log("当前订单是小于10万吗?")
          showFlag='hide';
        }else{
          showFlag='show';
        }
      }else{
        LumpSumPrice=data.BusinessInfo.LumpSumPrice;
        console.log(LumpSumPrice,"LumpSumPrice")
      }
      
	 	  let purchaseContent = this.combinePurchaseContent();

      let showScrapTip = 0;
      let list = data['pageInfo']['list'];
      if(data['objecttype'] == 'project'){
        if(data['purchasingReason'] == '2'){
          showScrapTip = 1;
        }  
      }else if(data['objecttype'] == 'it'){
        _.each(list,function(i){
          if(i["tsiType"] == true && data['purchasingReason'] == '2'){
            showScrapTip = showScrapTip+1
          }
        })
      }else{
        _.each(list,function(i){
          if(( i["type"] == 'supplier'  || i['type'] == 'all'  )&& data['purchasingReason'] == '2'){
            showScrapTip = showScrapTip+1
          }
        })
      }
      this.showScrapTip = showScrapTip;
      console.log('组织审批表单',data,data["objecttype"],showScrapTip);
	 	  return (
			 <div className="eps-nonproject-approval">
        <div className="eps-nonproject-approval-c">
  				<header className="header " ref="header">
  					<div className="header-bg-specail">
              <div className="header-bg"></div>
              <div className="header-bg-2"></div>
            </div>
  					<div className="header-c">
  					 <HeaderCard creatorinfo={_.extend({},this.props.approval.creatorinfo,{
              avatar:this.props.approval['avatar']['avatar_l'],
              fileCount:this.props.approval['fileCount'] || 0,
              uploadPhaseName:this.props.approval['uploadPhaseName'] || '',
              scrapPageInfo:data['storeScrapList'],
              partList:data['partList'],
              deviceList:data['deviceList'],
              storeNumber:data['storeNumber'],
              scrappType:'noproject',
              scrappOrderType:this.props.approval['objecttype'],
              showScrapTip:showScrapTip,
              addScrap:(window.isUnfinishedOrHistory()==false && (this.props.location.query.type=='1' || this.props.location.query.type=='4')?true:false)
            })}></HeaderCard>
  					</div>
  				</header>
  				<div className="eps-np-approval-body">
  					<div className="eps-box-wrap">
  						<div className="eps-box">
  							<TableList list={data.vendorList} data={data} objecttype={objecttype} type={type} />
  						</div>
  					</div>
  					<div className="eps-box-wrap eps-box-item">
  						<i className={"eps-list-card-bgicon "+showFlag}></i>
  						<div className={"eps-box "+showFlag}>
  							<div className="purchase-box-title"><font>Business Case</font></div>
  							{ purchaseContent }
  						</div>
  					</div>
  				</div>
        </div>
				<div className="np-total-price" onClick={()=>self.openWebView(objecttype,type)}>
          <div className="np-total-price-c">
            <label>总价(含税)</label>
            <span><i className="icon-sprice"></i><font>{self.turnMoney(LumpSumPrice)}</font></span>
          </div>
					<div className="money-show-other-tip">
            <i className="icon-money-tips"></i>
            <div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
          </div>
				</div>
				{self.footerRender(data)}
			</div>
		);
	 	}
		
	}
}

function mapStateToProps(state) {
	console.log('state:11111',state)
  let type=state.routing.locationBeforeTransitions.query.type;
  let orderState=state.approval.orderState;
  if(type=='4'){
    jw.setTitle({title:'餐厅确认'})
  }else if(type=='10'){
    jw.setTitle({title:'审批'});
  }else if(type=='1'){
    if(orderState=='4'){
      jw.setTitle({title:'IT FUNC确认'})
    }else if(orderState=='5'){
      jw.setTitle({title:'IT DEPT确认'})
    }else{
      jw.setTitle({title:'DOA审批'})
    }
  }else if(type=='3'){
    jw.setTitle({title:'调整后审批'})
  }
	return state
}
export default connect(mapStateToProps)(Approval);