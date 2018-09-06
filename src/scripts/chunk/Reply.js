import React, { Component} from 'react';
import { connect } from 'dva';
import TodoItemView from './../components/Common/TodoItemView';
import LoadMore from './../components/Common/LoadMore';
import EpsDialog from './../components/Common/EpsDialog'
import Form from "jw-form/dist/mobile";
class Reply extends Component {
	FormChange(values,schema){
		console.log("values:",values,"FormChange:",schema);
	}
	changeData(){}
	render(){
		let dispatch = this.props.dispatch
		let data = this.props.reply;
		const formData={
			schema:[
				{
					name:'feedback',element:'Textarea',
					defaultValue:data['form']['feedback'] || '',
					attr:{
						placeholder:'请输入备注',
						autoHeight:true,
						count:200,
					},
					events:{
						onChange(){
							let height = $('.eps-dialog-w').height();
							$('.eps-dialog-w').css({
								marginTop:-(height/2)+'px'
							})
						}
					},
					rules:[]
				}
			],
			buttons:false,
			changeData:this.changeData.bind(this)
		}
		let EpsDialogData = {
			title:'请输入备注',
			buttonIconClass:'icon-check',
			buttonVal:'确认',
			fix:true,
			show:data['showForm']
		}

		let EpsDialogComponent = <div className="appraisal-form">
			<Form ref='form' formData={formData} onChange={(values,schema)=>this.FormChange(values,schema)}/>
		</div>;
		return (
			<div className="root-container">
				<div className="root-container-w">
					<header className="header" ref="header">
						<div className="header-bg"></div>
						<div className="header-bg-2"></div>
						<div className="header-c add-margin">
							<div className="user-card">
								<div className="user-card-c">
									<div className="user-card-avatar">
										<img src="http://img4.imgtn.bdimg.com/it/u=2003988139,3010807873&fm=26&gp=0.jpg" alt=""/>
									</div>
									<div className="user-card-info">
										<div className="user-card-info-i">
											<span className="user-card-label">创建人</span>
											<span className="user-card-val">李静</span>
										</div>
										<div className="user-card-info-i">
											<span className="user-card-label">报修类型</span>
											<span className="user-card-val">预约</span>
											<span className="user-card-time">2017.08.01  09:30</span>
										</div>
										<div className="user-card-info-i">
											<span className="user-card-label">报修餐厅</span>
											<span className="user-card-val">虹桥700号店</span>
										</div>
										<div className="user-card-info-i">
											<span className="user-card-label">维修商</span>
											<span className="user-card-val">维修商A</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</header>
					<sesstion className="main">
						<div className="main-c" style={{
							height:data['containerHeight'] || 'auto'
						}}>
							<TodoItemView ref="xxxxxxx"></TodoItemView>
							<TodoItemView></TodoItemView>
							<TodoItemView></TodoItemView>
							<TodoItemView></TodoItemView>
							<TodoItemView></TodoItemView>
							<TodoItemView></TodoItemView>
							<TodoItemView></TodoItemView>
							<TodoItemView></TodoItemView>
							<TodoItemView></TodoItemView>
							<TodoItemView></TodoItemView>
							<LoadMore container='main-c' data={{
								loading:data['loading'],
								fix:data['fix']
							}} onEndReached={(e)=>{this.onEndReached(e)} }/>
						</div>
					</sesstion>
					<EpsDialog ref="EpsDialog" data={EpsDialogData} Component={EpsDialogComponent} close={(e)=>this.closeDialog(e)} btnClick={(e)=>this.EpsDialogClick(e)}></EpsDialog>
					<footer className="footer">
						<div className="log-btn" onClick={(e)=>this.openWebView('/log')}>
							<i className="icon-log"></i>
							<span>流程日志</span>
						</div>
						<div className="todo-info-status bg-yellow" onClick={(e)=>this.ShowForm(e)}>
							<i className="icon-ok-dark"></i>
							<div className="todo-status-c">确认响应</div>
						</div>
					</footer>
				</div>
			</div>
		);
	}
	closeDialog(e){
	}
	EpsDialogClick(e,component){
		let dispatch = this.props.dispatch;
		this.refs.form.validateFields((errors, values) => {
			console.log(errors,values,'zzzzzzz');
			if (!!errors) {
				console.log('Errors in form!!!');
				return;
			}
			dispatch({
				type:'reply/changeData',
				data:{
					form:values,
					showForm:false
				}
			})
		});
	}
	onEndReached(){}
	openWebView(data){
		var url = EpsWebRoot+'/#'+data
		jw.pushWebView(url);
	}
	ShowForm(){
		let dispatch = this.props.dispatch;
		dispatch({
			type:'reply/changeData',
			data:{
				showForm:true
			}
		})
	}
	// 组件加载完毕
	componentDidMount(){
		let self = this;
		let dispatch = this.props.dispatch;
		NProgress.done();
		window.onJwNavBtnClick = function( type ){
			if(type["type"]=='4'){
				// jw.chartInit({
				// 	id:_objchat.objchat_oid,
				// 	name:$(".name").val().toString(),
				// 	users:$(".users").val().toString(),
				// 	type:$(".type").val().toString()
				// },{
				// 	success:function(res){
				// 		$('.chartInit-data').html('');
				// 		for(var i in res){
				// 			$('.chartInit-data').append(i+'=========='+res[i])
				// 		}
				// 	}
				// })
			}
		}
		setTimeout(function(){
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			let header = $('.header').height() || 0;
			let footer = $('.footer').height() || 0;
			$('.main-c').css({height:clientHeight-header-footer+'px'});
			dispatch({
				type:'reply/changeData',
				data:{
					loading:false,
					fix:false,
				}
			})
		},0)
	}
}
export default connect((state)=>{return state})(Reply);


