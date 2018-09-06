/**
 * 详细卡片
 *
 * 使用场景： 
 *  带2个配件信息的工程或设备卡片（DOA审批－订单审批的详细信息卡片，餐厅确认订单－维修确认卡片）
 * 	
 * 可设置参数:
 * 	datas: [{ // 设备／工程基本信息
 * 		key: '工程名称',
 * 		value: 'LED灯',
 * 		display: 'inline', // 值可为inline 或 block, inline(一行展示2个), block（单行展示）
 * 		ellipsis: false // 值可为true 或 false, true 超出长度 省略展示， false 完全展示
 * 	}]
 * 	partdatas: [{ //配件信息
 * 		id: 'aaa',
 * 		name: '配件A',
 * 		nums: '2', // 维修数量
 * 		suggestion: '保内维修' // 操作建议
 * 	}]
 * 	footerbutton: { // 底部button  默认为false
 * 		text: '查看更多工程信息',
 * 		callback: function(){
 * 		}
 * 	}
 */