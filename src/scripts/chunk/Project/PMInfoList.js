/**
 * 此js含以下页面(需求阶段 - 项目采购更多明细页面)：
 * 
 * 项目采购－设备list vendorType=1
 * 项目采购－工程list vendorType=2
 * 项目采购－IT list vendorType=3
 * 路由：/project/pminfo-list/:orderid/:vendorNumber/:storeNumber/:vendorType
 * 
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import request from '../../utils/EpsRequest';
import LoadMore from './../../components/Common/LoadMore';
import EmptyView from '../../components/Common/EmptyView';
import { DeviceCard, ProjectCard, ITCard } from './../../components/Project/InfoListCard';
import { PAGE_SIZE } from '../../constants';

class InfoList extends Component {
	// 页面渲染
	render() {
		let data = this.props.pminfolist;
		console.log('prrr', data);
		let view = this._init_view();
		if (data.loading['loading']) {
			return (<div className="todos-loading">
				<img src="images/loading.gif" />
				<span>加载中</span>
			</div>)
		} else {
			return (
				<div className="root-container">
					{view}
				</div>
			);
		}
	}
	// 初始化页面
	_init_view() {
		let view = '';
		let data = this.props.pminfolist;
		this.curPageNum = data.pager ? data.pager.pageNum : 1;
		// 组织加载更多
		let LoadMoreHtml = '';
		if (data.total < PAGE_SIZE) {
			LoadMoreHtml = ""
		} else if (data.noMore) {
			LoadMoreHtml = <div className="noMore-Data">没有更多了</div>
		} else {
			LoadMoreHtml = <LoadMore data={{
				hide: data['loading']['hide'],
				fix: data['loading']['fix'],
				loading: data['loading']['loading']
			}}
				container='it-details'
				onEndReached={(e) => { this.onEndReached(e) }} />
		}
		// 组织list view
		let listView;
		console.log('iiii', data);
		if (data.list == 'firstenter') {
		} else if (data.list && typeof (data.list) != 'string' && data.list.length > 0) {
			// 设备
			if (this.props.params.vendorType == '1') {
				// alert(1)
				listView = (
					<ul className="">
						{
							data.list.map((device, key) => {
								device.vendorName = data.originaldata.vendorName;
								device.eqTotalAll = device.priceall;
								device.lumpSumPrice = device.otherCostAll;
								return (
									<DeviceCard itemdata={device} deviceRoleType={data.vendorRole} showIndex={true} index={(key + 1) || 0} total={data.total || 0} />
								)
							})
						}
					</ul>
				);
				// 工程
			} else if (this.props.params.vendorType == '2') {
				// alert(2)
				listView = (
					<ul className="">
						{
							data.list.map((device, key) => {
								device.vendorName = data.originaldata.vendorName;
								return (
									<ProjectCard itemdata={device} showIndex={true} index={(key + 1) || 0} total={data.total || 0} />
								)
							})
						}
					</ul>
				);
				// IT
			} else {
				// alert(3)
				listView = (
					<ul className="">
						{
							data.list.map((device, key) => {
								device.vendorName = data.originaldata.vendorName;
								if (data.isTsi) device.lumpSumPrice = device.priceall;
								return (
									<ITCard itemdata={device} isTsi={data.isTsi} showIndex={true} index={(key + 1) || 0} total={data.total || 0} />
								)
							}
							)
						}
					</ul>
				);
			}
		} else {
			listView = (<EmptyView tip={'暂无数据'} />)
		}
		// 组织显示内容
		view = <div className="root-container-w eps-project-infolist-container">
			<header className="header header-with-memo xheight header-adapt" ref="header">
				<div className="header-bg"></div>
				<div className="header-c">
					<div className="header-bg-2-adapt"></div>
				</div>
			</header>
			<sesstion className="main ">
				<div className="main-c todo-info-it it-details">
					{listView}
					{LoadMoreHtml}
				</div>
			</sesstion>
		</div>
		return view
	}

	openWebView(data) {
		var url = EpsWebRoot + '/#' + data
		jw.pushWebView(url);
	}
	componentDidUpdate() {
		let self = this;
		this.setHeight()
	}

	// 获取列表信息
	getDeviceListByStore(nextPageNum) {
		let self = this;
		let dispatch = this.props.dispatch;
		nextPageNum = nextPageNum ? nextPageNum : 1;

		dispatch({
			type: 'pminfolist/getDeviceListByStore',
			payload: {
				condition: {
					orderNumber: this.props.params.orderid,
					vendorNumber: this.props.params.vendorNumber,
					storeNumber: this.props.params.storeNumber,
					vendorType: this.props.params.vendorType
				},
				pager: {
					pageNum: nextPageNum,
					pageSize: PAGE_SIZE
				}
			}
		})

	}

	componentDidMount() {
		NProgress.done();

		let self = this;
		let dispatch = this.props.dispatch;
		let modelData = this.props.pminfolist;
		self.setHeight();

		let orderid = this.props.params.orderid;
		//首次加载数据
		setTimeout(function () {
			self.getDeviceListByStore();
		}, 0)
	}

	//上拉加载更多回调
	onEndReached(e) {
		let dispatch = this.props.dispatch;
		let pageNum = this.props.pminfolist.pageNum;
		dispatch({
			type: "pminfolist/changeData",
			payload: {
				noMore: false,
				fix: true,
			}
		})
		this.getDeviceListByStore(this.curPageNum + 1);
	}

	setHeight() {
		let self = this;
		setTimeout(function () {
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			let header = $('.header').height() || 0;
			$('.it-details').css({ height: clientHeight - header - 10 + 'px' });
		}, 0)
	}
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(InfoList);