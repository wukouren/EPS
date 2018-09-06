/**
 * IT类头部用户信息
 * demo
 * <header className="header header-4lines" ref="header">
					<div className="header-bg"></div>
					<div className="header-bg-2"></div>
					<div className="header-c">
						<UserCardToIt userinfo={ userinfo }/>
					</div>
				</header>
 */

import React,{ Component } from 'react';
import { connect } from 'dva';
import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';

class UserCardToIt extends Component{
	openWebView(data){
		var url = EpsWebRoot+'/#'+data;
		let datas = this.props.data;
		datas.remark = datas.supRemarks;
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
		localStorage.removeItem("Joywok:cache:tabs:scrap")
		var url = EpsWebRoot+'/#/scrapped/'+datas["orderNumber"];
		window.upTabsData('scrap','cache',datas);
		jw.pushWebView(url);	
	}
	NameInfo(name){ 
		console.log('name',name)
		 AlertInfoBase({
				text: name,
		 });
	}
	render(){
		let data = this.props.data || {createBy:'',itTsi:'',orderNumber:'',storeName:''};
		let OrderNum = (data && data.pageInfo && data.pageInfo.list && data.pageInfo.list.length > 0)?data.pageInfo.list[0]['orderNumber800']:'';
		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length-1];
		let fileUrl = '/file/'+orderid;
		if(window.isUnfinishedOrHistory()){
			fileUrl = '/filehistory/'+orderid
		}
		
		console.log(data['scrapPageInfo'],'这个值是什么呀');
		return (<div className="user-card">
			<div className="user-card-c">
				<div className="user-card-avatar">
					<img src={data["avatar"]?data['avatar']["avatar_s"]:'https://www.joywok.com/public/images/avatar/l.jpg'} alt=""/>
				</div>
				<div className="user-card-info">
					<div className="user-card-info-i">
						<dt><label>创建人</label></dt>
						<dd className="ellipsis"><font className="ellipsis" >{data.createBy}</font></dd>
					</div>
					<div className="user-card-info-i" onClick={()=>this.NameInfo(data.itTsi)}>
						<dt><label>TSI</label></dt>
						<dd><font className="ellipsis">{data.itTsi}</font></dd>
					</div>
					<div className="user-card-info-i">
						<dt><label>800维修单号</label></dt>
						<dd><font>{OrderNum}</font></dd>
					</div>
					<div className="user-card-info-i" onClick={()=>this.NameInfo(data.storeName)}>
						<dt><label>餐厅名称</label></dt>
						<dd><font className="ellipsis">{data.storeName}</font></dd>
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
					<div className="user-card-info-i hide">
						<dt onClick={(e)=>this.openWebView('/remarksdetail')}><label>更多备注</label></dt>
						<dd></dd>
					</div>
				</div>
			</div>
		</div>)
	}
};

export default connect((state)=>{return state})(UserCardToIt);
