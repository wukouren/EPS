import React,{ Component } from 'react';
import { connect } from 'dva';

class EmptyView extends Component{

	constructor(props) {
		super(props);
	}

	render(){
		return (<div className="eps-empty-view">
				<font className="emptyicon">
					<img src="images/empty-device.png"/>
				</font>
				<p>{ this.props.tip || '没有找到相关内容' }</p>
			</div>)
	}

};

export default connect(function(state){return state})(EmptyView);
