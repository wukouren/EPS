/**
 * 搜索资产报废
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ObjectSelectList from '../../components/Common/ObjectSelectList';
import { connect } from 'dva';

class ScrappedSearch extends Component {
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:selectScrapped');
		var cache = store.find({id:'tab:cache'}) || {};
		if(cache['id']){
			props['objectselect']['parentData'] = cache["data"]["parentData"];
		}
		super(props);
	}
	onAdd(objects){
		console.log('store search:',objects);
	}
	// 组件加载完毕
  componentDidMount(){
  	let self = this;
  	NProgress.done();
    let dispatch = this.props.dispatch;
    console.log(this.props['objectselect']['parentData'],'123123123123123123132');
    PubSub.subscribe('select:scrapped',function(evt,data){
    	console.log('select:scrapped:',data);
    	let list = [];
    	_.each(data["selectObjects"],function(i){
    		if(i['deviceName'] == self.props['objectselect']['parentData']['deviceName']){
    			list.push(i)
    		}
    	})
			dispatch({
				type:'objectselect/changeData',
				payload:{
					selectObjects:list
				}
			})
			
			let datas = self.props.objectselect;
			console.log(datas,'zzzzz');
			let nowData = {
      }
      if(datas["parentData"]['scrappType'] == 'repair'){
        nowData = {
          orderNumber: datas["parentData"]["orderNumber"],
          storeNumber:datas["parentData"]["storeNumber"],
          deviceNumber:datas["parentData"]["deviceNumber"],
          deviceName:datas["parentData"]["deviceName"],
          deviceSerialNumber:datas["parentData"]["deviceSerialNumber"],
          allPartRepairMoney:datas["parentData"]['allPartRepairMoney'],
          faCategory:datas["parentData"]['faCategory'],
          assetDesc:''
        }

        if(datas['parentData']['scrappOrderType'] == 'it'){
        	nowData['typeNumber'] = datas['parentData']['typeNumber'];
        }

      }else{
        nowData = {
          orderNumber: datas["parentData"]["orderNumber"],
          storeNumber:datas["parentData"]["storeNumber"],
          deviceNumber:datas["parentData"]["deviceNumber"],
          deviceName:datas["parentData"]["deviceName"],
          faCategory:datas["parentData"]['faCategory'],
          assetDesc:''
        }
      }
      console.log(nowData,'nowData');
      dispatch({
        type: 'objectselect/searchScrappedList',
        payload: {
          condition: nowData,
          pager: {
            pageNum: 1,
            pageSize: 10
          }
        }
      })
    })

    window.upTabsData('get:select:scrapped','publish')
    // setTimeout(function(){
    // 	console.log('开始设置拉倒的值');
    // 	dispatch({
    // 		type:'objectselect/changeData',
    // 		payload:{
    // 			loading:false
    // 		}
    // 	})
    // },10000)
   //  let data = this.props.objectselect;
   //  setTimeout(function(){
  	//   dispatch({
			// 	type:'objectselect/searchScrappedList',
			// 	payload:{
			// 		condition:{
			// 			orderNumber:data['parentData']['orderNumber'],
			// 			storeNumber:data['parentData']['storeNumber']
			// 		},
			// 		pager: {
			// 	    pageNum: 1,
			// 	    pageSize: 20
			// 	  }
			// 	}
			// })
   //  },100)
   //  PubSub.subscribe('select:scrapped',function(evt,data){
   //  	console.log('select:scrapped',data,'看看这里拿到了什么数据')
			// dispatch({
			// 	type:'repairit/searchScrappedList',
			// 	payload:{
			// 		param:{
			// 			eid:self['scrapped']['parentData']['storeMan'],
			// 			condition:{
			// 				orderNumber:self['scrapped']['parentData']['orderNumber'],
			// 				storeNumber:self['scrapped']['parentData']['storeNumber']
			// 			},
			// 			pager: {
			// 		    pageNum: 1,
			// 		    pageSize: 5
			// 		  }
			// 		}
					
			// 	}
			// })
   //  })
  }
	render(){
 		let data = this.props.objectselect;
 		data['noFirstFetch'] = true;
		return (
			<div className="eps-parts-search">
				<header className="header clear-margin specail" ref="header">
					<div className="header-bg"></div>
					<div className="header-bg-2"></div>
					<div className="header-c">
					</div>
				</header>
				<div className="eps-search-body">
					<ObjectSelectList data={data} searchType="scrapped" onAdd={ this.onAdd }/>
				</div>
			</div>
		);
	}
}

export default connect(function(state){
	return state
})(ScrappedSearch);