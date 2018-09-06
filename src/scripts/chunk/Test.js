/**
 * Test
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'dva/router';
import { connect } from 'dva';

import UploadFile from '../components/Common/UploadFile';
class Test extends Component {
	render(){
		return (<div className="root-container">
				<div className="root-container-w">
					<header className="header">
						<div className="header-bg"></div>
						<div className="header-c user">
							<div className="user-avatar">
								<img src="http://img4.imgtn.bdimg.com/it/u=2003988139,3010807873&fm=26&gp=0.jpg"/>
							</div>
							<div className="user-info">
								<div className="user-info-i">
									<label>曹晓蕾</label>
								</div>
								<div className="user-info-i">
									<span>餐厅经理，上海南站虹门路店</span>
								</div>
							</div>
						</div>
					</header>
					<sesstion className="main">
						<div className="main-c clear-padding index-apps">
							<UploadFile></UploadFile>
						</div>
					</sesstion>
				</div>
			</div>
		);
	}
	// 组件加载完毕
	componentDidMount(){
		NProgress.done();
	}
}

function mapStateToProps(state) {
	return state;
}

export default connect(mapStateToProps)(Test);
