/**
 * 待办列表
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import request from '../../utils/EpsRequest';
import { orderStatus } from '../../constants';
import EmptyView from '../../components/Common/EmptyView';

import {ScrappedCardSelect,ScrappedCardNormal,ScrappedCardSearchCheck} from '../../components/Common/ScrappedCard';

class ScrappedDevice extends Component {
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:scrappeddevice');
		var cache = store.find({id:'tab:cache'}) || {};
		if(cache['id']){
			props['scrapped']['parentData'] = cache["data"];
			console.log(cache["data"],'123123123123123123')
		}
		super(props);
	}
	render(){
		let self = this;
		let data = this.props.scrapped;
		
		// let list = _.map(data['parentData']['detailList'],function(i){
		// 	return i;
		// });
		// list = _.filter(list,function(i){return i['operate']})
		let list = [];
		if(data['parentData']['scrappType'] == 'repair'){
			if(data['parentData']['scrappOrderType'] == 'device'){
				if(data['parentData']['partList'] &&data['parentData']['partList'].length!=0){
					list = list.concat( _.filter(data['parentData']['partList'],function(i){
						return (i['totalMaintenanceCost']>=3000 || i['partIsFa']=='Y' || i['partIsFa']=='y')
					}))
				}
				if(data['parentData']['deviceList'] && data['parentData']['deviceList'].length!=0){
					list = list.concat(_.filter(data['parentData']['deviceList'],function(i){
						return (i['totalMaintenanceCost']>=9000)
					}))
				}
				let nowList = [];
				_.each(list,function(item){
					if(item['partName']){
						let datas = _.findWhere(data['parentData']['deviceList'],{deviceName:item['deviceName']})
						if(datas){
							nowList.push(datas)
						}	
					}
				})
				// list = _.filter(list,function(i){
				// 	return (!i['partName'])
				// })
			}else if(data['parentData']['scrappOrderType'] == 'it'){
				if(data['parentData']['partList'] &&data['parentData']['partList'].length!=0){
					list = list.concat( _.filter(data['parentData']['partList'],function(i){
						return (i['purchasingPrice']>=3000 || i['isFa'] =='Y'  || i['totalMaintenanceCost'] >=9000)
					}))
				}

				let nowList = [];
				_.each(list,function(item){
					let datas = _.findWhere(data['parentData']['pageInfo']['list'],{itDeviceName:item['itDeviceName']})
					if(datas){
						nowList.push(datas)
					}
				})

				list = nowList;
				// list = _.filter(list,function(i){
				// 	return (!i['partsName'])
				// })
			}else{
				if(data['parentData']['partList'] && data['parentData']['partList'].length!=0){
					list = list.concat(_.filter(data['parentData']['partList'],function(i){
						return (Number(i['totalMaintenanceCost'])>=3000)
					}))
				}
				if(data['parentData']['deviceList'] && data['parentData']['deviceList'].length!=0){
					list = list.concat(_.filter(data['parentData']['deviceList'],function(i){
						return (Number(i['totalMaintenanceCost'])>=3000)
					}))
				}
			}
		}else{
			list = data['parentData']['partList']
		}
		// _.each(data['parentData'])
		return (
				<div className="root-container">
					<div className="root-container-w">
						<header className="header specail" ref="header">
							<div className="header-bg"></div>
							<div className="header-bg-2"></div>
							<div className="header-c">
							</div>
						</header>
						<sesstion className="main">
							<div className="main-c">
								{
									list && list.length>0 ? _.map(list,function(i,index){
										return <ScrappedCardSearchCheck scrappType={data['parentData']['scrappType']} scrappOrderType ={data['parentData']['scrappOrderType']} itemdata={i} index={(index+1)+'/'+list.length} choseScrappedDevice={(e)=>self.choseScrappedDevice(i,index)}></ScrappedCardSearchCheck>
									}):<EmptyView tip="暂无可挑选资产"/>
								}
							</div>
						</sesstion>
					</div>
				</div>
			);
	}
	choseScrappedDevice(data){
		window.upTabsData('closeScrappedDevice','publish',data);
		jw.closeWebView();
	}
	gotoAddScrapped(){
		let self = this;
		let data = this.props.scrapped;
		let url = EpsWebRoot+'/#/repairing/add-edit/scrapped';
		window.upTabsData('selectScrapped','cache',data);
    jw.pushWebView(url);
	}
	// 组件加载完毕
	componentDidMount(){
		this.setHeight();
		NProgress.done();
	}
	componentDidUpdate(){
		let self = this;
		this.setHeight()
	}
	setHeight(){
		let self = this;
		setTimeout(function(){
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			let header = $('.header').height() ||0;
			let footer = $(".footer").height()||0
			$('.main-c').css({height:clientHeight-header-footer+'px'});
		},0)
	}
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(ScrappedDevice);