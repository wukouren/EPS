import React,{ Component } from 'react';
import { connect } from 'dva';
import { getDict, getDictVal, DataLength } from '../../constants';
import { AlertInfoBase  } from './EpsModal';

class MoneyShow extends Component{
	render(){
		let data = this.props.data;
		let self =this;
		let materialCost = 0,
				materialCostTax = 0,
				installationFee = 0,
				installationFeeRate=0,
				carCost = 0,
				carCostTax=0,
				hotelCost=0,
				hotelCostTax=0,
				testCost=0,
				testCostTax=0,
				distributionCost=0,
				distributionCostRate=0,
				highCost=0,
				highCostTax=0,
				otherCost=0,
				otherCostTax=0,
				allMoney = 0
				;
		data = _.filter(data,function(i){
			let info = _.findWhere(self.props.infoList,{deviceNumber:i['deviceNumber']}) || {};
			return info['operate'] == '2'
		})
		_.each(data,function(i,index){
			materialCost+=Number(i['materialCost']);
			installationFee+=Number(i['installationFee']);
			carCost+=Number(i['carCost']);
			hotelCost+=Number(i['hotelCost']);
			testCost+=Number(i['testCost']);
			distributionCost+=Number(i['distributionCost']);
			highCost+=Number(i['highCost']);
			otherCost+=Number(i['otherCost']);
			allMoney+=(Number(i['materialCost'])+Number(i['installationFee'])+Number(i['carCost'])+Number(i['hotelCost'])+Number(i['testCost'])+Number(i['distributionCost'])+Number(i['highCost'])+Number(i['otherCost']))
			console.log(i,self.props.infoList,'这个里面有什么呢');
			if(index == 0){
				materialCostTax=i['materialCostTax'];
				installationFeeRate=i['installationFeeRate'];
				carCostTax=i['carCostTax'];
				hotelCostTax=i['hotelCostTax'];
				testCostTax=i['testCostTax'];
				distributionCostRate=i['distributionCostRate'];
				highCostTax=i['highCostTax'];
				otherCostTax=i['otherCostTax'];
			}else{
				materialCostTax = (materialCostTax ==i['materialCostTax']?materialCostTax:'-');
				installationFeeRate = (installationFeeRate ==i['installationFeeRate']?installationFeeRate:'-');
				carCostTax = (carCostTax ==i['carCostTax']?carCostTax:'-');
				hotelCostTax = (hotelCostTax ==i['hotelCostTax']?hotelCostTax:'-');
				testCostTax = (testCostTax ==i['testCostTax']?testCostTax:'-');
				distributionCostRate = (distributionCostRate ==i['distributionCostRate']?distributionCostRate:'-');
				highCostTax = (highCostTax ==i['highCostTax']?highCostTax:'-');
				otherCostTax = (otherCostTax ==i['otherCostTax']?otherCostTax:'-');
			}
		})
		let str_materialCost = this.turnMoney(materialCost) + ' (' + materialCostTax + ')',
				str_installationFee = this.turnMoney(installationFee) + ' (' + installationFeeRate + ')',
				str_carCost = this.turnMoney(carCost) + ' (' + carCostTax + ')',
				str_hotelCost = this.turnMoney(hotelCost) + ' (' + hotelCostTax + ')',
				str_testCost = this.turnMoney(testCost) + ' (' + testCostTax + ')',
				str_distributionCost = this.turnMoney(distributionCost) + ' (' + distributionCostRate + ')',
				str_otherCost = this.turnMoney(otherCost) + ' (' + otherCostTax + ')',
				str_highCost = this.turnMoney(highCost) + ' (' + highCostTax + ')';
		// str_distributionCost = 'uiashi uiush82342';
		// allMoney = '16546541651014654641';
		return (<div className="money-show">
			<div className="money-show-c">
				<div className="money-show-i">
					<div className="money-show-num ellipsis" onClick={(e)=>{ e.stopPropagation(); self.showCostInfo(str_materialCost); } }>{ str_materialCost }</div>
					<div className="money-show-tip">材料费小计(含税)</div>
				</div>
				<div className="money-show-i">
					<div className="money-show-num ellipsis" onClick={(e)=>{ e.stopPropagation(); self.showCostInfo(str_installationFee); } }>{ str_installationFee }</div>
					<div className="money-show-tip">人工费小计(含税)</div>
				</div>
				<div className="money-show-i">
					<div className="money-show-num ellipsis" onClick={(e)=>{ e.stopPropagation(); self.showCostInfo(str_carCost); } }>{ str_carCost }</div>
					<div className="money-show-tip">交通费小计(含税)</div>
				</div>
			</div>
			<div className="money-show-c">
				<div className="money-show-i">
					<div className="money-show-num ellipsis" onClick={(e)=>{ e.stopPropagation(); self.showCostInfo(str_hotelCost); } }>{ str_hotelCost }</div>
					<div className="money-show-tip">住宿费小计(含税)</div>
				</div>
				<div className="money-show-i">
					<div className="money-show-num ellipsis" onClick={(e)=>{ e.stopPropagation(); self.showCostInfo(str_testCost); } }>{ str_testCost }</div>
					<div className="money-show-tip">检测费小计(含税)</div>
				</div>
				<div className="money-show-i">
					<div className="money-show-num ellipsis" onClick={(e)=>{ e.stopPropagation(); self.showCostInfo(str_distributionCost); } }>{ str_distributionCost }</div>
					<div className="money-show-tip">运输费小计(含税)</div>
				</div>
			</div>
			<div className="money-show-c">
				<div className="money-show-i">
					<div className="money-show-num ellipsis" onClick={(e)=>{ e.stopPropagation(); self.showCostInfo(str_highCost); } }>{ str_highCost }</div>
					<div className="money-show-tip">登高费用(含税)</div>
				</div>
				<div className="money-show-i">
					<div className="money-show-num ellipsis" onClick={(e)=>{ e.stopPropagation(); self.showCostInfo(str_otherCost); } }>{ str_otherCost }</div>
					<div className="money-show-tip">其他费小计(含税)</div>
				</div>
				<div className="money-show-i specail">
					<div className="money-specail" onClick={(e)=>{ e.stopPropagation(); self.showCostInfo(this.turnMoney(allMoney)); } }>
						<i className="icon-money"></i>
						<span className="ellipsis">{this.turnMoney(allMoney)}</span>
					</div>
					<div className="money-all-tax">(含税)</div>
				</div>
			</div>
			<div className="money-show-other-tip">
				<i className="icon-money-tips"></i>
				<div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
			</div>
		</div>)
	}
	showCostInfo(name,length){
		let len = length?length:12;
		if(DataLength(name)>len){
			AlertInfoBase({
        text: name,
     });
		}  
		/*return 
		if( typeof this.props.showFeeDetail === 'function') 
			this.props.showFeeDetail(type)*/
	}
	turnMoney(data){
		return Number(data).formatMoney(2,'','')
	}
	countMoney(){
		let data = this.props.data;
		return (data['materialCost']+data['installationFee']+data['carCost']+data['hotelCost']+data['testCost']+data['distributionCost']+data['highCost']+data['otherCost'])
	}
};

export default connect((state)=>{return state})(MoneyShow);
