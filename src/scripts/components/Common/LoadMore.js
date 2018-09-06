/**
 * 加载组件
 *
 * 功能说明: 列表下拉加载更多
 * 使用说明：
 * 		(1) demo案例
 * 				let bindtoref = this.refs.listwrap;
 * 				let onEndReached = (pageno)=>{
 * 					// fetchdata by pageno
 * 					// set loading = true
 * 					// fetchdata end 
 * 					// set loading = false
 * 				}
 * 				<LoadMore pagesize=20 totalnum=200 pageno=0 loading={ false } bindtoref={ bindtoref } onEndReached={ ()=>{this.onEndReached(pageno)} }/>
 * 		(2) 参数说明
 * 			pagesize number  每页条数  可选
 * 			totalnum number  总条数   必填
 * 			pageno  number  当前页数  必填
 * 			loading  bool   加载状态  必填
 * 			bindtoref react component's ref  监听滚动事件的宿主 可选  默认为body scroll
 * 			onEndReached 回调函数  到达底部后回调事件，回调中可以根据pageno去加载下一页数据
 *
 */
import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';

class LoadMore extends Component{
	render(){
		let data = this.props.data;
		return (
			<div className={"loading-bounce-w "+(data['hide']?'hide':'')+' '+(data['fix']?'fix':'')}>
				<div className="loading-bounce-bg"></div>
				<div className="loading-gif">
					<img src="images/loading.gif" />
				</div>
			</div>);
	}
	componentDidMount(){
		let self = this;
		let data = this.props.data;
		console.log('Marlin LoadMore end',data)
		if(this.props['container']){
			console.log("container",this.props['container'])
			$("."+this.props['container']).on("scroll",function(evt){
				
				if(data['fix'] || data['loading']) return;

				console.log('Marlin fixed',data['fix'],data['loading']);
				
				let scrollTop = $('.'+self.props['container']).scrollTop();
				let clientHeight = $('.'+self.props['container']).height();
				let target = $('.loading-bounce-w');
				// let target = $('.todos-list-loadmore');
				if(target.length==0) return;

				if(clientHeight+80>=target.offset().top){
					console.log('Marlin Top',clientHeight,target.offset().top)
					self.props.onEndReached(evt);
					// $(this).unbind('scroll');
				}

			})
		}else{
		}
	}
};

LoadMore.propTypes = {
};

export default connect(function(state){return state})(LoadMore);