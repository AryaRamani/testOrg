({
	movenext : function(component, event, helper) {
        component.set("v.showSpinner",true);
		component.getEvent('sendtoParent').fire();
       

	},
    
    pauseflow : function(component, event, helper){
        var action = component.get("c.saveFlowdetails");
      
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
             alert('Flow Paused');
            }


        });

        $A.enqueueAction(action);
    },
    
    onSelection : function(component, event, helper){
    var select=event.getSource().get("v.text");
    if(select==='yes'){
    
    }
    
    }
})