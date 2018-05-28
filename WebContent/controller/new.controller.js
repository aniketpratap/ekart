sap.ui
		.controller(
				"ekart.controller.new",
				{

					onInit : function() {
						onModel = new sap.ui.model.odata.ODataModel(
								"http://DEWDFCTO021.WDF.sap.corp:1080/sap/opu/odata/SAP/ZOS_ODATA_SRV");
						that = this;

						var results = onModel.read("/billSet?$filter=BILL_ID eq '" + '' + "'and PRODUCT_ID eq '" + '' + "'and CUSTOMER_ID eq '" + onlineuser + "'", null, null,
								true, function(oData, oResponse) {
									console.log(oData);
									Object.keys(oData.results).forEach(function(temp)
									         {
									             oData.results[temp].DELIVERY_DATE=oData.results[temp].DELIVERY_DATE.substr(0,10);
									             oData.results[temp].ORDER_DATE=oData.results[temp].ORDER_DATE.substr(0,10);
									          });
									var t2 = new sap.ui.model.json.JSONModel(
											oData);
									that.getView().setModel(t2);
								});
					},
					handleUserNamePress : function() {
				   		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo("os");
					},
					onnavButtonPress : function(){
				   		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo("os");
					},
					onNavBack: function () {
				   		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo("user2");
					},
					onSelect: function(oEvent)
					{
						this.a=oEvent.getSource().getText();
						
					},
					onDelete : function(oEvent){
						
						var idbill = this.a;
//						var rb = oEvent.getSource().getText();
//						console.log(rb);
//						var idx = rb.getSelectedIndex();
						oModel.remove("/billSet(BILL_ID='"+idbill+"',PRODUCT_ID='"+''+"',CUSTOMER_ID='"+''+"')", null, null, true, function(
								oData, oResponse) {
							sap.m.MessageToast.show("Successfully Deleted");
							window.location.reload();
		
					
						});
						sap.m.MessageToast.show("Successfully Deleted");
						window.location.reload();
						
						}
				});