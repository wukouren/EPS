/**
 * 维修设备列表
 */
import React,{ Component } from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { DeviceCardListShow } from '../Common/DeviceCard';
import EmptyWithArrow from '../Common/EmptyWithArrow';

class OrderList extends Component{

	constructor(props) {
		super(props);
		this.state = {}
		this.openGoodsDetail = this.openGoodsDetail.bind(this);
    this.delDeviceItem = this.delDeviceItem.bind(this);

	}

	openGoodsDetail(id){
		let url = '/goods/'+id;
    // jw.pushWebView(url);
    hashHistory.push(url);
	}
  delDeviceItem(data){
   let dispatch=this.props.dispatch;
   dispatch({
    type:'repairdevice/delDeviceItem',
    payload:{
      item:data
    }
   })
  }
	render(){

		const list = this.props.equipmentList;
		
		if(list && list.length>0){
			return (
		    <ul className="eps-device-list">
					{
						list.map( (item) => (
							<DeviceCardListShow delDeviceItem={this.delDeviceItem} itemdata={item} deleteBtnShow={ this.props.deleteBtnShow } />
						))
					}
		    </ul>
	  	);	
		}else{
			return (<EmptyWithArrow icon="icon-add-repair-device"/>)
		}
	}

};

OrderList.propTypes = {
};

function mapStateToProps(state) {
  return state
}

export default connect()(OrderList);