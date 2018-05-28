sap.ui.controller(
				"ekart.controller.Main",
				{

					/**
					 * Called when a controller is instantiated and its View
					 * controls (if available) are already created. Can be used
					 * to modify the View before it is displayed, to bind event
					 * handlers and do other one-time initialization.
					 * 
					 * @memberOf ekart.Main
					 */
					onInit : function() {
						
						var today = new Date();
						var date1=today.toISOString().substring(0, 10);
//						this.getView().byId("num").setValue(mob2);
						this.getView().byId("num").setValue(
								sap.ui.getCore().mob2);
						this.getView().byId("name2").setValue(
								sap.ui.getCore().name2);
						this.getView().byId("date").setValue(date1);
						that = this;
						oModel2 = new sap.ui.model.odata.ODataModel(
								"http://dewdfcto021.wdf.sap.corp:1080/sap/opu/odata/sap/ZOS_ODATA_SRV");
						var tt = new sap.ui.model.json.JSONModel(ob);

						this.getView().setModel(tt, "ob");
//						var results = oModel2.read("/billSet", null, null,
//								true, function(oData, oResponse) {
//
//									var t = new sap.ui.model.json.JSONModel(
//											oData);
//									that.getView().setModel(t);
//								});
						that = this;
						var results = oModel2.read("/billSet?$filter=CUSTOMER_ID eq '"+onlineuser+"'", null, null, true, function(oData, oResponse){ 
							console.log(oData);
							var t=new sap.ui.model.json.JSONModel(oData);
							that.getView().setModel(t,"t1");
							console.log(t);
							
						});
						
						oModel2.read("/customerSet('"+onlineuser+"')", null, null, true, function(
								oData, oResponse) {
							var tr=new sap.ui.model.json.JSONModel(oData);
//							var t2=new sap.ui.model.json.JSONModel(oData);
							
							that.getView().setModel(tr,"tr");
//							that.getView().setModel(t2,"t2");
							
							console.log(tr);
						});
						var product_id=ob.results1[0].PRODUCT_ID;
						oModel2.read("/productSet('"+product_id+"')", null, null, true, function(
								oData, oResponse) {
							var pr=new sap.ui.model.json.JSONModel(oData);
//							var t2=new sap.ui.model.json.JSONModel(oData);
							
							that.getView().setModel(pr,"pr");
//							that.getView().setModel(t2,"t2");
							
							console.log(pr);
						});
						
					},
					onNavBack: function () {
				   		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
						oRouter.navTo("checkout_page");
					},
					checkout : function() {
						that = this;
						var results = oModel2.read("/billSet?$filter=CUSTOMER_ID eq '"+onlineuser+"'", null, null, true, function(oData, oResponse){ 
							console.log(oData);
							var t=new sap.ui.model.json.JSONModel(oData);
							that.getView().setModel(t);
							console.log(t);
						});
						

					},
					printTriggered : function(){

					     window.print();

					     
					}
				/**
				 * Similar to onAfterRendering, but this hook is invoked before
				 * the controller's View is re-rendered (NOT before the first
				 * rendering! onInit() is used for that one!).
				 * 
				 * @memberOf ekart.Main
				 */
				// onBeforeRendering: function() {
				//
				// },
				/**
				 * Called when the View has been rendered (so its HTML is part
				 * of the document). Post-rendering manipulations of the HTML
				 * could be done here. This hook is the same one that SAPUI5
				 * controls get after being rendered.
				 * 
				 * @memberOf ekart.Main
				 */
				// onAfterRendering: function() {
				//
				// },
				/**
				 * Called when the Controller is destroyed. Use this one to free
				 * resources and finalize activities.
				 * 
				 * @memberOf ekart.Main
				 */
				// onExit: function() {
				//
				// }
				});