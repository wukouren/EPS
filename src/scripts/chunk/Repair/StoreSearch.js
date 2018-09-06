/**
 * 搜索餐厅
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ObjectSelectList from '../../components/Common/ObjectSelectList';
import { connect } from 'dva';

class StoreSearch extends Component {

	constructor(props) {
		super(props);
	}

	onAdd(objects){
		console.log('store search:',objects);
	}

	// 组件加载完毕
  componentDidMount(){
  	NProgress.done();
    let dispatch = this.props.dispatch;
    PubSub.subscribe('select:store',function(evt,data){
    	console.log('select:store:',data)
			dispatch({
				type:'repairit/changeSelectStore',
				payload:{
					selectObjects:data["store"]
				}
			})
    })
  }

	render(){
	// 	title: '您需要维修什么?',
 // * 	checkMode: 'radio', // 选择模式 默认为多选， 值为radio(单选) 或 multiple(多选) ；单选模式 没有footer ；多选模式有footer,有checkbox框
 // *  onAdd: (objects)=>{ // 添加按钮的回调事件,回调的同时将所选对象集传递出去
 // *  	
 // *  }
 		let data = this.props.objectselect;
		return (
			<div className="eps-parts-search">
				<header className="header clear-margin specail" ref="header">
					<div className="header-bg"></div>
					<div className="header-bg-2"></div>
					<div className="header-c">
					</div>
				</header>
				<div className="eps-search-body">
					<ObjectSelectList data={data} searchType="store" onAdd={ this.onAdd }/>
				</div>
			</div>
		);
	}
}

export default connect(function(state){
	return state
})(StoreSearch);