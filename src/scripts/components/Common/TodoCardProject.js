import React,{ Component } from 'react';
import { connect } from 'dva';

class DeviceCardCommon extends Component{
	constructor(props) {
		super(props);
		this.state = {}
	}
	render(){
		let data = this.props.itemdata;
		console.log('data.showCardIcon:',this.props.showCardIcon)
		return (
			<div className="eps-list-card">
				{ this.props.showCardIcon==true ? (<i className="eps-list-card-bgicon"></i>) : '' }
				<div className="eps-list-inline">
					<div className="eps-list-item">
						<label>设备名称</label>
						<font>{ data.name }</font>
					</div>
					<div className="eps-list-item">
						<label>维修商</label>
						<font>{ data.repairstore }</font>
					</div>
				</div>
				<div className="eps-list-item">
					<label>FA Code</label>
					<font>{ data.facode }</font>
				</div>
				<div className="eps-list-item">
					<label>FA Code2</label>
					<font>{ data.facode2 }</font>
				</div>
			</div>
		)
	}
}

class TodoCard extends Component{
	render(){
		let data = this.props.data;
		let showAllData = this.props.showAllData;
		return (<div className="todo-card animated zoomIn">
				<DeviceCardCommon itemdata={data}></DeviceCardCommon>
			{
				showAllData?<div className="todo-btn border-line-h before  specail-color" onClick={(e)=>this.props.openView(e)}>查看更多设备信息</div>:''
			}
		</div>)
	}
	openWebView(data){
		var url = EpsWebRoot+'/#'+data;
		jw.pushWebView(url);
	}
};

export default connect((state)=>{return state})(TodoCard);
