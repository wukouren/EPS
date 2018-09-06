/**
 * 此js含以下页面(拆单前的，需求阶段页面)：
 * 
 * 1. Local PM 确认供应商的需求明细（设备／工程／IT）
 *    路由：/newstoreit/pmconfirm/:orderid
 * 2. DOA审批（设备／工程／IT）拆单前的 
 *    路由：/newstoreit/approval/:orderid?type=1
 *
 * 项目采购需求：
		1. Local PM确认供应商的需求明细： 设备／工程／IT 获取供应商需求明细 接口中，返回字段中都会加一个市场信息的list，待后面出图排产
		2. DOA审批 设备／工程／IT 页面，也会增加市场信息的list展示，待后面出图排产,和1共用一个页面
		3. 餐厅确认评价（设备／工程）／餐厅确认收货（IT）,页面不会展示市场信息list,但和4是共用的一个页面
		4. 送货调整，DOA审批：（设备／工程），会增加市场信息的list展示，（IT）是否有市场信息的list展示，待德勤	确认？
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import HeaderCard from './../../components/NewStoreIT/HeaderCard';
import { VendorCardSelect, VendorCardShow } from './../../components/NewStoreIT/VendorCard';
import Form from "jw-form/dist/mobile";

import { List } from 'jw-components-mobile';
import { MemoDialog, AlertBase, ConfirmBase, AlertInfoBase, showAlert } from '../../components/Common/EpsModal';
import request from '../../utils/EpsRequest';
import { getDict, getUsers, openChart, DataLength, orderStatus } from '../../constants';

class PMConfirm extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.setWrapHeight = this.setWrapHeight.bind(this);
    this.selectVendorHandler = this.selectVendorHandler.bind(this);
    this.changeRefuseRemark = this.changeRefuseRemark.bind(this);
  }

  NameInfo(e, name) {
    if (DataLength(name) > 10) {
      AlertInfoBase({
        text: name,
      });
    }
  }

  // 拒绝订单
  reject() {
    let self = this;
    console.log(this.props, "pmconfirm")
    if (this.props.pmconfirm.orderState == '3') {
      setTimeout(function () {
        let selectedVendor = _.where(self.props.pmconfirm.list, { checked: true });
        if (selectedVendor.length == 0) {
          AlertBase({
            tip: '请选择拒绝的供应商!',
            icon: 'icon-save-error',
            onOk: () => { }
          });
          return;
        }
        // let saving = showAlert({
        //   tip: '移动端拒绝为拒绝全部，若要拒绝部分，请在 PC 端操作！',
        //   okBtn: {
        //     text: '确认拒绝',
        //     style: { 'width': '50%', 'border-right':'1px solid #e5e4e5' }
        //   },
        //   onOk: ()=>{

        setTimeout(function () {
          let rejectDialog = MemoDialog({
            title: '是否拒绝该订单?',
            value: self.rejectMemo ? self.rejectMemo : '',
            btnIconClass: 'icon-reject',
            btnVal: '拒绝',
            placeholder: '拒绝必须输入备注...',
            memorequired: true,
            onBtnClick: (memo, callback) => {
              self.rejectMemo = memo;
              let approveFlg = 'REFUSE';
              //调用审批拒绝接口
              console.log(memo, "memo")
              self.rejectOrder(approveFlg, memo, callback);
            },
            onClose: (memo) => {
              self.rejectMemo = memo;
            },
          });
        }, 500)
        //   },
        //   cancelBtn: {
        //     text: <div className="project-cancel">取消拒绝</div>,
        //     style: { 'width': '50%' }
        //   },
        //   onCancel: ()=>{
        //   }
        // });
      })
    } else {
      setTimeout(function () {
        let rejectDialog = MemoDialog({
          title: '是否拒绝该订单?',
          defaultValue: self.rejectMemo ? self.rejectMemo : '',
          btnIconClass: 'icon-reject',
          btnVal: '拒绝',
          placeholder: '拒绝必须输入备注...',
          memorequired: true,
          onBtnClick: (memo, callback) => {
            self.rejectMemo = memo;
            let approveFlg = 'REFUSE';
            //调用审批拒绝接口
            self.rejectOrder(approveFlg, memo, callback);
          },
          onClose: (memo) => {
            self.rejectMemo = memo;
          },
        });
      }, 500)
    }

  }
  rejectOrder(approveFlg, memo, callback) {
    let self = this;
    console.log(this.props.pmconfirm, "pmconfirm")
    let vendorList = [];
    let list = _.where(this.props.pmconfirm.list, { checked: true });
    _.map(list, function (item) {
      let itemobj = {};
      itemobj.rpType = item.rpType;
      itemobj.vendorNumber = item.vendorNumber;
      itemobj.refuseRemark = item.refuseRemark;
      vendorList.push(itemobj);
    })
    // console.log(vendorList,"verdorList")
    // return;
    request('/McdEpsApi/joywok/newstoreit/submitOrderInfo', {
      method: 'POST',
      body: JSON.stringify({
        param: {
          eid: userinfo.employee_id,
          record: {
            updateDate: self.props.pmconfirm.updateDate,
            orderNumber: self.props.pmconfirm.orderNumber,
            orderState: self.props.pmconfirm.orderState,
            approveFlg: approveFlg,
            operateMarks: memo,
            vendorList: vendorList,
          }
        }
      })
    }).then(function (resp) {
      console.log(resp, "resp")
      // 把提交中按钮置为原样
      if (typeof (callback) == 'function') {
        callback(true);
      }
      if (resp.data.success) {
        AlertBase({
          tip: '已成功提交',
          icon: 'icon-save-success',
          onOk: () => {
            jw.closeWebView()
          }
        });
      } else {
        self.rejectMemo = memo;
        console.log("fail")
      }
    })
  }
  // 通过订单
  agree() {
    let self = this;
    let type = this.props.location.query.type;
    let agreeDialog = MemoDialog({
      title: '是否确认通过？',
      defaultValue: self.agreeMemo ? self.agreeMemo : '',
      btnVal: '通过',
      placeholder: '选择输入备注...',
      memorequired: false,
      onBtnClick: (memo, callback) => {
        let approveFlg = "PASS";
        self.submitOrder(approveFlg, memo)
      },
      onClose: (memo) => {

      },
    });
  }


  //提交审批订单
  submitOrder(approveFlg, memo, callback) {
    let self = this;
    request('/McdEpsApi/joywok/newstoreit/submitOrderInfo', {
      method: 'POST',
      body: JSON.stringify({
        param: {
          eid: userinfo.employee_id,
          record: {
            updateDate: self.props.pmconfirm.updateDate,
            orderNumber: self.props.pmconfirm.orderNumber,
            orderState: self.props.pmconfirm.orderState,
            approveFlg: approveFlg,
            operateMarks: memo,
          }
        }
      })
    }).then(function (resp) {
      // 把提交中按钮置为原样
      if (typeof (callback) == 'function') {
        callback(true);
      }
      if (resp.data.success) {
        AlertBase({
          tip: '已成功提交',
          icon: 'icon-save-success',
          onOk: () => {
            jw.closeWebView()
          }
        });
      } else {
        self.rejectMemo = memo;
      }
    })

  }
  openLog() {
    let url = EpsWebRoot + '/#/log/' + this.props.params['orderid'];
    let data = this.props.pmconfirm;
    data['logType'] = { key: 'project', subkey: '41' };
    window.upTabsData('log', 'cache', data)
    jw.pushWebView(url);
  }

  openProcessTable() {
    let data = this.props.pmconfirm;
    data['logType'] = { key: 'project', subkey: '41' };
    window.upTabsData('log', 'cache', data)
    var url = EpsWebRoot + '/#approval/' + this.props.params['orderid'];
    jw.pushWebView(url);
  }

  // set wrap 高度
  setWrapHeight() {
    let self = this;
    let footerheight = typeof ($(ReactDOM.findDOMNode(self.refs.footer)).outerHeight()) != 'undefined' ? $(ReactDOM.findDOMNode(self.refs.footer)).outerHeight() : 0;
    let priceheight = typeof ($(ReactDOM.findDOMNode(self.refs.price)).outerHeight()) != 'undefined' ? $(ReactDOM.findDOMNode(self.refs.price)).outerHeight() : 0;
    // 页面最大高度
    $(ReactDOM.findDOMNode(self.refs.bodyWrap)).css({ 'max-height': ($(window).height() - priceheight - footerheight - 15) });
  }

  componentDidMount() {
    console.log('ddd', window.EpsEvents);
    NProgress.done();
    if (JWReady == true) {
      jw.setFuncBtns([{ type: 4 }]);
    } else {
      window.EpsEvents.off('jwready:ok').on('jwready:ok', () => {
        jw.setFuncBtns([{ type: 4 }]);
      })
    }
    let dispatch = this.props.dispatch;
    let self = this;
    let eid = userinfo.employee_id;
    let objecttype = this.props.params.objecttype;

    //获取供应商列表
    request('/McdEpsApi/joywok/newstoreit/getVendorInfo', {
      method: 'POST',
      body: JSON.stringify({
        param: {
          eid: eid,
          condition: {
            orderNumber: self.props.params.orderid,
          }
        }
      })
    }).then(function (resp) {
      console.log('111111', resp);
      if (resp['data']['success'] == false) {
      } else {
        // 给供应商添加唯一的id
        let data = resp['data']['body'];
        data.list = _.map(data.list, (item, key) => {
          return _.extend(item, { eps_id: item.vendorNumber + '' + key, refuseRemark: item.refuseRemark ? item.refuseRemark : '' })
        })
        dispatch({
          type: 'pmconfirm/changeData',
          data: _.extend({
            orderState: data.orderState,
          }, data)
        })
      }
    })
    request('/McdEpsApi/joywok/newstoreit/getOrderInfo', {
      method: 'POST',
      body: JSON.stringify({
        param: {
          eid: eid,
          condition: {
            orderNumber: self.props.params.orderid,
          }
        }
      })
    }).then(function (resp) {
      console.log('2222', resp);

      if (resp['data']['success'] == false) {
      } else {
        let data = resp['data']['body'];
        dispatch({
          type: 'pmconfirm/changeData',
          data: _.extend({
            orderState: data.orderState,
          }, data)
        })
        if (data['createBy']) {
          getUsers(data['createBy'], 'num', function (resp) {
            let userdata = resp['data'][0];
            dispatch({
              type: 'pmconfirm/changeData',
              data: {
                avatar: userdata['avatar'],
                loading: false,
              }
            })
          })
        }
      }
    })

    //打开群聊
    window.onJwNavBtnClick = function (data) {
      if (data['type'] == '4') {
        let modelData = self.props.pmconfirm;
        openChart(eid, modelData['orderNumber'], '测试')
      }
    }
    // 安卓兼容 
    if (isAndroid()) {
      let lastHeight = $(window).height();
      let newHeight;
      $(window).resize(function () {
        self.setWrapHeight();
      })
    }
  }
  selectVendorHandler(eps_id, params) {
    let list = this.props.pmconfirm.list;
    let dispatch = this.props.dispatch;
    let newlist = _.map(list, (item) => {
      return (item.eps_id == eps_id) ? _.extend(item, params) : item;
    });
    dispatch({
      type: 'pmconfirm/changeData',
      data: {
        list: newlist,
      }
    })
  }
  changeRefuseRemark(eps_id, params) {
    this.selectVendorHandler(eps_id, params);
  }
  render() {
    let self = this;
    let data = this.props.pmconfirm;
    let isNotChecked = /view/.test(location.href);
    console.log('rrrr', data)
    let objecttype = this.props.params.objecttype;
    // 组织显示内容
    if (data.loading) {
      return (<div className="todos-loading">
        <img src="images/loading.gif" />
        <span>加载中</span>
      </div>)
    } else {
      const Item = List.Item;
      console.log('Marlin 1', data)
      setTimeout(() => {
        // 重设高度
        self.setWrapHeight();
      }, 0)
      let buttons = '',
        project = data,
        strOrderSta = project['orderState'] && orderStatus["newstoreit"]['53'][project['orderState']] ? orderStatus["newstoreit"]['53'][project['orderState']] : { 'label': '' };
      // if (isUnfinishedOrHistory() || (window.location.href.indexOf('/pmconfirm/') != -1)) {
      if (isUnfinishedOrHistory()) {
        buttons = <div className="todo-info-status" onClick={(e) => this.openProcessTable()}><i className="icon-time-b"></i><div className="todo-status-c"><span className="todo-status-title">{strOrderSta["label"]}</span><span className="todo-status-tip">{strOrderSta["val"]}</span></div></div>;
      } else {
        buttons = <div className="eps-btn-wrap">
          <div className="eps-btn eps-btn-default-small" onClick={(e) => this.reject(e)}>拒绝</div>
          <div className="eps-btn eps-btn-warning-large" onClick={(e) => this.agree(e)}>确认</div>
        </div>;
      }
      // 拼装供应商列表
      let vendorListDiv = '';
      if (this.props.pmconfirm.list && this.props.pmconfirm.list.length > 0) {
        let list = this.props.pmconfirm.list;
        let onlyShow = this.props.pmconfirm.orderState == '3' ? false : true;
        vendorListDiv = (
          <div className="eps-device-list eps-vendor-list">
            {
              list.map((item) => (
                onlyShow == false ? <VendorCardSelect isNotChecked={isNotChecked} orderid={self.props.params['orderid']} itemdata={item} selectHandler={self.selectVendorHandler} changeRefuseRemark={self.changeRefuseRemark} /> : <VendorCardShow orderid={self.props.params['orderid']} itemdata={item} />
              ))
            }
          </div>
        );
      }
      return (
        <div className="eps-nonproject-approval eps-project-pmconfirm">
          <div className="eps-pmconfirm-body" ref="bodyWrap">
            <header className="header" ref="header">
              <div className="header-bg-specail">
                <div className="header-bg"></div>
                <div className="header-bg-2"></div>
              </div>
              <div className="header-c">
                <HeaderCard orderdata={_.extend({}, this.props.pmconfirm, {
                  avatar: this.props.pmconfirm['avatar']['avatar_l'],
                  fileCount: this.props.pmconfirm['fileCount'] || 0,
                  uploadPhaseName: this.props.pmconfirm['uploadPhaseName'] || ''
                })}></HeaderCard>
              </div>
            </header>
            <div className="eps-np-approval-body">
              <div className="eps-box-wrap">
                <div className="eps-box">
                  <table>
                    <thead>
                      <tr>
                        <td className="col-1">IT总价</td>
                        <td className="col-2">工程总价</td>
                        <td className="col-3">设备总价</td>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="col-1"><font className="ellipsis-1l">{data.pmitTotal ? parseFloat(data.pmitTotal).toFixed(2) : '-'}</font></td>
                        <td className="col-2"><font className="ellipsis-1l">{data.pmengTotal ? parseFloat(data.pmengTotal).toFixed(2) : '-'}</font></td>
                        <td className="col-3"><font className="ellipsis-1l">{data.pmeqTotal ? parseFloat(data.pmeqTotal).toFixed(2) : '-'}</font></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="p-remarks"><label>项目需求备注</label><font className="ellipsis" onClick={e => { self.NameInfo(e, data.orderRemark) }}>{data.orderRemark ? data.orderRemark : '-'}</font></div>
                </div>
              </div>
              <div className="eps-box-wrap eps-box-item">
                <div className="eps-box">
                  <List className="my-list jw-list">
                    <Item extra={data.estimatedRoi ? (parseFloat(data.estimatedRoi).toFixed(2)) + ' %' : '-'}>预计投资回报率(ROI%)</Item>
                    <Item extra={data.estimatedIncrease ? (parseFloat(data.estimatedIncrease).toFixed(2)) + ' ¥' : '-'}>预计销售增长总金额</Item>
                  </List>
                </div>
              </div>
              {vendorListDiv}
              <div style={{ display: 'none' }}> 这里可能会增加市场信息list的展示,还有可能引申出二级页面 </div>
            </div>
          </div>
          <div className="np-total-price" ref="price">
            <div className="np-total-price-c">
              <label>总价(含税)</label>
              <span><i className="icon-sprice"></i><font>{data.pmtotal ? data.pmtotal.toFixed(2) : '-'}</font></span>
              {/* <span className="color-font"></span> */}
            </div>
            <div className="money-show-other-tip">
              <i className="icon-money-tips"></i>
              <div className="money-show-other-tip-v">在合同期内，如遇增值税税率发生变化，订单项下不含税价保持不变。</div>
            </div>
          </div>
          <footer className="footer" ref="footer">
            <div className="log-btn" onClick={(e) => this.openLog()}>
              <i className="icon-log"></i>
              <span>流程日志</span>
            </div>
            {buttons}
          </footer>
        </div>
      );
    }

  }
}

function mapStateToProps(state) {
  console.log('state:', state)
  return state
}
export default connect(mapStateToProps)(PMConfirm);