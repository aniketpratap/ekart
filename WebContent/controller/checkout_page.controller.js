var val3;
var val2;
var data;
sap.ui.controller("ekart.controller.checkout_page",
				{

					/**
					 * Called when a controller is instantiated and its View
					 * controls (if available) are already created. Can be used
					 * to modify the View before it is displayed, to bind event
					 * handlers and do other one-time initialization.
					 * 
					 * @memberOf checkout_page.checkout_page
					 */
					/*
					 * onInit: function() { debugger; },
					 * onBackgroundDesignSelect: function (oEvent) { var
					 * oIconTabBar = this.getView().byId("idIconTabBar"); var
					 * sSelectedValue =
					 * oEvent.getSource().getSelectedButton().getText();
					 * oIconTabBar.setBackgroundDesign(sSelectedValue); },
					 * 
					 * onHeaderBackgroundDesignSelect: function (oEvent) { var
					 * oIconTabBar = this.getView().byId("idIconTabBar"); var
					 * sSelectedValue =
					 * oEvent.getSource().getSelectedButton().getText();
					 * oIconTabBar.setHeaderBackgroundDesign(sSelectedValue); }
					 */
					onPress : function(evt) {
						sap.m.MessageToast
								.show("Thank You for shopping with us");
						var oRouter = sap.ui.core.UIComponent
								.getRouterFor(this);
						oRouter.navTo("os");
					},
					Onclick1 : function() {
						this.getView().byId("panel1").setVisible(true);
						this.getView().byId("panel2").setVisible(false);
						this.getView().byId("panel3").setVisible(false);
					},

					Onclick2 : function() {
						this.getView().byId("panel1").setVisible(false);
						this.getView().byId("panel2").setVisible(true);
						this.getView().byId("panel3").setVisible(false);
					},

					Onclick3 : function() {
						this.getView().byId("panel1").setVisible(false);
						this.getView().byId("panel2").setVisible(false);
						this.getView().byId("panel3").setVisible(true);
					},

					onInit : function() {
						
						onlineuser = localStorage.getItem("onlineuser");
						oModell = new sap.ui.model.odata.ODataModel(
								"http://dewdfcto021.wdf.sap.corp:1080/sap/opu/odata/sap/ZOS_ODATA_SRV");
						that = this;
						var t = new sap.ui.model.json.JSONModel(ob);

						this.getView().setModel(t, "ob");
						if ( onlineuser != "GUEST")
							{
						that.getView().byId("name").setValue(sap.ui.getCore().cname);
							}
						// var cust = new sap.ui.model.json.JSONModel(t);
						// this.getView().setModel(cust, "customer");
						console.log(sap.ui.getCore().adrs);
						this.getView().byId("address").setValue(
								sap.ui.getCore().adrs);
						this.getView().byId("email").setValue(
								sap.ui.getCore().email);
						this.getView().byId("mob").setValue(
								sap.ui.getCore().mob);
						

					},
					onNavBack : function() {
						var oRouter = sap.ui.core.UIComponent
								.getRouterFor(this);
						oRouter.navTo("os");
					},
					onCheckOut : function() {

					},
					onQuantityChanged : function(oEvent) {
						var model = this.getView().getModel("ob");
						var val1 = oEvent.getSource().getParent()
								.getBindingContextPath();
						data = model.getProperty(val1);

						val2 = oEvent.getSource().getValue();
						// var
						// val2=this.getView().byId("priceObjNumber").getNumber();
						val3 = data.PRICE * val2;
						// this.getView().byId("subTotalObjNumber").setText(val3);
						// this.onAddCountToCart();
						// model.refresh();
					},
					onDelete : function() {
//						that.getView().byId("shoppingCartTable").setVisible(false);
						aSeats.pop(0);
						window.location.reload();
						 localStorage.setItem("lengths", "");
						 localStorage.removeItem("aSeat");
					},
					select:function()
					{
						 var text =  that.getView().byId("Id1").getText();
						  
							var oView = this.getView();
							oDialog = oView.byId("fsignin");
							if (!oDialog) {
								oDialog = sap.ui.xmlfragment(oView.getId(),
										"ekart.fsignin");
								oView.addDependent(oDialog);
							}
							oDialog.open();
						  
					},
					onBill : function() {
						var email = this.getView().byId("email").getValue();
						var mob = this.getView().byId("mob").getValue();
						sap.ui.getCore().mob2=mob;
						var str = email;
						var patt = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
						var res = patt.test(str);
						var str2 = mob;
						var patt2 = new RegExp(/^\d{10}$/i);
						var res2 = patt2.test(str2);
						var name = this.getView().byId("name").getValue();
						sap.ui.getCore().name2=name;
						var address = this.getView().byId("address").getValue();
						var today = new Date();
						var date1 = today.toISOString().substring(0, 10);
						var ms = new Date().getTime() + 604800000;
						var tomorrow = new Date(ms);
						var entity = {};

						entity.CUSTOMER_ID = onlineuser;
						entity.PRODUCT_ID = ob.results1[0].PRODUCT_ID;
						// entity.QUANTITY = ob.results1[0].QUANTITY;
						if(val2 == null || val2 == '')
						{
						 val2 = 1;
						 val3 = sap.ui.getCore().pricee;
						}
					
						entity.QUANTITY = val2;
						entity.BILLING_ADDRESS = address;
						
						entity.TOTAL_PRICE = val3;
						entity.ORDER_DATE = today;
						entity.DELIVERY_DATE = tomorrow;
						oModell.create("/billSet", entity, {
							success : function() {
								sap.m.MessageToast.show("created");
								var b = ob.results1[0].PRODUCT_ID;
								if(val2 == null || val2 == '')
									{
									var a = 1;
									}
								else{
								var a = ob.results1[0].QUANTITY;
								}
								var c = val2;
								var d = a - c;
								var entity = {};

								entity.QUANTITY = d, oModel.update(
										"/productSet('" + b + "')", entity, {
											success : function() {

											}
										});
							}
						});
						if(address!="" && name != "" )
							{
						if(res == true && res2 == true ){
						var oRouter = sap.ui.core.UIComponent
								.getRouterFor(this);
						oRouter.navTo("Main");
						}
						else
						{if(res == false)
						sap.m.MessageToast
						.show("Please Enter correct Email Address");
						else
							sap.m.MessageToast
							.show("Please Enter correct Mobile no.");
						}
							}
						else
							sap.m.MessageToast
							.show("Please Enter correct Details");
					},
					onAddCountToCart : function() {

						var totalQuantity = 0;
						var subTotal = 0;
						var currency;
						var oModel = this.getView().getModel("ob");
						var data = oModel.getProperty("/results1");
						if (data) {
							for (var i = 0; i < data.length; i++) {
								var prodId = data[i];
								totalQuantity += prodId.QUANTITY;
								subTotal += prodId.Total;
								currency = "INR";
							}
							this.getView().byId("subTotalObjNumber").setText(
									totalQuantity);

						}
					},

				/**
				 * Similar to onAfterRendering, but this hook is invoked before
				 * the controller's View is re-rendered (NOT before the first
				 * rendering! onInit() is used for that one!).
				 * 
				 * @memberOf checkout_page.checkout_page
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
				 * @memberOf checkout_page.checkout_page
				 */
				// onAfterRendering: function() {
				//
				// },
				/**
				 * Called when the Controller is destroyed. Use this one to free
				 * resources and finalize activities.
				 * 
				 * @memberOf checkout_page.checkout_page
				 */
				// onExit: function() {
				//
				// }
				});