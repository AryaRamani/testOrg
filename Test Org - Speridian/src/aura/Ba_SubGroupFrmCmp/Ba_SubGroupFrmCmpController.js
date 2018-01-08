({
	doInit : function(component, event, helper) {
	helper.getGroupinfo(component); //fetch group information for the first sub group created
	helper.getaddress(component);//fetch group address
	helper.getratingregion(component); //fetch rating region;
	
	},
    
    handleNavigateAction : function(component, event, helper) {
        var SubGroup = component.get("v.subgroup");
         var cmpEvt= component.getEvent("navCompFlow");
        cmpEvt.setParams({
            "Objatt":  {SubGroup}
        });
        cmpEvt.fire();
    }
})