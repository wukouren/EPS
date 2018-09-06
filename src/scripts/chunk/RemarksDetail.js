import React, { Component} from 'react';
import { connect } from 'dva';
import TodoItemView from './../components/Common/TodoItemView';
import LoadMore from './../components/Common/LoadMore';
import EpsDialog from './../components/Common/EpsDialog'
import Form from "jw-form/dist/mobile";
class Reply extends Component {
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:remark');
		var cache = store.find({id:'tab:cache'}) || {};
		if(cache['id']){
			props['remarksdetail']['parentData'] = cache["data"];
			props['remarksdetail']['remark'] = cache['data']['remark'];
		}
		super(props);
	}
	// 组件加载完毕
	componentDidMount(){
		NProgress.done();
	}
	render(){
		let dispatch = this.props.dispatch;
		return (
			<div className="eps-remarks-detail">
				<div className="i-remarks-wrap">
					<img src="images/remark.png"/>
				</div>
				<div className="remarks-detail">
					{ this.props.remarksdetail.remark || '暂无备注' }
				</div>
			</div>
		);
	}

}
export default connect((state)=>{return state})(Reply);


