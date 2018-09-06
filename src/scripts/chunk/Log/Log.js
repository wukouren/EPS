/**
 * 待办列表
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import request from '../../utils/EpsRequest';
import { orderStatus } from '../../constants';
import EmptyView from '../../components/Common/EmptyView';
import {getUsers} from '../../constants';
class Log extends Component{
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:log');
		var cache = store.find({id:'tab:cache'}) || {};
		if(cache['id']){
			props['log']['parentData'] = cache["data"];
			console.log(cache["data"],'这个里面是什么呢')
		}
		super(props);
	}
	render(){
		let data = this.props.log;
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
						<div className="main-c clear-padding" style={{
							overflowY:'visible'
						}}>
							<div className="todo-log">
								<div className="todo-log-hd" onClick={(e)=>this.openWebView('/approval')}>
									<div className="todo-log-hd-pic icon-log-icon"></div>
									<div className="todo-log-hd-next icon-next-arrow"></div>
									<div className="todo-log-hd-info">
										<div className="todo-log-hd-status">
											<div className="todo-log-hd-status-i">
												<span>当前流程</span><span>{
													this.initKey(data['parentData']['orderState'])['label']
												}</span>
											</div>
											<div className="todo-log-hd-status-i">
												<span>当前节点</span><span>{
												this.initKey(data['parentData']['orderState'])['val']
												}</span>
											</div>
										</div>
									</div>
								</div>
								<div className="todo-log-list">
									<div className="todo-log-list-t">操作日志</div>
										{this.combineContent()}
								</div>
							</div>
						</div>
					</sesstion>
				</div>
			</div>
		);
	}
	initKey(i){
		let data = this.props.log;
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
	openWebView(data){
		var url = EpsWebRoot+'/#'+data+'/'+this.props.params['orderid'];
		jw.pushWebView(url);
	}
	combineContent(){
		let data = this.props.log;
		let list = data['data'];
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
					<div className="todo-log-list-c">
						<div className="todo-log-list-c">
				   		<div className="todo-log-line"></div>
				   		{
				   			_.map(list,function(i){
									let date = moment(i['createDate']);
									return <div className={"todo-log-list-i "+(i["operateMarks"]?'active':'')}>
										<div className="todo-log-list-i-c">
											<div className="todo-log-list-i-time">
												<span>{date.format('YYYY-MM-DD')}</span>
												<span>{date.format('HH:mm')}</span>
											</div>
											<div className="todo-log-list-i-user">
												<img src={i['avatar']?i['avatar']['avatar_s']:'https://www.joywok.com/public/images/avatar/l.jpg'} alt=""/>
											</div>
											<div className="todo-log-list-i-status icon-pass-time-icon"></div>
											<div className="todo-log-list-i-info">
												<div className="todo-log-list-i-name">{i["operatePerson"]}</div>
												<div className="todo-log-list-i-val">{i["operateStates"]}</div>
												{
													(i["operateMarks"]?<div className="todo-log-list-i-tip">
													<div className="todo-log-list-i-tip-val">备注：{i["operateMarks"]}</div>
												</div>:'')
												}
											</div>
										</div>
										<div className="todo-log-list-i-line"></div>
									</div>
								})
				   		}
				   	</div>
			   	</div>
		  	);	
			}else{
				return (<EmptyView/>)
			}	
		}
	}
	// 组件加载完毕
	componentDidMount(){
		let self = this;
		let dispatch = this.props.dispatch;
		let orderid = this.props.params.orderid.split("&")[0];
		request('/McdEpsApi/joywok/common/getOrderLog',{
    	method:'POST',
    	body:JSON.stringify({
    		param:{
    			eid:eid,
    			record: {
			      orderNumber: orderid
			    }
    		}
		  })
    }).then(function(resp){
    	if(resp['data']['success']==false){
    	}else{
    		NProgress.done();
    		let data = resp['data']['body']['data'];
    		console.log(JSON.stringify({
    		param:{
    			eid:eid,
    			record: {
			      orderNumber: orderid
			    }
    		}
		  }),resp['data']['body'],'获取到的日志信息')
    		dispatch({
    			type:'log/changeData',
					payload:{
						data:data,
						loading:false
					}
	    	})
    		let userList = [];
    		_.each(data,function(i){
    			userList.push(i['createBy']);
    		})

    		let list = []

    		getUsers(userList.join(','),'num',function(resp){
    			list = resp['data'];
    			// console.log(resp['data'],'这个里面是啥',nowList);
					_.each(data,function(i){
						// console.log(i,'这个里面有啥呢',_.findWhere,list,'zzzzzzzzzzz');
						if(_.findWhere(list,{name:i['operatePerson']})){
							i['avatar'] = _.findWhere(list,{name:i['operatePerson']})["avatar"]
						}
					})
					dispatch({
						type:'log/changeData',
						payload:{
							data:data
						}
					})
    		})

    	}
    })
		this.setHeight();
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
export default connect(mapStateToProps)(Log);