/**
 * 项目采购（审批，DOA审批，餐厅确认）头部用户信息
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
import { getDict,getUsers,openChart,DataLength} from '../../constants';
import { AlertInfoBase } from '../../components/Common/EpsModal';

class HeaderCard extends Component{
	NameInfo(e,name){ 
		if(DataLength(name)>10){
			AlertInfoBase({
        text: name,
     });
		}   
  }
  openFileView(data){
		var url = EpsWebRoot+'/#'+data;
		let datas = this.props.orderdata;
		window.upTabsData('file','cache',datas);
		jw.pushWebView(url);
	}
	render(){
		let self = this;
		let data = this.props.orderdata ? this.props.orderdata : {} ;
		let originaldata = data.originaldata;
		let TSI="";
		let orderid = window.location.href.split('?updateDate')[0].split('/');
		orderid = orderid[orderid.length-1];
		let fileUrl = '/file/'+orderid;
		if(window.isUnfinishedOrHistory()){
			fileUrl = '/filehistory/'+orderid
		}
		if(data.isTsi == true){
			TSI = (<div className="user-card-info-i">
					<span className="user-card-label">供应商名</span>
					<span className="user-card-val ellipsis" onClick={ e => { self.NameInfo(e,data.vendorName) } }>{ data.vendorName }</span>
				</div>);	
		}
		return (<div className="user-card eps-project-approval-header">
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
						<span className="user-card-label">餐厅名称</span>
						<span className="user-card-val ellipsis" onClick={ e => { self.NameInfo(e,data.storeName) } }>{ data.storeName }</span>
					</div>
					<div className="user-card-info-i">
						<span className="user-card-label">餐厅编号</span>
						<span className="user-card-val">{ data.storeNumber }</span>
					</div>
					{ TSI }
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

export default connect()(HeaderCard);
