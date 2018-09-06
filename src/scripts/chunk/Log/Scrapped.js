/**
 * 待办列表
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import request from '../../utils/EpsRequest';
import { orderStatus } from '../../constants';
import EmptyView from '../../components/Common/EmptyView';
import {AlertBase} from '../../components/Common/EpsModal';
import {ScrappedCardSelect,ScrappedCardNormal,ScrappedCardSearchCheck} from '../../components/Common/ScrappedCard';
class Scrapped extends Component {
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:scrap');
		var cache = store.find({id:'tab:cache'}) || {};
		if(cache['id']){
			console.log(cache['data'],'这个值里面有啥啊');
			props['scrapped']['parentData'] = cache["data"];
			// let list = cache["data"]['scrapPageInfo'] ? cache["data"]['scrapPageInfo'] : [];
			// props['scrapped']['list'] = self.initturnData(list,true);
		}
		super(props);
	}
	render(){
		let self = this;
		let data = this.props.scrapped;
		console.log(data,'这个里面有啥值呢','zzzzz');
		if(data.loading["loading"]){
			return (<div className="todos-loading">
							<img src="images/loading.gif" />
							<span>加载中</span>
						</div>)
		}else{
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
									data["list"] && data["list"].length>0 ? _.map(data["list"],function(i,index){
										// scrapOriginal={scrapOriginal} scrapNbv={scrapNbv} scrapProportion={scrapProportion}
										return <ScrappedCardNormal changeItem={(e, type) => self.changeItem(e, type,index)} edit={(data['parentData']['scrappType'] == 'noproject' && data["parentData"]["addScrap"]?true:false)} scrappOrderType={data["parentData"]["scrappOrderType"]} deleteBtnShow={data["parentData"]["addScrap"]?true:false} itemdata={i} index={(index+1)+'/'+data["list"].length} removeItem={(e)=>self.removeItem(i,index)}></ScrappedCardNormal>
									}):<EmptyView tip="暂无资产报废信息"/>
								}
							</div>
						</sesstion>
						{
							data['parentData']['addScrap']?<footer className="footer file-upload-btn chose-scrap" onClick={(e)=>this.gotoAddScrapped(e)}>
								<i className="icon-file-add"></i>
								<span>挑选资产</span>
							</footer>:''
						}
					</div>
				</div>
			);
		}
	}
	changeItem(e,type,targetIndex){
		let value = window.replaceNnum(e.target.value);
		let self = this;
		let dispatch = this.props.dispatch;
		let datas = this.props.scrapped;
		let newData = [];
		_.each(_.clone(datas['list']),function(i,index){
			if(targetIndex !=index){
				newData.push(i);
			}else{
				if(type == 'scrapQty'){
					if(value>=i['assetQty']){
						i['scrapQty'] = i['assetQty']
					}else{
						i['scrapQty'] = value
					}
				}else{
					i['scrapQty'] = '-'
					if(value>=100){
						i['scrapProportion'] = 100;
					}else{
						i['scrapProportion'] = value	
					}
				}
				newData.push(i);
			}
		})
		self.initturnData(newData)
		// console.log(e,type,targetIndex,'这个里面变了什么呢');
	}
	removeItem(data,targetIndex){
		let self = this;
		let dispatch = this.props.dispatch;
		let datas = this.props.scrapped;
		let newData = [];
		_.each(_.clone(datas['list']),function(i,index){
			if(targetIndex !=index){
				newData.push(i);
			}
		})
		self.initturnData(newData)
		// dispatch({
		// 	type:'scrapped/changeData',
		// 	payload:{
		// 		list:newData
		// 	}
		// })
	}
	gotoAddScrapped(){
		// <ScrappedCardSearchCheck></ScrappedCardSearchCheck>
		// <ScrappedCardNormal deleteBtnShow={true}></ScrappedCardNormal>
		// <ScrappedCardSelect itemdata={{
		// 		checked:true
		// }}></ScrappedCardSelect>
		let data = this.props.scrapped;
		let url = EpsWebRoot+'/#/scrappeddevice';
		localStorage.removeItem("Joywok:cache:tabs:scrappeddevice");
		console.log(data,'这个里面取到了什么值呢');
		data['parentData']['selectObjects'] = data['list'];
		// window.upTabsData('selectScrapped','cache',data);
		window.upTabsData('scrappeddevice','cache',data['parentData']);
    jw.pushWebView(url);
	}
	initturnData(list,setData){
		let self = this;
		let data = self.props.scrapped;
  	let allScrapMoney = 0;
		let partListMoney = 0;
		list = _.uniq(list,function(i){
			return i['id']
		})
		if(data['parentData']['scrappType'] == 'repair'){
			_.each(list,function(i){
				allScrapMoney= allScrapMoney+Number(i['assetOriginal'])
			})
			// allScrapMoney = _.reduce(data['list'], function(memo, num){ return Number(i['assetOriginal']) + num; }, 0);
			if(data['parentData']['scrappOrderType'] == 'it'){
				// purchasingPrice
				_.each(data["parentData"]['partList'],function(i){
					partListMoney= partListMoney+Number(i['purchasingPrice'])
				})
			}else{
				_.each(data["parentData"]['partList'],function(i){
					partListMoney= partListMoney+Number(i['totalMaintenanceCost'])
				})
			}
			setTimeout(function(){
				self.turnData(allScrapMoney,partListMoney,list);	
			})
		}else{
			_.each(list,function(i){
				allScrapMoney= allScrapMoney+Number(i['assetOriginal'])
			})
			// allScrapMoney = _.reduce(list, function(memo, num){ return Number(i['assetOriginal']) + num; }, 0);
			_.each(data["parentData"]['partList'],function(i){
				partListMoney= partListMoney+Number(i['otherCostAll'])
			})
			setTimeout(function(){
				self.turnData(allScrapMoney, partListMoney, list);
			})
		}
	}
	// 组件加载完毕
	turnData(allScrapMoney, partListMoney, list, setData){
		let dispatch = this.props.dispatch;
		let data = this.props.scrapped;
		let nowData = [];
		_.each(list,function(i){
			let scrapOriginal = 0; 
			let scrapNbv = 0;
			let scrapProportion = 0;
			/*
				维修
				报废原值 =（资产原值/所有资产原值总和）* 配件价格总和
				报废净值 = 报废原值 * (1-(累计折旧/资产原值)% )
				报废比例 = 报废原值/资产原值
				非项目
				报废原值=资产原值*报废比例
				报废净值=资产净值*报废比例
				报废比例=报废数量/资产数量
			 */ 
			if(data['parentData']['scrappType'] == 'repair'){
				scrapOriginal =( Number(i['assetOriginal'])/ allScrapMoney )*partListMoney;
				scrapNbv = scrapOriginal * (1-( Number(i['assetDep'] / Number(i['assetOriginal'])) ))
				scrapProportion = (scrapOriginal / Number(i['assetOriginal']))*100
				scrapProportion = Number(scrapProportion).formatMoney(2,'','')
				// +'%'
			}else{
				if (i["scrapQty"] == '-'){
					scrapProportion = i['scrapProportion'];
					i["scrapQty"] = i["assetQty"] / 100 * scrapProportion;
				}else{
					scrapProportion = i["scrapQty"] / i["assetQty"];
					scrapOriginal = Number(i['assetOriginal']) * scrapProportion
					scrapNbv = Number(i["assetNbv"]) * scrapProportion
					scrapProportion = scrapProportion*100;
					scrapProportion = Number(scrapProportion).formatMoney(2,'','')
				}
			}
			i['scrapOriginal'] = scrapOriginal;
			i['scrapNbv'] = scrapNbv;
			i['scrapProportion'] = scrapProportion;
			nowData.push(i)
		})
		// console.log(data,nowData,allScrapMoney,partListMoney,list,'xxxxxxxxxxxxx');
		dispatch({
			type: 'scrapped/changeData',
			payload: {
				list: nowData
			}
		})
	}
	componentDidMount(){
		let self = this;
		let dispatch = this.props.dispatch;
		let orderid = this.props.params.orderid.split("&")[0];
    NProgress.done();
    PubSub.subscribe('get:child:select:scrapped',function(evt,datas){
    	let data = self.props.scrapped;
			let list = data['list'].concat(datas["data"]);
			self.initturnData(list)
		});
		PubSub.subscribe('closeScrappedDevice',function(evt,data){
      let parentData = self.props['scrapped']['parentData'];
      let url = EpsWebRoot+'/#/repairing/add-edit/scrapped';
      let datas = self.props.scrapped;
      console.log(data,'zzzdsadsadsadasdasdasdasdasdasd',datas);
      if(parentData['scrappType'] == 'repair'){
      	if(parentData['scrappOrderType'] == 'device'){
	     		// datas["parentData"]['storeNumber'] = data['storeNumber'];
		      datas["parentData"]['deviceNumber'] = data['deviceNumber'];
		      datas["parentData"]['deviceName'] = data['deviceName'];
		      datas["parentData"]['deviceSerialNumber'] = data['deviceSerialNumber'];
		      let allPartRepairMoney = 0;
		      _.each(parentData['partList'],function(i){
		      	allPartRepairMoney= allPartRepairMoney+Number(i['totalMaintenanceCost'])
		      })
		      datas["parentData"]['allPartRepairMoney'] = allPartRepairMoney;
		      datas["parentData"]['faCategory'] = data['faCategory'];	
	     	}else if(parentData['scrappOrderType'] == 'it'){
	     		// datas["parentData"]['storeNumber'] = data['storeNumber'];
		      datas["parentData"]['deviceNumber'] = data['itDeviceNumber'];
		      datas["parentData"]['deviceName'] = data['itDeviceName'];
		      datas["parentData"]['typeNumber'] = data['typeNumber'];
		      datas["parentData"]['deviceSerialNumber'] = '';
		      let allPartRepairMoney = 0;
		      _.each(parentData['partList'],function(i){
		      	allPartRepairMoney= allPartRepairMoney+Number(i['purchasingPrice'])
		      })
		      let faCategory = _.findWhere(datas["parentData"]['pageInfo']['list'],{itDeviceName:data['itDeviceName']})['faCategory'];
		      datas["parentData"]['allPartRepairMoney'] = allPartRepairMoney;
		      datas["parentData"]['faCategory'] = faCategory;	
	     	}else{
	     		// datas["parentData"]['storeNumber'] = data['storeNumber'];
	     		datas["parentData"]['deviceNumber'] = data['deviceNumber'];
		      datas["parentData"]['deviceName'] = data['deviceName'];
		      datas["parentData"]['deviceSerialNumber'] = '';
		      let allPartRepairMoney = 0;
		      _.each(parentData['partList'],function(i){
		      	allPartRepairMoney= allPartRepairMoney+Number(i['totalMaintenanceCost'])
		      })
		      datas["parentData"]['faCategory'] = data['faCategory'];	
	     	}
      }else{
      	datas["parentData"]['deviceNumber'] = data['deviceNumber'];
	      datas["parentData"]['deviceName'] = data['deviceName'];


	      
	     	if(datas["parentData"]['scrappOrderType'] == 'project'){
					datas["parentData"]['faCategory'] = data['faCode2'];	     		
	     	}else{
	     		datas["parentData"]['faCategory'] = data['faCode'];
	     	}
	      // datas["parentData"]['faCategory'] = data['faCode2'];
	      datas["parentData"]['deviceLogo'] = data['deviceLogo'];	
	      datas["parentData"]['typeNumber'] = data['typeNumber'];	
	      datas["parentData"]['vendorNumber'] = data['vendorNumber'];	
      }
      console.log(datas,'这个里面缓存了啥');
      //console.log(datas,'哈哈哈哈哈哈哈哈哈啊')
      // return 
			window.upTabsData('selectScrapped','cache',datas);
			setTimeout(function(){
				jw.pushWebView(url);	
			})
		});
  	PubSub.subscribe('get:select:scrapped',function(evt,data){
  		let parentData = self.props['scrapped']['parentData'];
    	window.upTabsData('select:scrapped','publish',{
	  		selectObjects:parentData['selectObjects']
	  	})
    })
		if(this.props.scrapped['parentData']['addScrap']){
			jw.setFuncBtns([{
				type:'11',
				name:'完成'
			}])
			window.onJwNavBtnClick = function(){
				let data = self.props.scrapped['list'];
 					let error = ''
				_.each(data,function(i,index){
					console.log(i,'这个报错信息是啥',Number(i['scrapOriginal'])<=Number(i['assetOriginal'])-Number(i['scrapAmount']));
					if(Number(i['scrapOriginal'])<=Number(i['assetOriginal'])-Number(i['scrapAmount'])){
					}else{
						error = '第'+(index+1)+'资产的可发起报废原值超过可报废金额！'
					}
				})
				if(error){
					AlertBase({
						tip: error,
						icon: 'icon-save-error',
						okBtn: {
							text: '知道了'
						},
						onOk: ()=>{
						}
					});
					return 
				}
				window.upTabsData('add:scrapped','publish',data);
				jw.closeWebView();
			}
		}
		this.setHeight();
		setTimeout(function(){
			$('.todo-log-approcal-i-num-val').addClass('animated slideInLeft').removeClass('hide')
			$('.todo-log-approcal-i-info').addClass('animated slideInRight').removeClass('hide')
			
		},100)

		let list = this.props.scrapped.parentData.scrapPageInfo;
		this.initturnData(list);
		// console.log(list,'这个里面有啥呢');
		// dispatch({
		// 	type: 'scrapped/changeData',
		// 	payload: {
		// 		list: list
		// 	}
		// })
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
export default connect(mapStateToProps)(Scrapped);