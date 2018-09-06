/**
 * 维修IT设备列表
 */
import React,{ Component } from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { ItDeviceCard } from '../../components/Common/ItCard';
import { InfoCardIT } from './InfoCardIT';
import EmptyWithArrow from '../Common/EmptyWithArrow';
import TodoCard from './../../components/Common/TodoCardIt';
import { openWebView } from '../../constants';

class ItList extends Component{

	constructor(props) {
		super(props);
		this.state = {}
	}

	render(){
		let self = this;
		let data = this.props.data?this.props.data:{},
        list = data.pageInfo && data.pageInfo.list ? data.pageInfo.list : [],
        costList = data.costList||[] ;
    let fittings = [];
    console.log('list:================',data);
		if(list && list.length>0){
			return (
		    <ul className="">
					{
						list.map( (device,index) => {
							let indexNum = (data.pageInfo.pages-1)*data.pageInfo.pageSize+index+1;
							let allIndexNum = data.pageInfo.total;
							return (
								<InfoCardIT device={device} fittings={_.filter(costList,function(item,key){ 
	                return item['itDeviceNumber'] == device['itDeviceNumber'];
	              })} openDetail={ this.props.openDetail } index={ indexNum } allIndex={ allIndexNum } />
              ) 
            })
					}
		    </ul>
	  	);
		}else{
			return (<EmptyWithArrow icon="icon-add-repair-it"/>)
		}
	}

};

ItList.propTypes = {
};

function mapStateToProps(state) {
  return state
}

export default connect()(ItList);