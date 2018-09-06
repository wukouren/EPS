/**
 * 工程明细
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';


import LoadMore from './../../components/Common/LoadMore';

import UserCard from './../../components/Common/UserCardToProject';
import { ProjectCardInfo } from './../../components/Common/ProjectCard';

class ProjectInfo extends Component {
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:log');
		var cache = store.find({id:'tab:cache'}) || {};
		if(cache['id']){
			props['projectinfo']['parentData'] = cache["data"];
		}
		super(props);
	}
	render(){
		let view = this._init_view();
		return (
			<div className="root-container">
				{view}
			</div>
		);
	}
	_init_view(){
		let view = '';
		let data = this.props.projectinfo;
		view = <div className="root-container-w">
			<header className="header" ref="header">
				<div className="header-bg-specail">
					<div className="header-bg"></div>
					<div className="header-bg-2"></div>
				</div>
				<div className="header-c">
				</div>
			</header>
			<sesstion className="main">
				<div className="main-c" style={{
					paddingBottom:'20px'
				}}>
					{
						_.map(data['list'],function(i,index){
							let incidentalList = _.findWhere(data['incidentalList'],{deviceNumber:i['deviceNumber']});
							return <ProjectCardInfo itemdata={_.extend(i,{
								name:i["deviceName"]
							})} incidentalList={incidentalList} showAllData={false} index={index+1} allIndex={data['incidentalList'].length}></ProjectCardInfo>
						})
					}
					<LoadMore container='main-c' data={data['loading']} onEndReached={(e)=>{this.onEndReached(e)} }/>
				</div>
			</sesstion>
		</div>
		return view
	}
	openWebView(data){
		var url = EpsWebRoot+'/#'+data
		jw.pushWebView(url);
	}
	componentDidMount(){
		let self = this;
		let dispatch = this.props.dispatch;
		let modelData = this.props.projectinfo;
		let orderid = this.props.params.orderid.split("&")[0];
		this.setHeight();
		dispatch({ type: 'projectinfo/fetch', payload:orderid});
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
			$('.main-c').css({height:clientHeight-header+'px'});
		},0)
	}
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(ProjectInfo);