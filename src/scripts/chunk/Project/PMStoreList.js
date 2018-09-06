/**
 * 需求阶段的餐厅列表（Local PM拒绝，DOA审批）
 * 路由：/project/pmstore-list/:orderid/:vendorNumber/:vendorType
 * 
 */
import React, { Component } from 'react';
import { connect } from 'dva';
import { hashHistory } from 'dva/router';
import request from '../../utils/EpsRequest';
import LoadMore from './../../components/Common/LoadMore';
import EmptyView from '../../components/Common/EmptyView';
import { PAGE_SIZE, DataLength } from '../../constants';
import { AlertInfoBase } from '../../components/Common/EpsModal';

class PMStoreList extends Component {
	constructor(props) {
		super(props);
		this.gotoInfoList = this.gotoInfoList.bind(this);
	}
	// 页面渲染
	render() {
		let data = this.props.pmstorelist;
		console.log('rrr', data, this.props.params);
		let view = this._init_view();
		let viewIt = this._init_viewIt();
		let viewText;
		let type = this.props.params.vendorType;
		if (type == 1 || type == 2) {
			viewText = view;
		} else {
			viewText = viewIt;
		}
		if (data.loading['loading']) {
			return (<div className="todos-loading">
				<img src="images/loading.gif" />
				<span>加载中</span>
			</div>)
		} else {
			return (
				<div className="root-container">
					{viewText}
				</div>
			);
		}
	}
	NameInfo(name, length) {
		let len = length ? length : 4;
		if (DataLength(name) > len) {
			AlertInfoBase({
				text: name,
			});
		}
	}
	turnMoney(data) {
		return Number(data).formatMoney(2, '', '')
	}
	gotoInfoList(itemdata) {
		console.log('gotoInfoList=====')
		// /project/pminfo-list/:orderid/:vendorNumber/:storeNumber/:vendorType
		var url = EpsWebRoot + '/#project/pminfo-list/' + this.props.params.orderid + '/' + this.props.params.vendorNumber + '/' + itemdata['storeNumber'] + '/' + this.props.params.vendorType;
		jw.pushWebView(url);
	}
	// 初始化页面
	_init_view() {
		let self = this;
		let view = '';
		let data = this.props.pmstorelist;
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
			console.log('store:========:=======', data.list);
			listView = (
				<ul className="">
					{
						data.list.map((item, key) => (
							<div className={"eps-list-card eps-project animated zoomIn eps-bookmark-wrap"} onClick={() => { self.gotoInfoList(item) }}>
								<div className="todo-card-index">{(key + 1) || 0}/{data.total || 0}</div>
								<div className="eps-item-info"><dt><label>餐厅名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(item.storeName) }}>{item.storeName}</font></dd></div>
								<div className="eps-item-info-inline">
									<div className="eps-item-info"><dt><label>餐厅编号</label></dt><dd><font>{item.storeNumber ? item.storeNumber : '-'}</font></dd></div>
									<div className="eps-item-info"><dt><label>所在地址</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(item.provinceNameCn + '' + item.cityNameCn) }}>{item.provinceNameCn + '' + item.cityNameCn}</font></dd></div>
								</div>
								<div className="eps-item-info-inline">
									<div className="eps-item-info"><dt><label>总价(¥)</label></dt><dd><font onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.priceall) + ' ¥') }}>{this.turnMoney(item.priceall)} ¥</font></dd></div>
								</div>
							</div>
						))
					}
				</ul>
			);
			let type = this.props.params.vendorType;
		} else {
			listView = (<EmptyView tip={'暂无数据'} />)
		}
		// 组织显示内容
		view = <div className="root-container-w eps-project-storelist-container">
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
	_init_viewIt() {
		let self = this;
		let view = '';
		let data = this.props.pmstorelist;
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
			console.log('store:========:=======', data.list);
			listView = (
				<ul className="">
					{
						data.list.map((item, key) => (
							<div className={"eps-list-card eps-project animated zoomIn eps-bookmark-wrap"} onClick={() => { self.gotoInfoList(item) }}>
								<div className="todo-card-index">{(key + 1) || 0}/{data.total || 0}</div>
								<div className="eps-item-info"><dt><label>餐厅名称</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(item.storeName) }}>{item.storeName}</font></dd></div>
								<div className="eps-item-info-inline">
									<div className="eps-item-info"><dt><label>餐厅编号</label></dt><dd><font>{item.storeNumber ? item.storeNumber : '-'}</font></dd></div>
									<div className="eps-item-info"><dt><label>所在地址</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(item.provinceNameCn + '' + item.cityNameCn) }}>{item.provinceNameCn + '' + item.cityNameCn}</font></dd></div>
								</div>
								{!data.isTsi && <div className="eps-item-info-inline">
									<div className="eps-item-info"><dt><label>总价(¥)</label></dt><dd><font onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.priceall) + ' ¥') }}>{this.turnMoney(item.priceall)} ¥</font></dd></div>
								</div>}
								{data.isTsi && <div className="project-it-text border-line-h before">
									<div className="project-it-cell space-b">
										<div className="project-it-flex w60">麦当劳采购总价(含税)</div>
										<div className="project-it-flex" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.mdcSumCost) + ' ¥') }}>{self.turnMoney(item.mdcSumCost)} ¥</div>
									</div>
									<div className="project-it-cell space-b">
										<div className="project-it-flex w60">TSI采购总价(含税)</div>
										<div className="project-it-flex" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.tsiSumCost) + ' ¥') }}>{self.turnMoney(item.tsiSumCost)} ¥</div>
									</div>
									<div className="project-it-cell space-b">
										<div className="project-it-flex w60">餐厅采购总价(含税)</div>
										<div className="project-it-flex" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.eqPriceAll) + ' ¥') }}>{self.turnMoney(item.eqPriceAll)} ¥</div>
									</div>
									<div className="project-it-cell space-b">
										<div className="project-it-flex w60">人工费(含税)</div>
										<div className="project-it-flex" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.labourCost) + ' ¥') }}>{self.turnMoney(item.labourCost)} ¥</div>
									</div>
									<div className="project-it-cell space-b">
										<div className="project-it-flex w60">差旅费(不含税)</div>
										<div className="project-it-flex" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.travelExpensesNotax) + ' ¥') }}>{self.turnMoney(item.travelExpensesNotax)} ¥ </div>
									</div>
									<div className="project-it-cell space-b">
										<div className="project-it-flex w60">差旅费(含税)</div>
										<div className="project-it-flex" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.travelExpenses) + ' ¥') }}>{self.turnMoney(item.travelExpenses)} ¥ ({item.travelExpensesTax || '-'})</div>
									</div>
									<div className="project-it-cell space-b">
										<div className="project-it-flex w60">特批费用(含税)</div>
										<div className="project-it-flex" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.special) + ' ¥') }}>{self.turnMoney(item.special)} ¥</div>
									</div>
									<div className="project-it-cell space-b">
										<div className="project-it-flex w60">整单总价(含税)</div>
										<div className="project-it-flex" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.priceall) + ' ¥') }}>{self.turnMoney(item.priceall)} ¥</div>
									</div>
								</div>}
							</div>
						))
					}
				</ul>
			);
			let type = this.props.params.vendorType;
		} else {
			listView = (<EmptyView tip={'暂无数据'} />)
		}
		// 组织显示内容
		view = <div className="root-container-w eps-project-storelist-container">
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
			type: 'pmstorelist/getStoreListByVendor',
			payload: {
				condition: {
					orderNumber: this.props.params.orderid,
					vendorNumber: this.props.params.vendorNumber,
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
		self.setHeight();

		let orderid = this.props.params.orderid;
		//首次加载数据
		setTimeout(function () {
			self.getStoreInfo();
		}, 0)
	}

	//上拉加载更多回调
	onEndReached(e) {
		let dispatch = this.props.dispatch;
		let pageNum = this.props.pmstorelist.pageNum;
		dispatch({
			type: "pmstorelist/changeData",
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
export default connect(mapStateToProps)(PMStoreList);