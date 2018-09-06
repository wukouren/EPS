/**
 * 项目采购(PM确认供应商的需求明细)头部用户信息
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
		let datas = this.props.orderdata;
		window.upTabsData('file','cache',datas);
		jw.pushWebView(url);
	}
	render(){
		let data = this.props.orderdata;
		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length-1];
		let fileUrl = '/file/'+orderid;
		if(window.isUnfinishedOrHistory()){
			fileUrl = '/filehistory/'+orderid
		}
		console.log(data,"data")
		return (<div className="user-card">
			<div className="user-card-c">
				<div className="user-card-avatar">
					<img src={ data.avatar } alt=""/>
				</div>
				<div className="user-card-info">
					<div className="user-card-info-i">
						<span className="user-card-label">创建人</span>
						<span className="user-card-val">{ data.requirementsPerson }</span>
					</div>
					<div className="user-card-info-i">
						<span className="user-card-label">项目名称</span>
						<span className="user-card-val">{ data.requirementsName }</span>
					</div>
					<div className="user-card-info-i">
						<span className="user-card-label">需求编号</span>
						<span className="user-card-val">{ data.orderNumber }</span>
					</div>
					<div className="user-card-info-btns">
						<div className="user-card-info-btn" onClick={(e)=>this.openFileView(fileUrl)}>
							<div className="user-card-info-btn-bg"></div>
							<div className="user-card-info-btn-val preview-file">查看附件{ data['fileCount'] && data['fileCount']!=0?('('+data['fileCount']+')'):''}</div>
						</div>
					</div>
				</div>
			</div>
		</div>)
	}
};

export default connect((state)=>{return state})(HeaderCard);
