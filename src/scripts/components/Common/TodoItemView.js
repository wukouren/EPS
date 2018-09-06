/**
 * 单条待办卡片
 * type=1,2,3,4,5,6,7
 * 分别对应 全部，维修，非项目，新店日常，保养，项目，新店GC
 * 2017/12/1 在途订单增加当前处理人，影响如下：
 * 由于在途和历史是一个订单，所以在途和历史需将在途和历史中的todoCol10改为当前处理人，其他字段依次＋1；
 * 待办列表接口不变，所以待办列表中todoCol10还是原来的含义
 * 
 */
import React, { Component } from 'react';
import { connect } from 'dva';

let statusRoutes = {};
let detailRoutes = {};
class TodoItemView extends Component {
	formatOrderTime(str) {
		if (!(str) || str.length != 19) return str;
		return str.substring(0, 16);
	}
	// 获取 设备、工程、IT icon
	getICON(subProcess) {
		let icon = 'icon-device-icon';
		switch (subProcess) {
			case '12': // 工程维修
			case '24': // 工程年度保养计划
			case '25': // 工程月度保养计划
			case '26': // 工程保养订单
			case '33': // 非项目工程采购
			case '35': // 非项目工程采购需求
			case '41': // 项目采购需求
			case '42': // 项目型供应商采购订单
			case '43': // 项目型采购订单
			// case '43-1': // 项目型采购订单 设备
			case '43-2': // 项目型采购订单 工程
			case '51': // 新店/改造设备/工程订单
				icon = 'icon-project-icon';
				break;
			case '13': // IT设备维修
			case '34': // 非项目IT采购
			case '36': // 非项目IT采购需求
			case '43-3': // 项目型采购订单 IT
			case '53': // 新店/改造IT采购需求
			case '53': // 新店/改造IT采购需求
			case '55': // 新店/改造IT采购需求
				// case '56': // 新店/改造IT采购订单  此号码于20171024日废弃
				icon = 'icon-it-icon';
				break;
			case '61': // 新店/改造GC采购
				icon = 'icon-gc-icon';
				break;
		}
		return icon;
	}
	// 维修卡片
	combineRepairCard(data) {
		// console.log('this.props.todos',this.props.todos)
		let status = this.props.todos.status,
			vendorName = '',
			storeName = '',
			vendorNumber = '',
			storeNumber = '',
			operateClassName = status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '';
		/*if(this.props.todos.status=='1'){
			// console.log(data,"data")
		  if(data.todoCol2=='12'){
		  	if(data.todoCol6=='6'){
		  		operateClassName="icon-mobile-noOperate";
		  	}else if(data.todoCol6=='3'){
		  		operateClassName="icon-mobile-noOperate";
		  	}
		  }else{
		  	operateClassName="";
		  }
		}else{
			if(data.todoCol8=='1'){
				operateClassName="";
			}else{
				operateClassName="icon-mobile-noOperate";
			}
		}
		console.log('status',status,data);
		*/
		let currentOperator;
		let infoWrapClass = status == '1' ? 'todos-item-info info-label-large' : 'todos-item-info';
		if (status == '1' || status == '2') {
			storeNumber = data.todoCol12;
			storeName = data.todoCol13;
			vendorName = data.todoCol11;
			if (status == '1') {
				currentOperator = (<div className="todos-item-info-i">
					<span className="todos-item-info-label">当前操作人</span>
					<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
				</div>);
			}
		} else {
			storeNumber = data.todoCol10;
			storeName = data.todoCol11;
			vendorName = data.todoCol9;
		}
		return (<div className="todos-item animated zoomIn" onClick={(e) => this.openWebView(data)}>
			<div className="todos-item-c">
				<div className="todos-item-title">
					<div className="todos-item-time">
						<i className="icon-time"></i>
						<span>{this.formatOrderTime(data.todoCol3)}</span>
					</div>
					<div className="todos-item-logo">
						<i className={titleICON}></i>
						<span>{data.todoCol5}</span>
						<i className={operateClassName}></i>
					</div>
				</div>
				<div className={infoWrapClass}>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">订单编号</span>
						<span className="todos-item-info-val">{data.todoCol4}</span>
					</div>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">餐厅编号</span>
						<span className="todos-item-info-val">{storeNumber}</span>
					</div>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">餐厅名称</span>
						<span className="todos-item-info-val">{storeName}</span>
					</div>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">维修商</span>
						<span className="todos-item-info-val ellipsis">{vendorName}</span>
					</div>
					{currentOperator}
				</div>
			</div>
			<div className="todos-item-btn border-line-h before">
				<i className="icon-check"></i>
				<span >{data.todoCol7}</span>
			</div>
		</div>)
	}

