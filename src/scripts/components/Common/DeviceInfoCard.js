import React,{ Component } from 'react';
import { connect } from 'dva';
import { getDict, getDictVal,DataLength } from '../../constants';
import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';

let fittingOperation = getDict('fittingOperation');
let equipmentOperation = getDict('equipmentOperation');
 console.log(equipmentOperation,"equipmentOperation")
class DeviceInfoCard extends Component{
  constructor(props){
    super(props);
    this.state = {
      visible:false,
    }
  }
  operationType(type){
    if(type){
      return _.filter(fittingOperation,function(item){return item.label==type})[0]['value'];
    }else{
      return '';
    }
  }
  equipmentType(type){
    if(type){
        return _.filter(equipmentOperation,function(item){return item.label==type})[0]['value'];
    }else{
       return '';
    }
  }
  NameInfo(name){
    if(DataLength(name)>10){
      AlertInfoBase({
        text: name,
     });
    }   
  }
  NameInfoSpecail(name){
    AlertInfoBase({
      text: name,
    })  
  }
  turnMoney(data){
    return Number(data).formatMoney(2,'','')
  }
  render(){
    let devicedata = this.props.devicedata;
    let deviceFee=devicedata.deviceFee;
    let deviceFeeMaintaince=0;
    let partFee = 0;
    console.log('这个里面输出了什么呢',devicedata);
    _.each(devicedata.partList,function(item){
      if(item.operate=='2'){
        deviceFeeMaintaince=deviceFeeMaintaince+item.totalMaintenanceCost;
        partFee = partFee+item.totalMaintenanceCost;
      }
    })
    let self=this;
    let partHtml='';
    if(devicedata.partList&&devicedata.partList.length>0){
       partHtml=_.map(devicedata.partList,function(item){
              return <div className="todo-fitting partList">
                <div className="todo-fitting-i">
                  <div className="todo-fitting-info">
                    <div className="todo-fitting-title" onClick={()=>self.NameInfo(item.partName)}>
                      <i></i>
                      <span className="todo-info-label">配件名称</span>
                      <span className="todo-info-val ellipsis">{item.partName}</span>
                    </div>
                    <div className="todo-fitting-msg">
                      <span className="todo-info-label">操作建议</span>
                      <span className="todo-info-val">{item.operate?getDictVal('fittingOperation',item.operate):'无'}</span>
                    </div>
                  </div>
                  <div className="todo-fitting-info hide">
                    <div className="todo-fitting-msg" onClick={()=>self.NameInfo(self.turnMoney(item.maintenancePrice*item.maintenanceNum)+' ('+item.rate+')')}>
                      <span className="todo-info-label">维修总价</span>
                      <span className="todo-info-val ellipsis">{self.turnMoney(item.totalMaintenanceCost)+' ('+item.rate+')'}</span>
                    </div>
                    <div className="todo-fitting-num">
                      <span className="todo-info-label">维修数量</span>
                      <span className="todo-info-val">{item.maintenanceNum}</span>
                    </div>
                  </div>
                  <div className="todo-fitting-info specail">
                    <div className="todo-info-label">维修价格</div>
                    <div className="todo-info-val">
                      {item.maintenancePriceNotax}(不含税)
                    </div>
                  </div>
                  <div className="todo-fitting-info">
                    <div className="todo-fitting-num">
                      <span className="todo-info-label">维修数量</span>
                      <span className="todo-info-val">{item.maintenanceNum}</span>
                    </div>
                    <div className="todo-fitting-msg">
                      <span className="todo-info-label">设备税率</span>
                      <span className="todo-info-val ellipsis">{item.rate || '-'}</span>
                    </div>
                  </div>
                  <div className="todo-fitting-info">
                    <div className="todo-fitting-msg">
                      <span className="todo-info-label">设备税金</span>
                      <span className="todo-info-val ellipsis">{item.taxes || '-'}</span>
                    </div>
                    <div className="todo-fitting-msg">
                      <span className="todo-info-label">价税合计</span>
                      <span className="todo-info-val ellipsis">{self.turnMoney((item.operate=='2'?item.maintenancePrice*item.maintenanceNum:0 )|| 0)}</span>
                    </div>
                  </div>
                  <div className="todo-fitting-info">
                    <div className="todo-fitting-msg">
                      <span className="todo-info-label">固定资产</span>
                      <span className="todo-info-val ellipsis">{item.partIsFa}</span>
                    </div>
                  </div>
                  <div className="todo-fitting-info">
                    <div className="todo-fitting-msg" onClick={()=>self.NameInfo(item.mark)}>
                      <span className="todo-info-label">维修描述</span>
                      <span className="todo-info-val ellipsis">{item.mark?item.mark:'无'}</span>
                    </div>
                  </div>
                </div>
              </div>
        })
    }else{
      partHtml='';
    }
    let moneyInfo = ''
    if(devicedata['deviceFee']){
      let deviceAllFee=deviceFee.carCost+deviceFee.hotelCost+deviceFee.installationFee+deviceFee.otherCost+deviceFeeMaintaince;
      let otherFee = deviceFee.carCost+deviceFee.hotelCost+deviceFee.installationFee+deviceFee.otherCost
      // deviceFeeMaintaince 老的维修费不含税
      console.log(deviceFee,'deviceFee-deviceFee-deviceFeedeviceFee')
      moneyInfo = <div className="todo-fitting deviceFee">
          <div className="todo-fitting-i">
            <div className="todo-fitting-info specail">
              <div className="todo-info-label">维修费</div>
              <div className="todo-info-val">{self.turnMoney(partFee || 0)}(含税)
              </div>
            </div>
            <div className="todo-fitting-info specail">
              <div className="todo-info-label">人工费</div>
              <div className="todo-info-val">
                <span className="ellipsis" onClick={()=>this.NameInfoSpecail(self.turnMoney(deviceFee.installationFeeNotax || 0)+'(不含税)')}>{self.turnMoney(deviceFee.installationFeeNotax || 0)}(不含税)</span>
                <span>{deviceFee.installationFeeRate&&deviceFee.installationFeeRate!='0'?deviceFee.installationFeeRate:'-'}</span>
                <span className="ellipsis" onClick={()=>this.NameInfoSpecail(self.turnMoney(deviceFee.installationFee|| 0)+'(含税)')}>{self.turnMoney(deviceFee.installationFee|| 0)}(含税)</span>
              </div>
            </div>
            <div className="todo-fitting-info specail">
              <div className="todo-info-label">差旅费</div>
              <div className="todo-info-val">
                <span className="ellipsis" onClick={()=>this.NameInfoSpecail(self.turnMoney(deviceFee.carCostNotax || 0)+'(不含税)')}>{self.turnMoney(deviceFee.carCostNotax || 0)}(不含税)</span>
                <span>{deviceFee.carCostTax&&deviceFee.carCostTax!='0'?deviceFee.carCostTax:'-'}</span>
                <span className="ellipsis"  onClick={()=>this.NameInfoSpecail(self.turnMoney(deviceFee.carCost || 0)+'(含税)')}>{self.turnMoney(deviceFee.carCost|| 0)}(含税)</span>
              </div>
            </div>
            <div className="todo-fitting-info specail">
              <div className="todo-info-label">住宿费</div>
              <div className="todo-info-val">
                <span className="ellipsis" onClick={()=>this.NameInfoSpecail(self.turnMoney(deviceFee.hotelCostNotax || 0)+'(不含税)')}>{self.turnMoney(deviceFee.hotelCostNotax || 0)}(不含税)</span>
                <span>{deviceFee.hotelCostTax&&deviceFee.hotelCostTax!='0'?deviceFee.hotelCostTax:'-'}</span>
                <span className="ellipsis" onClick={()=>this.NameInfoSpecail(self.turnMoney(deviceFee.hotelCost || 0)+'(含税)')}>{self.turnMoney(deviceFee.hotelCost|| 0)}(含税)</span>
              </div>
            </div>
            <div className="todo-fitting-info specail">
              <div className="todo-info-label">其他费用</div>
              <div className="todo-info-val">
                <span className="ellipsis" onClick={()=>this.NameInfoSpecail(self.turnMoney(deviceFee.otherCostNotax || 0)+'(不含税)')}>{self.turnMoney(deviceFee.otherCostNotax || 0)}(不含税)</span>
                <span>{deviceFee.otherCostTax&&deviceFee.otherCostTax!='0'?deviceFee.otherCostTax:'-'}</span>
                <span className="ellipsis" onClick={()=>this.NameInfoSpecail(self.turnMoney(deviceFee.otherCost || 0)+'(含税)')}>{self.turnMoney(deviceFee.otherCost|| 0)}(含税)</span>
              </div>
            </div>
            <div className="todo-fitting-info">
              <div className="todo-fitting-msg" onClick={()=>this.NameInfo(deviceFee.otherCostRemark)}>
                <span className="todo-info-label">费用备注</span>
                <span className="todo-info-val ellipsis">{deviceFee.otherCostRemark}</span>
              </div>
            </div>
            <div className="todo-fitting-info">
              <div className="todo-fitting-msg" onClick={()=>this.NameInfo(otherFee+'(含税)')}>
                <span className="todo-info-label">杂费</span>
                <span className="todo-info-val ellipsis">{self.turnMoney(otherFee)}(含税)</span>
              </div>
              <div className="todo-fitting-msg" onClick={()=>this.NameInfoSpecail(deviceAllFee+'(含税)')}>
                <span className="todo-info-label">总价</span>
                <span className="todo-info-val ellipsis">{self.turnMoney(deviceAllFee)}(含税)</span>
              </div>
            </div>
          </div>
        </div>
    }

    return (<div className="todo-card  zoomIn specail-zhailei">
        <div className="todo-card-index">{ this.props.index || 0}/{ this.props.allIndex || 0}</div>
      <div className="todo-card-c">
        <div className="todo-info deviceinfo">
          <div className="todo-info-i border-line-h deviceinfo-c after">
            <div className="todo-info-l"  onClick={()=>this.NameInfo(devicedata.vendorName)}>
              <span className="todo-info-label ellipsis">维修商</span>
              <span className="todo-info-val ellipsis">{devicedata.vendorName}</span>
            </div>
          </div>
          <div className="todo-info-i border-line-h after">
            <i></i>
            <div className="todo-info-l" onClick={()=>this.NameInfo(devicedata.deviceName)}>
              <span className="todo-info-label ellipsis" >设备名称</span>
              <span className="todo-info-val ellipsis">{devicedata.deviceName}</span>
            </div>
            <div className="todo-info-l">
              <span className="todo-info-label ellipsis">序列号</span>
              <span className="todo-info-val ellipsis">{devicedata.deviceSerialNumber}</span>
            </div>
          </div>
          <div className="todo-info-i border-line-h after">
            <div className="todo-info-l">
              <span className="todo-info-label ellipsis">FA Code</span>
              <span className="todo-info-val">{devicedata.faCategory}</span>
            </div>
            <div className="todo-info-l">
              <span className="todo-info-label ellipsis">FA Code2</span>
              <span className="todo-info-val">{devicedata.subCategory}</span>
            </div>
          </div>
          <div className="todo-info-i border-line-h after">
            <div className="todo-info-l">
              <span className="todo-info-label ellipsis">操作建议</span>
              <span className="todo-info-val">{devicedata.operate?getDictVal('equipmentOperation',devicedata.operate):'-'}</span>
            </div>
            <div className="todo-info-l todo-fitting-num">
              <span className="todo-info-label ellipsis">维修数量</span>
              <span className="todo-info-val"><font className="eps-badge">{devicedata.maintenanceNum || '0'}</font></span>
            </div>
          </div>
          <div className="todo-info-i border-line-h after">
            <div className="todo-info-l" onClick={()=>this.NameInfo(devicedata.mark)}>
              <span className="todo-info-label ellipsis"  >维修描述</span>
              <span className="todo-info-val ellipsis">{devicedata.mark?devicedata.mark:'-'}</span>
            </div>
          </div>
        </div>
        {
          moneyInfo
        }
        {
          partHtml
        }
      </div>
    </div>)
  }
};

export default connect((state)=>{return state})(DeviceInfoCard);
