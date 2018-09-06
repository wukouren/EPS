import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect } from 'dva';
import {Link} from 'dva/router';
import { Router,hashHistory,browserHistory} from 'dva/router';
import {getDict} from '../../constants';

let todosMenu=getDict('todosMenu');
console.log(todosMenu,"todosMenu")
let allObj={id:"all",key:'全部',val:'全部',type:'all'};

if(todosMenu.length!=0){
	todosMenu.unshift(allObj);	
}else{
	todosMenu=[allObj];	
}


// _.map(todosMenu,function(i,index){
//    todosMenu[index+1]=i;
// })
// todosMenu[0]=allObj;
let eid=userinfo.employee_id;

class TodosType extends Component {
	render(){
		// console.log(this.props.todos.businessType,"businessType")
		let self = this;
		return (
			<div className="filter-type">
				{
					_.map(todosMenu,(i)=>{
						return <div className={"filter-type-i "+(i["val"].length>6?"filter-type-bi ":"")+(i['type']==self.props.businessType?'active':'')} onClick={(e)=>this.changeType(i['type'])}>{i["val"]}</div>
					})
				}
			</div>
		);
	}
	changeType(data){
		let dispatch = this.props.dispatch;
		// let status=this.props.todos.status;
		dispatch({
			type:'todos/changeData',
			payload:{
				loading:true,
				// noMore:false,
				// fix:false,
				pageNum:1,
				businessType:data,
				filter:{
		      number:'',
		      flowtype:['-1'],
		      startDate:null,
		      endDate:null,
		      moneyFrom:'',
		      moneyTo:'',
		    }
			}
		});
		/*console.log(data,"changeType")
		if(data=='all'){
		  dispatch({
				type:'todos/changeData',
				payload:{
					loading:true,
					noMore:false,
					fix:false,
					businessType:'all',
				}
			})
			 // this.typeAllOnChange(status);

		}else{
		 dispatch({
				type:'todos/changeData',
				payload:{
					loading:true,
					noMore:false,
					fix:false,
					businessType:data,

				}
			})
			// this.typeOnChange(status,data)
		}*/
	}
	/*typeAllOnChange(status){
		console.log('typeAllOnChange')

		let dispatch=this.props.dispatch;
			if(status==1){
				dispatch({
					type:'todos/fetchUnfinished',
					info:{
						status:status,
						businessType:'all',
					},
					payload:{
						param:{
						 eid:eid,
						 pager:{
						   pageNum:1,
						   pageSize:10
						 }
						}
					}
				})
			}else{
				dispatch({
					type:'todos/fetchTodo',
					info:{
						status:status,
						businessType:'all',
					},
					payload:{
						param:{
						 eid:eid,
						 pager:{
						   pageNum:1,
						   pageSize:10
						 }
						}
					}
				})
		}
	}*/
	/*typeOnChange(status,businessType){
		let dispatch=this.props.dispatch;
			if(status==1){
				dispatch({
					type:'todos/fetchUnfinished',
					info:{
						status:status,
						businessType:businessType,
					},
					payload:{
						param:{
						 eid:eid,
						 condition:{
						  businessType:businessType,
						 },
						 pager:{
						   pageNum:1,
						   pageSize:10
						 }
						}
					}
				})
			}else{
				dispatch({
					type:'todos/fetchTodo',
					info:{
						status:status,
						businessType:businessType,
					},
					payload:{
						param:{
						 eid:eid,
						 condition:{
						  businessType:businessType,
						 },
						 pager:{
						   pageNum:1,
						   pageSize:10
						 }
						}
					}
				})
			}
		}*/
	// }
}

export default connect((state)=>{return state})(TodosType);