	/**
	 * 非项目卡片
	 * todoCol1:大流程类型
	 * todoCol2:小流程类型
	 * todoCol3:创建时间
	 * todoCol4:订单编号
	 * todoCol5:非项目-设备
	 * todoCol6:状态Code
	 * todoCol7:状态名称
	 * todoCol8:移动端是否可操作标识
	 * todoCol9:餐厅编号
	 * todoCol10:餐厅名称
	 * todoCol11:总价
	 * todoCol12:冗余字段
	 * 在途 - 非项目
	 * 在途 - 非项目设备
	 	todoCol1:大流程类型
		todoCol2:小流程类型
		todoCol3:创建时间
		todoCol4:订单编号
		todoCol5:非项目-设备
		todoCol6:状态Code
		todoCol7:状态名称
		todoCol8:移动端是否允许操作
		todoCol9:餐厅编号
		todoCol11:餐厅名称
		todoCol12:总价
	 * 在途 - 非项目工程
	  todoCol1:大流程类型
		todoCol2:小流程类型
		todoCol3:创建时间
		todoCol4:订单编号
		todoCol5:非项目-工程
		todoCol6:状态Code
		todoCol7:状态名称
		todoCol8:移动端是否允许操作
		todoCol9:餐厅编号
		todoCol11:餐厅名称
		todoCol12:总价
	 * 在途 - 非项目IT
	  todoCol1:大流程类型
		todoCol2:小流程类型
		todoCol3:创建时间
		todoCol4:订单编号
		todoCol5:非项目-IT
		todoCol6:状态Code
		todoCol7:状态名称
		todoCol8:移动端是否允许操作
		todoCol9:餐厅编号
		todoCol11:餐厅名称
		todoCol12:总价
	 */
	combineNonProjectCard(data) {
		let status = this.props.todos.status;
		let storeNumber = '', storeName = '',
			allMoney = '',
			orderNumber = '',
			operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '';
		let currentOperator;
		let infoWrapClass = status == '1' ? 'todos-item-info info-label-large' : 'todos-item-info';
		if (this.props.todos.status == '1' || this.props.todos.status == '2') {
			storeNumber = data.todoCol11;
			storeName = data.todoCol12;
			allMoney = data.todoCol13;
			if (this.props.todos.status == '1') {
				currentOperator = (<div className="todos-item-info-i">
					<span className="todos-item-info-label">当前操作人</span>
					<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
				</div>);
			}
		} else {
			storeNumber = data.todoCol9;
			storeName = data.todoCol10;
			allMoney = data.todoCol11;
		}
		return (<div className="todos-item todos-nonproject-item animated zoomIn" onClick={(e) => this.openWebView(data)}>
			<div className="todos-item-c">
				<div className="todos-item-title">
					<div className="todos-item-time">
						<i className="icon-time"></i>
						<span>{this.formatOrderTime(data.todoCol3)}</span>
					</div>
					<div className="todos-item-logo">
						<i className={titleICON}></i>
						<span>{data.todoCol5}</span>
						<i className={operateClassName}></i>
					</div>
				</div>
				<div className={infoWrapClass}>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">订单编号</span>
						<span className="todos-item-info-val">{data.todoCol4}</span>
					</div>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">餐厅编号</span>
						<span className="todos-item-info-val">{storeNumber}</span>
					</div>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">餐厅名称</span>
						<span className="todos-item-info-val">{storeName}</span>
					</div>
					{currentOperator}
				</div>
				<div className="todos-nonproject-table">

				</div>
			</div>
			<div className="todos-item-btn">
				<i className="icon-check"></i>
				<span>{data.todoCol7}</span>
			</div>
		</div>)
	}
	//保养卡片
	/**
	 * 保养-设备（年度计划）
		todoCol1:大流程类型
		todoCol2:小流程类型
		todoCol3:创建时间
		todoCol4:订单编号
		todoCol5:保养-设备（年度计划）
		todoCol6:状态Code
		todoCol7:状态名称
		todoCol8:移动端是否可操作标识
		todoCol9:保养计划名称
		todoCol10:保养年度
		todoCol11:保养备注
		todoCol12:冗余字段
	 * 保养-设备（月度计划）
	 	todoCol1:大流程类型
		todoCol2:小流程类型
		todoCol3:创建时间
		todoCol4:订单编号
		todoCol5:保养-设备（月度计划）
		todoCol6:状态Code
		todoCol7:状态名称
		todoCol8:移动端是否可操作标识
		todoCol9:保养类型
		todoCol10:保养计划名称
		todoCol11:保养月
		todoCol12:保养备注
	 * 保养-设备（订单）
	 	todoCol1:大流程类型
		todoCol2:小流程类型
		todoCol3:创建时间
		todoCol4:订单编号
		todoCol5:保养-设备（订单）
		todoCol6:状态Code
		todoCol7:状态名称
		todoCol8:移动端是否可操作标识
		todoCol9:餐厅编号
		todoCol10:餐厅名称
		todoCol11:保养备注
		todoCol12:冗余字段
	 */
	/**
	 * todoCol1:大流程类型
	 * todoCol2:小流程类型
	 * todoCol3:创建时间
	 * todoCol4:订单编号
	 * todoCol5:保养-设备（年度计划）
	 * todoCol6:状态Code
	 * todoCol7:状态名称
	 * todoCol8:移动端是否可操作标识
	 * todoCol9:保养计划名称
	 * todoCol10:保养年度
	 * todoCol11:保养备注
	 * todoCol12:冗余字段
   */
	combineMaintenanceCard(data) {
		let status = this.props.todos.status,
			operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '';
		let currentOperator;
		let infoWrapClass = status == '1' ? "todos-item-info maintenance info-label-large" : "todos-item-info maintenance";
		switch (data.todoCol2) {
			case '21':
				let maintenanceName1 = '';
				let maintenanceYear1 = '';
				let maintenanceTip1 = '';
				if (this.props.todos.status == '1' || this.props.todos.status == '2') {
					maintenanceName1 = data.todoCol11;
					maintenanceYear1 = data.todoCol12;
					if (this.props.todos.status == '1') {
						currentOperator = (<div className="todos-item-info-i">
							<span className="todos-item-info-label">当前操作人</span>
							<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
						</div>);
					}
					// maintenanceTip1=data.todoCol10;
				} else {
					maintenanceName1 = data.todoCol9;
					maintenanceYear1 = data.todoCol10;
					// maintenanceTip1=data.todoCol11;
				}
				return (<div className="todos-item animated zoomIn" onClick={(e) => this.openWebView(data)}>
					<div className="todos-item-c">
						<div className="todos-item-title">
							<div className="todos-item-time">
								<i className="icon-time"></i>
								<span>{this.formatOrderTime(data.todoCol3)}</span>
							</div>
							<div className="todos-item-logo">
								<i className={titleICON}></i>
								<span>{data.todoCol5}</span>
								<i className={operateClassName}></i>
							</div>
						</div>
						<div className={infoWrapClass}>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">订单编号</span>
								<span className="todos-item-info-val">{data.todoCol4}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">保养计划名称</span>
								<span className="todos-item-info-val ellipsis">{maintenanceName1}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">保养年度</span>
								<span className="todos-item-info-val">{maintenanceYear1}</span>
							</div>
							{currentOperator}
						</div>
					</div>
					<div className="todos-item-btn border-line-h before">
						<i className="icon-check"></i>
						<span>{data.todoCol7}</span>
					</div>
				</div>);
				break;
			case '22':
				let maintenanceType2;
				let maintenanceName2;
				let maintenanceMonth2;
				let maintenanceTip2;
				if (this.props.todos.status == '1' || this.props.todos.status == '2') {
					maintenanceType2 = data.todoCol11;
					maintenanceName2 = data.todoCol12;
					maintenanceMonth2 = data.todoCol13;
					// maintenanceTip2=data.todoCol12;
					if (this.props.todos.status == '1') {
						currentOperator = (<div className="todos-item-info-i">
							<span className="todos-item-info-label">当前操作人</span>
							<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
						</div>);
					}
				} else {
					maintenanceType2 = data.todoCol9;
					maintenanceName2 = data.todoCol10;
					maintenanceMonth2 = data.todoCol11;
					// maintenanceTip2=data.todoCol11;
				}
				return (<div className="todos-item animated zoomIn" onClick={(e) => this.openWebView(data)}>
					<div className="todos-item-c">
						<div className="todos-item-title">
							<div className="todos-item-time">
								<i className="icon-time"></i>
								<span>{this.formatOrderTime(data.todoCol3)}</span>
							</div>
							<div className="todos-item-logo">
								<i className="icon-project-icon"></i>
								<span>{data.todoCol5}</span>
								<i className={operateClassName}></i>
							</div>
						</div>
						<div className={infoWrapClass}>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">订单编号</span>
								<span className="todos-item-info-val">{data.todoCol4}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">保养计划名称</span>
								<span className="todos-item-info-val ellipsis">{maintenanceName2}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">保养月份</span>
								<span className="todos-item-info-val">{maintenanceMonth2}</span>
							</div>
							{currentOperator}
						</div>
					</div>
					<div className="todos-item-btn border-line-h before">
						<i className="icon-check"></i>
						<span>{data.todoCol7}</span>
					</div>
				</div>);
				break;
			case '23':
				let storeName3;
				let storeNumber3;
				let maintenanceTip3;
				// console.log("23",data)
				if (this.props.todos.status == '1' || this.props.todos.status == '2') {
					storeNumber3 = data.todoCol11;
					storeName3 = data.todoCol12;
					maintenanceTip3 = data.todoCol13;
					if (this.props.todos.status == '1') {
						currentOperator = (<div className="todos-item-info-i">
							<span className="todos-item-info-label">当前操作人</span>
							<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
						</div>);
					}
				} else {
					storeNumber3 = data.todoCol9;
					storeName3 = data.todoCol10;
					maintenanceTip3 = data.todoCol11;
				}
				return (<div className="todos-item animated zoomIn" onClick={(e) => this.openWebView(data)}>
					<div className="todos-item-c">
						<div className="todos-item-title">
							<div className="todos-item-time">
								<i className="icon-time"></i>
								<span>{this.formatOrderTime(data.todoCol3)}</span>
							</div>
							<div className="todos-item-logo">
								<i className="icon-project-icon"></i>
								<span>{data.todoCol5}</span>
								<i className={operateClassName}></i>
							</div>
						</div>
						<div className={infoWrapClass}>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">订单编号</span>
								<span className="todos-item-info-val">{data.todoCol4}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">餐厅编号</span>
								<span className="todos-item-info-val">{storeNumber3}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">餐厅名称</span>
								<span className="todos-item-info-val ellipsis">{storeName3}</span>
							</div>
							{currentOperator}
						</div>
					</div>
					<div className="todos-item-btn border-line-h before">
						<i className="icon-check"></i>
						<span>{data.todoCol7}</span>
					</div>
				</div>);
				break;
			case '24':
				let maintenanceName4 = '';
				let maintenanceYear4 = '';
				let maintenanceTip4 = '';
				if (this.props.todos.status == '1' || this.props.todos.status == '2') {
					maintenanceName4 = data.todoCol11;
					maintenanceYear4 = data.todoCol12;
					maintenanceTip4 = data.todoCol13;
					if (this.props.todos.status == '1') {
						currentOperator = (<div className="todos-item-info-i">
							<span className="todos-item-info-label">当前操作人</span>
							<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
						</div>);
					}
				} else {
					maintenanceName4 = data.todoCol9;
					maintenanceYear4 = data.todoCol10;
					maintenanceTip4 = data.todoCol11;
				}
				return (<div className="todos-item animated zoomIn" onClick={(e) => this.openWebView(data)}>
					<div className="todos-item-c">
						<div className="todos-item-title">
							<div className="todos-item-time">
								<i className="icon-time"></i>
								<span>{this.formatOrderTime(data.todoCol3)}</span>
							</div>
							<div className="todos-item-logo">
								<i className="icon-project-icon"></i>
								<span>{data.todoCol5}</span>
								<i className={operateClassName}></i>
							</div>
						</div>
						<div className={infoWrapClass}>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">订单编号</span>
								<span className="todos-item-info-val">{data.todoCol4}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">保养计划名称</span>
								<span className="todos-item-info-val ellipsis">{maintenanceName4}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">保养年度</span>
								<span className="todos-item-info-val">{maintenanceYear4}</span>
							</div>
							{currentOperator}
						</div>
					</div>
					<div className="todos-item-btn border-line-h before">
						<i className="icon-check"></i>
						<span>{data.todoCol7}</span>
					</div>
				</div>);
				break;
			case '25':
				let maintenanceType5 = '';
				let maintenanceName5 = '';
				let maintenanceMonth5 = '';
				let maintenanceTip5 = '';
				if (this.props.todos.status == '1' || this.props.todos.status == '2') {
					maintenanceType5 = data.todoCol11;
					maintenanceName5 = data.todoCol12;
					maintenanceMonth5 = data.todoCol13;
					maintenanceTip5 = data.todoCol14;
					if (this.props.todos.status == '1') {
						currentOperator = (<div className="todos-item-info-i">
							<span className="todos-item-info-label">当前操作人</span>
							<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
						</div>);
					}
				} else {
					maintenanceType5 = data.todoCol8;
					maintenanceName5 = data.todoCol10;
					maintenanceMonth5 = data.todoCol11;
					maintenanceTip5 = data.todoCol11;
				}
				return (<div className="todos-item animated zoomIn" onClick={(e) => this.openWebView(data)}>
					<div className="todos-item-c">
						<div className="todos-item-title">
							<div className="todos-item-time">
								<i className="icon-time"></i>
								<span>{this.formatOrderTime(data.todoCol3)}</span>
							</div>
							<div className="todos-item-logo">
								<i className="icon-project-icon"></i>
								<span>{data.todoCol5}</span>
								<i className={operateClassName}></i>
							</div>
						</div>
						<div className={infoWrapClass}>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">订单编号</span>
								<span className="todos-item-info-val">{data.todoCol4}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">保养计划名称</span>
								<span className="todos-item-info-val">{maintenanceName5}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">保养月份</span>
								<span className="todos-item-info-val">{maintenanceMonth5}</span>
							</div>
							{currentOperator}
						</div>
					</div>
					<div className="todos-item-btn border-line-h before">
						<i className="icon-check"></i>
						<span>{data.todoCol7}</span>
					</div>
				</div>);
				break;
			case '26':
				let storeName6;
				let storeNumber6;
				let maintenanceTip6;
				if (this.props.todos.status == '1' || this.props.todos.status == '2') {
					storeNumber6 = data.todoCol11;
					storeName6 = data.todoCol12;
					maintenanceTip6 = data.todoCol13;
					if (this.props.todos.status == '1') {
						currentOperator = (<div className="todos-item-info-i">
							<span className="todos-item-info-label">当前操作人</span>
							<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
						</div>);
					}
				} else {
					storeNumber6 = data.todoCol9;
					storeName6 = data.todoCol10;
					maintenanceTip6 = data.todoCol11;
				}
				return (<div className="todos-item animated zoomIn" onClick={(e) => this.openWebView(data)}>
					<div className="todos-item-c">
						<div className="todos-item-title">
							<div className="todos-item-time">
								<i className="icon-time"></i>
								<span>{this.formatOrderTime(data.todoCol3)}</span>
							</div>
							<div className="todos-item-logo">
								<i className="icon-project-icon"></i>
								<span>{data.todoCol5}</span>
								<i className={operateClassName}></i>
							</div>
						</div>
						<div className={infoWrapClass}>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">订单编号</span>
								<span className="todos-item-info-val">{data.todoCol4}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">餐厅编号</span>
								<span className="todos-item-info-val">{storeNumber6}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label more">餐厅名称</span>
								<span className="todos-item-info-val ellipsis">{storeName6}</span>
							</div>
							{currentOperator}
						</div>
					</div>
					<div className="todos-item-btn border-line-h before">
						<i className="icon-check"></i>
						<span>{data.todoCol7}</span>
					</div>
				</div>);
				break;
		}

	}

