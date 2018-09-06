import React,{ Component } from 'react';
import { connect } from 'dva';

class EmptyWithArrow extends Component{

	constructor(props) {
		super(props);
	}

	render(){
		return (<div className="eps-empty-tip-arrow animated zoomIn">
				<i className={ this.props.icon }></i>
			</div>)
	}

};

export default connect()(EmptyWithArrow);
