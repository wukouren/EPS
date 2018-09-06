/**
 * 对象搜索列表
 *
 * 使用场景： 
 * 	1. 搜索设备	（多选）
 * 	2. 搜索配件 （多选）
 * 	3. 搜索餐厅/搜索供应商 （单选）
 * 	
 * 可设置参数:
 * 	searchType: 'device', //搜索类别 值可为 device(设备) parts(配件) project(工程) it(IT) itparts(IT设备配件) store(餐厅 门店),不同的类型对应不同的卡片
 *  ownerInfo: { id: '设备id', name: '新地机', label: '设备名称' } // 添加配件时，上方会显示设备名称的 
 *  onAdd: (objects)=>{ // 添加按钮的回调事件,回调的同时将所选对象集传递出去 这个废弃了 选下面的方式
 *  	
 *  }
 *
  搜索组件中已经保存了选择信息： 
  window.upTabsData('get:child:select:'+this.props.searchType,'publish',{
        data:data
      })
  使用时，在需要的页面这样获取：get:child:select:TYPE  
  TYPE可以为餐厅（store）,工程（project）,设备（device）,设备配件（parts）,IT设备（it），IT设备配件（itparts）
  PubSub.subscribe('get:child:select:it',function(evt,data){
        console.log("subscribe('get:child:select:it':",data['data'])
  });
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { SEARCH_CONFIG, PAGE_SIZE } from '../../constants';
import { DeviceCardSelect } from './DeviceCard';
import { DevicepartsCardSelect } from './DevicepartsCard';
import { ProjectCardSelect } from './ProjectCard';
import { ItCardSelect } from './ItCard';
import { ItpartsCardSelect } from './ItpartsCard';
import { StoreCardSelect } from './StoreCard';
import { RepairStoreCardSelect } from './RepairStoreCard';
import { ScrappedCardSelect } from './ScrappedCard';
import EmptyWithArrow from './EmptyWithArrow';
import EmptyView from './EmptyView';
import LoadMore from './LoadMore';
import { AlertBase, AlertInfoBase} from './EpsModal';

class ObjectSelectList extends Component {
	constructor(props) {
		super(props); 
		this.searchTime = null;
    this.state = {
      selectedWrapWidth: '2000px',
      seletedListHeight: '400px'
    }
		this.goSearch = this.goSearch.bind(this);
		this.combineSearchBox = this.combineSearchBox.bind(this);
		this.combineSearchList = this.combineSearchList.bind(this);
    this.selectHandler = this.selectHandler.bind(this);
    this.headerFixedHandle = this.headerFixedHandle.bind(this);
    this.cancelSelCurObject = this.cancelSelCurObject.bind(this);
    this.addHandler = this.addHandler.bind(this);
    this.onEndReached = this.onEndReached.bind(this);
    // 如果是搜索设备配件或搜索IT设备配件，进入页面后可把数据给带上
    // if(this.props.searchType == 'parts' || this.props.searchType == 'itparts'){
    //   this.searchKey = '';
    //   this.goSearch('');
    // }  
    // 改为所有的进来都默认加载数据
    let self = this;
    this.searchKey = '';
    console.log(props,'这个里面有啥呢');
    if(typeof(props['noFirstFetch']) !='undefined'){

    }else{
      self.goSearch('');  
    }
    
    // setTimeout(function(){
    
    // },500)/
  }
	render(){
		this.configData = SEARCH_CONFIG[this.props.searchType];
		let data = this.props.data;
		let searchBox, searchList, seletedList;
    // 搜索框
		searchBox = this.combineSearchBox();
    // 搜索list
		searchList = this.combineSearchList();
    // 已选list展示
		seletedList = (this.configData.checkMode=='multiple' && this.props.list.length>0) ? this.combineSelectedList() : '';
    this.curPageNum = data.pager.pageNum;
		setTimeout(()=>this.setWrapHeight(),200);
		return (
			<div className="eps-object-select">
				<div className="eps-box-wrap">
					{ searchBox }
				</div>
				<div className="eps-list-card-wrap eps-search-list" style={{
					maxHheight:this.state['containerHeight']
				}}>
					{ searchList }
				</div>
				{ seletedList }
			</div>
		);
    // return (<div className="">dsadasdasdasdasdasdasdasdasd</div>)
	}
  // 查询检索
  goSearch(e,nextPageNum){
		let self = this;
		let dispatch = this.props.dispatch;
    let value = (e ? (typeof(e.target.value)!='undefined' ? e.target.value : this.searchKey) : this.searchKey);
    nextPageNum = nextPageNum ? nextPageNum : 1;
    this.searchKey = value;
    // 避免重复请求，当搜索字段一样，并且请求页数相同时，不发起请求
    if(this.searchKey == this.lastSearchKey && nextPageNum == this.lastPageNum) return;
    console.log('goSearch=================================:',e)
    console.log('goSearch=searchKey:',this.searchKey,'value:',value)
    this.lastSearchKey = this.searchKey;
    this.lastPageNum = nextPageNum;
		clearTimeout(this.searchTime);
    let ownerInfo = this.props.ownerInfo;
    // 发起请求
  	this.searchTime = setTimeout(function(){
      if(self.props.action){
        dispatch({
          type: self.props.action,
          payload: {
            condition:{
              keys:value,
              vendorNumber: userinfo.vendorNumber
            },
            pager: {
              pageNum: nextPageNum,
              pageSize: PAGE_SIZE
            }
          }
        })
      }else{
        let typeAction;
        switch( self.props.searchType ){
          // 搜索设备 组合搜索（可设备名称＋空格＋供应商名称来搜索）
          case 'device':
            let arrs = value.split(' ');
            dispatch({
              type:'objectselect/searchEquipmentList',
              payload: {
                condition:{
                  keys:arrs[0],
                  vendorNumber: userinfo.vendorNumber ? userinfo.vendorNumber : '',// 搜索设备时 如果已经有一条设备，就需将该设备的供应商编号传过来，以便只查询该供应商下的设备信息
                  vendorName: arrs[1] ? arrs[1] : ''
                },
                pager: {
                  pageNum: nextPageNum,
                  pageSize: PAGE_SIZE
                }
              }
            })
            break;
          // 搜索设备配件
          case 'parts':
            dispatch({
              type:'objectselect/getFittingList',
              payload: {
                condition:{
                  keys: value,
                  // 设备编号
                  deviceNumber: ownerInfo.deviceNumber,
                  // 维修商编号
                  vendorNumber: ownerInfo.vendorNumber
                },
                pager: {
                  pageNum: nextPageNum,
                  pageSize: PAGE_SIZE
                }
              }
            })
            break;
          // 搜索工程
          case 'project':
            dispatch({
              type:'objectselect/list',
              payload: {
                condition:{
                  keys:value
                },
                pager: {
                  pageNum: nextPageNum,
                  pageSize: PAGE_SIZE
                }
              }
            })
            break;
          // 搜索IT设备
          case 'it':
            dispatch({
              type:'objectselect/searchITEquipment',
              payload: {
                condition:{
                  keys:value,
                  // 供应商编号
                  vendorNumber: userinfo.vendorNumber
                },
                pager: {
                  pageNum: nextPageNum,
                  pageSize: PAGE_SIZE
                }
              }
            })
            break;
          // 搜索IT设备配件
          case 'itparts':
            dispatch({
              type:'objectselect/searchITFitting',
              payload: {
                condition:{
                  keys:value,
                  // 型号代码
                  typeCode: ownerInfo.typeCode
                },
                pager: {
                  pageNum: nextPageNum,
                  pageSize: PAGE_SIZE
                }
              }
            })
            break;
          // 搜索餐厅
          case 'store':
            dispatch({
              type: 'objectselect/searchStoreList',
              payload: {
                condition:{
                  keys:value,
                  // 供应商ID
                  vendorNumber: userinfo.vendorNumber
                },
                pager: {
                  pageNum: nextPageNum,
                  pageSize: PAGE_SIZE
                }
              }
            })
            break;
          // 搜索供应商
          case 'repairstore':
            dispatch({
              type: 'objectselect/searchMaintainerList',
              payload: {
                condition:{
                  keys:value,
                },
                pager: {
                  pageNum: nextPageNum,
                  pageSize: PAGE_SIZE
                }
              }
            })
            break;
          // 默认搜索工程
          case 'scrapped':
            let data = {
            }
            if(self.props["parentData"]['scrappType'] == 'repair'){
              data = {
                orderNumber: self.props["parentData"]["orderNumber"],
                storeNumber:self.props["parentData"]["storeNumber"],
                deviceNumber:self.props["parentData"]["deviceNumber"],
                deviceName:self.props["parentData"]["deviceName"],
                deviceSerialNumber:self.props["parentData"]["deviceSerialNumber"],
                allPartRepairMoney:self.props['parentData']['allPartRepairMoney'],
                faCategory:self.props['parentData']['faCategory'],
                assetDesc:value
              }
            }else{
              data = {
                orderNumber: self.props["parentData"]["orderNumber"],
                storeNumber:self.props["parentData"]["storeNumber"],
                deviceNumber:self.props["parentData"]["deviceNumber"],
                deviceName:self.props["parentData"]["deviceName"],
                faCategory:self.props['parentData']['faCategory'],
                assetDesc:value
              }
            }
            dispatch({
              type: 'objectselect/searchScrappedList',
              payload: {
                condition: data,
                pager: {
                  pageNum: nextPageNum,
                  pageSize: PAGE_SIZE
                }
              }
            })
            break;
          default:
            dispatch({
              type:'objectselect/list',
              payload: {
                condition:{
                  deviceName:value
                }
              }
            })
            break;
        }
      }
		},500)
  }
  // 确定添加
  addHandler(){
    console.log('addHandler:',this.props.data['selectObjects'],'get:child:select:'+this.props.searchType)
    let data = this.props.data['selectObjects'];
    if(data.length == 0){
      AlertInfoBase({
          text: this.configData.nonChooseTip ? this.configData.nonChooseTip : '您还没有选择任何对象',
      });
      return;
    }
    //   console.log(data,'选中的列表都有啥呢');
		// let hasId = {};
		// let hasSame = true;
		// _.each(data,function(item,index){
		// 	if(index!=0){
		// 		if(hasId[item['epsid']]){
		// 		}else{
		// 			hasSame = false
		// 		}
		// 	}else{
		// 		hasId[item['epsid']] = true
		// 	}
		// })
		// if(hasSame == false){
		// 	AlertBase({
		// 		tip: '维修商不同，请选择相同维修商！',
		// 		icon: 'icon-save-error',
		// 		onOk: ()=>{}
		// 	});
		// 	return
		// }
    window.upTabsData('get:child:select:'+this.props.searchType,'publish',{
      data:data
    })
    typeof(this.props.onAdd) == 'function' ? this.props.onAdd(this.props.selectObjects) : '';
    jw.closeWebView();
  }
  // 更改inputloadingicon标识为true
  inputchanged(){
    let dispatch = this.props.dispatch;
    let data = _.clone(this.props.data);
    // console.log('inputloadingicon=====:',data)
    dispatch({
      type: 'objectselect/changeData',
      payload: {
        inputloadingicon: true
      }
    })
  }
  // 组织search box框
  combineSearchBox(){
    let self = this;
  	let searchBox;
    let data = this.props.objectselect;
    let fetching = '';
    // console.log('objectselect:',data,this.props.data,'loading:',this.props.data['loading'],'inputloadingicon:',this.props.data['inputloadingicon'])
    if(this.props.data['loading'] && this.props.data['inputloadingicon']) fetching = (<div className="fetch-ing moveing"><div className="bounce1"></div><div className="bounce2"></div><div className="bounce3"></div></div>);
  	// console.log('fetching=======:============',fetching)
    let assistTip = '';
    if(this.configData.assistTip){
      assistTip = (<div className="eps-search-assistTip">{ this.configData.assistTip }</div>);
    }
    if(this.props.ownerInfo){
  		let ownerInfo = this.props.ownerInfo;
  		searchBox = (
  			<div className="eps-box eps-box-with-owner">
  				<div className="eps-box-owner">
  					<label>{ ownerInfo.label }</label><font>{ ownerInfo.deviceName }</font>
					</div>
					<div className="eps-form-inline">
						<div className="eps-search-label"><font>{ this.configData.title }</font><i className="icon-search-help"></i></div>
						<div className="eps-search-val">
							<i className="icon-search"></i>
							<div className="search-input-w">
								<input name="search-input" type="text" value={data && data["condition"]["deviceName"]} placeholder={ this.configData.placeholder } onChange={ (e)=>{ self.inputchanged();  self.goSearch(e) }  } />
                { fetching }
              </div>
						</div>
					</div>
          { assistTip }
  			</div>
  		);
  	}else{
  		searchBox = (
  			<div className="eps-box">
					<div className="eps-search-form">
						<div className="eps-search-label"><font>{ this.configData.title }</font><i className="icon-search-help"></i></div>
						<div className="eps-search-val">
							<i className="icon-search"></i>
							<div className="search-input-w">
								<input name="search-input" type="text" placeholder={ this.configData.placeholder } onChange={ (e)=>{ self.inputchanged(); self.goSearch(e) } } />
                { fetching }
              </div>
						</div>
					</div>
          { assistTip }
  			</div>
  		);
  	}
  	return searchBox;
  }
  selectHandler(id,params){
    console.log('selectHandler:===',id,params)
    let self = this;
    if(this.configData.checkMode=='multiple'){
      this.setState({'selectedWrapWidth': '2000px'});
      this.props.dispatch({
        type: 'objectselect/CHANGE_CHECKED_STATUS',
        payload: {
          id: id,
          checked: params.checked
        }
      })
      setTimeout(()=>{
        self.calculateSeletedObjsWidth();
      },200)
    }else{
      this.props.dispatch({
        type: 'objectselect/CHANGE_CHECKED_STATUS',
        payload: {
          id: id,
          checked: true
        }
      })
      setTimeout(()=>{
        self.addHandler();
      })
    }
  }
  // 组织list
  combineSearchList(){
    let self = this;
  	const list = this.props.list;
		let data = this.props.data;
    console.log('combineSearchListXXXXXX:',this.props,list,data['loading'],parseInt(data['pager']["pageNum"]))
    if(list == 'firstenter'){
      // 因为默认所有的搜索都要把第一页数据带上,所以把空提示去掉
      // if(this.configData.emptyIcon){
      //   return  (<EmptyWithArrow icon={ this.configData.emptyIcon }/>);
      // }else{
        if(data['loading']){
          return (<div className="loading-bounce-w fix">
            <div className="loading-bounce-bg"></div>
            <div className="loading-gif">
              <img src="images/loading.gif" />
            </div>
          </div>);  
        }else{
          return (<div></div>);
        }
      // }
    }else if(list && typeof(list)!= 'string' && list.length>0){
			let listComponents = [];
      // alert('dsadasdasdasdasdas');
      switch( this.props.searchType ){
        // 搜索设备
        case 'device':
					listComponents = _.map(list,(item) =>{
						return <DeviceCardSelect itemdata={ item } selectHandler={ this.selectHandler }/>
					})
          break;
        // 搜索设备配件
        case 'parts':
					listComponents = _.map(list,(item) =>{
						return <DevicepartsCardSelect itemdata={ item } selectHandler={ this.selectHandler }/>
					})
          break;
        // 搜索IT设备
        case 'it':
          listComponents = _.map(list,(item) =>{
            return <ItCardSelect itemdata={ item } selectHandler={ this.selectHandler }/>
          })
          break;
        // 搜索IT设备配件
        case 'itparts':
          listComponents = _.map(list,(item) =>{
            return <ItpartsCardSelect itemdata={ item } selectHandler={ this.selectHandler }/>
          })
          break;
        // 搜索工程
        case 'project':
					listComponents = _.map(list,(item) =>{
						return <ProjectCardSelect itemdata={ item } selectHandler={ this.selectHandler }/>
					})
          break;
        // 搜索餐厅
        case 'store':
					listComponents = _.map(list,(item) =>{
						return <StoreCardSelect itemdata={ item } selectHandler={ this.selectHandler }/>
					})
          break;
        // 搜索供应商
        case 'repairstore':
          listComponents = _.map(list,(item) =>{
            return <RepairStoreCardSelect itemdata={ item } selectHandler={ this.selectHandler }/>
          })
          break;
        case 'scrapped':
          // listComponents =  [];
          listComponents = _.map(list,(item) =>{
            return <ScrappedCardSelect scrappType={data["parentData"]['scrappType']} itemdata={ item } selectHandler={ this.selectHandler }/>
          })
          break;
        // 默认显示搜索设备
        default:
					listComponents = _.map(list,(item) =>{
						return <DeviceCardSelect itemdata={ item } selectHandler={ this.selectHandler }/>
					})
          break;
      }
			let loadMoreHtml="";
      if(data['total'] < PAGE_SIZE){
      }else{
				// console.log('loadmorehtml:==',data,PAGE_SIZE,data['pager']["pageNum"]*parseInt(PAGE_SIZE),data['total'])
        // if(data['pager']["pageNum"]*PAGE_SIZE>=data['total']){
  			if(list.length>=data['total']){
  				loadMoreHtml=<div className="todos-nomore">没有更多了！</div>
  			}else{
  				loadMoreHtml=	<LoadMore container='eps-search-list' data={{
            loading:data['loading'],
  					hide:data['hide'],
  					fix:data['fix']
  				}} onEndReached={(e)=>{self.onEndReached(e)} } />
  			}
      }
      setTimeout(()=>{
        $(ReactDOM.findDOMNode(self.refs.refListWrap)).removeClass('zoomIn')
      },900);
			return (
				<div className="eps-device-list animated zoomIn" ref="refListWrap">
					{listComponents}
					{loadMoreHtml}
				</div>
			);
		}else{
			return  this.configData.emptyViewTip ? (<EmptyView tip={ this.configData.emptyViewTip }/>) : (<div>没有找到相关内容</div>);
		}
  }
  // header fixed开关
  headerFixedHandle(){
    $(document).on('scroll',(e)=>{
      if($(document).scrollTop() >= this.headerOffset.top){
        $('.eps-box-wrap').addClass('fixed');
      }else{
        if($(document).scrollTop() <= (this.headerOffset.top+50)){
          $('.eps-box-wrap').removeClass('fixed');
        }
      }
    })
  }
  // 取消选择当前对象
  cancelSelCurObject(item){
    this.props.dispatch({
      type: 'objectselect/CHANGE_CHECKED_STATUS',
      payload: {
        id: item.id,
        checked: false
      }
    });
  }
  // 已选择list
  combineSelectedList(){
    let self = this;
  	let data = this.props.selectObjects;
    console.log('已选择的list里面有什么数据呢',this.props.selectObjects);
    return (<div className="eps-seleted-list-wrap">
        <div className="eps-seleted-list">
          <div className="eps-seleted-list-real" style={{ width: this.state.selectedWrapWidth }}>
          { 
            this.props.selectObjects.map( (item) =>{
              console.log('item===',item,self.props.searchType)
              // 已选list显示到页面底部，需做适配
              let objname = '';
              switch(self.props.searchType){
                case 'device':
                  objname = item["deviceName"];
                  break;
                case 'project':
                  objname = item["projectName"];
                  break;
                case 'store':
                  objname = item["longSiteDesc"]
                  break;
                case 'it':
                  objname = item["deviceName"];
                  break;
                case 'parts':
                  objname = item["deviceName"];
                  break;
                case 'itparts':
                  objname = item["name"];
                  break;
                case 'scrapped':
                  objname =  item['assetDesc'] || item["deviceName"];
                  break;
                default:
                  objname = '待配置哦'
                  break;
              } 
              console.log('dksjdksjs===:',objname)
              return (
                <div className="eps-search-item"><font>{ objname }</font><i className="icon-selobj-delete" onClick={ (e)=>{ this.cancelSelCurObject(item) } }></i></div>
                )
            } )
          }
          </div>
        </div>
        <div className="eps-btn eps-btn-warning-xsmall" onClick={ this.addHandler }>添加({ this.props.selectObjects.length })</div>
      </div>);
  }
  // 组件加载完毕
  componentDidMount(){
    let self = this;
    this.selectedWrapWidth = $('.eps-seleted-list').width();
    // 计算已选对象的宽度
    this.calculateSeletedObjsWidth();
		this.setHeight()
    if(isAndroid()) 
      $( window ).resize(function() {
        self.setHeight();
      });
  }
	componentDidUpdate(){
  	let self = this;
		this.setHeight()
	}
	setHeight(){
		let self = this;
		setTimeout(function(){
			let clientHeight = document.documentElement.clientHeight || document.body.clientHeight;
			let header = $('.header').height() || 0;
			let top = $('.eps-box-wrap').height() || 0;
			let footer = $('.eps-seleted-list-wrap').height() || 0;
			// console.log(clientHeight,header,top,footer);
			$('.eps-search-list').css({height:clientHeight-header-top-footer-20+'px'});
		},0)
	}
  // 设置容器高度
  setWrapHeight(){
    // 计算list高度
    let btmHeight = typeof($('.eps-seleted-list-wrap').outerHeight())!='undefined' ? $('.eps-seleted-list-wrap').outerHeight() : 0;
    let wrapHeight = $(window).height()-$('.eps-search-list').offset().top-btmHeight-40;
    $('.eps-seleted-list-wrap').css({'max-height': wrapHeight})
  }
  // 计算已选对象的宽度并设置
  calculateSeletedObjsWidth(){
    let realWidth = 0;
    if($('.eps-search-item').length>0){
      $('.eps-search-item').each( function(){
        realWidth += $(this).width() + 40;
      })
      // realWidth = $('.eps-search-item:last').offset().left + $('.eps-search-item:last').width() + 40;
      this.setState({'selectedWrapWidth': (realWidth<this.selectedWrapWidth ? this.selectedWrapWidth : realWidth)});
    }else{
      this.setState({'selectedWrapWidth': '100%'});
    }
  }
	onEndReached(e){
    // alert('xxxxxxxxxx');
    let num = Number(this.curPageNum)+1;
    console.log(num,'goSearch=== onEndReached：＝＝＝＝＝＝＝＝,这个值是什么呢');
    let dispatch = this.props.dispatch;
    dispatch({
      type: 'objectselect/changeData',
      payload: {
        inputloadingicon: false
      }
    })
    this.goSearch(e,num);
	}
}

export default connect((state)=>{
  console.log(state,'这个里面有啥呀呀呀呀呀呀哎呀呀呀哎呀呀呀呀哎呀呀呀')
  return state.objectselect;
})(ObjectSelectList);
