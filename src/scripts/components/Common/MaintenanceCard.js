import React,{ Component } from 'react';
import { connect } from 'dva';
class MaintenanceCard extends Component{
	
	render(){
		let data = this.props.data;
		let showAllData = this.props.showAllData;
		let title_label = '保养-'+(data["model_type"]=='equipment'?'设备':'工程')+'（'+(data["type"]=='year'?'年度':'月度')+'计划）'
		return (<div className="maintenance-card animated zoomIn">
			<div className="maintenance-card-c">
				<div className="maintenance-card-title">
					<i></i>
					<div className="maintenance-card-t-v">{title_label}</div>
					<div className="maintenance-card-time">
						<i className="icon-time"></i>
						<span>{data["createDate"]}</span>
					</div>
				</div>
				<div className="maintenance-card-info">
					{
						data["planName"]?<div className="maintenance-card-i">
							<div className="maintenance-card-label ">保养计划名称</div>
							<div className="maintenance-card-val ellipsis more">{data["planName"]}</div>
						</div>:''
					}
					<div className="maintenance-card-i">
						<div className="maintenance-card-label ">{(data["type"]=='year'?'保养年度':'保养月度')}</div>
						<div className="maintenance-card-val ellipsis more">{(data["type"]=='year'?data["orderYear"]:data["orderMonth"])}</div>
					</div>
				</div>
			</div>
		</div>)
	}
	openWebView(data){
		var url = EpsWebRoot+'/#'+data;
		jw.pushWebView(url);
	}
};

export default connect((state)=>{return state})(MaintenanceCard);
