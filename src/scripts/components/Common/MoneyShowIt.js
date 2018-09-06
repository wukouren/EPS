import React,{ Component } from 'react';
import { connect } from 'dva';
import { getDict, getDictVal, DataLength } from '../../constants';
import { AlertInfoBase  } from './EpsModal';
import { EpsCosts } from './EpsCosts';

class MoneyShow extends Component{
	turnMoney(data){
		return Number(data).formatMoney(2,'','')
	}
	NameInfo(name,length){ 
		let len = length?length:8;
		if(DataLength(name)>len){
			AlertInfoBase({
        text: name,
     });
		}   
	}
	render(){
		let self = this;
		let cost = (this.props.data && this.props.data.detailList  && this.props.data.detailList.length > 0)?
								this.props.data.detailList[0]: {totalMaintenanceCost:'',otherFeesRates:'1',lumpSumPrice:''};
								console.log('cost::======:::=====',this.props.data.detailList,cost)
		let otherFeesRates = getDictVal('taxlist',(cost.otherFeesRates+''));
		otherFeesRates = otherFeesRates==0 ? '-' : otherFeesRates;
		// 其他费用金额为0时，税率显示为-
		otherFeesRates = (cost.lumpSumPrice-cost.totalMaintenanceCost)<=0 ? '-' : otherFeesRates ;

		// 采购费小计的税率，取配件的税率
		let partsRate = '-';
		let listNums = this.props.data.costList ? this.props.data.costList.length : 0;
		if(this.props.data.costList && this.props.data.costList.length>0){
			let firstdata = this.props.data.costList[0];
			partsRate = (_.where(this.props.data.costList, {rate:firstdata.rate}).length == listNums) ? (typeof(firstdata.rate)=='string' ? firstdata.rate : '-' ) : '-';
			if(partsRate!='-'){
				partsRate = getDictVal('taxlist',(partsRate+''));
				partsRate = (partsRate==0||partsRate=='0') ? '-' : partsRate;
			}
			// 采购费用为0时，税率显示为-
			partsRate = (cost.totalMaintenanceCost<=0 || cost.totalMaintenanceCost=='') ? '-' : partsRate;
		}
		
		return (<div className="money-show">
			<div className="money-show-c">
				<div className="money-show-i" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(cost.otherFees)+' ('+otherFeesRates+')') } }>
					<div className="money-show-num ellipsis">{this.turnMoney(cost.otherFees)} ({ otherFeesRates })</div>
					<div className="money-show-tip">其他费用(含税)</div>
				</div>
				<div className="money-show-i"  onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(cost.totalMaintenanceCost)+' ('+partsRate+')') } }>
					<div className="money-show-num ellipsis">{this.turnMoney(cost.totalMaintenanceCost)}({ partsRate })</div>
					<div className="money-show-tip">采购费小计(含税)</div>
				</div>
				<div className="money-show-i specail">
					<div className="">
						<div className="money-specail">
							<i className="icon-money"></i>
							<span className="ellipsis p-totalprice" onClick={(e) => { e.stopPropagation(); self.NameInfo(self.turnMoney(cost.lumpSumPrice)) }}>{this.turnMoney(cost.lumpSumPrice)}</span>
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
	/**
	 * 回调显示费用明细Popup窗口
	 * @param type 费用类型 1 其他费用 2 采购费小计
	 */
	showCostInfo(type){
		// console.log('showCosts type['+type+']');
		if( typeof this.props.showFeeDetail === 'function') 
			this.props.showFeeDetail(type)
	}
};

export default connect((state)=>{return state})(MoneyShow);
