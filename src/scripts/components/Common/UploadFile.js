import React,{ Component } from 'react';
import { connect } from 'dva';

import { Upload,Button,Icon} from 'antd';

class UploadFile extends Component{
	render(){
		let self = this;
		let fileData = this.props.fileData;
		return (<div className={"upload-file "+(this.props.className || '')+' '+(this.props.specailClass || '')+' '+(this.props.fix==false?'none-fix':'')}>
				<div className="upload-file-w">
					<div className="upload-file-title">已选择<span>{fileData.length!=0?fileData.length:0}</span>个图片</div>
					<div className="upload-file-c hide">
						<div className="upload-file-add-i camera" onClick={(e)=>this.getCamera(e)}>
							<i className="icon-camera"></i>
							<span>相机</span>
						</div>
						<div className="upload-file-add-i picture" onClick={(e)=>this.getPicture(e)}>
							<i className="icon-picture"></i>
							<span>照片</span>
						</div>
					</div>
					<div className="upload-list ">
						<div className="upload-file-add" onClick={(e)=>this.getPicture(e)}>
							<i className="icon-add"></i>
						</div>
						<div className="upload-list-w">
							<div className="upload-list-c" style={{
								width:(fileData.length+2)*90/41.4+'rem'
							}}>
								{fileData.map(function(i,index){
									return <div className="upload-file-i">
										{
											(i['serverId']?<i className="icon-upload-close" onClick={(e)=>self.props.removePic(i["resid"])}></i>:'')
										}
										<img src={i['id']}/>
									</div>
								})}
							</div>
						</div>
					</div>
				</div>
		</div>)
	}
	getCamera(e){
		jw.choseFile({
			count: 1, // 默认9
			sizeType: ['original','compressed'],
			sourceType: ['album','camera']
		},{
			success: function (res) {
				// res 格式 [{id:'',type:'image/png'},{id:'',type:'image/jpg'}]
				var data = res.localFiles;
			}
		});

	}
	getPicture(e){
		let self = this;
		let fileData = this.props.fileData;
		if(fileData.length>=9){
			return 
		}
		jw.choseFile({
			count: 9, // 默认9
			sizeType: ['original', 'compressed'],
			sourceType: ['album', 'camera']
		},{
			success: function (res) {
				// res 格式 [{id:'',type:'image/png'},{id:'',type:'image/jpg'}]
				console.log(res,"res");
				var data = res.localFiles;
				_.each(data,function(i){
					i['resid'] = generateMixed(16);
					console.log(i,'这个里面有什么值呢');
					if(typeof(i['name'])=='undefined'){
						let name = i['id'].split('/');
						i['name'] = name[name.length-1];	
					}
					i['createTime'] = Date.parse(new Date())/1000;
				})
				self.props.addPic(data);
				_.each(data,function(i,index){
					jw.uploadFile({
	          code:window.code,
	          localId:i["id"], // 需要上传的图片的本地ID，由chooseImage接口获得
	          type:i["type"],
	          isShowProgressTips:1 // 默认为1，显示进度提示
	        },{
	          success: function (res) {
	          	// data['serverId'] = res['serverId'];
	          	self.props.changePic(i['resid'],res['serverId'])
	            // newOldData.push(res.serverId);
	          },
	          fail:function(){
	          	self.props.removePic(i['resid'])
	          }
	        });
				})
			}
		});
	}
	componentDidMount(){
		let self = this;
		let clientWidth = document.documentElement.clientWidth || document.body.clientWidth;
		let addWidth = $('.upload-file-add');
		PubSub.subscribe('file:choseFile',function(evt,data){
    	self.getPicture()
		});
	}
};

export default connect((state)=>{return state})(UploadFile);
