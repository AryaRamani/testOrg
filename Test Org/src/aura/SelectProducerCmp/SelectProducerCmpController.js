({
	doInit : function(component, event, helper) {
        var parentGroupId = component.get("v.parentGroupId");
		var action = component.get('c.SCntct');
				
       action.setParams({"AgncyId":'0017F0000060ubhQAA' });
       action.setCallback(this, function(b) {
        if (b.getState() === "SUCCESS") {
           component.set("v.Producer", b.getReturnValue());
            console.log(b.getReturnValue());
        } 
         
    });
        //checking 
        
        /* if (!$A.util.isEmpty(parentGroupId)) {
			helper.showSpinner(component);
			// Apex Controller Action
			action = component.get("c.SCntct");
			action.setParams({
				"parentGroupId" : parentGroupId
			});*/
            
        $A.enqueueAction(action);
            
            //checking
/*			$A.enqueueAction(action);
		} else {
			console.log("parentGroupId Is Null");
		}*/
	}
	
})