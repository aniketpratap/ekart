sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/m/MessageToast'],
		function(jQuery, Controller, MessageToast) {
		"use strict";
		
		var PageController = Controller.extend("ekart.controller.shoe_cat", {
			
			onPress : function(evt) {
				MessageToast.show("Item added to cart");
				console.log(ob2);
			},
			Press : function(e) {
				MessageToast.show("Buy now");
			},
			onP: function (oEvent) {
				MessageToast.show(oEvent.getSource().getText() + " has been activated");
			},
			onnavButtonPress : function(){
		   		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("os");
			},
			onNavBack: function () {
		   		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("os");
			},
			onInit: function() {
				 var that = this;
				var oModel = new sap.ui.model.odata.ODataModel("proxy/http/dewdfcto021.wdf.sap.corp:1080/sap/opu/odata/sap/ZOS_ODATA_SRV");
					
//					var results = oModel.read("/productSet", null, null, true, function(oData, oResponse){ 
//						console.log(oData);
//						var t=new sap.ui.model.json.JSONModel(oData);
//						that.getView().setModel(t);
//						console.log(t);
//						var t3=new sap.ui.model.json.JSONModel(ob2);
//
//					this.getView().setModel(t3,"ob2");
				var results = oModel.read("/productSet", null, null, true, function(oData, oResponse){ 
					console.log(oData);
//					var t=new sap.ui.model.json.JSONModel(oData);
//					that.getView().setModel(t);
//					console.log(t);
					var t3=new sap.ui.model.json.JSONModel(ob2);

				that.getView().setModel(t3);
				console.log(t3);
				var quantity = t3.oData.results2[0].QUANTITY;
				if (quantity  < 1)
					{
					that.getView().byId("quantityUnitTxt").setText("Out of Stock");
					}
				
			});
			},
			showText: function(oEvent){
//				var val =oEvent.getSource().getBindingContext().getModel().getProperty(oEvent.getSource().getBindingContext().getPath());
////				var val = this.getView().byId("idd1").getText();
//						aSeats.push(val);
//				var length = aSeats.length;
//				console.log(aSeats);
//				console.log(length);
//		   		if (length > 0){
//		   		this.getView("ekart.view.os").byId("idText").setText(length);
//		   		}
//		   		else 
//		   			{
//
//		   			this.getView("ekart.view.os").byId("idText").setText("");
//		   			}
//		   		ob["results1"]=aSeats;
////		   		results1.push[aSeats];
//		   		
//			sap.ui.getCore().setModel(ob,"ob");
			},
		});
		 
		return PageController;


	
	
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf shoe_cat.shoe_cat
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf shoe_cat.shoe_cat
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf shoe_cat.shoe_cat
*/
//	onExit: function() {
//
//	}

});

/*sap.ui.define(['jquery.sap.global', 'sap/ui/core/mvc/Controller', 'sap/m/MessageToast'],
		function(jQuery, Controller, MessageToast) {
		"use strict";
	 
		var PageController = Controller.extend("sap.m.sample.GenericTileAsLaunchTile.Page", {
			press : function(evt) {
				MessageToast.show("Item added to cart");
			}
		});
	 
		return PageController;
	});*/