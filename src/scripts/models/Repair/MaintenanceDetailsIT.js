/**
 * IT维修详单
 */
export default {
	namespace: 'itdetails',
	state: {
		ITEquipment: {}, // 当前设备信息
		ITParts: [], // 设备配件列表
	},
	reducers: {
		changeData(state,action) {
			return { ...state, ...action.payload };
		},
		// 修改配件
		changePart(state,action){
      let data= action.payload;
      console.log('changePart:',data)
      let ITParts = _.clone(state['ITParts']);
      _.each(ITParts,function(i,index){
        if(index == data['index']){
          i[data['key']] = data['value']
        }
      })
      return _.extend({},state,{
        ITParts:ITParts
      });
    }
	},
	effects: {
	},
	subscriptions: {
	}
};
