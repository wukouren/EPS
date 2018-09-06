/**
 * 首页
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'dva/router';
import { connect } from 'dva';
const txtTodos={'10':'维修','20':'保养','30':'非项目','40':'项目','50':"新店/改造非GC",'60':'新店/改造GC','11':'设备','12':'工程','13':'IT','31':'设备','32':'工程','33':'IT'}
class IndexPage extends Component {
	render(){
		let todosMenu=this.props.indexpage.todosMenu;
		let repairMenu=this.props.indexpage.repairMenu;
		let noProjectMenu=this.props.indexpage.noProjectMenu;
		let userInfo=userinfo;
		let self=this;
		if(this.props.indexpage.loading){
			return  (<div className="todos-loading">
									<img src="images/loading.gif" />
							</div>)
		}else{
			console.log(userinfo,"userinfo",todosMenu,this.props.indexpage.listCnt)
      let createMenuHtml='';
      let imgurl = userinfo.avatar["avatar_l"];
      if(imgurl.indexOf('www.joywok.com')==-1){
      	imgurl = 'http://www.joywok.com/'+imgurl;
      }
			return (<div className="root-container">
							<div className="root-container-w root-container-homepage">
								<header className="header">
									<div className="header-bg"></div>
									<div className="header-c user">
										<div className="user-avatar">
											<img src={imgurl} />
										</div>
										<div className="user-info">
											<div className="user-info-i">
												<label>{userInfo.name}</label>
											</div>
											<div className="user-info-i">
												<span>{userInfo.vendorName}</span>
												<span>{userInfo.storeName}</span>
												<span>{userInfo.doaRoleName}</span>
											</div>
										</div>
									</div>
								</header>
								<sesstion className="main">
									<div className="main-c clear-padding index-apps">
										<div className="index-apps-i">
											{ this.renderCategoryPortal() }
										</div>
										<div className="index-apps-i">
											<div className="index-apps-title" onClick={(e)=>this.pushWebView('/#/todos')}>
												<i className="icon-next-arrow"></i><span>我的待办</span>
											</div>
											<div className="index-apps-c border-line-h before">
												{
													_.map(todosMenu,function(item){
														return self.todomenuRender(item)
													})
												}
											</div>
										</div>
										{
											self.createRender(repairMenu,noProjectMenu)
										}
									</div>
								</sesstion>
							</div>
						</div>
					);
			}
	}
	renderCategoryPortal(){
		let list_basurl = '/#/todos?status=',
			unfinishedNum = _.reduce(_.values(this.props.indexpage.listCnt), function(cur, num){ return cur + num; }, 0),
			unfinishedNumstr = unfinishedNum!=0?(<div className="apps-i-num eps-badge">{unfinishedNum}</div>):'';
		return (<div className="index-apps-c border-line-h before">
			<div className="apps-i weixiu" onClick={(e)=>this.pushWebView(list_basurl+'0')}>
				<div className="apps-i-c border-line-v before">
					<div className="apps-i-logo">
						{unfinishedNumstr}
						<div className="apps-i-logo-c icon-order-todos"></div>
					</div>
					<div className="apps-i-val">我的待办</div>
				</div>
			</div>
			<div className="apps-i weixiu" onClick={(e)=>this.pushWebView(list_basurl+'1')}>
				<div className="apps-i-c border-line-v before">
					<div className="apps-i-logo">
						<div className="apps-i-logo-c icon-order-unfinished"></div>
					</div>
					<div className="apps-i-val">在途订单</div>
				</div>
			</div>
			<div className="apps-i weixiu" onClick={(e)=>this.pushWebView(list_basurl+'2')}>
				<div className="apps-i-c border-line-v before">
					<div className="apps-i-logo">
						<div className="apps-i-logo-c icon-order-history"></div>
					</div>
					<div className="apps-i-val">历史订单</div>
				</div>
			</div>
		</div>);
	}
	todomenuRender(data){
		let numHtml='';
		// console.log(this.props.indexpage.listCnt[data.type],"num")
		if(this.props.indexpage.listCnt[data.type]){
				numHtml=<div className="apps-i-num eps-badge">{this.props.indexpage.listCnt[data.type]}</div>
		}else{
				numHtml='';	
		}
		return (
			<div className="apps-i weixiu" onClick={(e)=>this.pushWebView(data.menu_url)}>
				<div className="apps-i-c border-line-v before">
					<div className="apps-i-logo">
						{numHtml}
						<div className={ "apps-i-logo-c "+'icon-todo-'+data.type}></div>
					</div>
					<div className="apps-i-val">{txtTodos[data.type]}</div>
				</div>
			</div>
		);
		
	}
	createRender(repairMenu,noProjectMenu){
    	if(repairMenu.length==0&&noProjectMenu.length==0){
    		return <div className="no-create-menu"></div>
    	}else{
    		return <div className="index-apps-i">
											<div className="index-apps-title">
												<span>创建订单</span>
											</div>
											<div className="index-apps-c border-line-h before">
												{
													this.repairRender(repairMenu)
												}
												{
													this.noProjectRender(noProjectMenu)
												}
											</div>
										</div>
    	}
	}
	repairRender(repairMenu){
		let self=this;
		console.log(repairMenu,"repairMenu")
		if(repairMenu.length>0){
			return <div className="index-create-order-i weixiu">
							<div className="index-create-order-label border-line-v after">
								<i className="icon-weixiu-icon" ></i>
								<span>维修</span>
							</div>
							<div className="index-create-order-c">
							  {
									_.map(repairMenu,function(item){
										return self.createMenuRender(item)
									})
								}
							</div>
						</div>
		}else{
			return <div className="no-create-menu"></div>
		}
	}
	noProjectRender(noProjectMenu){
		let self=this;
		if(noProjectMenu.length>0){
			return 	<div className="index-create-order-i">
								<div className="index-create-order-label border-line-v after">
									<i className="icon-feixiangmu-icon"></i>
									<span>非项目</span>
								</div>
								<div className="index-create-order-c">
									{
										_.map(noProjectMenu,function(item){
											return self.createMenuRender(item)
										})
									}
								</div>
						</div>
		}else{
			return <div className="no-create-menu"></div>
		}
	}
	createMenuRender(data){
		 let IconName='';
		  if(data.type=='11'||data.type=='31'){
		  	IconName='icon-device';
		  }else if(data.type=='12'||data.type=='32'){
		  	IconName="icon-project";
		  }else if(data.type=='13'||data.type=='33'){
		  	IconName="icon-it";
		  }
		 return (	<div className="index-order-i device" onClick={(e)=>this.pushWebView(data.menu_url)}>
				<i className={IconName}></i>
				<span>{txtTodos[data.type]}</span>
			</div>)
	}
	pushWebView(data){
		console.log(EpsWebRoot,data,"EpsWebRoot")
		var url = EpsWebRoot+data;
		jw.pushWebView(url);
	}
	// 组件加载完毕
  componentDidMount(){
  	let appid=configData.appid;
  	console.log("configData",appid)
		NProgress.done();
	  let dispatch=this.props.dispatch;
		PubSub.subscribe('get:child:todos:updateTodoList',function(evt,data){
    	console.log('updateTodoList',data);
    	dispatch({
				type:"indexpage/getMenu",
				payload:{
					loading:false,
				  param:{
				  		eid:userinfo.employee_id,
				  		appid:window.appid,
				  }
				}
			})
		});
		dispatch({
			type:"indexpage/getMenu",
			payload:{
				loading:false,
			  param:{
			  		eid:userinfo.employee_id,
			  		appid:window.appid,
			  }
			}
		})
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(IndexPage);
