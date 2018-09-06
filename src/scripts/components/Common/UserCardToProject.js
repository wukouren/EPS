/**
 * 工程类头部用户信息
 * demo
 * <header className="header header-4lines" ref="header">
					<div className="header-bg"></div>
					<div className="header-bg-2"></div>
					<div className="header-c">
						<UserCardToProject userinfo={ userinfo }/>
					</div>
				</header>
 */

import React,{ Component } from 'react';
import { connect } from 'dva';
class UserCardToProject extends Component{
	openWebView(data){
		var url = EpsWebRoot+'/#'+data;
		let datas = this.props.data;
		window.upTabsData('remark','cache',datas);
		jw.pushWebView(url);
	}
	openFileView(data){
		var url = EpsWebRoot+'/#'+data;
		let datas = this.props.data;
		window.upTabsData('file','cache',datas);
		jw.pushWebView(url);
	}
	openScrapView(){
		let datas = this.props.data;
		var url = EpsWebRoot+'/#/scrapped/'+datas["orderNumber"];
		window.upTabsData('scrap','cache',datas);
		jw.pushWebView(url);	
	}
	initRepairType(){
		let data = this.props.data || {name:'',time:'','storeName':'',remark:'',repairType:''};
		if(data['repairType']){
			return (data['repairType']=='0'?'预约':'紧急')
		}else{
			return ''
		}
	}
	render(){
		let data = this.props.data || {name:'',time:'','storeName':'',remark:'',repairType:''};
		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length-1];
		let fileUrl = '/file/'+orderid;
		if(window.isUnfinishedOrHistory()){
			fileUrl = '/filehistory/'+orderid
		}
		console.log('这个卡片里面拿到了什么值呢',this.props)
		return (<div className="user-card">
			<div className="user-card-c">
				<div className="user-card-avatar">
					<img src={data["avatar"]?data['avatar']["avatar_s"]:'https://www.joywok.com/public/images/avatar/l.jpg'} alt=""/>
				</div>
				<div className="user-card-info">
					<div className="user-card-info-i">
						<span className="user-card-label">创建人</span>
						<span className="user-card-val">{data['name'] || '-'}</span>
					</div>
					<div className="user-card-info-i">
						<span className="user-card-label">报修类型</span>
						<span className="user-card-val">{this.initRepairType()}</span>
						{
							data['repairType']=='0'?<span className="user-card-time">{data['time']?moment(data['time']).format('YYYY-MM-DD HH:mm'):'-'}</span>:''
						}
					</div>
					<div className="user-card-info-i">
						<span className="user-card-label">报修餐厅</span>
						<span className="user-card-val">{data["storeName"]||'-'}</span>
					</div>
					<div className="user-card-info-btns">
						{
							data['remark'] && data['remark'].length!=0?<div className="user-card-info-btn" onClick={(e)=>this.openWebView('/remarksdetail')}>
								<div className="user-card-info-btn-bg"></div>
								<div className="user-card-info-btn-val">查看备注</div>
							</div>:''
						}
						<div className="user-card-info-btn" onClick={(e)=>this.openFileView(fileUrl)}>
							<div className="user-card-info-btn-bg"></div>
							<div className="user-card-info-btn-val preview-file">查看附件{ data['fileCount'] && data['fileCount']!=0?('('+data['fileCount']+')'):''}</div>
						</div>
						{
							data.showScrapTip && data.showScrapTip!=0&& window.userinfo['userType']=='2'?<div className="user-card-info-btn" onClick={(e)=>this.openScrapView(e)}>
								<div className="user-card-info-btn-bg"></div>
								<div className="user-card-info-btn-val preview-file">资产报废{ data['scrapPageInfo']&& data['scrapPageInfo'].length!=0?('('+data['scrapPageInfo'].length+')'):''}</div>
							</div>:''
						}
					</div>
				</div>
			</div>
		</div>)
	}
};

export default connect((state)=>{return state})(UserCardToProject);
