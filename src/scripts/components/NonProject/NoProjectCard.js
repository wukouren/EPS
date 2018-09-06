/**
 * 项目采购的所有卡片
 * 设备卡片
 * 工程卡片
 * IT设备卡片
 */
import React,{ Component } from 'react';
import { connect } from 'dva';
import ReactDOM from 'react-dom';
import Hammer from 'hammerjs';
import { openWebView ,getDict,DataLength} from '../../constants';
import { AlertBase, ConfirmBase ,AlertInfoBase} from '../../components/Common/EpsModal';

/*
 * 设备卡片
 * 需区分供应商，服务商，或all（同时为供应商和服务商）
 */
export class DeviceCard extends Component{
  constructor(props) {
    super(props);
    this.state = {}
  }
  NameInfo(name){ 
    AlertInfoBase({
      text: name,
    });
  }
  turnMoney(data){
    return Number(data).formatMoney(2,'','')
  }
  render(){
    let data = this.props.itemdata;
    let self=this;
    console.log(data,'这个里面的数据是什么啊');
    // 服务商
    if(this.props.deviceRoleType == 'service'){
      return (
        <div className="nop-card">
          <div className="nop-card-c">
            <div className="nop-card-index index-right">{ this.props.index || 0}/{ this.props.allIndex || 0}</div>
            <div className="nop-card-h border-line-h after">
              <div className="nop-card-label ellipsis">供应商</div>
              <div className="nop-card-val">{data.vendorName}</div>
            </div>
            <div className="nop-card-info">
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">设备名称</div>
                <div className="nop-card-val ellipsis">{data.deviceName}</div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">FA Code</div>
                  <div className="nop-card-val ellipsis">{data.faCode}</div>
                </div>
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">FA Code2</div>
                  <div className="nop-card-val ellipsis">{data.faCode2}</div>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">数量</div>
                  <div className="nop-card-val num">{data.buySum}</div>
                </div>
              </div>
            </div>
            <div className="nop-card-sep border-line-h after"></div>
            <div className="nop-card-list">
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">安装费</div>
                <div className="nop-card-val">
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.installationFeeNotax || 0))}>{self.turnMoney(data.installationFeeNotax || 0)}(不含税)</span>
                  <span className="ellipsis">{data["installationFeeRate"] || '-'}</span>
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.installationFee || 0))}>{self.turnMoney(data.installationFee || 0)}(含税)</span>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">材料费</div>
                <div className="nop-card-val">
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.materialCostNotax || 0))}>{self.turnMoney(data.materialCostNotax || 0)}(不含税)</span>
                  <span className="ellipsis">{data["materialCostTax"] || '-'}</span>
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.materialCost || 0))}>{self.turnMoney(data.materialCost || 0)}(含税)</span>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">车资</div>
                <div className="nop-card-val">
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.carCostNotax || 0))}>{self.turnMoney(data.carCostNotax || 0)}(不含税)</span>
                  <span className="ellipsis">{data["carCostTax"] || '-'}</span>
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.carCost || 0))}>{self.turnMoney(data.carCost || 0)}(含税)</span>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">住宿</div>
                <div className="nop-card-val">
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.hotelCostNotax || 0))}>{self.turnMoney(data.hotelCostNotax || 0)}(不含税)</span>
                  <span className="ellipsis">{data["hotelCostTax"] || '-'}</span>
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.hotelCost || 0))}>{self.turnMoney(data.hotelCost || 0)}(含税)</span>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">其他</div>
                <div className="nop-card-val">
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.otherCostNotax || 0))}>{self.turnMoney(data.otherCostNotax || 0)}(不含税)</span>
                  <span className="ellipsis">{data["otherCostTax"] || '-'}</span>
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.otherCost || 0))}>{self.turnMoney(data.otherCost || 0)}(含税)</span>
                </div>
              </div>
              <div className="nop-card-info-i custom-item">
                <div className="nop-card-label ellipsis">其他费用备注</div>
                <div className="nop-card-val">{data['otherCostRemark']}</div>
              </div>
              <div className="nop-card-info-i custom-item">
                <div className="nop-card-label ellipsis">杂费小计(含税)</div>
                <div className="nop-card-val">{self.turnMoney(data.deviceCostAll-data.sumCost)+' ¥'}</div>
              </div>
            </div>
          </div>
        </div>
      )
    // 供应商 || 既是供应商，又是服务商
    }else if(this.props.deviceRoleType == 'supplier'){
      return (
        <div className="nop-card">
          <div className="nop-card-c">
            <div className="nop-card-index index-right">{ this.props.index || 0}/{ this.props.allIndex || 0}</div>
            <div className="nop-card-h border-line-h after">
              <div className="nop-card-label ellipsis">供应商</div>
              <div className="nop-card-val">{data.vendorName}</div>
            </div>
            <div className="nop-card-info">
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">设备名称</div>
                <div className="nop-card-val ellipsis">{data.deviceName}</div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">FA Code</div>
                  <div className="nop-card-val ellipsis">{data.faCode}</div>
                </div>
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">FA Code2</div>
                  <div className="nop-card-val ellipsis">{data.faCode2}</div>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">采购价(不含税)</div>
                  <div className="nop-card-val">{self.turnMoney(data.costNotax)+' ¥'}</div>
                </div>
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">数量</div>
                  <div className="nop-card-val num">{data.buySum}</div>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">税率</div>
                  <div className="nop-card-val">{data.rate || '-'}</div>
                </div>
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">税金</div>
                  <div className="nop-card-val ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.taxes || 0))}>{self.turnMoney(data.taxes || 0)}</div>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">价税合计</div>
                <div className="nop-card-val" onClick={(e)=>self.NameInfo(self.turnMoney(data.sumCost||0))}>{self.turnMoney(data.sumCost||0)+' ¥'}</div>
              </div>
              <div className="nop-card-info-i custom-item">
                <div className="nop-card-label ellipsis">采购商品总价(含税)</div>
                <div className="nop-card-val" onClick={(e)=>self.NameInfo(self.turnMoney(data.sumCost||0))}>{self.turnMoney(data.sumCost||0)+' ¥'}</div>
              </div>
            </div>
            <div className="nop-card-sep border-line-h after"></div>
            <div className="nop-card-list">
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">配送费</div>
                <div className="nop-card-val">
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.distributionCostNotax||0))}>{self.turnMoney(data.distributionCostNotax || 0)}(不含税)</span>
                  <span className="ellipsis">{data["distributionCostRate"] || '-'}</span>
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.distributionCost||0))}>{self.turnMoney(data.distributionCost || 0)}(含税)</span>
                </div>
              </div>
              <div className="nop-card-info-i custom-item">
                <div className="nop-card-label ellipsis">杂费小计(含税)</div>
                <div className="nop-card-val">{self.turnMoney(data.deviceCostAll-data.sumCost)+' ¥'}</div>
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      return (
        <div className="nop-card">
          <div className="nop-card-c">
            <div className="nop-card-index index-right">{ this.props.index || 0}/{ this.props.allIndex || 0}</div>
            <div className="nop-card-h border-line-h after">
              <div className="nop-card-label ellipsis">供应商</div>
              <div className="nop-card-val">{data.vendorName}</div>
            </div>
            <div className="nop-card-info">
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">设备名称</div>
                <div className="nop-card-val ellipsis">{data.deviceName}</div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">FA Code</div>
                  <div className="nop-card-val ellipsis">{data.faCode}</div>
                </div>
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">FA Code2</div>
                  <div className="nop-card-val ellipsis">{data.faCode2}</div>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">采购价(不含税)</div>
                  <div className="nop-card-val">{self.turnMoney(data.costNotax)+' ¥'}</div>
                </div>
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">数量</div>
                  <div className="nop-card-val num">{data.buySum}</div>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">税率</div>
                  <div className="nop-card-val">{data.rate || '-'}</div>
                </div>
                <div className="nop-card-info-i-sep">
                  <div className="nop-card-label ellipsis">税金</div>
                  <div className="nop-card-val ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.taxes || 0))}>{self.turnMoney(data.taxes || 0)}</div>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">价税合计</div>
                <div className="nop-card-val" onClick={(e)=>self.NameInfo(self.turnMoney(data.sumCost||0))}>{self.turnMoney(data.sumCost||0)+' ¥'}</div>
              </div>
              <div className="nop-card-info-i custom-item">
                <div className="nop-card-label ellipsis">采购商品总价(含税)</div>
                <div className="nop-card-val" onClick={(e)=>self.NameInfo(self.turnMoney(data.sumCost||0))}>{self.turnMoney(data.sumCost||0)+' ¥'}</div>
              </div>
            </div>
            <div className="nop-card-sep border-line-h after"></div>
            <div className="nop-card-list">
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">配送费</div>
                <div className="nop-card-val">
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.distributionCostNotax||0))}>{self.turnMoney(data.distributionCostNotax || 0)}(不含税)</span>
                  <span className="ellipsis">{data["distributionCostRate"] || '-'}</span>
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.distributionCost||0))}>{self.turnMoney(data.distributionCost || 0)}(含税)</span>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">安装费</div>
                <div className="nop-card-val">
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.installationFeeNotax || 0))}>{self.turnMoney(data.installationFeeNotax || 0)}(不含税)</span>
                  <span className="ellipsis">{data["installationFeeRate"] || '-'}</span>
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.installationFee || 0))}>{self.turnMoney(data.installationFee || 0)}(含税)</span>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">材料费</div>
                <div className="nop-card-val">
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.materialCostNotax || 0))}>{self.turnMoney(data.materialCostNotax || 0)}(不含税)</span>
                  <span className="ellipsis">{data["materialCostTax"] || '-'}</span>
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.materialCost || 0))}>{self.turnMoney(data.materialCost || 0)}(含税)</span>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">车资</div>
                <div className="nop-card-val">
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.carCostNotax || 0))}>{self.turnMoney(data.carCostNotax || 0)}(不含税)</span>
                  <span className="ellipsis">{data["carCostTax"] || '-'}</span>
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.carCost || 0))}>{self.turnMoney(data.carCost || 0)}(含税)</span>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">住宿</div>
                <div className="nop-card-val">
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.hotelCostNotax || 0))}>{self.turnMoney(data.hotelCostNotax || 0)}(不含税)</span>
                  <span className="ellipsis">{data["hotelCostTax"] || '-'}</span>
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.hotelCost || 0))}>{self.turnMoney(data.hotelCost || 0)}(含税)</span>
                </div>
              </div>
              <div className="nop-card-info-i">
                <div className="nop-card-label ellipsis">其他</div>
                <div className="nop-card-val">
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.otherCostNotax || 0))}>{self.turnMoney(data.otherCostNotax || 0)}(不含税)</span>
                  <span className="ellipsis">{data["otherCostTax"] || '-'}</span>
                  <span className="ellipsis" onClick={(e)=>self.NameInfo(self.turnMoney(data.otherCost || 0))}>{self.turnMoney(data.otherCost || 0)}(含税)</span>
                </div>
              </div>
              <div className="nop-card-info-i custom-item">
                <div className="nop-card-label ellipsis">其他费用备注</div>
                <div className="nop-card-val">{data['otherCostRemark']}</div>
              </div>
              <div className="nop-card-info-i custom-item">
                <div className="nop-card-label ellipsis">杂费小计(含税)</div>
                <div className="nop-card-val">{self.turnMoney(data.deviceCostAll-data.sumCost)+' ¥'}</div>
              </div>
            </div>
          </div>
        </div>
      )
    }
  }
}

