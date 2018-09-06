/**
 * 简单的用户卡片
 *
 * 使用场景（出现在header中居中展示，只有头像和名称）：
 * 	1. 餐厅新建维修订单－创建工程维修页面header的用户信息
 * 	2. 非项目采购－OC审批页面header中的用户信息
 *
 * 传入参数：
 * 	userinfo: {
 * 		id: 'aaa',
 * 		name: '李静',
 * 		avatar: '头像地址',
 * 		roleplaying: '创建人／审批人' // 扮演角色
 * 	}
 */

import React, { Component } from 'react';
class SimpleUserCard extends Component {
	constructor(props) {
		super(props);
	}
	render(){
		let userinfo = this.props.userinfo || {};
		return (
			<div className="eps-simple-user-card">
				<div className="user-avatar-50">
					<img src={ 'http://www.joywok.com/'+userinfo.avatar["avatar_l"] }/>
				</div>
				<div className="suc-user-info">{ userinfo.roleplaying ? (<label>{ userinfo.roleplaying }</label>) : '' }<font>{ userinfo.name }</font></div>
			</div>
		);
	}
}

export default SimpleUserCard;