	AllowOnMobile(Col8) {
		return Col8 && Col8 == 1 ? '' : 'icon-mobile-noOperate';
	}
	/**
	 * 项目卡片 LocalPM
	 * todoCol1:大流程类型
	 * todoCol2:小流程类型
	 * todoCol3:创建时间
	 * todoCol4:订单编号
	 * todoCol5:项目名称
	 * todoCol6:状态Code
	 * todoCol7:状态名称
	 * todoCol8:移动端是否可操作标识
	 * todoCol9:需求编号
	 * todoCol10:冗余字段
	 * todoCol11:冗余字段
	 * todoCol12:冗余字段
	 *
	 * 项目卡片 餐厅-确认、DOA-餐厅确认后审批（职能）
	 * todoCol1:大流程类型
	 * todoCol2:小流程类型
	 * todoCol3:创建时间
	 * todoCol4:订单编号
	 * todoCol5:项目-设备
	 * todoCol6:状态Code
	 * todoCol7:状态名称
	 * todoCol8:移动端是否可操作标识
	 * todoCol9:项目名称
	 * todoCol10:餐厅编号
	 * todoCol11:餐厅名称
	 * todoCol12:冗余字段
	 */
	combineProjectCard(data) {
		console.log('22ddddd', data);
		let // operateClassName = this.props.todos.status=='0'?this.AllowOnMobile( data.todoCol8 ):'',
			operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '';
		let currentOperator;
		let infoWrapClass = this.props.todos.status == '1' ? "todos-item-info info-label-large" : "todos-item-info";
		// if(this.props.todos.status=='1') operateClassName = '';
		switch (data.todoCol2) {
			case '41':
				let num = data.todoCol9;
				if (this.props.todos.status == '1' || this.props.todos.status == '2') {
					num = data.todoCol11;
					if (this.props.todos.status == '1') {
						currentOperator = (<div className="todos-item-info-i">
							<span className="todos-item-info-label">当前操作人</span>
							<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
						</div>);
					}
				}
				return (<div className="todos-item animated zoomIn" onClick={(e) => this.openWebView(data)}>
					<div className="todos-item-c">
						<div className="todos-item-title">
							<div className="todos-item-time">
								<i className="icon-time"></i>
								<span>{this.formatOrderTime(data.todoCol3)}</span>
							</div>
							<div className="todos-item-logo">
								<i className={titleICON}></i>
								<span>项目采购需求</span>
								<i className={operateClassName}></i>
							</div>
						</div>
						<div className={infoWrapClass}>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label">需求编号</span>
								<span className="todos-item-info-val">{num}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label">项目名称</span>
								<span className="todos-item-info-val ellipsis">{data.todoCol5}</span>
							</div>
							{currentOperator}
						</div>
					</div>
					<div className="todos-item-btn border-line-h before">
						<i className="icon-check"></i>
						<span >{data.todoCol7}</span>
					</div>
				</div>)
				break;
			case '42':
				let projectName = data.todoCol9;
				if (this.props.todos.status == '1' || this.props.todos.status == '2') {
					projectName = data.todoCol11;
					if (this.props.todos.status == '1') {
						currentOperator = (<div className="todos-item-info-i">
							<span className="todos-item-info-label">当前操作人</span>
							<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
						</div>);
					}
				}
				return (<div className="todos-item animated zoomIn">
					<div className="todos-item-c">
						<div className="todos-item-title">
							<div className="todos-item-time">
								<i className="icon-time"></i>
								<span>{this.formatOrderTime(data.todoCol3)}</span>
							</div>
							<div className="todos-item-logo">
								<i className={titleICON}></i>
								<span>{data.todoCol5}</span>
								<i className={operateClassName}></i>
							</div>
						</div>
						<div className={infoWrapClass}>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label">订单编号</span>
								<span className="todos-item-info-val">{data.todoCol4}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label">项目名称</span>
								<span className="todos-item-info-val ellipsis">{projectName}</span>
							</div>
							{currentOperator}
						</div>
					</div>
					<div className="todos-item-btn border-line-h before">
						<i className="icon-check"></i>
						<span >{data.todoCol7}</span>
					</div>
				</div>)
				break;
			case '43':
			case '43-1':
			case '43-2':
			case '43-3':
				let projectName3 = data.todoCol9,
					storeNum3 = data.todoCol10,
					storeName3 = data.todoCol11;
				if (this.props.todos.status == '1' || this.props.todos.status == '2') {
					projectName3 = data.todoCol11,
						storeNum3 = data.todoCol12,
						storeName3 = data.todoCol13;
					if (this.props.todos.status == '1') {
						currentOperator = (<div className="todos-item-info-i">
							<span className="todos-item-info-label">当前操作人</span>
							<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
						</div>);
					}
				}
				return (<div className="todos-item animated zoomIn" onClick={(e) => this.openWebView(data)}>
					<div className="todos-item-c">
						<div className="todos-item-title">
							<div className="todos-item-time">
								<i className="icon-time"></i>
								<span>{this.formatOrderTime(data.todoCol3)}</span>
							</div>
							<div className="todos-item-logo">
								<i className={titleICON}></i>
								<span>{data.todoCol5}</span>
								<i className={operateClassName}></i>
							</div>
						</div>
						<div className={infoWrapClass}>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label">订单编号</span>
								<span className="todos-item-info-val">{data.todoCol4}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label">项目名称</span>
								<span className="todos-item-info-val ellipsis">{projectName3}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label">餐厅编号</span>
								<span className="todos-item-info-val ellipsis">{storeNum3}</span>
							</div>
							<div className="todos-item-info-i">
								<span className="todos-item-info-label">餐厅名称</span>
								<span className="todos-item-info-val ellipsis">{storeName3}</span>
							</div>
							{currentOperator}
						</div>
					</div>
					<div className="todos-item-btn border-line-h before">
						<i className="icon-check"></i>
						<span >{data.todoCol7}</span>
					</div>
				</div>)
				break;
		}
	}
	/**
	 * 新店/改造 零星采购 卡片
	 * todoCol1:大流程类型
	 * todoCol2:小流程类型
	 * todoCol3:创建时间
	 * todoCol4:订单编号
	 * todoCol5:新店日常-设备
	 * todoCol6:状态Code
	 * todoCol7:状态名称
	 * todoCol8:移动端是否可操作标识
	 * todoCol9:餐厅编号
	 * todoCol10:餐厅名称
	 * todoCol11:备注
	 * todoCol12:冗余字段
	 */
	combineReimageCard(data) {
		console.log('combineReimageCard', data, '---', this.props.todos.status);
		let operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '',
			storeNum = '', storeName = '', memo = '';
		let currentOperator;
		let infoWrapClass = this.props.todos.status == '1' ? "todos-item-info info-label-large" : "todos-item-info";
		if (this.props.todos.status == '1' || this.props.todos.status == '2') {
			if (data.todoCol2 == '54' || data.todoCol2 == '55') {
				storeNum = data.todoCol12;
				storeName = data.todoCol13;
				memo = '';
			} else {
				storeNum = data.todoCol11;
				storeName = data.todoCol12;
				memo = data.todoCol13;
			}


			// storeNum = data.todoCol8;
			// storeName = data.todoCol9;
			// memo = data.todoCol10;
			if (this.props.todos.status == '1') {
				currentOperator = (<div className="todos-item-info-i">
					<span className="todos-item-info-label">当前操作人</span>
					<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
				</div>);
			}
		} else {
			if (data.todoCol2 == '54' || data.todoCol2 == '55') {
				storeNum = data.todoCol10;
				storeName = data.todoCol11;
				memo = '';
			} else {
				storeNum = data.todoCol9;
				storeName = data.todoCol10;
				memo = data.todoCol11;
			}



			// storeNum = data.todoCol9;
			// storeName = data.todoCol10;
			// memo = data.todoCol11;
		}
		return (<div className="todos-item animated zoomIn" onClick={(e) => this.openWebView(data)}>
			<div className="todos-item-c">
				<div className="todos-item-title">
					<div className="todos-item-time">
						<i className="icon-time"></i>
						<span>{this.formatOrderTime(data.todoCol3)}</span>
					</div>
					<div className="todos-item-logo">
						<i className={titleICON}></i>
						<span>{data.todoCol5}</span>
						<i className={operateClassName}></i>
					</div>
				</div>
				<div className={infoWrapClass}>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">订单编号</span>
						<span className="todos-item-info-val">{data.todoCol4}</span>
					</div>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">餐厅编号</span>
						<span className="todos-item-info-val">{storeNum}</span>
					</div>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">餐厅名称</span>
						<span className="todos-item-info-val ellipsis">{storeName}</span>
					</div>
					{/* <div className="todos-item-info-i">
						<span className="todos-item-info-label">备注</span>
						<span className="todos-item-info-val ellipsis">{memo}</span>
					</div> */}
					{currentOperator}
				</div>
			</div>
			<div className="todos-item-btn border-line-h before">
				<i className="icon-check"></i>
				<span >{data.todoCol7}</span>
			</div>
		</div>);
	}
	/**
	 * 新店GC
	 * todoCol1:大流程类型
	 * todoCol2:小流程类型
	 * todoCol3:创建时间
	 * todoCol4:订单编号
	 * todoCol5:新店GC
	 * todoCol6:状态Code
	 * todoCol7:状态名称
	 * todoCol8:移动端是否可操作标识
	 * todoCol9:餐厅编号
	 * todoCol10:餐厅名称
	 * todoCol11:备注
	 * todoCol12:冗余字段
	 */
	combineNewstoregcCard(data) {
		// console.log('combineNewstoregcCard', data);
		let operateClassName = this.props.todos.status == '0' ? this.AllowOnMobile(data.todoCol8) : this.AllowOnMobile(data.todoCol9),
			titleICON = data.todoCol2 ? this.getICON(data.todoCol2) : '',
			storeNum = '', storeName = '', memo = '';
		let currentOperator;
		let infoWrapClass = this.props.todos.status == '1' ? "todos-item-info info-label-large" : "todos-item-info";

		if (this.props.todos.status == '1' || this.props.todos.status == '2') {
			storeNum = data.todoCol11;
			storeName = data.todoCol12;
			memo = data.todoCol13;
			if (this.props.todos.status == '1') {
				currentOperator = (<div className="todos-item-info-i">
					<span className="todos-item-info-label">当前操作人</span>
					<span className="todos-item-info-val ellipsis">{data.todoCol10}</span>
				</div>);
			}
		} else {
			storeNum = data.todoCol9;
			storeName = data.todoCol10;
			memo = data.todoCol11;
		}
		return (<div className="todos-item animated zoomIn" onClick={(e) => this.openWebView(data)}>
			<div className="todos-item-c">
				<div className="todos-item-title">
					<div className="todos-item-time">
						<i className="icon-time"></i>
						<span>{this.formatOrderTime(data.todoCol3)}</span>
					</div>
					<div className="todos-item-logo">
						<i className={titleICON}></i>
						<span>{data.todoCol5}</span>
						<i className={operateClassName}></i>
					</div>
				</div>
				<div className={infoWrapClass}>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">订单编号</span>
						<span className="todos-item-info-val">{data.todoCol4}</span>
					</div>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">餐厅编号</span>
						<span className="todos-item-info-val">{storeNum}</span>
					</div>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">餐厅名称</span>
						<span className="todos-item-info-val ellipsis">{storeName}</span>
					</div>
					<div className="todos-item-info-i">
						<span className="todos-item-info-label">备注</span>
						<span className="todos-item-info-val ellipsis">{memo}</span>
					</div>
					{currentOperator}
				</div>
			</div>
			<div className="todos-item-btn border-line-h before">
				<i className="icon-check"></i>
				<span >{data.todoCol7}</span>
			</div>
		</div>);
	}
	render() {
		switch (this.props.businessType) {
			// 维修卡片
			case 10:
				return this.combineRepairCard(this.props.itemData);
				break;
			// 非项目卡片 
			case 30:
				return this.combineNonProjectCard(this.props.itemData);
				break;
			case 20:
				//保养卡片
				return this.combineMaintenanceCard(this.props.itemData);
				break;
			case 40:
				// 项目卡片
				return this.combineProjectCard(this.props.itemData);
				break;
			case 50:
				// 新店/改造 零星采购
				return this.combineReimageCard(this.props.itemData);
				break;
			case 60:
				// 新店/改造 零星采购
				return this.combineNewstoregcCard(this.props.itemData);
				break;
			default:
				return (<div style={{ display: 'none' }}></div>);
				break;
		}
	}

