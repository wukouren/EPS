/**
 * 创建非项目订单（含设备／工程／IT）
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';

import MaintenanceReplyCard from '../../components/Common/MaintenanceReplyCard';
import MaintenanceReplyDeviceDetail from '../../components/Common/MaintenanceReplyDeviceDetail';
import MoneyShowItem from '../../components/Common/MoneyShowItem';

import Form from "jw-form/dist/mobile";
import EpsDialog from '../../components/Common/EpsDialog';

class ReplyList extends Component {
	FormChange(values, schema) {
		console.log("values:", values, "FormChange:", schema);
	}
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:MaintenanceReplyList');
		var cache = store.find({ id: 'tab:cache' }) || {};
		if (cache['id']) {
			props['maintenance'] = _.extend({}, props['maintenance'], {
				list: cache['data']["list"]
			})
			let dispatch = props.dispatch;
			dispatch({
				type: 'maintenance/changeData',
				payload: {
					list: cache['data']["list"]
				}
			})
		}
		super(props);
	}
	changeData(targetIndex, data) {
		let dispatch = this.props.dispatch;
		let dataList = _.clone(this.props.maintenance["list"]);
		_.each(dataList, function (i, index) {
			if (targetIndex == index) {
				_.extend(i, data)
			}
		})
		dispatch({
			type: 'maintenance/changeData',
			data: {
				list: dataList
			}
		})
	}
	render() {
		let self = this;
		let data = this.props.maintenance;
		return (
			<div className="root-container">
				<div className="root-container-w">
					<header className="header" ref="header">
						<div className="header-bg-specail">
							<div className="header-bg"></div>
							<div className="header-bg-2"></div>
						</div>
						<div className="header-c">
						</div>
					</header>
					<sesstion className="main">
						<div className="main-c">
							<div className="maintenance-device-list">
								{
									_.map(data["list"], function (i, index) {
										return <MaintenanceReplyDeviceDetail data={i} index={index} changeData={(index, data) => self.changeData(index, data)}></MaintenanceReplyDeviceDetail>
									})
								}
							</div>
						</div>
					</sesstion>
				</div>
			</div>
		);
	}
	// 组件加载完毕
	componentDidMount() {
		let self = this;
		NProgress.done();
		if (JWReady == true) {
			jw.setFuncBtns([{
				type: '11',
				name: '完成'
			}])
		} else {
			window.EpsEvents.off('jwready:ok').on('jwready:ok', () => {
				jw.setFuncBtns([{
					type: '11',
					name: '完成'
				}])
			})
		}
		window.onJwNavBtnClick = function () {
			let datas = {
				list: self.props.maintenance['list']
			};
			window.upTabsData('editmaintenancereplyDevice', 'publish', datas);
			jw.closeWebView();
		}
	}
}
export default connect(function (state) {
	return state
})(ReplyList);