import React, { Component } from 'react';
import { connect } from 'dva';
class MoneyShowItem extends Component {
	render() {
		let data = this.props.data;
		return (<div className={"money-show-item " + this.props.styleClass}>
			<div className="money-show-item-w">
				<div className="money-show-item-c">
					<div className="money-show-item-label">{data["label"] || '总金额'}(含税)</div>
					<div className="money-show-item-val">
						<span>{Number(data["money"]).formatMoney(2, '', '')}</span>
						<i className="icon-money"></i>
					</div>
				</div>
				<div className="money-show-other-tip">
					<i className="icon-money-tips"></i>
					<div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
				</div>
			</div>
		</div>)
	}
	openWebView(data) {
		var url = EpsWebRoot + '/#' + data;
		jw.pushWebView(url);
		/*
			<<<<<<< HEAD
				<div className="money-show-other-tip">
	        <i className="icon-money-tips"></i>
	        <div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
	      </div>
=======
				{this.props.showText&&<div className="money-text">
					<i className="text-icon"></i>
					<span>在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</span>
				</div>}
>>>>>>> origin/yan-428
		 */
	}
};

export default connect((state) => { return state })(MoneyShowItem);
