import React,{ Component } from 'react';
import { connect } from 'dva';
import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';
import {getUsers}  from '../../constants';

class UserCard extends Component{
	openWebView(data){
		console.log(data,"remarksdetail")
		var url = EpsWebRoot+'/#'+data;
		console.log(url,"url")
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
		console.log(datas,'这个里面有什么数据可以传过去呢');
		var url = EpsWebRoot+'/#/scrapped/'+datas["orderNumber"];
		window.upTabsData('scrap','cache',datas);
		jw.pushWebView(url);	
	}
	initRepairType(){
		let data = this.props.data;
		if(data['repairType']){
			return (data['repairType']=='0'?'预约':'紧急')
		}else{
			return ''
		}
	}
	NameInfo(name){ 
		console.log('name',name)
		 AlertInfoBase({
				text: name,
		 });
	}
	render(){
		let data = this.props.data;
		console.log(data,'oooooooooooooooooo');
		let userimg = '';
		// if(data['createEid']){
		// 	console.log(getUsers(data['createEid'],'num'),'oooooooooooooooooo')
		// }
		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length-1];
		let fileUrl = '/file/'+orderid;
		if(window.isUnfinishedOrHistory()){
			fileUrl = '/filehistory/'+orderid
		}
		
		return (<div className="user-card">
			<div className="user-card-c">
				<div className="user-card-avatar">
					<img src={data["avatar"]?data["avatar"]["avatar_l"]:'https://www.joywok.com/public/images/avatar/l.jpg'} alt=""/>
				</div>
				<div className="user-card-info">
					<div className="user-card-info-i">
						<span className="user-card-label">创建人</span>
						<span className="user-card-val">{data['name']}</span>
					</div>
					<div className="user-card-info-i">
						<span className="user-card-label">报修类型</span>
						<span className="user-card-val">{this.initRepairType()}</span>
						{
							data['repairType']=='1'?"":<span className="user-card-time">{moment(data['time']).format('YYYY-MM-DD HH:mm')}</span>
						}
					</div>
					<div className="user-card-info-i" onClick={()=>this.NameInfo(data['storeName'])}>
						<span className="user-card-label">报修餐厅</span>
						<span className="user-card-val ellipsis">{data['storeName']}</span>
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

export default connect((state)=>{return state})(UserCard);
