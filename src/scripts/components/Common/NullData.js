import React,{ Component } from 'react';
import { connect } from 'dva';
class NullData extends Component{
  render(){
    return (<div className="todos-null">
       <div className="icon-todos-null">
          <img src="images/empty-todos.png" />
       </div>
       <div className="desc">{this.props.strTip}</div>
    </div>)
  }
};

export default connect()(NullData);
