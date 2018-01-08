({
	doInit : function(component, event, helper) {
	/* To fetch dependent details to display in table.*/
       
	var action = component.get("c.fetchAccountDetails");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
               
                component.set("v.accountdetails",res);
                component.set("v.total","20");
            }
           
        });

        $A.enqueueAction(action);
	},
    
    displayselected : function(component,event,helper){
        var buttonid=component.get("v.buttonsort");
        
    }
    
    
})