/**
 * 设备明细
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';

import LoadMore from './../../components/Common/LoadMore';

import UserCard from './../../components/Common/UserCard';
import DeviceInfoCard from './../../components/Common/DeviceInfoCard';
import request from '../../utils/EpsRequest';
import { getUsers } from '../../constants';

class DeviceInfo extends Component {
	constructor(props) {
		super(props);
    this.onEndReached = this.onEndReached.bind(this);
    this.orderNumber=this.props.params.orderid;

	}
	render(){
		let data = this.props.deviceinfo;
		let view = this._init_view();

		if(data.loading){
				return (<div className="todos-loading">
					<img src="images/loading.gif" />
					<span>加载中</span>
				</div>)
		}else{
			return (
				<div className="root-container device-info-list">
					{view}
				</div>
			);
		}
	}
	_init_view(){
		let data = this.props.deviceinfo;
    let  LoadMoreHtml='';
		if(data.noMore&&data.hide){
      LoadMoreHtml= <div></div>
            
    }else if(data.noMore){
       LoadMoreHtml=<div className="noMore-Data">没有更多了!</div>
    }else{
      LoadMoreHtml= <LoadMore onEndReached={this.onEndReached} 
            data={{
              hide:data['hide'],
              fix:data['fix']
            }}
            container='device-details' />

    }
		let view = '';

		let deviceList=this.props.deviceinfo.deviceList;
		var  creatorinfo=this.props.deviceinfo.creatorinfo;
		// creatorinfo.avatar={};
		view = <div className="root-container-w">
			<header className="header">
				<div className="header-bg-specail">
					<div className="header-bg"></div>
					<div className="header-bg-2"></div>
				</div>
				<div className="header-c"></div>
			</header>

			<sesstion className="main ">
				<div className="main-c device-details">
					{
						_.map(_.values(deviceList),function(item,index){
							return <DeviceInfoCard index={index+1} allIndex={_.values(deviceList).length}  devicedata={item}  ></DeviceInfoCard>
						})
					}
					{LoadMoreHtml}			
				</div>
			</sesstion>
		</div>
		return view
	}
	openWebView(data){
		var url = EpsWebRoot+'/#'+data
		jw.pushWebView(url);
	}
	onEndReached(e){
	  let dispatch=this.props.dispatch;
	  let pageNum=this.props.deviceinfo.pageNum;
	  console.log("1111111",'onEndReached')
	  dispatch({
	    type:"deviceinfo/changeData",
	    payload:{
	      noMore:false,
	      fix:true,
	    }
	  })
	  dispatch({
	    type:"deviceinfo/loadMoreDevice",
	    pages:this.props.deviceinfo.pages,
	    payload:{
	      param:{
	        eid:eid,
	        condition: {
	          orderNumber: this.orderNumber,
	        },
	        pager: {
	         pageNum: pageNum+1,
	         pageSize: '10'
	        }
	      }
	    }
	  })
	}
	componentDidMount(){
		let self = this;
		let dispatch = this.props.dispatch;
		let orderid=this.props.params.orderid;
		setTimeout(function(){
		  self.setHeight();
			request('/McdEpsApi/joywok/repair/getEquipmentList',{
	      method:'POST',
	      body:JSON.stringify({
	        param:{
	        	eid: eid,
	          condition:{
	            orderNumber:orderid,
	            orderState:'4',
	          },
	          pager:{pageNum:'1',pageSize:'10'}
	        }
	      })
	    }).then(function(resp){
	      if(resp['data']['success']==false){
	      }else{
	        NProgress.done();
	        let data=resp['data']['body'];
	        console.log('zzzzzzzzzzzzzz',resp['data']['body'])
	        let creatorinfo={};
	        creatorinfo.name=data.createBy;
	        creatorinfo.time=data.dateAppointment;
	        creatorinfo.orderNumber=data.orderNumber;
	        creatorinfo.orderState=data.orderState;
	        creatorinfo.storeName=data.storeName;
	        creatorinfo.repairType=data.repairType;
	        creatorinfo.remark=data.maintenanceRemarks;
	        let deviceList=self.DevicePartList(data);
	       	let allkeys=_.keys(deviceList,"deviceList")
	        dispatch({
	          type:'deviceinfo/changeData',
	          payload:_.extend({
	          	loading:false,
	          	noMore:allkeys.length<10?true:false,//是否还有下一页
	          	hide:allkeys.length<3?true:false,//是否显示加载的动画
	            list:data.pageInfo.list,//设备列表
	            creatorinfo:creatorinfo,//
	            costList:data.costList,//杂费列表
	            pages:data.pageInfo.pages,
	            deviceList:deviceList,
	          },resp['data']['body'])
	        })
	        data['createEid'] && getUsers(data['createEid'],'num',function(resp){
	        	let userdata = resp['data'][0];
	        	dispatch({
		          type:'deviceinfo/changeData',
		          payload:{
		          	avatar:userdata['avatar']
		          }
		        })
	        })  
	      }
	    })
		},0)
		NProgress.done();
	}
	DevicePartList(data){
		let devicepartlist=data.pageInfo.list;
		let deviceList={};
		let incidentalList=data.incidentalList;
		_.each(devicepartlist,function(item){
			if(!item.partName){
				let deviceObj=_.extend({},item);
				deviceObj.partList=[];
				deviceList[item.deviceNumber]=deviceObj;
			}
		})
		let partList=_.filter(data.pageInfo.list,function(item){
			return item.partName
		})
		_.each(partList,function(item){
			 deviceList[item.deviceNumber]['partList'].push(item)
		})
		_.each(incidentalList,function(item){
			 deviceList[item.deviceNumber]['deviceFee']=item;
		})
		 return deviceList;

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
      $('.main-c.device-details').css({height:clientHeight+20+'px'});
    },0)
  }
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(DeviceInfo);