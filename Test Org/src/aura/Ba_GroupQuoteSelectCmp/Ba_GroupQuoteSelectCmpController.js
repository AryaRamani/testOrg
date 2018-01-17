({
	handleNavigateAction : function(component, event, helper) {
    var attinfo = component.find('data-id').getSelectedLst();
    
    
    var cmpEvt= component.getEvent("navCompFlow");
        cmpEvt.setParams({
            "Objatt":  attinfo
        });
        cmpEvt.fire();
	},
    
   
})