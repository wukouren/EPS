/**
 * 维修工程列表
 */
import React,{ Component } from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import { ProjectCardListShow } from '../Common/ProjectCard';
import EmptyWithArrow from '../Common/EmptyWithArrow';

class ProjectList extends Component{
	constructor(props) {
		super(props);
		this.state = {}
		this.openGoodsDetail = this.openGoodsDetail.bind(this);
	}
	openGoodsDetail(id){
		let url = '/goods/'+id;
    // jw.pushWebView(url);
    hashHistory.push(url);
	}
	render(){
		let self = this;
		let style = this.props.style;
		const list = this.props.list || [
      {id: 'test1', name: 'LED灯', repairstore: '维修商A', facode: '8456', facode2: '8467-1' },
      {id: 'test2', name: 'LED灯2', repairstore: '维修商B', facode: '8456', facode2: '8467-1' },
      {id: 'test3', name: 'LED灯3', repairstore: '维修商C', facode: '8456', facode2: '8467-1' },
      {id: 'test4', name: 'LED4', repairstore: '维修商D', facode: '8456', facode2: '8467-1' },
      {id: 'test5', name: 'LED灯5', repairstore: '维修商A', facode: '8456', facode2: '8467-1' },
      {id: 'test6', name: 'LED灯6', repairstore: '维修商B', facode: '8456', facode2: '8467-1' },
      {id: 'test7', name: 'LED灯7', repairstore: '维修商C', facode: '8456', facode2: '8467-1' },
    ];
		if(list && list.length>0){
			return (
		    <ul className="eps-device-list" style={{
		    	maxHeight:style['containerHeight']
		    }}>
					{
						_.map(list,(item,index)=>{
							return <ProjectCardListShow itemdata={item} deleteBtnShow={ this.props.deleteBtnShow } removeItem={(e)=>self.props.removeItem(item,index)} />
						})
					}
		    </ul>
	  	);	
		}else{
			return (<EmptyWithArrow icon="icon-add-repair-project"/>)
		}
	}
	componentDidMount(){
		setTimeout(function(){

		})
	}
};

ProjectList.propTypes = {
};

function mapStateToProps(state) {
  return state
}

export default connect(function(state){return state})(ProjectList);