/**
 * 工程卡片
 */
export class ProjectCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }
  NameInfo(name){ 
    AlertInfoBase({
      text: name,
    });
  }
  turnMoney(data){
    return Number(data).formatMoney(2,'','')
  }
  render(props){
    let self = this;
    let data = this.props.itemdata;
    console.log(data,'这个里面有什么数据呢');
    return (
        <div className={ this.props.animated==false ? "eps-list-card eps-project" : "eps-list-card eps-project animated " }>
        <div className="card-index index-right">{ this.props.index || 0}/{ this.props.allIndex || 0}</div>
        <div className="eps-item-info-inline">
            <div className="eps-list-item item-wrap">
              <dt><label>供应商</label></dt>
              <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.vendorName) } }>
                {data.vendorName}
              </font></dd>
            </div>
        </div>
        <div className="eps-item-info-inline">
          <div className="eps-list-item item-wrap">
           <dt> <label>设备名称</label></dt>
            <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceName) } }>
             {data.deviceName}
            </font></dd>
            </div>
           </div>
          <div className="eps-item-info-inline">
            <div className="eps-item-info eps-list-item">
              <dt><label>FA Code</label></dt>
              <dd><font className="ellipsis">{data.faCode}</font></dd>
            </div>
            <div className="eps-item-info eps-list-item">
              <dt><label>FA Code2</label></dt>
              <dd><font className="ellipsis">{data.faCode2}</font></dd>
            </div>
          </div>
          <div className="eps-item-info-inline">
            <div className="eps-item-info eps-list-item custom-specail3-item" onClick={()=>self.NameInfo(self.turnMoney(data.costNotax  || 0)+'(不含税)')}>
              <dt><label>金额(不含税)</label></dt>
              <dd><font className="ellipsis">{self.turnMoney(data.costNotax || 0)} ¥</font></dd>
            </div>
          </div>
          <div className="eps-item-info-inline">
            <div className="eps-item-info eps-list-item" onClick={()=>self.NameInfo(self.turnMoney(data.taxes||0))}>
              <dt><label>工程税金</label></dt>
              <dd><font className="ellipsis">{self.turnMoney(data.taxes || 0)}</font></dd>
            </div>
            <div className="eps-item-info eps-list-item">
              <dt><label>工程税率</label></dt>
              <dd><font className="ellipsis">{data.rate||'-'}</font></dd>
            </div>
          </div>
          <div className="eps-item-info-inline">
            <div className="eps-item-info eps-list-item custom-specail3-item" onClick={()=>self.NameInfo(self.turnMoney(data.cost || 0))}>
              <dt><label>价税合计</label></dt>
              <dd><font className="ellipsis">{self.turnMoney(data.cost || 0)} ¥ </font></dd>
            </div>
          </div>
        </div>
      )
  }
};

