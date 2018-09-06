import React,{ Component } from 'react';
import { connect } from 'dva';
class RejectTip extends Component{
	constructor(props) {
		super(props);
		this.state = {
			showB:false
		}
	}
	render(){
		let self = this;
		let data = this.props.data
		return (<div className={"reject-tip animated "+(data.show?'slideInLeft':'slideOutLeft')}>
			<div className={"reject-tip-s "+(this.state['showB']?'hide':'')}>
				<div className="reject-tip-close icon-close-s" onClick={(e)=>self.props.close()}></div>
				<div className="icon-reject-s"></div>
				<div className="reject-tip-c">
					<div className="reject-tip-title">DOA审核未通过</div>
					<div className="reject-tip-val">拒绝备注：维修订单明细填写的不够清楚 … <span onClick={(e)=>this.showB(e)}>点击查看详情</span></div>
				</div>
			</div>
			<div className={"reject-tip-b  animated zoomIn "+(this.state['showB']?'':'hide')}>
				<div className="reject-tip-close icon-close-b" onClick={(e)=>self.props.close()}></div>
				<div className="icon-reject-b"></div>
				<div className="reject-tip-c">
					<div className="reject-tip-title">DOA审核未通过</div>
					<div className="reject-tip-val">维修订单明细填写的不够清晰，无法通过审批，请将 维修设备ID、维修配件、维修数量等填写清楚。</div>
				</div>
			</div>
		</div>)
	}
	showB(){
		this.setState({
			showB:true
		})
	}
	componentDidMount(){
		console.log(this)
	}
};

export default connect((state)=>{return state})(RejectTip);
