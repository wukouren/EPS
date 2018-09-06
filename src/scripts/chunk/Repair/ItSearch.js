/**
 * 搜索IT设备
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ObjectSelectList from '../../components/Common/ObjectSelectList';
import { connect } from 'dva';

class ItSearch extends Component {

	constructor(props) {
		super(props);
	}

	onAdd(objects){
		console.log(objects);
	}

	// 组件加载完毕
  componentDidMount(){
		NProgress.done();
  }

	render(){
	// 	title: '您需要维修什么?',
 // * 	action: 'repairdevice/search' // 搜索框发生变化时dispatch的请求action
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
					<ObjectSelectList data={data} searchType="it"  onAdd={ this.onAdd } />
				</div>
			</div>
		);
	}
}

export default connect(function(state){
  return state
})(ItSearch);