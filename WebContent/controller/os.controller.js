var t;
var flag = 0;
sap.ui.controller("ekart.controller.os", {
	onInit: function() {
//		setInterval(function(){that.getView().byId("idCarousel").next();}, 3000);
		
		if(localStorage.getItem("lengths") && localStorage.getItem("aSeat"))
			{		lengths = localStorage.getItem("lengths");
			aSeats = localStorage.getItem("aSeat").split(",");
			
			}
		else
			{
			lengths=0;
			aSeats=[];
			}
		this.getView("ekart.view.os").byId("idText").setText(lengths);
		sap.ui.core.BusyIndicator.show();
		
			onlineuser = localStorage.getItem("onlineuser");
		if (onlineuser == null || onlineuser == "")
			{
			onlineuser = "GUEST";
			}
		else if (onlineuser == "GUEST")
			{
			this.getView().byId("idsignin").setText("Sign In");
			  this.getView().byId("idProfileButton").setText(onlineuser);
			  this.getView().byId("idsignup").setVisible(true);
			}
		else {
			this.getView().byId("idProfileButton").setText(onlineuser);
			  this.getView().byId("idsignin").setText("Log Out");
			  this.getView().byId("idsignup").setVisible(false);
			}
			that = this;
			page2=null;
			page25=null;
		results1=[];
		ob={};
		array2=[];
		results2=[];
		ob2={};
//		 oModel = new sap.ui.model.odata.ODataModel("http://dewdfcto021.wdf.sap.corp:1080/sap/opu/odata/sap/ZOS_ODATA_SRV");
		oModel = new sap.ui.model.odata.ODataModel("http://dewdfcto021.wdf.sap.corp:1080/sap/opu/odata/SAP/ZOS_ODATA_SRV"); 
		oModel.setDefaultBindingMode("TwoWay");	
		 var results = oModel.read("/productSet", null, null, true, function(oData, oResponse){
			 Object.keys(oData.results).forEach(function(temp){
				 
				if(oData.results[temp].QUANTITY<1)
					{
					oData.results[temp].AVAILABLE = false;
					}
				else
					{
					oData.results[temp].AVAILABLE = true;
					}
				
				
				 
			 });
				console.log(oData);
				var t=new sap.ui.model.json.JSONModel(oData);
				that.getView("ekart.os").setModel(t);
				console.log(t);
				currentState = false;
				var data2 = {
					Value : currentState
				};
//				var model2 = new sap.ui.model.json.JSONModel();
//				model2.setData(data2);
//				this.getView().setModel(model2, "editModel");
//				var model = this.getView().getModel("editModel");
//				var data = model.getData();
//				data.editable = currentState;
//				model.refresh(true);
//				
				
			});
			sap.ui.core.BusyIndicator.hide();
	},
	changeCarouselImage : function() {
		  sap.ui.getCore().byId("idCarousel").showNext();
		  setTimeout("changeCarouselImage()", 5);
		},
		SortTable : function(){
			  var prop = this.getView().byId("Sort_by").getSelectedKey();
		if(prop == "PRICE2")
			    {
			    prop="PRICE";
			    var s = new sap.ui.model.Sorter(prop,true);
			    }
			  else
			    {
			    var s = new sap.ui.model.Sorter(prop,false);
			    }
			  var list1 = this.getView().byId("promotedRow1");
			  var binding1 = list1.getBinding("items");
			  binding1.sort(s);
			},
	showText: function(oEvent){
//		 window.location.reload();
		var val = oEvent.getSource().getBindingContext().getModel().getProperty(oEvent.getSource().getBindingContext().getPath());
		aSeats.push(val);
		lengths = aSeats.length;
		localStorage.setItem("lengths",lengths);
		localStorage.setItem("aSeat",aSeats);
		console.log(aSeats);
		console.log(lengths);
		if (lengths > 0){
   		this.getView("ekart.view.os").byId("idText").setText(lengths);
   		
   		}
   		else 
   			{

   			this.getView("ekart.view.os").byId("idText").setText("");
   			}
		/*aSeats = localStorage.getItem("aSeat").split(",");
   		ob["results1"] = aSeats;*/
//   		sap.ui.getCore().setModel(ob,"ob");
	},
	onFilter : function (oEvent) {
		var array = [];
		var value = this.getView("ekart.view.os").byId("color").getSelectedKey();
		var value2 = this.getView("ekart.view.os").byId("brand").getSelectedKey();
		var value3 = this.getView("ekart.view.os").byId("size").getSelectedKey();
		if ((value && value.length > 0) ||(value2 && value2.length > 0)||(value3 && value3.length > 0)) {
			var filter = new sap.ui.model.Filter("COLOR", sap.ui.model.FilterOperator.Contains,value);
			var filter1 = new sap.ui.model.Filter("BRAND", sap.ui.model.FilterOperator.Contains, value2);
			var filter2 = new sap.ui.model.Filter("OS_SIZE", sap.ui.model.FilterOperator.Contains,value3);
			array.push(filter);
			array.push(filter1);
			array.push(filter2);
		}
		var list = this.getView("ekart.os").byId("promotedRow1");
		var binding = list.getBinding("items");
		binding.filter(array);
	},
   		onPressUser : function() {
   			if(localStorage.getItem("onlineuser") === "GUEST")
   				{
   			 localStorage.setItem("lengths", "");
   			 localStorage.removeItem("aSeat");
   				localStorage.setItem("onlineuser", "GUEST");
   				window.location.reload();
   				sap.m.MessageToast.show("Sign in to see your Account");
   				}
   			else if (localStorage.getItem("onlineuser") === "ADMIN")
   				{
   				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Admin");
   				}
   			else
   				{
   				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("user2");
   				}
   		},
   		onPress1 : function(oEvent) {
   		 var text =  this.getView().byId("idsignin").getText();
   		
		  if(text === "Sign In")
		  {
			var oView = this.getView();
			oDialog = oView.byId("fsignin");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(),
						"ekart.fsignin");
				oView.addDependent(oDialog);
			}
			oDialog.open();
		  }
		  else 
		  {
		  localStorage.setItem("onlineuser", "GUEST");
		  this.getView().byId("idsignin").setText("Sign In");
		  this.getView().byId("idProfileButton").setText(onlineuser);
		  sap.m.MessageToast.show("You are Logged out successfully!");
		 this.getView().byId("idsignup").setVisible(true);
		 window.location.reload();
		 localStorage.setItem("lengths", "");
		 localStorage.removeItem("aSeat");
		 localStorage.setItem("onlineuser", "GUEST");
		 
		  }
		},
		onPress2 : function(oEvent) {
			var oView2 = this.getView();
			oDialog2 = oView2.byId("fsignup");
			if (!oDialog2) {
				oDialog22 = sap.ui.xmlfragment(oView.getId(),
						"ekart.sharedblocks.fsignup");
				oView2.addDependent(oDialog);
			}
			oDialog2.open();
		},
		onCancel : function() {
			var oView = this.getView();
			oDialog.close();
		},
		onCancel2 : function() {
			oDialog2.close();
		},
		onSignin : function(oEvent) {
//			localStorage.setItem("lengths", "");
//			 localStorage.removeItem("aSeat");
			
			  var that = this;
			  var pass = this.getView().byId("idp").getValue();
				var uname = this.getView().byId("idu").getValue();
				if ( pass === "" || uname === "")
					{
					that.getView().byId("iderror_signin").setVisible(true);
					}
				else {
					
			 var oModel = new sap.ui.model.odata.ODataModel("http://dewdfcto021.wdf.sap.corp:1080/sap/opu/odata/SAP/ZOS_ADMIN_SRV");
			 
			 var oView = this.getView();
			var results = oModel.read("/customerSet?$filter=CUSTOMER_ID eq '"+uname+"' and PASSWORD eq '"+pass+"'",null,null,true,function(oData, oResponse) {
			
			if (oData.results.length == 1) {
				oDialog.close();
				localStorage.setItem("onlineuser", uname);
				that.getView().byId("idProfileButton").setText(uname);
				 sap.m.MessageToast.show("You are now Online!");
				  that.getView().byId("idsignin").setText("Log Out");
				  that.getView().byId("idsignup").setVisible(false);
				  var i = 0;
				  sap.ui.getCore().adrs=oData.results[0].ADDRESS;
				  sap.ui.getCore().cname=oData.results[0].NAME;
					sap.ui.getCore().email=oData.results[0].EMAIL_ID;
					sap.ui.getCore().mob=oData.results[0].CONTACT_NO;
			}
			else
				{
				sap.m.MessageToast
						.show("Please Enter correct details");};
		},function(oError){
			alert('Invalid Credentials')
		});
				}
//				window.location.reload();
				
			},
		onSignup : function() {
			var that = this;
			var here = this;
			var entity = {};
			var email = this.getView().byId("idemail").getValue();
			var pass = this.getView().byId("idpass").getValue();
			var uname = this.getView().byId("iduname").getValue();
			var name = this.getView().byId("idname").getValue();
			var mob = this.getView().byId("idmob").getValue();
			var add = this.getView().byId("idadd").getValue();
			if (email === "" || pass === "" || uname === "" || name === "" || mob === "" || add === "")
				{
				here.getView().byId("iderror_signup").setVisible(true);
				}
			else {
//				 var oModel2 = new sap.ui.model.odata.ODataModel("proxy/http/dewdfcto021.wdf.sap.corp:1080/sap/opu/odata/SAP/ZOS_ADMIN_SRV");
//					var oView = this.getView();
//				var results = oModel2.read("/customerSet?$filter=CUSTOMER_ID eq '"+uname+"'",null,null,false,function(oData, oResponse) {
//					
//					if (oData.results.length == 1) {
//						flag = 1;
//						
//					}
//				});
//				if (flag == 0)
					{
				var str = email;
				var patt = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
				var res = patt.test(str);
				var str2 = mob;
				var patt2 = new RegExp(/^\d{10}$/i);
				var res2 = patt2.test(str2);
				if(res == true && res2 == true){
			var oView2 = this.getView();
			var oDialog2 = oView2.byId("fsignup");
			var jsonModel = new sap.ui.model.json.JSONModel();
			this.getView().setModel(jsonModel, "j2");
			console.log(jsonModel);
			oModel = new sap.ui.model.odata.ODataModel(
					"http://DEWDFCTO021.WDF.sap.corp:1080/sap/opu/odata/SAP/ZOS_ODATA_SRV");
			oModel.read("/customerSet", null, null, true, function(
					oData, oResponse) {
				
				jsonModel.setData(oData);
				console.log(oData);
			});
		
			
			entity.CUSTOMER_ID = uname, entity.NAME = name, entity.PASSWORD = pass, entity.EMAIL_ID = email,
			entity.ADDRESS = add, entity.CONTACT_NO = mob, 
					entity.EMAIL_ID = email, 
					oModel.create(
							"/customerSet",entity, {
								success : function() {
									sap.m.MessageToast
											.show("Successfully SignedUp");
									var oView = that.getView();
									localStorage.setItem("onlineuser", uname);
									that.getView().byId("idProfileButton").setText(uname);
									 sap.m.MessageToast.show("You are now Online!");
									  that.getView().byId("idsignin").setText("Log Out");
									  that.getView().byId("idsignup").setVisible(false);
								}
							});
			sap.ui.getCore().adrs=add;
			sap.ui.getCore().email=email;
			sap.ui.getCore().mob=mob;
			sap.ui.getCore().cname=name;
			oDialog2.close();
		
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
			
//			else
//				{
//				sap.m.MessageToast.show("Enter a new ID");
//				}
			}
				
		},

	vseats:function(){
	},
	getSplitAppObj : function() {
		var result = this.byId("SplitAppDemo");
		if (!result) {
			jQuery.sap.log.info("SplitApp object can't be found");
		}
		return result;
	},
	onCartButtonPress : function (){
		ob["results1"] = aSeats;
		if (aSeats.length>1){
		sap.ui.getCore().pricee=aSeats[0].PRICE;
		};
   		sap.ui.getCore().setModel(ob,"ob");
   		
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("checkout_page");
	},
	onSelectProduct : function(oEvent){
		var that = this;
		valn = oEvent.getSource().getBindingContext().getObject().PRODUCT_ID;
		var results7 = oModel.read("/productSet?$filter=PRODUCT_ID eq '"+valn+"'", null, null, true, function(oData, oResponse){ 
			console.log(oData);
			var t4=new sap.ui.model.json.JSONModel(oData);
		that.getView().setModel(t4,"t4");
		var oView3 = that.getView();
		oDialogcat = oView3.byId("fcat");
		if (!oDialogcat) {
			oDialogcat = sap.ui.xmlfragment(oView.getId(),
					"ekart.sharedblocks.fcat");
			oView2.addDependent(oDialog);
		}
		oDialogcat.open();
		var quantity = oData.results[0].QUANTITY;
		if (quantity  < 1)
			{
			that.getView().byId("quantityUnitTxt").setText("Out of Stock");
			}
		
	});
		
//		var array3=[];
//		var val1 =oEvent.getSource().getBindingContext().getModel().getProperty(oEvent.getSource().getBindingContext().getPath());
//		console.log(val1);
//		array2.push(val1);
//		var val2 = array2.slice(-1).pop()
//		array3.push(val2);
//   		ob2["results2"]=array3;
//   		sap.ui.getCore().setModel(ob2,"ob2");
//   		array3=[];
//   		var oView3 = this.getView();
//		oDialogcat = oView3.byId("fcat");
//		if (!oDialogcat) {
//			oDialogcat = sap.ui.xmlfragment(oView.getId(),
//					"ekart.sharedblocks.fcat");
//			oView2.addDependent(oDialog);
//		}
//		oDialogcat.open();
//		
//		 var that = this;
////			var oModel = new sap.ui.model.odata.ODataModel("proxy/http/dewdfcto021.wdf.sap.corp:1080/sap/opu/odata/sap/ZOS_ODATA_SRV");
//			var results7 = oModel.read("/productSet?$filter=PRODUCT_ID eq '"+valn+"'", null, null, true, function(oData, oResponse){ 
//				console.log(oData);
//				var t4=new sap.ui.model.json.JSONModel(ob2);
//			that.getView().setModel(t4,"t4");
//		
//			var quantity = oData.results7[0].QUANTITY;
//			if (quantity  < 1)
//				{
//				that.getView().byId("quantityUnitTxt").setText("Out of Stock");
//				}
//			
//		});
},
event:function(){
	
	var brand =this.getView().byId("brand").getSelectedKey();
	
	
	
	var ofilter = new sap.ui.model.Filter("BRAND", "EQ",brand);
	
	var that=this;
	oModel.read("/productSet",{
		filters:[ofilter],
		success:function(oData,response){
			console.log("success");
			console.log(oData);
			
			var json_model=new sap.ui.model.json.JSONModel();
			json_model.setData(oData);
			that.getView().setModel(json_model,"Task_mod");
			console.log(json_model);
			
		}
	});
	
},

showCancel : function(){
		oDialogcat.close();
//		 window.location.reload();
	},
	onAfterRendering: function() {
		
			
			
			var ofilter = new sap.ui.model.Filter("BRAND", "EQ","LEE COOPER");
			
			var that=this;
			oModel.read("/productSet",{
				filters:[ofilter],
				success:function(oData,response){
					console.log("success");
					console.log(oData);
					
					var json_model=new sap.ui.model.json.JSONModel();
					json_model.setData(oData);
					that.getView().setModel(json_model,"Task_mod");
					console.log(json_model);
					
				}
			});
		}
		
	
	});