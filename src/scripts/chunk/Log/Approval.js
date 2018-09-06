/**
 * 待办列表
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import request from '../../utils/EpsRequest';
import EmptyView from '../../components/Common/EmptyView';
import { orderStatus } from '../../constants';
/*
	<div className="todo-log-approcal-i">
		<div className="todo-log-approcal-i-num">
			<div className="todo-log-approcal-i-num-val animated slideInLeft">2</div>
			<div className="todo-log-approcal-i-line"></div>
		</div>
		<div className="todo-log-approcal-i-info animated slideInRight">供应商响应</div>
	</div>
	<div className="todo-log-approcal-i active">
		<div className="todo-log-approcal-i-num">
			<div className="todo-log-approcal-i-num-val animated slideInLeft">3</div>
			<div className="todo-log-approcal-i-line animated slideInRight"></div>
		</div>
		<div className="todo-log-approcal-i-info animated slideInRight">供应商评估</div>
	</div>
	<div className="todo-log-approcal-i unpass">
		<div className="todo-log-approcal-i-num">
			<div className="todo-log-approcal-i-num-val animated slideInLeft">4</div>
			<div className="todo-log-approcal-i-line"></div>
		</div>
		<div className="todo-log-approcal-i-info animated slideInRight">评估确认</div>
	</div>
 */
class Approval extends Component {
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:log');
		var cache = store.find({id:'tab:cache'}) || {};
		if(cache['id']){
			props['approval']['parentData'] = cache["data"];
		}
		super(props);
	}
	render(){
		let data = this.props.approval;
		return (
			<div className="root-container">
				<div className="root-container-w">
					<header className="header specail" ref="header">
						<div className="header-bg"></div>
						<div className="header-bg-2"></div>
						<div className="header-c">
						</div>
					</header>
					<sesstion className="main">
						<div className="main-c clear-padding clear-scroll">
							<div className="todo-log">
								<div className="todo-log-hd">
									<div className="todo-log-hd-pic icon-apprpval-icon"></div>
									<div className="todo-log-hd-info">
										<div className="todo-log-hd-status">
											<div className="todo-log-hd-status-i">
												<span>当前流程</span><span>{
													this.initKey(data['parentData']['orderState'])['label']
												}</span>
											</div>
										</div>
									</div>
								</div>
								<div className="todo-log-list todo-approval-list">
									{
										this.combineContent()
									}
								</div>
							</div>
						</div>
					</sesstion>
				</div>
			</div>
		);
	}
	initKey(i){
		let data = this.props.approval;
		if(typeof(data['parentData']["logType"])=='undefined'){
			return orderStatus['repair'][i];
		}else{
			if(typeof(data['parentData']["logType"])=='object'){
				return orderStatus[data['parentData']["logType"]["key"]][data['parentData']["logType"]["subkey"]][i]
			}else{
				return orderStatus[data['parentData']["logType"]][i];
			}
		}
	}
	combineContent(){
		let data = this.props.approval;
		let list = [];
		if(typeof(data['parentData']["logType"])=='undefined'){
			_.each(orderStatus['repair'],function(i,key){
				i['index'] = key;
				list.push(i)
			});
		}else{
			if(typeof(data['parentData']["logType"])=='object'){
				_.each(orderStatus[data['parentData']["logType"]["key"]][data['parentData']["logType"]["subkey"]],function(i,key){
					i['index'] = key;
					list.push(i)
				});
			}else{
				_.each(orderStatus[data['parentData']["logType"]],function(i,key){
					i['index'] = key;
					list.push(i)
				});
			}
		}
		console.log(list,'这个里面返回了什么');
		if(data['loading']){
			return <div className="loading-bounce-w fix">
							<div className="loading-bounce-bg"></div>
							<div className="loading-gif">
								<img src="images/loading.gif" />
							</div>
						</div>
		}else{
			if(list && list.length>0){
				return (
			   	<div className="todo-log-list-c clear-margin">{_.map(list,function(i,index){
			   		return <div className={"todo-log-approcal-i "+(data['parentData']['orderState']==i["index"]?'active':'')}>
											<div className="todo-log-approcal-i-num">
												<div className="todo-log-approcal-i-num-val hide">{
													i["index"]
												}</div>
												<div className="todo-log-approcal-i-line"></div>
											</div>
											<div className="todo-log-approcal-i-info hide">{
												i['label']
											}</div>
										</div>
			   	})}</div>
		  	);	
			}else{
				return (<EmptyView tip="暂无节点"/>)
			}	
		}
	}
	// 组件加载完毕
	componentDidMount(){
		let self = this;
		let dispatch = this.props.dispatch;
		let orderid = this.props.params.orderid.split("&")[0];
    NProgress.done();
		this.setHeight();
		setTimeout(function(){
			$('.todo-log-approcal-i-num-val').addClass('animated slideInLeft').removeClass('hide')
			
			$('.todo-log-approcal-i-info').addClass('animated slideInRight').removeClass('hide')
			
		},100)
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
			let top = $('.todo-log-hd').height() ||0;
			let title = $(".todo-log-list-t").height()||0
			$('.todo-log-list-c').css({height:clientHeight-header-top-title-30+'px'});
		},0)
	}
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(Approval);