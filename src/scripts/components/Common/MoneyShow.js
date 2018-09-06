import React, { Component } from 'react';
import { getDict, DataLength } from '../../constants';
import { AlertBase, ConfirmBase, AlertInfoBase } from '../../components/Common/EpsModal';

import { connect } from 'dva';
let FeeRate = getDict('taxlist');
console.log(FeeRate, "FeeRate")

class MoneyShow extends Component {

	turnMoney(data) {
		return Number(data).formatMoney(2, '', '')
	}
	NameInfo(name) {

		AlertInfoBase({
			text: name,
		});
	}
	render() {
		let alldata = this.props.allData;
		let FeeList = alldata.FeeList;
		let carCost = 0;
		let hotelCost = 0;
		let otherCost = 0;
		let installationFee = 0;
		let otherCostTax = '';
		let hotelCostTax = '';
		let carCostTax = '';
		let installationFeeRate = '';
		let PurchaseMoney = alldata.PurchaseMoney;
		let self = this;
		console.log(alldata, "alldata")
		return (<div className="money-show">
			<div className="money-show-container">
				<div className="money-show-c">
					<div className="money-show-i" onClick={(e)=>self.NameInfo(PurchaseMoney)}>
						<div className="money-show-num ellipsis">{PurchaseMoney}</div>
						<div className="money-show-tip">采购费小计(含税)</div>
					</div>
					<div className="money-show-i" onClick={(e)=>self.NameInfo(self.turnMoney(FeeList.installationFee)+' ('+(FeeList.installationFeeRate && FeeList.installationFeeRate!='请选择'?FeeList.installationFeeRate:'-')+')')}>
						<div className="money-show-num ellipsis">{self.turnMoney(FeeList.installationFee)}{' ('+(FeeList.installationFeeRate && FeeList.installationFeeRate!='请选择'?FeeList.installationFeeRate:'-')+')'}</div>
						<div className="money-show-tip">人工费小计(含税)</div>
					</div>
					<div className="money-show-i" onClick={(e)=>self.NameInfo(self.turnMoney(FeeList.hotelCost)+'  ('+(FeeList.hotelCostTax&&FeeList.hotelCostTax!='请选择'?FeeList.hotelCostTax:'-')+')')}>
						<div className="money-show-num ellipsis">{self.turnMoney(FeeList.hotelCost)}{'  ('+(FeeList.hotelCostTax&&FeeList.hotelCostTax!='请选择'?FeeList.hotelCostTax:'-')+')'}</div>
						<div className="money-show-tip">住宿费小计(含税)</div>
					</div>
				</div>
				<div className="money-show-c">
					<div className="money-show-i" onClick={(e)=>self.NameInfo(self.turnMoney(FeeList.carCost)+' ('+(FeeList.carCostTax&&FeeList.carCostTax!='请选择'?FeeList.carCostTax:'-')+')')}>
						<div className="money-show-num ellipsis">{self.turnMoney(FeeList.carCost)}{' ('+(FeeList.carCostTax&&FeeList.carCostTax!='请选择'?FeeList.carCostTax:'-')+')'}</div>
						<div className="money-show-tip">差旅费小计(含税)</div>
					</div>
					<div className="money-show-i" onClick={(e)=>self.NameInfo(self.turnMoney(FeeList.otherCost)+'  ('+(FeeList.otherCostTax&&FeeList.otherCostTax!='请选择'?FeeList.otherCostTax:'-')+')')}>
						<div className="money-show-num ellipsis">{self.turnMoney(FeeList.otherCost)}{'  ('+(FeeList.otherCostTax&&FeeList.otherCostTax!='请选择'?FeeList.otherCostTax:'-')+')'}</div>
						<div className="money-show-tip">其他费小计(含税)</div>
					</div>
					<div className="money-show-i specail" onClick={(e)=>self.NameInfo(this.turnMoney(alldata.orderMoney))}>
						<div className="money-specail ellipsis" >
							<i className="icon-money"></i>
							<span className="ellipsis">{self.turnMoney(alldata.orderMoney)}</span>
						</div>
						<div className="money-all-tax">(含税)</div>
					</div>
				</div>
			</div>
			<div className="money-show-other-tip">
				<i className="icon-money-tips"></i>
				<div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
			</div>
		</div>)
	}
	showCostInfo(type) {
		if (typeof this.props.showFeeDetail === 'function')
			this.props.showFeeDetail(type)
	}
};

export default connect((state) => { return state })(MoneyShow);