/**
 * IT设备卡片
 */
export class ITCard extends Component{
  constructor(props) {
    super(props);
    this.state = {
      checked: false
    }
  }
  NameInfo(name){ 
    if(DataLength(name)>8){
      AlertInfoBase({
        text: name,
     });
    }   
  }
  turnMoney(data){
    return Number(data).formatMoney(2,'','')
  }
  render(props){
    let self = this;
    let data = this.props.itemdata;
    let type=this.props.type;
    console.log(data,this.props.orderType,'zzzzzzzzz');
    if(this.props.orderType == '10'){
      if(data['tsiType']){
        return(
          <div className={ this.props.animated==false ? "eps-list-card eps-project" : "eps-list-card eps-project animated " }>
            <div className="card-index index-right">{ this.props.index || 0}/{ this.props.allIndex || 0}</div>
            <div className="eps-item-info-inline">
              <div className="eps-list-item item-wrap">
                <dt><label>供应商</label></dt>
                <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.serviceVendorName) } }>
                  {data.serviceVendorName}
                </font></dd>
              </div>
             </div>
             <div className="eps-item-info-inline">
              <div className="eps-list-item item-wrap">
                <dt><label>销售商</label></dt>
                <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.vendorName) } }>
                  {data.vendorName}
                </font></dd>
              </div>
             </div>
            <div className="eps-list-item item-wrap">
              <dt><label>设备名称</label></dt>
              <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceName) } }>
               {data.deviceName}
              </font></dd>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item">
               <dt><label>FA Code</label></dt>
               <dd><font className="ellipsis">{data.faCode?data.faCode:'-'}</font></dd>
              </div>
              <div className="eps-item-info eps-list-item">
                <dt><label>FA Code2</label></dt>
                <dd><font className="ellipsis">{data.faCode2?data.faCode2:'-'}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item custom-specail2-item">
                <dt><label>单价</label></dt>
                <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation();self.NameInfo(Number(data.costNotax).formatMoney(2,'','')+'(不含税￥)') } }>{Number(data.costNotax).formatMoney(2,'','')+'(不含税￥)'}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item">
                <dt><label>数量</label></dt>
                <dd><font className="ellipsis num">{data.buySum}</font></dd>
              </div>
              <div className="eps-item-info eps-list-item">
                <dt><label>是否直采</label></dt>
                <dd><font className="ellipsis">{data.isDirectMining=='Y'?'Y':'N'}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item">
                <dt><label>税率</label></dt>
                <dd><font className="ellipsis">{data.rate}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item">
                <dt><label>税金</label></dt>
                <dd><font className="ellipsis" >{self.turnMoney(data.taxes || 0)+' ¥'}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item custom-specail-item">
                <dt><label>Markup 费</label></dt>
                <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.markupFee)+' ¥') } }>{self.turnMoney(data.markupFee)+' ¥'}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item custom-specail-item">
                <dt><label>价税合计</label></dt>
                <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.sumCost)+' ¥') } }>{self.turnMoney(data.sumCost)+' ¥'}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item custom-specail-item">
                <dt><label>价税合计(含Markup)</label></dt>
                <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice)+' ¥') } }>{self.turnMoney(data.lumpSumPrice)+' ¥'}</font></dd>
              </div>
            </div>
          </div>)
      }else{
        return(
          <div className={ this.props.animated==false ? "eps-list-card eps-project" : "eps-list-card eps-project animated " }>
            <div className="card-index index-right">{ this.props.index || 0}/{ this.props.allIndex || 0}</div>
            <div className="eps-item-info-inline">
              <div className="eps-list-item item-wrap">
                <dt><label>供应商</label></dt>
                <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.serviceVendorName) } }>
                  {data.serviceVendorName}
                </font></dd>
              </div>
             </div>
             <div className="eps-item-info-inline">
              <div className="eps-list-item item-wrap">
                <dt><label>销售商</label></dt>
                <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.vendorName) } }>
                  {data.vendorName}
                </font></dd>
              </div>
             </div>
            <div className="eps-list-item item-wrap">
              <dt><label>设备名称</label></dt>
              <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceName) } }>
               {data.deviceName}
              </font></dd>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item">
               <dt><label>FA Code</label></dt>
               <dd><font className="ellipsis">{data.faCode?data.faCode:'-'}</font></dd>
              </div>
              <div className="eps-item-info eps-list-item">
                <dt><label>FA Code2</label></dt>
                <dd><font className="ellipsis">{data.faCode2?data.faCode2:'-'}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item custom-specail2-item">
                <dt><label>单价</label></dt>
                <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation();self.NameInfo(Number(data.costNotax).formatMoney(2,'','')+'(不含税￥)') } }>{Number(data.costNotax).formatMoney(2,'','')+'(不含税￥)'}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item">
                <dt><label>数量</label></dt>
                <dd><font className="ellipsis num">{data.buySum}</font></dd>
              </div>
              <div className="eps-item-info eps-list-item">
                <dt><label>是否直采</label></dt>
                <dd><font className="ellipsis">{data.isDirectMining=='Y'?'Y':'N'}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline hide">
              <div className="eps-item-info eps-list-item">
                <dt><label>税率</label></dt>
                <dd><font className="ellipsis">{data.rate}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item">
                <dt><label>税金</label></dt>
                <dd><font className="ellipsis" >{self.turnMoney(data.taxes || 0)}</font></dd>
              </div>
              <div className="eps-item-info eps-list-item">
                <dt><label>直采税率</label></dt>
                <dd><font className="ellipsis">{data.itSupplierRate}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item custom-specail-item">
                <dt><label>Markup 费</label></dt>
                <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.markupFee)+' ¥') } }>{self.turnMoney(data.markupFee)+' ¥'}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item custom-specail-item">
                <dt><label>价税合计</label></dt>
                <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.sumCost)+' ¥') } }>{self.turnMoney(data.sumCost)+' ¥'}</font></dd>
              </div>
            </div>
            <div className="eps-item-info-inline">
              <div className="eps-item-info eps-list-item custom-specail-item">
                <dt><label>价税合计(含Markup)</label></dt>
                <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice)+' ¥') } }>{self.turnMoney(data.lumpSumPrice)+' ¥'}</font></dd>
              </div>
            </div>
          </div>)
      }
    }else{
      return(
        <div className={ this.props.animated==false ? "eps-list-card eps-project" : "eps-list-card eps-project animated " }>
          <div className="card-index index-right">{ this.props.index || 0}/{ this.props.allIndex || 0}</div>
          <div className="eps-item-info-inline">
            <div className="eps-list-item item-wrap">
              <dt><label>供应商</label></dt>
              <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.serviceVendorName) } }>
                {data.serviceVendorName}
              </font></dd>
            </div>
           </div>
           <div className="eps-item-info-inline">
            <div className="eps-list-item item-wrap">
              <dt><label>销售商</label></dt>
              <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.vendorName) } }>
                {data.vendorName}
              </font></dd>
            </div>
           </div>
          <div className="eps-list-item item-wrap">
            <dt><label>设备名称</label></dt>
            <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceName) } }>
             {data.deviceName}
            </font></dd>
          </div>
          <div className="eps-item-info-inline">
            <div className="eps-item-info eps-list-item">
             <dt><label>FA Code</label></dt>
             <dd><font className="ellipsis">{data.faCode?data.faCode:'-'}</font></dd>
            </div>
            <div className="eps-item-info eps-list-item">
              <dt><label>FA Code2</label></dt>
              <dd><font className="ellipsis">{data.faCode2?data.faCode2:'-'}</font></dd>
            </div>
          </div>
          <div className="eps-item-info-inline">
            <div className="eps-item-info eps-list-item custom-specail2-item">
              <dt><label>单价</label></dt>
              <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation();self.NameInfo(Number(data.costNotax).formatMoney(2,'','')+'(不含税￥)') } }>{Number(data.costNotax).formatMoney(2,'','')+'(不含税￥)'}</font></dd>
            </div>
          </div>
          <div className="eps-item-info-inline">
            <div className="eps-item-info eps-list-item">
              <dt><label>数量</label></dt>
              <dd><font className="ellipsis num">{data.buySum}</font></dd>
            </div>
            <div className="eps-item-info eps-list-item">
              <dt><label>是否直采</label></dt>
              <dd><font className="ellipsis">{data.isDirectMining=='Y'?'Y':'N'}</font></dd>
            </div>
          </div>
          <div className="eps-item-info-inline">
            <div className="eps-item-info eps-list-item">
              <dt><label>税率</label></dt>
              <dd><font className="ellipsis">{data.rate}</font></dd>
            </div>
          </div>
          <div className="eps-item-info-inline hide">
            <div className="eps-item-info eps-list-item">
              <dt><label>小计</label></dt>
              <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.sumCost)+' ¥') } }>{self.turnMoney(data.sumCost)+' ¥'}</font></dd>
            </div>
          </div>
          <div className="eps-item-info-inline">
            <div className="eps-item-info eps-list-item">
              <dt><label>税金</label></dt>
              <dd><font className="ellipsis" >{self.turnMoney(data.taxes || 0)+' ¥'}</font></dd>
            </div>
          </div>
          <div className="eps-item-info-inline">
            <div className="eps-item-info eps-list-item custom-specail-item">
              <dt><label>Markup 费</label></dt>
              <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.markupFee)+' ¥') } }>{self.turnMoney(data.markupFee)+' ¥'}</font></dd>
            </div>
          </div>
          <div className="eps-item-info-inline">
            <div className="eps-item-info eps-list-item custom-specail-item">
              <dt><label>价税合计</label></dt>
              <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.sumCost)+' ¥') } }>{self.turnMoney(data.sumCost)+' ¥'}</font></dd>
            </div>
          </div>
          <div className="eps-item-info-inline">
            <div className="eps-item-info eps-list-item custom-specail-item">
              <dt><label>价税合计(含Markup)</label></dt>
              <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice)+' ¥') } }>{self.turnMoney(data.lumpSumPrice)+' ¥'}</font></dd>
            </div>
          </div>
        </div>
      )
    }


    
    // if(data.tsiType&&data.isDirectMining=='N'){
    //   return (
    //     <div className={ this.props.animated==false ? "eps-list-card eps-project" : "eps-list-card eps-project animated " }>
    //      <div className="eps-item-info-inline">
    //       <div className="eps-list-item item-wrap">
    //         <dt><label>供应商</label></dt>
    //         <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.serviceVendorName) } }>
    //           {data.serviceVendorName}
    //         </font></dd>
    //       </div>
    //      </div>
    //      <div className="eps-item-info-inline">
    //       <div className="eps-list-item item-wrap">
    //         <dt><label>销售商</label></dt>
    //         <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.vendorName) } }>
    //           {data.vendorName}
    //         </font></dd>
    //       </div>
    //      </div>
    //      <div>
    //       <div className="eps-list-item item-wrap">
    //         <dt><label>设备名称</label></dt>
    //         <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceName) } }>
    //          {data.deviceName}
    //         </font></dd>
    //       </div>
    //     </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //          <dt><label>FA Code</label></dt>
    //          <dd><font className="ellipsis">{data.faCode?data.faCode:'-'}</font></dd>
    //         </div>
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>FA Code2</label></dt>
    //           <dd><font className="ellipsis">{data.faCode2?data.faCode2:'-'}</font></dd>
    //         </div>
    //       </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>单价</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation();self.NameInfo(Number(data.cost).formatMoney(2,'','')+'(不含税)') } }>{Number(data.cost).formatMoney(2,'','')+'(不含税)'}</font></dd>
    //         </div>
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>数量</label></dt>
    //           <dd><font className="ellipsis num">{data.buySum}</font></dd>
    //         </div>
    //       </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>税率</label></dt>
    //           <dd><font className="ellipsis">{data.rate}</font></dd>
    //         </div>
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>税金</label></dt>
    //           <dd><font className="ellipsis">{data.taxes || '-'}</font></dd>
    //         </div>
    //       </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>小计</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.sumCost)+' ¥') } }>{self.turnMoney(data.sumCost)+' ¥'}</font></dd>
    //         </div>
    //       </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>是否直采</label></dt>
    //           <dd><font className="ellipsis" >{data.isDirectMining=='Y'?'Y':'N'}</font></dd>
    //         </div>
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>Markup 费</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.markupFee)+' ¥') } }>{self.turnMoney(data.markupFee)+' ¥'}</font></dd>
    //         </div>
    //       </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>总价</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice)+' ¥') } }>{self.turnMoney(data.lumpSumPrice)+' ¥'}</font></dd>
    //         </div>
    //       </div>
    //     </div>)
    // }else if(data.tsiType&&data.isDirectMining=='Y'){
    //     return (
    //       <div className={ this.props.animated==false ? "eps-list-card eps-project" : "eps-list-card eps-project animated" }>
    //        <div className="eps-item-info-inline">
    //         <div className="eps-list-item item-wrap">
    //           <dt><label>供应商</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.serviceVendorName) } }>
    //             {data.serviceVendorName}
    //           </font></dd>
    //         </div>
    //       </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-list-item item-wrap">
    //           <dt><label>销售商</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.vendorName) } }>
    //             {data.vendorName}
    //           </font></dd>
    //         </div>
    //       </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-list-item item-wrap">
    //           <dt><label>设备名称</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceName) } }>
    //            {data.deviceName}
    //           </font></dd>
    //         </div>
    //        </div>
    //        <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>FA Code</label></dt>
    //           <dd><font className="ellipsis">{data.faCode?data.faCode:'-'}</font></dd>
    //         </div>
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>FA Code2</label></dt>
    //           <dd><font className="ellipsis">{data.faCode2?data.faCode2:'-'}</font></dd>
    //         </div>
    //        </div>
    //        <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>单价</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation();self.NameInfo(Number(data.cost).formatMoney(2,'','')+'(不含税)') } }>{Number(data.cost).formatMoney(2,'','')+'(不含税)'}</font></dd>
    //         </div>
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>数量</label></dt>
    //           <dd><font className="ellipsis num">{data.buySum}</font></dd>
    //         </div>
    //       </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>税率</label></dt>
    //           <dd><font className="ellipsis">{data.rate}</font></dd>
    //         </div>
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>税金</label></dt>
    //           <dd><font className="ellipsis">{data.taxes || '-'}</font></dd>
    //         </div>
    //       </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>小计</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.sumCost)+' ¥') } }>{self.turnMoney(data.sumCost)+' ¥'}</font></dd>
    //         </div>
    //       </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>是否直采</label></dt>
    //           <dd><font className="ellipsis" >{data.isDirectMining=='Y'?'Y':'N'}</font></dd>
    //         </div>
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>Markup 费</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.markupFee)+' ¥') } }>{self.turnMoney(data.markupFee)+' ¥'}</font></dd>
    //         </div>
    //       </div>
    //        <div className="eps-item-info-inline">
    //        <div className="eps-item-info eps-list-item">
    //           <dt><label>总价</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice)+' ¥') } }>{self.turnMoney(data.lumpSumPrice)+' ¥'}</font></dd>
    //         </div>
    //        </div>
    //       </div>
    //     )
    // }else {
    //    return (
    //     <div className={ this.props.animated==false ? "eps-list-card eps-project" : "eps-list-card eps-project animated" }>
    //      <div className="eps-item-info-inline">
    //       <div className="eps-list-item item-wrap">
    //         <dt><label>供应商</label></dt>
    //         <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.vendorName) } }>
    //           {data.vendorName}
    //         </font></dd>
    //       </div>
    //     </div>
    //     <div className="eps-item-info-inline">
    //       <div className="eps-list-item item-wrap">
    //         <dt><label>销售商</label></dt>
    //         <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.vendorName) } }>
    //           {data.vendorName}
    //         </font></dd>
    //       </div>
    //     </div>
    //     <div className="eps-item-info-inline">
    //       <div className="eps-list-item item-wrap">
    //         <dt><label>设备名称</label></dt>
    //         <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(data.deviceName) } }>
    //          {data.deviceName}
    //         </font></dd>
    //       </div>
    //      </div>
    //      <div className="eps-item-info-inline">
    //       <div className="eps-item-info eps-list-item">
    //         <dt><label>FA Code</label></dt>
    //         <dd><font className="ellipsis">{data.faCode?data.faCode:'-'}</font></dd>
    //       </div>
    //       <div className="eps-item-info eps-list-item">
    //         <dt><label>FA Code2</label></dt>
    //         <dd><font className="ellipsis">{data.faCode2?data.faCode2:'-'}</font></dd>
    //       </div>
    //      </div>
    //      <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>单价</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation();self.NameInfo(Number(data.cost).formatMoney(2,'','')+'(不含税)') } }>{Number(data.cost).formatMoney(2,'','')+'(不含税)'}</font></dd>
    //         </div>
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>数量</label></dt>
    //           <dd><font className="ellipsis num">{data.buySum}</font></dd>
    //         </div>
    //       </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>税率</label></dt>
    //           <dd><font className="ellipsis">{data.rate}</font></dd>
    //         </div>
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>税金</label></dt>
    //           <dd><font className="ellipsis">{data.taxes || '-'}</font></dd>
    //         </div>
    //       </div>
    //       <div className="eps-item-info-inline">
    //         <div className="eps-item-info eps-list-item">
    //           <dt><label>小计</label></dt>
    //           <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.sumCost)+' ¥') } }>{self.turnMoney(data.sumCost)+' ¥'}</font></dd>
    //         </div>
    //       </div>
    //     <div className="eps-item-info-inline">
    //       <div className="eps-item-info eps-list-item">
    //         <dt><label>是否直采</label></dt>
    //         <dd><font className="ellipsis" >{data.isDirectMining=='Y'?'Y':'N'}</font></dd>
    //       </div>
    //       <div className="eps-item-info eps-list-item">
    //         <dt><label>Markup 费</label></dt>
    //         <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.markupFee)+' ¥') } }>{self.turnMoney(data.markupFee)+' ¥'}</font></dd>
    //       </div>
    //     </div>
    //      <div className="eps-item-info-inline">
    //      <div className="eps-item-info eps-list-item">
    //         <dt><label>总价</label></dt>
    //         <dd><font className="ellipsis" onClick={(e)=>{ e.stopPropagation(); self.NameInfo(self.turnMoney(data.lumpSumPrice)+' ¥') } }>{self.turnMoney(data.lumpSumPrice)+' ¥'}</font></dd>
    //       </div>
    //      </div>
    //     </div>)
    // }
  }
};

