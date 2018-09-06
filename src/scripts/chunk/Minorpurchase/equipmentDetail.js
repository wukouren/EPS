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
import { AlertInfoBase } from '../../components/Common/EpsModal';

class EquipmentDetail extends Component {
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:equiqmentDetail');
		let cache = store.find({ id: 'tab:cache' }) || {};
		console.log('ddee', cache);
		super(props);
		this.data = cache['data'];
	}
	componentDidMount() {
		let self = this;
		NProgress.done();
	}
	NameInfo(name, length) {
		AlertInfoBase({
			text: name,
		});
	}
	turnMoney(data) {
		return Number(data).formatMoney(2, '', '')
	}
	// 页面渲染
	render() {
		let self = this;
		let len = this.data["venDetailList"].length;
		console.log(self.turnMoney(0), '111', self.turnMoney(null), '22', this.data["venDetailList"]);
		// let indexhtml = (<div className="todo-card-index">{this.props.index}/{len}</div>);
		return (
			<div className="root-container" >

				<div className="root-container-w eps-project-infolist-container">
					<header className="header header-with-memo xheight header-adapt">
						<div className="header-bg"></div>
						<div className="header-c">
							<div className="header-bg-2-adapt"></div>
						</div>
					</header>
					<session className="main">
						<div className="main-c todo-info-it it-details" style={{ height: '100vh', overflow: 'scroll', marginBottom: '30px' }}>
							{_.map(this.data["venDetailList"], function (item, i) {
								return self.initRender(item, i, len);
							})}
						</div>
					</session>
				</div>
			</div>
		);
		// }
	}
	initRender(item, i, len) {
		let self = this;
		let num = len - 1;
		return <ul className={'ul-bottom ' + (i == num ? 'ul-max-b' : '')}>
			<div className="eps-list-card eps-project animated zoomIn eps-bookmark-wrap">
				<div className="todo-card-index">{i + 1}/{len}</div>
				<div className="eps-item-info">
					<dt className="dt-width"><label>供应商</label></dt>
					<dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(item.vendorName) }}>{item.vendorName || '-'}</font></dd>
				</div>
				<div className="eps-item-info">
					<dt className="dt-width"><label>供应商编号</label></dt>
					<dd><font className="ellipsis" >{item.vendorNumber || '-'}</font></dd>
					{/* <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceName) } }>{ data.deviceName }</font></dd> */}
				</div>
				<div className="eps-item-info">
					<dt className="dt-width"><label>工程项目名称</label></dt>
					<dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(item.objectName) }}>{item.objectName || '-'}</font></dd>
					{/* <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceName) } }>{ data.deviceName }</font></dd> */}
				</div>
				<div className="eps-item-info-inline">
					{/* <div className="eps-item-info"><dt><label>FA Code</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.faCategory) } }>{data.faCategory?data.faCategory:'-'}</font></dd></div> */}
					<div className="eps-item-info"><dt ><label>FA Code</label></dt><dd ><font className="ellipsis" >{item.faCategory}</font></dd></div>
					<div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" >{item.subCategory}</font></dd></div>
					{/* <div className="eps-item-info"><dt><label>FA Code2</label></dt><dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.subCategory) } }>{data.subCategory?data.subCategory:'-'}</font></dd></div> */}
				</div>
				<div className="eps-item-info flex-two">
					<div><dt className="dt-width"><label>价格(不含税)</label></dt></div>
					<div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.markupCostAllNotax) + ' ¥', 6) }}>{self.turnMoney(item.markupCostAllNotax)} ¥</font></dd></div>
				</div>
				<div className="eps-item-info flex-two">
				<div><dt className="dt-width"><label>税率</label></dt></div>
				<div><dd><font className="ellipsis" >{item.taxRate || '-'}</font></dd></div>
				</div>
				<div className="eps-item-info flex-two">
				<div><dt className="dt-width"><label>税金</label></dt></div>
				<div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.taxes) + ' ¥', 6) }}>{self.turnMoney(item.taxes)} ¥</font></dd></div>
				</div>
				<div className="eps-item-info flex-two">
				<div><dt className="dt-width"><label>价税合计</label></dt></div>
				<div><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.markupCostAll) + ' ¥', 6) }}>{self.turnMoney(item.markupCostAll)} ¥</font></dd></div>
				</div>
				{/* <div className="eps-item-info-inline">
					<div className="eps-item-info"><dt className="dt-width"><label>价格(不含税)</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.markupCostAllNotax) + ' ¥', 6) }}>{self.turnMoney(item.markupCostAllNotax)} ¥</font></dd></div>
					<div className="eps-item-info"><dt><label>税率</label></dt><dd><font className="ellipsis" >{item.taxRate}</font></dd></div>
				</div>
				<div className="eps-item-info-inline">
					<div className="eps-item-info"><dt><label>税金</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.taxes) + ' ¥', 6) }}>{self.turnMoney(item.taxes)} ¥</font></dd></div>
					<div className="eps-item-info"><dt><label>价税合计</label></dt><dd><font className="ellipsis" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(item.markupCostAll) + ' ¥', 6) }}>{self.turnMoney(item.markupCostAll)} ¥</font></dd></div>
				</div> */}
			</div>
		</ul>;
	}
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(EquipmentDetail);