	// 进入详情页面 每个小流程类型跳转到对应的详情页，相同的详情页跳转到同一个路由
	// smallCode:小流程类型编号 orderId : 订单唯一编号
	openWebViewDetail(smallCode, orderId, statusCode, updateDate) {
		let url = this.getViewRoutes(smallCode, statusCode, orderId);
		if (!url) {
			alert('未知业务类型[' + smallCode + '] 订单号[' + orderId + ']');
			return;
		}
		url += (url.indexOf('?') > 0 ? '&' : '?') + 'sta=' + this.props.todos.status + '&' + 'updateDate=' + encodeURIComponent(updateDate);
		// console.log('Marlin URL',url)
		jw.pushWebView(url);
	}

	//status:1 为途中订单状态 途中订单统一跳转到详情页面
	//status:0 为我的待办 根据待办状态跳转
	openWebView(data) {
		// console.log(data.todoCol8,"data.todoCol8")
		console.log('openWebView[' + this.props.todos.status + ']', data.todoCol9)
		if ((this.props.todos.status == 0 && data.todoCol8 == '0') || data.todoCol9 == '0') {
			confirm("该订单不可在移动端处理，请到 PC 端处理")
			return;
		}
		if (this.props.todos.status == 1 || this.props.todos.status == 2) {
			window.upTabsData('todoInfoState', 'cache', data.todoCol7);
			this.openWebViewDetail(data.todoCol2, data.todoCol4, data.todoCol6, data.todoCol3);
		} else {
			this.getRouter(data.todoCol2, data.todoCol4, data.todoCol6, data.todoCol3);
	  	/*if(data.todoCol2=='12'&&data.todoCol6=='6'){
	  		confirm("该订单不可在移动端处理，请到 PC 端处理");
	  	}*/
		}
	}
	getRouter(smallCode, orderId, statusCode, updateDate) {
		// console.log('statusCode',statusCode)
		this.getStatusRoutes(orderId);
		// console.log('Marlin x1['+smallCode+']',statusRoutes,statusRoutes[smallCode],statusRoutes[smallCode][statusCode])
		if (statusRoutes[smallCode] && statusRoutes[smallCode][statusCode]) {
			let url = statusRoutes[smallCode][statusCode];
			// let url = statusRoutes['23']['4'];
			url += (url.indexOf('?') > 0 ? '&' : '?') + 'updateDate=' + encodeURIComponent(updateDate);
			// updateDate = encodeURIComponent(updateDate)
			// jw.pushWebView(statusRoutes[smallCode][statusCode])
			jw.pushWebView(url)
		}
	}
	/**
	 * 在途、历史需求（订单）路由表
	 * @param processType 流程类型
	 * @param subProcess 小流程类型
	 * @param orderId 需求编号（订单编号）
	 * @return 在途、历史订单路由
	 * @param view ：拆单之前 
	 * @param vieworder ：拆单之前之后
	 */

