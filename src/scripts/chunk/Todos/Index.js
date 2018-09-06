/**
 * 待办列表
 * 待办卡片 type='all',10,20,30,40,50,60,
 * 分别对应 全部，维修，保养，非项目，项目，新店日常，新店GC
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import NullData from './../../components/Common/NullData';
import TodosType from './../../components/Common/TodosType';
import TodoItemView from '../../components/Common/TodoItemView';
import LoadMore from './../../components/Common/LoadMore';

const eid = userinfo.employee_id;

class Todos extends Component {
	constructor(props) {
		super(props);
		// this.filterOrder = this.filterOrder.bind(this);
		this.filter = this.filter.bind(this);
		this.getFilterCondition = this.getFilterCondition.bind(this);
		this.callJWFuncs = this.callJWFuncs.bind(this);
	}
	render() {
		let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
		let data = this.props.todos;
		let todoHtml = "";
		let loadMoreHtml = "";
		console.log('list---', data);
		// console.log(userinfo,"data:userinfo")
		// console.log('Marlin render', data);
		this.setFilterBtnStage(data.filter);

		if ((!data.list.length)) {
			let strTip = ['暂无任何待办', '暂无在途订单', '暂无历史订单'][data.status];
			if (typeof strTip == 'undefined') strTip = '暂无任何待办';
			todoHtml = <NullData strTip={strTip} />;
			loadMoreHtml = "";
		} else {
			todoHtml = <div className="todos-list">
				{
					_.map(data.list, function (item) {
						return <TodoItemView itemData={item} businessType={parseInt(item.todoCol1)}></TodoItemView>
					})
				}
			</div>
			if (data.noMore) {
				loadMoreHtml = <div className="todos-nomore">没有更多了！</div>
			} else {
				loadMoreHtml = <div className='todos-list-loadmore'>
					<LoadMore container='main-c' data={{
						hide: data['hide'],
						loading: data['loading'],
						fix: data['fix']
					}} onEndReached={(e) => { this.onEndReached(e) }} />
				</div>
			}
		}
		// console.log('Marlin x2',todoHtml);
		return (
			<div className="root-container mescroll" id="mescroll">
				<div className="root-container-w">
					<header className="header clear-margin todos-header " ref="header">
						<div className="header-bg"></div>
						<div className="header-bg-2"></div>
						<div className="header-c">
							<TodosType businessType={this.props.todos['businessType']}></TodosType>
						</div>
					</header>
					<sesstion className="main">
						<div className="main-c" ref="listC" style={{
							height: data['containerHeight'] || 'auto'
						}}>
							<div className="main-w">
								{
									data.loading && data.pageNum == '1' ? <div className="todos-loading">
										<img src="images/loading.gif" />
										<span>加载中</span>
									</div> : <div id="todos-container">
											<div className="todos-refresh"></div>
											{todoHtml}
											{loadMoreHtml}
										</div>
								}
							</div>
						</div>
					</sesstion>
				</div>
			</div>
		);
	}
	bindOnEndReached() {
		let self = this,
			data = this.props.todos;
		// console.log('Marlin bindOnEndReached')
		$('.main-c').unbind('scroll').on('scroll', function (evt) {
			if (data['fix'] || data['loading']) return;
			// console.log('Marlin fixed',data['fix'],data['loading']);
			let clientHeight = $(this).height();
			let target = $('.todos-list-loadmore');
			if (target.length == 0) return;
			// console.log( 'Marlin Top', clientHeight, target.offset().top)
			if (clientHeight + 80 >= target.offset().top) {
				self.onEndReached(evt);
				$(this).unbind('scroll');
			}
			// self.onEndReached(evt);
		});
	}
	componentDidUpdate() {
		if (!this.props.todos || this.props.todos.loading) return;
		// console.log('Marlin componentDidUpdate',this.props.todos);
		if (this.props.todos.loading === false) {
			this.bindOnEndReached();
		}
	}
	onEndReached(e) {
		let businessType = this.props.todos.businessType;
		let status = this.props.todos.status;
		let pages = this.props.todos.pages;
		let nextPageNum = this.props.todos.pageNum + 1;
		let oldList = _.clone(this.props.todos.list);
		let dispatch = this.props.dispatch;

		// console.log('Marlin onEndReached',pages,nextPageNum)

		let noMore = false;
		if (this.props.todos.pageNum >= pages) {
			noMore = true;
			dispatch({
				type: "todos/changeData",
				payload: {
					noMore: noMore,
					hide: true,
					fix: true,
				}
			})
		} else {
			// console.log('Marlin more')
			noMore = false;
			dispatch({
				type: "todos/changeData",
				payload: {
					loading: true,
					pageNum: nextPageNum,
					noMore: noMore,
					hide: false,
					fix: true,
				}
			})
			// this.loadMoreData(status,businessType,nextPageNum,oldList,noMore)
		}
	}
	callJWFuncs() {
		let params = this.props.todos;
		// alert('dsadasdasds');
		// console.log('这里走了么');
		// alert('测试走了么')
		jw.showTabs({
			tabs: [
				"我的待办", "在途订单", "历史订单"
			],
			position: 'top',//是否设置在顶部
			style: "F55928",
			focusidx: parseInt(params.status)
		});
		// 过滤按钮
		jw.setFuncBtns([{ type: 0 }]);
	}
	// componentWillMount(){
	// 	let self = this;
	// 	let params = this.props.todos;
	// 	console.log('Marlin',{
	// 		tabs:[
	// 			"我的待办","在途订单","历史订单"
	// 		],
	// 		position:'top',//是否设置在顶部
	// 		style:"F55928",
	//    focusidx:parseInt(params.status)
	// 	})
	// 	if(JWReady == true){
	// 		this.callJWFuncs();
	// 		return;
	// 	}
	// 	window.EpsEvents.off('jwready:ok').on('jwready:ok',()=>{
	// 		self.callJWFuncs()
	// 	})
	// }
	// 组件加载完毕
	componentDidMount() {
		let self = this;
		let dispatch = this.props.dispatch;
		PubSub.subscribe('get:child:todos:updateTodoList', function (evt, data) {
			// console.log(data,"data:publish")
			console.log(self.props.todos.status, "status");
			let status = self.props.todos.status;
			let businessType = self.props.location.query.type ? self.props.location.query.type : 'all';
			// self.fetchTodo(businessType,eid,status)
			dispatch({
				type: 'todos/changeData',
				payload: {
					pageNum: 1
				}
			})
		});
		// 搜索订单
		PubSub.subscribe('todos:filter', this.filter);
		// 
		PubSub.subscribe('todos:getFilterCondition', this.getFilterCondition);
		window.onJwSelectTab = function (data) {
			let businessType = self.props.todos.businessType;
			let status;
			status = data;
			let pageNum = 1;
			dispatch({
				type: 'todos/changeData',
				payload: {
					loading: true,
					noMore: false,
					status: data,
					pageNum: 1
				}
			})
		}
		window.onJwNavBtnClick = function (data) {
			data.type == 0 && self.filterOrder();
		}
		NProgress.done();
		self.callJWFuncs()
		setTimeout(function () {
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			let header = $('.header').height() || 0;
			let footer = $('.footer').height() || 0;
			$('.main-c').css({ height: clientHeight - header - footer + 'px' });
			let businessType = self.props.location.query.type ? self.props.location.query.type : 'all';
			dispatch({
				type: 'todos/changeData',
				payload: {
					businessType: businessType,
					// self:self
				}
			})
			// self.fetchTodo(businessType,eid);
			let startY = 0, distanceY = 0, endY = 0;
			$('body').bind('touchstart', function (e) {
				startY = e.originalEvent.changedTouches[0].pageY;
			});
			$('body').bind('touchmove', function (e) {
				endY = e.originalEvent.changedTouches[0].pageY;
				distanceY = endY - startY;
				// console.log(e,'这个里面是什么呢');
				if (distanceY < 0) {
					console.log('往上滑动');
				} else if (distanceY > 0) {
					console.log('往下滑动', self.props['todos']['loading']);
					if (self.props['todos']['loading']) {
						if (window.mescrollFunction) {
							window.mescrollFunction.destory();
						}
						e.preventDefault();
					} else {
						if (!window.mescrollFunction) {
							window.mescrollFunction = new MeScroll("mescroll", {
								down: {
									offset: '70',
									auto: false,
									callback: function (evt) {
										console.log(evt, '1231231231');
										let datas = self.props.todos;
										self.props.dispatch({
											type: 'todos/changeData',
											payload: {
												filter: datas['filter'],
												businessType: datas['businessType'],
												pageNum: 1
											}
										})
									},
									up: {
										use: false
									}
								},
							});
						}
						if ($('.main-c').scrollTop() == 0) {
							window.mescrollFunction.lockDownScroll(false);
						} else {
							window.mescrollFunction.lockDownScroll(true);
						}
						if ($('.main-c').find(e.target).length != 0) {
							if ($('.main-c').scrollTop() == 0) {
								e.preventDefault();
							}
						} else {
							e.preventDefault();
						}
					}
				}
			});
			$('body').bind('touchend', function (e) {
				startY = 0;
				distanceY = 0;
				endY = 0;
			});
		}, 0)



		// let startY = 0,distanceY = 0,endY = 0;
		//   $('body').bind('touchstart',function(e){
		//     startY = e.originalEvent.changedTouches[0].pageY;
		//   });
		//   $('body').bind('touchmove',function(e){
		//     endY = e.originalEvent.changedTouches[0].pageY;
		//     distanceY = endY-startY;
		//     // console.log(e,'这个里面是什么呢');
		//     if( distanceY<0){
		//       console.log('往上滑动');
		//     }else if(distanceY>0){
		//       console.log('往下滑动',self.props['todos']['loading']);
		//       if(self.props['todos']['loading']){
		//         window.mescrollFunction.lockDownScroll(true);
		//         window.mescrollFunction.endSuccess();
		//       }
		//       if($('.main-c').scrollTop() == 0){
		//         window.mescrollFunction.lockDownScroll(false);
		//       }else{
		//         window.mescrollFunction.lockDownScroll(true);
		//       }
		//       if($('.main-c').find(e.target).length!=0){
		//         if($('.main-c').scrollTop() == 0){
		//           e.preventDefault();
		//         }
		//       }else{
		//         e.preventDefault();
		//       }
		//     }
		//   });
		//   $('body').bind('touchend',function(e){
		//     startY=0;
		//     distanceY = 0;
		//     endY = 0 ;
		//   });
		//   window.mescrollFunction = new MeScroll("mescroll",{
		//     down: {
		//      offset:'70',
		//      auto:false,
		//      callback: function(evt){
		//       console.log(evt,'1231231231');
		//       let datas = self.props.todos;
		//       dispatch({
		//         type:'todos/changeData',
		//         payload:{
		//           filter:datas['filter'],
		//           businessType:datas['businessType'],
		//           pageNum: 1
		//         }
		//       })
		//     }
		//    },
		//   });

	}

	fetchTodo(businessType, eid, status) {
		let dispatch = this.props.dispatch;
		dispatch({
			type: 'todos/changeData'
		})
	}
	// 打开搜索订单页面
	filterOrder() {
		let url = EpsWebRoot + '/#/todos/filter';
		// console.log('Marlin filterOrder',this.props);
		jw.newWebView(url);
	}
	setFilterBtnStage(filter) {
		let originFilter = {
			number: '',
			flowtype: ['-1'],
			startDate: null,
			endDate: null,
			moneyFrom: '',
			moneyTo: '',
		},
			stage = _.isEqual(filter, originFilter) ? 0 : 1;

		jw.setFuncBtnStatus({ type: 0, stage: stage });
	}
	// 
	filter(evt, data) {
		let dispatch = this.props.dispatch;
		// this.setFilterBtnStage( data );
		dispatch({
			type: 'todos/changeData',
			payload: {
				filter: data,
				businessType: 'all',
				pageNum: 1,
				loading: true
			}
		})
	}
	// 为搜索页面提供过滤条件
	getFilterCondition() {
		console.log('Marlin getFilterCondition', this.props.todos);
		window.upTabsData('todos:responseFilterCondition', 'publish', this.props.todos);
	}
}

function mapStateToProps(state) {
	let hash = window.location.hash.split('?')[1].split('&');
	let nowHash = {};
	_.each(hash, (i) => {
		let split = i.split('=');
		nowHash[split[0]] = split[1];
	})
	let nowData = state;
	state['todos'] = _.extend({}, state['todos'], {
		type: (state['todos']["businessType"] || nowHash['businessType'] || '1')
	});
	return state
}
export default connect(mapStateToProps)(Todos);