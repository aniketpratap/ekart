sap.ui.controller("ekart.controller.Admin", {
	onInit: function() {
		// Load JSON in model
		oModel = new sap.ui.model.odata.ODataModel("http://DEWDFCTO021.WDF.sap.corp:1080/sap/opu/odata/SAP/ZOS_ADMIN_SRV/");
		
		this.getView().setModel(oModel);
	},
	
	onListItemPress : function(oEvent) {
		var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();
		this.getSplitAppObj().toDetail(this.createId(sToPageId));
	},
onPress2:function(){
	app.to("new.view.xml")
},
	getSplitAppObj : function() {
		var result = this.byId("SplitApp");
		if (!result) {
			jQuery.sap.log.info("SplitApp object can't be found");
		}
		return result;
	},
	onNavBack: function () {
   		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("os");
	},
	

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf asssignment_002.spli_table
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf asssignment_002.spli_table
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf asssignment_002.spli_table
*/
//	onExit: function() {
//
//	}

});