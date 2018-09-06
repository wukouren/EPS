/**
 * 待办列表
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';

import UserCard from './../../components/Common/UserCard';
import TodoCard from './../../components/Common/TodoCard';
import MoneyShow from './../../components/Common/MoneyShow';
class MyTodos extends Component {
	render(){
		let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		let containerStyle = {
			height:(736-94-49-151)/41.4+'rem'
		}
		let data = this.props.todos;
		return (
			<div className="root-container">
				<div className="root-container-w">
					<header className="header" ref="header">
						<div className="header-bg"></div>
						<div className="header-bg-2"></div>
						<div className="header-c">
							<UserCard></UserCard>
						</div>
					</header>
					<sesstion className="main">
						<div className="main-c" style={containerStyle}>
							<TodoCard></TodoCard>
						</div>
					</sesstion>
					<MoneyShow></MoneyShow>
					<footer className="footer">
						<div className="log-btn" onClick={(e)=>this.openWebView('/log')}>
							<i className="icon-log"></i>
							<span>流程日志</span>
						</div>
						<div className="todo-info-status">
							<i className="icon-time-b"></i>
							<div className="todo-status-c">
								<span className="todo-status-title">DOA审批 (营运)</span>
								<span className="todo-status-tip">已确认待审批</span>
							</div>
						</div>
					</footer>
				</div>
			</div>
		);
	}
	openWebView(data){
		var url = EpsWebRoot+'/#'+data;
		jw.pushWebView(url);
	}
	onEndReached(e){

	}
	componentWillUnmout(){
		console.log('componentWillUnmout');
	}
	// 组件加载完毕
	componentDidMount(){
		NProgress.done();
	}
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(MyTodos);