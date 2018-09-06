
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import request from '../../utils/EpsRequest';
import { orderStatus } from '../../constants';
import EmptyView from '../../components/Common/EmptyView';
import {getUsers} from '../../constants';
import UploadFile from '../../components/Common/UploadFile';
import { ConfirmBase,AlertBase} from '../../components/Common/EpsModal';

let fileIcon = {
	gif:'',
	zip:'',
	png:'',
	doc:'',
	pdf:'',
	xlsx:''
}
class File extends Component{
	constructor(props) {
		let store = new Store('Joywok:cache:tabs:file');
		var cache = store.find({id:'tab:cache'}) || {};
		if(cache['id']){
			props['file']['uploadPhase'] = cache["data"]['uploadPhaseName'] || '';
		}
		super(props);
	}
	render(){
		let self = this;
		let data = this.props.file;
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
						<div className="main-c clear-padding" style={{
							overflowY:'visible'
						}}>
							{
								self.combineContent()
							}
						</div>
						<UploadFile
							ref="upload"
							fix={true}
							specailClass={data['file'].length!=0?'':'hide'}
							fileData={data["file"]}
							addPic={(e)=>this.addPic(e)}
							removePic={(e)=>this.removePic(e)}
							changePic={(index,id)=>this.changePic(index,id)}>
						</UploadFile>
						{
							typeof(data['history'])!='undefined'?'':(data['file'].length==0?<div className="file-upload-btn" onClick={(e)=>this.chosePic(e)}>
								<i className="icon-file-add"></i>
								<span>上传附件</span>
							</div>:<div className="eps-footer">
								<div className="eps-btn-wrap">
									<div className="eps-btn eps-btn-default-small" onClick={(e)=> this.cacelHandler() }>取消</div>
									<div className="eps-btn eps-btn-warning-large" onClick={()=> this.createHandler() }>提交</div>
								</div>
							</div>)
						}
					</sesstion>
				</div>
			</div>
		);
	}
	combineContent(){
		let self = this;
		let data = this.props.file;
		if(data['loading']['loading']){
			return <div className="loading-bounce-w fix">
							<div className="loading-bounce-bg"></div>
							<div className="loading-gif">
								<img src="images/loading.gif" />
							</div>
						</div>
		}else{
			let list = data['fileList'];
			if(list && list.length>0){
				return (
					<div className="file-list">
					{
						_.map(list,function(i){
							let fileName = i['fileType'].toLowerCase();
							console.log(i,fileName,'这个fileType是什么呢');
							// console.log(i,'file-info', $.inArray(fileName,['jpg','bmp','png','gif'] )>-1);
							let img = '';
							if($.inArray(fileName,['jpg','bmp','png','gif'] )>-1){
								img = i['url']
							}else{
								img = fileName.toString().getFileIcon();
							}
							return <div className="file-list-i" onClick={(e)=>self.openFile(e,i)}>
								<div className="file-list-i-c">
									<div className="file-list-i-pic">
										<img src={img} />
									</div>
									{
										i['allowEdit']=='0' && typeof(data['history'])=='undefined'?<div className="file-list-i-remove icon-file-remove" onClick={(e)=>self.removeServerPic(e,i)}></div>:''
									}
									<div className="file-list-i-info">
										<div className="file-list-i-name ellipsis">{i['name']}</div>
										<div className="file-list-i-val">{i['createByName']}{ i["uploadPhase"]&&i["uploadPhase"].length!=0?' 上传自: '+i["uploadPhase"]:' 上传' }</div>
										<div className="file-list-i-time">{i['createDate']}</div>
									</div>
								</div>
							</div>
						})
					}
					</div>
		  	);	
			}else{
				return (<EmptyView/>)
			}	
		}
	}
	chosePic(e){
		console.log('点击了么',this.refs,this.refs.upload);
		PubSub.publish('file:choseFile');
	}
	//添加图片
  addPic(datas){
    let dispatch = this.props.dispatch;
    let data = this.props.file;
    // let record = data['record'];
    // record['file'] = record['file'].concat(datas);
    dispatch({
      type:'file/changeData',
      payload:{
        file:data['file'].concat(datas)
      }
    })
  }
  removePic(resid){
    let dispatch = this.props.dispatch;
    let data = this.props.file;
    let record = data['file'];
    let nowData = []
    _.each(record,function(i,index){
      if(resid != i["resid"]){
        nowData.push(i)
      }
    })
    record = nowData;
    dispatch({
      type:'file/changeData',
      payload:{
        file:record
      }
    })
  }
  changePic(resid,id){
    let dispatch = this.props.dispatch;
    let data = this.props.file;
    let record = data['file'];
    let nowData = []
    _.each(record,function(i,index){
      if(resid == i['resid']){
        i['serverId'] = id
        i['url'] = window.jwurl+'/file/download?code='+window.code+'&file_id='+id;
      }
      nowData.push(i);
    })
    record = nowData;
    dispatch({
      type:'file/changeData',
      payload:{
        file:record
      }
    })
  }
  cacelHandler(){
  	let dispatch = this.props.dispatch;
  	dispatch({
      type:'file/changeData',
      payload:{
        file:[]
      }
    })
	}
  createHandler(){
  	let dispatch = this.props.dispatch;
  	let datas = this.props.file;
  	let orderid = this.props.params.orderid.split("&")[0];
  	let filterFile = _.filter(datas['file'],function(i){
  		return i['serverId']
  	})
  	if(filterFile.length != datas['file'].length){
  		AlertBase({
				tip: '还要文件在上传！！',
				icon: 'icon-save-error',
				okBtn: {
					text: '知道了'
				},
				onOk: ()=>{
				}
			});
  		return 
  	}
  	let url = '/McdEpsApi/joywok/common/uploadFile';
  	let data = {
	    param: {
        eid:window.eid,
        condition: {
          orderNumber:orderid,
		      uploadPhase: datas['uploadPhase']
        },
        record:{
        	file:datas['file']	
        }
      }
		}
		let saving = AlertBase({
			tip: '正在上传…',
			icon: 'icon-saving',
			okBtn: {
				text: '上传中...'
			},
			onOk: ()=>{
				
			}
		});
  	request(url,{
    	method:'POST',
    	body:JSON.stringify(data)
    }).then(function(resp){
    	saving.close();
    	if(resp['data']['success']==false ){
    		if(typeof(callback)!='undefined'){
          callback(true);
        }
    	}else{
    		console.log(resp['data'],'返回的数据');
    		window.upTabsData('changefilenum','publish',{
    			length:resp['data']['body']['fileList'].length
    		});
    		dispatch({
    			type:'',
    			payload:{
    				fileList:resp['data']['body']['fileList'],
    				file:[]
    			}
    		})
    		AlertBase({
					tip: '已成功提交',
					icon: 'icon-save-success',
					onOk: ()=>{
						// jw.closeWebView()
					}
				});
    	}
    })
  }
  removeServerPic(e,removeData){
  	console.log(removeData,'要删除的数据');
  	e.stopPropagation();
  	let datas = this.props.file;
  	let dispatch = this.props.dispatch;
  	let orderid = this.props.params.orderid.split("&")[0];
  	let url = '/McdEpsApi/joywok/common/delFile';
  	ConfirmBase({
      tip: '确认要删除此文件？',
      icon: 'icon-repair-alert',
      onOk: ()=>{  // 点击确认回调
      	let saving = AlertBase({
					tip: '正在删除中…',
					icon: 'icon-saving',
					okBtn: {
						text: '提交中...'
					},
					onOk: ()=>{
						
					}
				});

				let data = {
			    param: {
		        eid:window.eid,
		        condition: {
		          orderNumber:orderid,
		          uploadPhase: datas['uploadPhase']
		        },
		        record:{
		        	id:removeData['id']
		        }
		      }
				}
		  	request(url,{
		    	method:'POST',
		    	body:JSON.stringify(data)
		    }).then(function(resp){
		    	saving.close();
		    	console.log(resp,'删除数据返回了什么');
		    	if(resp['data']['success']==false ){
		    		if(typeof(callback)!='undefined'){
		          callback(true);
		        }
		    	}else{
		    		AlertBase({
							tip: '已删除',
							icon: 'icon-save-success',
							onOk: ()=>{
							}
						});
				    let record = datas['fileList'];
				    let nowData = []
				    _.each(record,function(i,index){
				      if(removeData['id'] != i["id"]){
				        nowData.push(i)
				      }
				    })
				    console.log(nowData,'这个里面有啥啊')
				    window.upTabsData('changefilenum','publish',{
				    	length:nowData.length
				    });
				    dispatch({
				      type:'file/changeData',
				      payload:{
				        fileList:nowData
				      }
				    })
		    	}
		   //
		    })
      }
    });

  	return 
  }
  openFile(e,data){
  	let fileType = data['fileType'].toLowerCase();
  	if( $.inArray(fileType,['jpg','bmp','png','gif'] )>-1){
  		jw.previewImages({
	      current: data['url'], // 当前显示图片的http链接
	      urls:[data['url']] // 需要预览的图片http链接列表
	    });
  	}else if($.inArray(fileType,['doc','docx'] )>-1){
  		jw.previewDoc({
       url:data['url'],
       name:'附件',
       type:'application/msword'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
	    },{
	      success:function(){
	      }
	    })
  	}else if($.inArray(fileType,['xls','xlsx','2'] )>-1){
  		jw.previewDoc({
       url:data['url'],
       name:'附件',
       type:'application/vnd.ms-excel'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
	    },{
	      success:function(){
	      }
	    })
  	}else if($.inArray(fileType,['ppt','pptx','pps','ppsx'] )>-1){
  		jw.previewDoc({
       url:data['url'],
       name:'附件',
       type:'application/vnd.ms-powerpoint'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
	    },{
	      success:function(){
	      }
	    })
  	}else if($.inArray(fileType,['pdf','1'] )>-1){
  		jw.previewDoc({
       url:data['url'],
       name:'附件',
       type:'application/pdf'// application/msword、application/vnd.ms-excel、application/vnd.ms-powerpoint、application/pdf
	    },{
	      success:function(){
	      }
	    })
  	}else{
  		AlertBase({
				tip: '该文件不可预览，请在PC 端打开',
				icon: '',
				onOk: ()=>{}
			});
  	}
  }
	// 组件加载完毕
	componentDidMount(){
		console.log(this.props.params.orderid,'id是什么呢');
		let dispatch = this.props.dispatch;
		let orderid = this.props.params.orderid.split("&")[0];
		dispatch({ type: 'file/fetch', payload:orderid,dispatch:dispatch});
		this.setHeight();
		setTimeout(function(){
			// $('.upload-file-add-i.picture').click();
			// $('.upload-file-add').click();
		},1000)
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
			let fileBtn = $('.file-upload-btn').height()||0;
			let upload = $('.upload-file').height() ||0;
			let footer = $('.eps-footer').height() || 0;
			// let title = $(".todo-log-list-t").height()||0
			$('.file-list').css({height:clientHeight-header-fileBtn-upload-footer+'px'});
		},0)
	}
}

function mapStateToProps(state) {
	return state
}
export default connect(mapStateToProps)(File);