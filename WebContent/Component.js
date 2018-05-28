sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/model/json/JSONModel"
], function (UIComponent, JSONModel) {
	return UIComponent.extend("sapnda.Component", {
 
		metadata : {
			manifest: "json"
		},
 
		init : function () {
			
			sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
		    this.getTargets().display("Main");
 
			// call the init function of the parent
			UIComponent.prototype.init.apply(this, arguments);
			
			// create the views based on the url/hash
            
			
			this.getRouter().initialize();
			
			
		}
	});
 
});