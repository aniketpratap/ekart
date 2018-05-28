sap.ui.controller("ekart.controller.user2", {

	onInit : function() {
	 onlineuser = localStorage.getItem("onlineuser");
		that = this;
//		this.oRouter = sap.ui.core.UIComponent.getRouterFor(this);
//		this.oRouter.attachRoutePatternMatched(this._handleRouteMatched, this);
		var oModel = new sap.ui.model.odata.ODataModel("http://dewdfcto021.wdf.sap.corp:1080/sap/opu/odata/SAP/ZOS_ADMIN_SRV");
		var results = oModel.read("/customerSet?$filter=CUSTOMER_ID eq '"+onlineuser+"'",
				null, null, true, function(oData, oResponse) { 
					console.log(oData);
					var t=new sap.ui.model.json.JSONModel(oData);
					that.getView().setModel(t);
					console.log(t);
					that.getView("ekart.user2").setModel(t, "t");
					
				});
		

		currentState = false;
		var data2 = {
			Value : currentState
		};
		var model2 = new sap.ui.model.json.JSONModel();
		model2.setData(data2);
		this.getView().setModel(model2, "editModel");
		var model = this.getView().getModel("editModel");
		var data = model.getData();
		data.editable = currentState;
		model.refresh(true);
	},
	onNavBack: function () {
   		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("os");
	},
	toggleEdit : function(oEvt) {
		currentState = !currentState;
		var model = this.getView().getModel("editModel");
		var data = model.getData();
		data.editable = currentState;
		model.refresh(true);
		if (currentState === true) {
			this.getView().byId("idProfile").setText("Save");
		} else {
			var oView2 = that.getView();
			var jsonModel = new sap.ui.model.json.JSONModel();
			that.getView().setModel(jsonModel, "j5");
			console.log(jsonModel);
			oModel = new sap.ui.model.odata.ODataModel(
					"http://dewdfcto021.wdf.sap.corp:1080/sap/opu/odata/SAP/ZOS_ADMIN_SRV");
			oModel.read("/customerSet", null, null, true, function(
					oData, oResponse) {
				jsonModel.setData(oData);
				console.log(oData);
			});
			var entity = {};
			var email = this.getView().byId("idemail2").getValue();
			var name = this.getView().byId("idname2").getValue();
			var mob = this.getView().byId("idmob2").getValue();
			var add = this.getView().byId("idadd2").getValue();
			var pass = this.getView().byId("idpasscheck").getValue();
			entity.NAME = name, entity.EMAIL_ID = email, entity.CONTACT_NO = mob, entity.ADDRESS = add,
					oModel.update(
							"/customerSet('"+onlineuser+"')", entity, {
								success : function() {
									sap.m.MessageToast
											.show("Profile Updated");
								}
							});
			this.getView().byId("idProfile").setText("Edit Profile");
		
		}
	},
	
	onCP : function() {
		var oView = this.getView();
		oDialogCP = oView.byId("userf");
		if (!oDialogCP) {
			oDialogCP = sap.ui
					.xmlfragment(oView.getId(), "ekart.userf");
			oView.addDependent(oDialog);
		}
		oDialogCP.open();
	},
	onCancel : function() {
		oDialogCP.close();

	},
	onShow : function(oEvent) {
		var val = this.getView().byId("id2").getType();
		if (val == "Password") {
			this.getView().byId("id2").setType("Text");
			this.getView().byId("id3").setText("Hide Password");
		} else {
			this.getView().byId("id2").setType("Password");
			this.getView().byId("id3").setText("Show Password");
		}
	},
	onSave : function() {
		var val = this.getView().byId("id2").getValue();
		var pass1 = this.getView().byId("idpasscheck").getValue();
		var pass2 = this.getView().byId("id1").getValue();
		var pass3 = this.getView().byId("id2").getValue();
		if (pass1 != pass2)
		{sap.m.MessageToast.show("Old Password didn't Matched");}
	
		else if (val === "") {
			sap.m.MessageToast.show("Enter a new Password");
			
			
		}
				
		 else if(pass1===pass2){
		var oView2 = that.getView();
		var jsonModel = new sap.ui.model.json.JSONModel();
		that.getView().setModel(jsonModel, "j5");
		console.log(jsonModel);
		var oModel = new sap.ui.model.odata.ODataModel(
				"http://dewdfcto021.wdf.sap.corp:1080/sap/opu/odata/SAP/ZOS_ADMIN_SRV");
		var results = oModel.read("/customerSet", null, null, true, function(
				oData, oResponse) {
			jsonModel.setData(oData);
			console.log(oData);
		});
		var entity = {};
		

		var pass = this.getView().byId("id2").getValue();

		entity.PASSWORD = pass,
				oModel.update(
						"/customerSet('"+onlineuser+"')", entity, {
							success : function() {
								sap.m.MessageToast
										.show("Password Updated");
							}
						});
		var oView = this.getView();
		var oDialog = oView.byId("userf");
		if (!oDialog) {
			oDialog = sap.ui.xmlfragment(oView.getId(),
					"ekart.userf");
			oView.addDependent(oDialog);
		}
		oDialog.close();
		 }
	
	
	},
	checkHistory : function() {
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("new");
	},
	onnavButtonPress : function(){
		var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("os");
	},
	ondelete : function (){
		var oView = this.getView();
		 oDialogDelete = oView.byId("fdelete");
		if (!oDialogDelete) {
			oDialogDelete = sap.ui.xmlfragment(oView.getId(),
					"ekart.fdelete");
			oView.addDependent(oDialogDelete);
		}
		oDialogDelete.open();
	},
	onfdelete : function(){
	var captcha = this.getView().byId('iddelete').getValue();
	if(captcha === "profit")
	var oModel = new sap.ui.model.odata.ODataModel(
			"http://dewdfcto021.wdf.sap.corp:1080/sap/opu/odata/SAP/ZOS_ADMIN_SRV");
	
	  oModel.remove("/customerSet('"+onlineuser+"')", {success : function() {sap.m.MessageToast.show("Your Account has been Deleted!");
	  oDialogDelete.close();
		}
		});
	
		  
	  var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
		oRouter.navTo("os");
	
		 localStorage.setItem("lengths", "");
		 localStorage.removeItem("aSeat");
				  localStorage.setItem("onlineuser", "GUEST");
		  this.getView("os").byId("idsignin").setText("Sign In");
		  this.getView("os").byId("idProfileButton").setText(onlineuser);
			window.location.reload();
		 
		
},
onfCancel : function(){
	oDialogDelete.close();
}

});