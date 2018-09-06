export default {
	namespace: 'editmoney',
	state: {
		loading:{
      loading:true,
      fix:true,
      hide:false
    },
    installationFeeNotax:'0.00',
    maintenanceLaborRate:'',
    hotelCostNotax:'0.00',
    maintenanceAccommodationRate:'',
    carCostNotax:'0.00',
    otherCostNotax:'0.00',
    maintenanceOtherCostTaxRate:''
	},
	reducers: {
		changeData(state,action) {
			return { ...state, ...action.payload };
		}
	},
	effects: {
	},
	subscriptions: {
	}
};
