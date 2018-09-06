/**
 * 此js含以下页面(项目采购更多明细页面)：
 * 
 * 项目采购－设备list
 * 项目采购－工程list
 * 项目采购－IT list
 * 路由：/project/info-list/:objecttype/:orderid
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
	constructor(props) {
		super(props);
		let updatetime = this.props.location.query.updateDate;
		for (var i = 0; i <= 12; i++) {
			updatetime = decodeURIComponent(updatetime);
		}
		window.updatetime = updatetime
	}

	// 页面渲染
	render() {
		let data = this.props.approval;
		console.log('rrrrrddd', data);
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
		let data = this.props.approval;
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
		if (data.list == 'firstenter') {
		} else if (data.list && typeof (data.list) != 'string' && data.list.length > 0) {
			// 设备
			if (this.props.params.objecttype == 'equipment') {
				listView = (
					<ul className="">
						{
							data.list.map((device, key) => {
								device.vendorName = data.originaldata.vendorName;
								return (
									<DeviceCard isInfoList={true} showIndex={true} index={(key + 1) || 0} total={data.total || 0} itemdata={device} deviceRoleType={data.originaldata.type} />
								)
							})
						}
					</ul>
				);
				// 工程
			} else if (this.props.params.objecttype == 'project') {
				listView = (
					<ul className="">
						{
							data.list.map((device, key) => {
								device.vendorName = data.originaldata.vendorName;
								return (
									<ProjectCard isInfoList={true} itemdata={device} showIndex={true} index={(key + 1) || 0} total={data.total || 0} />
								)
							})
						}
					</ul>
				);
				// IT
			} else {
				listView = (
					<ul className="">
						{
							data.list.map((device, key) => (
								<ITCard isInfoList={true} showIndex={true} index={(key + 1) || 0} total={data.total || 0} itemdata={device} isTsi={data.originaldata.isTsi} />))
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
	getStoreInfo(nextPageNum) {
		let self = this;
		let dispatch = this.props.dispatch;
		nextPageNum = nextPageNum ? nextPageNum : 1;

		dispatch({
			type: 'approval/getStoreInfo',
			payload: {
				condition: {
					orderNumber: this.props.params.orderid,
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
		let modelData = this.props.approval;
		self.setHeight();

		let orderid = this.props.params.orderid;
		//首次加载数据
		setTimeout(function () {
			self.getStoreInfo();
			// request('/McdEpsApi/joywok/project/getStoreInfo',{
			//     method:'POST',
			//     body:JSON.stringify({
			//       param:{
			//       	eid: eid,
			//         condition:{
			//           orderNumber:orderid,
			//         },
			//         pager:{pageNum:'1',pageSize:'10'}
			//       }
			//     })
			//   }).then(function(resp){
			//   	console.log('resp:',resp);
			//   	// return;
			//     if(resp['data']['success']==false){
			//     }else{
			//       let data=resp['data']['body'];
			//       let creatorinfo={};
			//       let loading={
			//       	loading:false,
			//       	// hide:data.pageInfo.list.length<10?true:false,//是否显示加载的动画
			//       	hide:data.list.length<10?true:false,//是否显示加载的动画
			//       	fix:false,
			//       };
			//       dispatch({
			//         type:'approval/changeData',
			//         payload:_.extend({
			//         	loading:loading,
			//         	 noMore:false,//是否还有下一页
			//         	 pages:data.pageInfo ? data.pageInfo.pages : {},
			//         },resp['data']['body'])
			//       })  
			//     }
			//   })
		}, 0)
	}

	//上拉加载更多回调
	onEndReached(e) {
		let dispatch = this.props.dispatch;
		let pageNum = this.props.approval.pageNum;
		dispatch({
			type: "approval/changeData",
			payload: {
				noMore: false,
				fix: true,
			}
		})
		this.getStoreInfo(this.curPageNum + 1);
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