	getViewRoutes(subProcess, statusCode, orderId) {
		// subProcess='42';
		let viewRoutes = {
			'11': function (statusCode) {
				return statusCode == '2' ? EpsWebRoot + '/#/repairing/vieworder/equipment/' + orderId :
					EpsWebRoot + '/#/repairing/view/equipment/' + orderId;
			},//EpsWebRoot+'/#/repairing/view/equipment/'+orderId,
			'12': function (statusCode) {
				return statusCode == '2' ? EpsWebRoot + '/#/repairing/vieworder/project/' + orderId :
					EpsWebRoot + '/#/repairing/view/project/' + orderId;
			},/*{
				'2':EpsWebRoot+'/#/repairing/view/project/'+orderId,,
				'':EpsWebRoot+'/#/repairing/view/project/'+orderId,,
			},*/
			'13': EpsWebRoot + '/#/repairing/view/it/' + orderId + '?unfinished=1',
			'21': EpsWebRoot + '/#/maintenance/view/equipment/' + orderId + '?type=year',//年度-设备
			'24': EpsWebRoot + '/#/maintenance/view/project/' + orderId + '?type=year',//年度-工程
			'22': EpsWebRoot + '/#/maintenance/view/equipment/' + orderId + '?type=month',//月度-设备
			'25': EpsWebRoot + '/#/maintenance/view/project/' + orderId + '?type=month',//月度-工程
			'23': EpsWebRoot + '/#/maintenance/vieworder/equipment/' + orderId,//设备-保养
			'26': EpsWebRoot + '/#/maintenance/vieworder/project/' + orderId,//工程-保养
			// 非项目设备采购需求
			'31': EpsWebRoot + '/#/nonproject/view-info/view/equipment/' + orderId,
			// 非项目设备采购
			'32': EpsWebRoot + '/#/nonproject/view-info/vieworder/equipment/' + orderId,
			// 非项目工程采购
			'33': EpsWebRoot + '/#/nonproject/view-info/vieworder/project/' + orderId,
			// 非项目IT采购
			'34': EpsWebRoot + '/#/nonproject/view-info/vieworder/it/' + orderId,
			// 非项目工程采购需求
			'35': EpsWebRoot + '/#/nonproject/view-info/view/project/' + orderId,
			// 非项目IT采购需求
			'36': EpsWebRoot + '/#/nonproject/view-info/view/it/' + orderId,
			// 项目采购需求
			'41': EpsWebRoot + '/#/project/view/' + orderId,
			// 项目型供应商采购订单
			'42': EpsWebRoot + '/#/project/vieworder/' + orderId,
			// 项目型采购订单
			'43-1': EpsWebRoot + '/#/project/vieworder/equipment/' + orderId,
			'43-2': EpsWebRoot + '/#/project/vieworder/project/' + orderId,
			'43-3': EpsWebRoot + '/#/project/vieworder/it/' + orderId,
			// 新店/改造设备/工程订单
			'51': EpsWebRoot + '/#/minorpurchase/vieworder/equipment/' + orderId,
			// 新店/改造IT采购需求
			'53': EpsWebRoot + '/#/newstoreit/view/it/' + orderId,
			// 新店/改造IT采购订单
			'55': EpsWebRoot + '/#/newstoreit/vieworder/it/' + orderId,
			// 新店/改造GC采购
			'61': EpsWebRoot + '/#/newstoregc/view/' + orderId
		};
		return viewRoutes[subProcess] ? (typeof viewRoutes[subProcess] == 'function' ? viewRoutes[subProcess](statusCode) : viewRoutes[subProcess])
			: '';
	}
	/**
	 * 待办需求（订单）路由表
	 */
	getStatusRoutes(orderId, updateDate) {
		console.log('orderId', orderId)
		statusRoutes = {
			'11': {
				//2:供应商响应，3：供应商评估 4： 餐厅确认 5： doa审批  6：供应商确认 7： 餐厅确认及评价 8：调整后再审批
				'2': EpsWebRoot + '/#/repairing/response/equipment/' + orderId,
				'3': EpsWebRoot + '/#/repairing/assess/equipment/' + orderId + '?type=1',//供应商评估
				'4': EpsWebRoot + '/#/repairing/process/equipment/' + orderId + '?type=1',//餐厅确认1
				'5': EpsWebRoot + '/#/repairing/process/equipment/' + orderId + '?type=2',//doa审批2
				'6': EpsWebRoot + '/#/repairing/assess/equipment/' + orderId + '?type=2',//供应商确认
				'7': EpsWebRoot + '/#/repairing/process/equipment/' + orderId + '?type=4',//餐厅确认评价4
				'8': EpsWebRoot + '/#/repairing/process/equipment/' + orderId + '?type=3',//调整后再审批
			}, '12': {
				//2:供应商响应，   5： doa审批  7： 餐厅确认及评价 8：再次审批 
				'2': EpsWebRoot + '/#/repairing/response/project/' + orderId,
				'4': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=1',//餐厅确认1
				'5': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=2',
				'7': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=4',
				'8': EpsWebRoot + '/#/repairing/process/project/' + orderId + '?type=3',
			}, '13': {
				// 3：供应商重新评估IT维修（餐厅确认节点退回后的状态） 4： 餐厅确认 5： doa审批  6：供应商确认 7： 餐厅确认及评价 8：再次审批
				'3': EpsWebRoot + '/#/repairing/assess/it/' + orderId + '?type=1',
				'4': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=1',
				'5': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=2',
				'6': EpsWebRoot + '/#/repairing/assess/it/' + orderId + '?type=2',
				'7': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=4',
				'8': EpsWebRoot + '/#/repairing/process/it/' + orderId + '?type=3',
			},
			'21': {  //保养 设备年度 2：DO审批
				// '2':EpsWebRoot+'/#/repairing/response/equipment/,
				'2': EpsWebRoot + '/#/maintenance/equipment/approval/' + orderId + '?type=year'
			}, '22': { //保养设备月度审核 2： 已提交待审批
				'2': EpsWebRoot + '/#/maintenance/equipment/approval/' + orderId + '?type=month'
			}, '23': { // 设备保养订单 1:已提交待响应 3：已确认待服务 4：已服务待评价
				'1': EpsWebRoot + '/#/maintenance/equipment/reply/' + orderId,
				'3': EpsWebRoot + '/#/maintenance/equipment/confirm/' + orderId,
				'4': EpsWebRoot + '/#/maintenance/equipment/assess/' + orderId
			}, '24': { // 工程年度保养计划
				'2': EpsWebRoot + '/#/maintenance/project/approval/' + orderId + '?type=year',
			}, '25': { // 工程月度保养计划
				'2': EpsWebRoot + '/#/maintenance/project/approval/' + orderId + '?type=month',
			}, '26': { // 工程保养订单
				'1': EpsWebRoot + '/#/maintenance/project/reply/' + orderId,
				'3': EpsWebRoot + '/#/maintenance/project/confirm/' + orderId,
				'4': EpsWebRoot + '/#/maintenance/project/assess/' + orderId
			}, '31': { // 非项目设备采购需求 只有创建
				'1': EpsWebRoot + '/#/nonproject/createpo/equipment/' + orderId,
				'5': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=10'
			}, '32': { // 非项目设备采购  1：已创建待审批(DOA) 3：已服务待签收(餐厅) 4：已收货待审批(DOA)
				'1': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=1',
				'3': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=4',
				'4': EpsWebRoot + '/#/nonproject/approval/equipment/' + orderId + '?type=3',
			}, '33': { //非项目工程  1：  3：  4：同上
				'1': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=1',
				'3': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=4',
				'4': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=3',
			}, '34': {//非项目it 1:已创建待审批 3:已服务待签收 4:餐厅已确认(DOA审批) 5:IT PM已确认(DOA审批)
				'1': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=1',
				'3': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=4',
				'4': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=1',
				'5': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=1'
			}, '35': {// 非项目工程采购需求 只有创建
				'1': EpsWebRoot + '/#/nonproject/createpo/project/' + orderId,
				'5': EpsWebRoot + '/#/nonproject/approval/project/' + orderId + '?type=10',
			}, '36': {// 非项目it采购需求 只有创建
				'1': EpsWebRoot + '/#/nonproject/createpo/it/' + orderId,
				'5': EpsWebRoot + '/#/nonproject/approval/it/' + orderId + '?type=10',
			}, '41': {//项目采购需求
				// PM确认供应商的需求明细
				'3': EpsWebRoot + '/#/project/pmconfirm/' + orderId,
				'4': EpsWebRoot + '/#/project/approval/' + orderId + '?type=1',
			},/*'42':{// 项目型供应商采购订单
					// 项目采购-供应商确认PO/填写服务信息/调整送货信息，这个节点是42，移动端不支持操作
					'1':EpsWebRoot+'/#/project/approval/equipment/'+orderId+'?type=4',
					'2':EpsWebRoot+'/#/project/approval/equipment/'+orderId+'?type=1',
				},*/'43-1': {//项目型采购订单-设备
				'1': EpsWebRoot + '/#/project/approval/equipment/' + orderId + '?type=4',
				'2': EpsWebRoot + '/#/project/approval/equipment/' + orderId + '?type=1',
			}, '43-2': {//项目型采购订单-工程
				'1': EpsWebRoot + '/#/project/approval/project/' + orderId + '?type=4',
				'2': EpsWebRoot + '/#/project/approval/project/' + orderId + '?type=1',
			}, '43-3': {//项目型采购订单-IT
				'1': EpsWebRoot + '/#/project/approval/it/' + orderId + '?type=4',
				'2': EpsWebRoot + '/#/project/approval/it/' + orderId + '?type=1',
			}, '51': { //新店/改造设备/工程订单
				// 已确认待审批
				'4': EpsWebRoot + '/#/minorpurchase/approval/equipment/' + orderId + '?type=1',
				// 已调整待审批
				'8': EpsWebRoot + '/#/minorpurchase/approval/equipment/' + orderId + '?type=2',
			}, '53': { //新店/改造IT采购需求
				// TSI确认供应商的需求明细
				'3': EpsWebRoot + '/#/newstoreit/pmconfirm/' + orderId,
				// DOA审批（IT Func/Dept）
				'4': EpsWebRoot + '/#/newstoreit/approval/' + orderId + '?type=1'
			}, '55': { //新店/改造IT采购订单
				// 餐厅确认评价（IT)
				'1': EpsWebRoot + '/#/newstoreit/approvalorder/' + orderId + '?type=4',
				// DOA送货调整审批 （IT）
				'2': EpsWebRoot + '/#/newstoreit/approvalorder/' + orderId + '?type=1'
			}, '61': { //新店/改造GC采购
				// 6 - 已确认待审批
				'6': EpsWebRoot + '/#/newstoregc/approval/' + orderId + '?type=1',
				// 11 - 已调整待审批
				'10': EpsWebRoot + '/#/newstoregc/approval/' + orderId + '?type=2'
			}
		}
	}
};

export default connect((state) => { return state })(TodoItemView);