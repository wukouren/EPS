/**
 * 非项目订单审批流程（含设备／工程／IT）(审批节点含： OC审批，OM审批，DO审批，GM审批，DOA审批，送货调整DOA审批)
 * 除IT采购的OC审批流程有表单需填写外，其它流程都一样
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import HeaderCard from './../../components/NonProject/HeaderCard';
import TableList from './../../components/NonProject/TableList';
import {DeviceCard,ProjectCard,ITCard} from './../../components/NonProject/NoProjectCard';

import Form from "jw-form/dist/mobile";
import LoadMore from './../../components/Common/LoadMore';
import { List } from 'jw-components-mobile';
import { MemoDialog,AlertBase, ConfirmBase  } from '../../components/Common/EpsModal';
import request from '../../utils/EpsRequest';
import { getDict,getUsers,openChart} from '../../constants';

class ApprovalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.type = this.props.params.type;
    this.onEndReached = this.onEndReached.bind(this);
  }
  // 上拉加载更多。。
  onEndReached(e){
    let dispatch=this.props.dispatch;
    let self=this;
    let eid=userinfo.employee_id;
    let objecttype=this.props.params.objecttype;
    let type=this.props.params.type;
    let orderid=this.props.params.orderid;
    let noprojectinfodata=this.props.noprojectinfo;
    console.log(this.props.noprojectinfo,"noprojectinfo")
    let requestUrl={
      'equipment':{
        '1':'/McdEpsApi/joywok/noproject/getEQSupplierDOAInfo',
        '4':'/McdEpsApi/joywok/noproject/getEQSupplierDOAInfo',
        '10':'/McdEpsApi/joywok/noproject/getEQSupplierInfo'
      },
      'it':{
        '1':'/McdEpsApi/joywok/noproject/getITSupplierDOAInfo',
        '4':'/McdEpsApi/joywok/noproject/getITSupplierDOAInfo',
        '10':'/McdEpsApi/joywok/noproject/getITSupplierInfo'
      },
      'project':{
        '1':'/McdEpsApi/joywok/noproject/getCOSupplierDOAInfo',
        '4':'/McdEpsApi/joywok/noproject/getCOSupplierDOAInfo',
        '10':'/McdEpsApi/joywok/noproject/getCOSupplierInfo'
      },
    }
    console.log("11onEndReached11111")
    dispatch({
      type:"noprojectinfo/changeData",
      data:{
        noMore:false,
        fix:true,
      }
    })
    if(noprojectinfodata.pageInfo.isLastPage){
      dispatch({
        type:'noprojectinfo/changeData',
        data:{
          noMore:true,
          hide:true,
        }
      })
    }else{
      request(requestUrl[objecttype][type],{
        method:'POST',
        body:JSON.stringify({
          param:{
            eid: eid,
            condition:{
              orderNumber:orderid,
            },
            pager:{pageNum:(noprojectinfodata.pageInfo.pageNum+1),pageSize:'10'}
          }
        })
      }).then(function(resp){
        console.log(resp,"resp")
        if(resp['data']['success']==false){
        }else{
          let venderList;
          let data=resp['data']['body'];
          console.log(data,"是还有数据吗？")
          if(data.pageInfo.list.length>0){
             dispatch({
              type:'noprojectinfo/changeData',
              data:_.extend({
                vendorList:_.union(noprojectinfodata.vendorList,data.pageInfo.list),
                fix:false,
                noMore:data.pageInfo.list.length<10?true:false,
                hide:data.pageInfo.list.length<10?true:false,//是否显示加载的动画
                orderState:data.orderState,
              },resp['data']['body'])
            })
           }else{
              dispatch({
                type:'noprojectinfo/changeData',
                data:_.extend({
                  noMore:true,
                  hide:data.pageInfo.list.length<10?true:false,//是否显示加载的动画
                },resp['data']['body'])
              })
           }
        }
      })
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
      $('.main-c').css({height:clientHeight-header-0+'px'});
    },0)
  }

  // 组件加载完毕
  componentDidMount(){
    let dispatch=this.props.dispatch;
    let self=this;
    let eid=userinfo.employee_id;
    let objecttype=this.props.params.objecttype;
    let type=this.props.params.type;
    let orderid=this.props.params.orderid;
    self.setHeight()
    console.log(this.props.location,this.props.params,objecttype,type,"详情信息")
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
    

    //获取供应商设备报价列表 
    request(requestUrl[objecttype][type],{
      method:'POST',
      body:JSON.stringify({
        param:{
          eid: eid,
          condition:{
            orderNumber:orderid,
          },
          pager:{pageNum:1,pageSize:10}
        }
      })
    }).then(function(resp){
      if(resp['data']['success']==false){
      }else{
        let venderList;
        let data=resp['data']['body'];
         dispatch({
            type:'noprojectinfo/changeData',
            data:_.extend({
              vendorList:data.pageInfo.list,
               fix:false,
              hide:data.pageInfo.list.length<5?true:false,//是否显示加载的动画
              orderState:data.orderState,
            },resp['data']['body'])
          })
   
      }
    })



        // 获取 非项目 订单详情
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
            orderNumber:orderid,
          },
          pager:{pageNum:'1'}
        }
      })
    }).then(function(resp){
      if(resp['data']['success']==false){
      }else{
        let data=resp['data']['body'];
        console.log(data,"12344",objecttype);
        let BusinessInfo={};
        let creatorinfo={};
        creatorinfo.eid=data.createBy;
        creatorinfo.createName=data.storeMan;
        creatorinfo.isoc=data.isoc;
        creatorinfo.storeNumber=data.storeNumber;
        creatorinfo.storeName=data.storeName;
        if(objecttype!='it'){
          BusinessInfo.LumpSumPrice=data.LumpSumPrice.toFixed(2);
          BusinessInfo.fixedAssets=data.fixedAssets?data.fixedAssets.toFixed(2):'0.00';
          BusinessInfo.oldAssets=data.oldAssets?data.oldAssets.toFixed(2):'0.00';
          BusinessInfo.inSales=data.inSales=='1'?'是':'否';
          BusinessInfo.toIncrease=data.toIncrease?data.toIncrease.toFixed(2):'0.00';
          BusinessInfo.profitIncrease=data.profitIncrease?data.profitIncrease.toFixed(2):'0.00';
          BusinessInfo.toBeROI=data.toBeROI?data.toBeROI:'0';
          dispatch({
          type:'noprojectinfo/changeData',
          data:_.extend({
            BusinessInfo:BusinessInfo,
            creatorinfo:creatorinfo,
            },resp['data']['body'])
          })
        }else{
          dispatch({
            type:'noprojectinfo/changeData',
            data:_.extend({
              creatorinfo:creatorinfo,
            },resp['data']['body'])
          })
        }
        if(data['createBy']){
          getUsers(data['createBy'],'num',function(resp){
            let userdata = resp['data'][0];
            console.log(userdata,"userdata")
            dispatch({
              type:'noprojectinfo/changeData',
              data:{
                loading:false,
                avatar:userdata['avatar']
              }
            })
          })
        }
        
      }
    })
  }
  ItemRender(data,index,allIndex){
    let listItemHtml='';
    console.log(data,this.props,this.props.params.type,'这个数据是什么');
    let objecttype=this.props.params.objecttype;
    switch(objecttype){
      case 'equipment':
      return <DeviceCard deviceRoleType={data.type} itemdata={data} index={index+1} allIndex={allIndex} orderType={this.props.params.type}/>
      break;
      case 'project':
      return (<ProjectCard  itemdata={data}  index={index+1} allIndex={allIndex} orderType={this.props.params.type}/>)
      break;
      case 'it':
      return (<ITCard type={this.props.params.type} isDirectMining={data.isDirectMining} itemdata={data}  index={index+1} allIndex={allIndex} orderType={this.props.params.type}/>)
      break;
    }
  }
  render(){
    let self = this;
    let data=this.props.noprojectinfo;
    let objecttype=this.props.params.objecttype;
    console.log(this.props,'noprojectinfo');

    let loadMoreHtml='';

    if(data.noMore){
          loadMoreHtml=<div className="todos-nomore">没有更多了！</div>
    }else{
      console.log(data,"data:hide")
        loadMoreHtml= <div className='todos-list-loadmore'>
            <LoadMore container='main-c' data={{
              hide:data['hide'],
              fix:data['fix']
            }} onEndReached={(e)=>{this.onEndReached(e)} } />
        </div>
    }
    // 组织显示内容
    if(data.loading){
      return (<div className="todos-loading">
              <img src="images/loading.gif" />
              <span>加载中</span>
            </div>)
    }else{
      console.log(data.vendorList,'vendorListvendorListvendorListvendorList')
     return (
       <div className="eps-nonproject-approval info">
        <header className="header" ref="header">
          <div className="header-bg-specail">
              <div className="header-bg"></div>
              <div className="header-bg-2"></div>
            </div>
          <div className="header-c">
          </div>
        </header>
        <sesstion className="main">
            <div className="main-c" ref="listC" style={{
              height:data['containerHeight'] || 'auto'
            }}>
              <div className="main-w">
                <div className="eps-np-approval-body">
                  <div className="eps-box-wrap">
                    <div className="eps-box info eps-box-info device-details">
                    {
                      _.map(data.vendorList,function(item,index){
                        return self.ItemRender(item,index,data.vendorList.length)
                      })
                    } 
                     {loadMoreHtml}
                    </div>
                  </div>
                 
                </div>
              </div>
            </div>
          </sesstion>
        
        
      </div>
    );
    }
    
  }
}

function mapStateToProps(state) {
  console.log('state:',state)
  return state
}
export default connect(mapStateToProps)(ApprovalInfo);