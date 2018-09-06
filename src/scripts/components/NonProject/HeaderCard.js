/**
 * 非项目采购头部用户信息
 * demo
 * <header className="header header-4lines" ref="header">
					<div className="header-bg"></div>
					<div className="header-bg-2"></div>
					<div className="header-c">
						<HeaderCard userinfo={ userinfo }/>
					</div>
				</header>
 */

import React,{ Component } from 'react';
import { connect } from 'dva';
class HeaderCard extends Component{
	openFileView(data){
		var url = EpsWebRoot+'/#'+data;
		let datas = this.props.creatorinfo;
		window.upTabsData('file','cache',datas);
		jw.pushWebView(url);
	}
	openScrapView(){
		let datas = this.props.creatorinfo;
		localStorage.removeItem("Joywok:cache:tabs:scrap")
		var url = EpsWebRoot+'/#/scrapped/'+datas["orderNumber"];
		window.upTabsData('scrap','cache',datas);
		jw.pushWebView(url);	
	}
	render(){
		let creatorinfo=this.props.creatorinfo;
		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length-1];
		let fileUrl = '/file/'+orderid;
		if(window.isUnfinishedOrHistory()){
			fileUrl = '/filehistory/'+orderid
		}
		console.log(creatorinfo,'父级传过来的东西')
		return (<div className="user-card">
			<div className="user-card-c">
				<div className="user-card-avatar">
					<img src={creatorinfo.avatar} alt=""/>
				</div>
				<div className="user-card-info">
					<div className="user-card-info-i">
						<span className="user-card-label">创建人</span>
						<span className="user-card-val">{creatorinfo.createName}</span>
					</div>
					<div className="user-card-info-i">
						<span className="user-card-label">餐厅名称</span>
						<span className="user-card-val">{creatorinfo.storeName}</span>
					</div>
					<div className="user-card-info-i">
						<span className="user-card-label">餐厅编号</span>
						<span className="user-card-val">{creatorinfo.storeNumber}</span>
					</div>
					<div className="user-card-info-btns">
						<div className="user-card-info-btn" onClick={(e)=>this.openFileView(fileUrl)}>
							<div className="user-card-info-btn-bg"></div>
							<div className="user-card-info-btn-val preview-file" >查看附件{ creatorinfo['fileCount'] && creatorinfo['fileCount']!=0?('('+creatorinfo['fileCount']+')'):''}</div>
						</div>
						{
							creatorinfo.showScrapTip && creatorinfo.showScrapTip!=0 && window.userinfo['userType']=='2'?<div className="user-card-info-btn" onClick={(e)=>this.openScrapView(e)}>
								<div className="user-card-info-btn-bg"></div>
								<div className="user-card-info-btn-val preview-file">资产报废{ creatorinfo['scrapPageInfo']&& creatorinfo['scrapPageInfo'].length!=0?('('+creatorinfo['scrapPageInfo'].length+')'):''}</div>
							</div>:''
						}
					</div>
				</div>
			</div>
		</div>)
	}
};

export default connect((state)=>{return state})(HeaderCard);
