/**
 * 仅pc端操作，统一待办地址
 */
import React, { Component } from 'react';
import { connect } from 'dva';

class TodoPC extends Component {
	// 组件加载完毕
	componentDidMount(){
		NProgress.done();
	}
	render(){
		return (<div className="root-container">
				<div className="root-container-w eps-todopc-page">
					<header className="header">
						<div className="header-bg-2"></div>
					</header>
					<sesstion className="main">
						<div className="main-c clear-padding eps-todopc-tips">
							<i className="icon-todopc-page"></i>
							<p className="eps-totopc-tip">
							该流程节点无法在移动端操作，请<br />前往 PC 端处理
							</p>
						</div>
					</sesstion>
				</div>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(TodoPC);