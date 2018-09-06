/**
 * It明细
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';

import request from '../../utils/EpsRequest';

import LoadMore from './../../components/Common/LoadMore';

// import UserCard from './../../components/Common/UserCardToProject';
import UserCard from './../../components/Common/UserCardToIt';
import ItList from '../../components/Repair/ItList';
import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';

class ItInfo extends Component {
	render(){
		let data = this.props.itinfo;
		let view = this._init_view();
		if(data.loading['loading']){
				return (<div className="todos-loading">
					<img src="images/loading.gif" />
					<span>加载中</span>
				</div>)
		}else{
			return (
				<div className="root-container">
					{view}
				</div>
			);
		}
	}
	turnMoney(data){
		return Number(data).formatMoney(2,'','')
	}
	NameInfo(name){ 
		AlertInfoBase({
      text: name,
   	});
	}
	_init_view(){
		let view = '';
		let data = this.props.itinfo;
		console.log(data,'zsdasdasdas');
		let  LoadMoreHtml='';
		if(data.noMore&&data['loading']['hide']){
      LoadMoreHtml= <div></div>  
    }else if(data.noMore){
       LoadMoreHtml=<div className="noMore-Data">没有更多了</div>
    }else{
      LoadMoreHtml= <LoadMore data={{
              hide:data['loading']['hide'],
              fix:data['loading']['fix'],
              loading:data['loading']['loading']
            }}
            container='it-details'
            onEndReached={(e)=>{this.onEndReached(e)} }/>

    }
		view = <div className="root-container-w repair-it-list">
			<header className="header header-with-memo xheight header-adapt" ref="header">
				<div className="header-bg"></div>
				<div className="header-c">
					<div className="header-bg-2-adapt"></div>
				</div>
			</header>
			<sesstion className="main ">
				<div className="main-c todo-info-it it-details">
					<div className="it-info-top-card">
						<div className="it-info-top-card-c">
							<div className="it-info-top-card-i">
								<label className="it-info-top-card-label">其他费用(不含税)</label>
								<div className="it-info-top-card-val ellipsis" onClick={()=>self.NameInfo(data['detailList'] ? this.turnMoney(data['detailList'][0]['otherFeesNotax'] || 0) :"-")}>{data['detailList'] ? this.turnMoney(data['detailList'][0]['otherFeesNotax'] || 0) :"-"}</div>
							</div>
							<div className="it-info-top-card-i">
								<label className="it-info-top-card-label">税率</label>
								<div className="it-info-top-card-val ellipsis">{data['detailList']?data['detailList'][0]['otherFeesRates']:'-'}</div>
							</div>
							<div className="it-info-top-card-i">
								<label className="it-info-top-card-label">其他费用(含税)</label>
								<div className="it-info-top-card-val ellipsis" onClick={()=>self.NameInfo(data['detailList']?this.turnMoney(data['detailList'][0]['otherFees'] || 0):'-')}>{data['detailList']?this.turnMoney(data['detailList'][0]['otherFees'] || 0):'-'}</div>
							</div>
							<div className="it-info-top-card-i">
								<label className="it-info-top-card-label">其他费用备注</label>
								<div className="it-info-top-card-val ellipsis" onClick={()=>self.NameInfo(data['supRemarks'] || '-')}>{data['supRemarks'] || '-'}</div>
							</div>
						</div>
					</div>
					<ItList data={this.props.itinfo} />
					{LoadMoreHtml}
				</div>
			</sesstion>
		</div>
		return view
	}

	openWebView(data){
		var url = EpsWebRoot+'/#'+data
		jw.pushWebView(url);
	}
	componentDidUpdate(){
    let self = this;
    this.setHeight()
  }
	componentDidMount(){
		let self = this;
		let dispatch = this.props.dispatch;
		let modelData = this.props.itinfo;
		self.setHeight();

		let orderid=this.props.params.orderid;
		//首次加载数据
		setTimeout(function(){
			request('/McdEpsApi/joywok/repair/getITOrderInfo',{
	      method:'POST',
	      body:JSON.stringify({
	        param:{
	        	eid: eid,
	          condition:{
	            orderNumber:orderid,
	          },
	          pager:{pageNum:'1',pageSize:'10'}
	        }
	      })
	    }).then(function(resp){
	      if(resp['data']['success']==false){
	      }else{
	        NProgress.done();
	        let data=resp['data']['body'];
	        let creatorinfo={};
	        let loading={
	        	loading:false,
	        	hide:data.pageInfo.list.length<10?true:false,//是否显示加载的动画
	        	fix:false,
	        };
	        dispatch({
	          type:'itinfo/changeData',
	          payload:_.extend({
	          	loading:loading,
	          	 noMore:false,//是否还有下一页
	          	 pages:data.pageInfo.pages,
	          },resp['data']['body'])
	        })  
	      }
	    })
		},0)

		NProgress.done();
	}

	//上拉加载更多回调
	onEndReached(e){
		let dispatch=this.props.dispatch;
	  let pageNum=this.props.itinfo.pageNum;
	  dispatch({
	    type:"itinfo/changeData",
	    payload:{
	      noMore:false,
	      fix:true,
	    }
	  })
	  dispatch({
	    type:"itinfo/loadMoreDevice",
	    pages:this.props.itinfo.pages,
	    payload:{
	      param:{
	        eid:eid,
	        condition: {
	          orderNumber: this.props.params.orderid,
	        },
	        pager: {
	         pageNum: pageNum+1,
	         pageSize: '10'
	        }
	      }
	    }
	  })
	}
	setHeight(){
		console.log(1111)
    let self = this;
    setTimeout(function(){
      let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
      let header = $('.header').height() ||0;
      $('.it-details').css({height:clientHeight-header-10+'px'});
    },0)
  }
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(ItInfo);