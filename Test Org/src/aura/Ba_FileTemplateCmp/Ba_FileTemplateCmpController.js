({
	filepreview : function(component, event, helper) {
	  /*    var action = component.get("c.displaytemplatefile");
        action.setParams({
            "filename": component.get("v.filename")
        });

        // Add Asynch Callback For Class Action
        action
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                   component.set("v.fileId",response.getReturnValue());
                   alert('Id'+response.getReturnValue());
                    $A.get('e.lightning:openFiles').fire({
        recordIds: [component.get("v.fileId")]
    });

                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(action); */
        
        var urlEvent = $A.get("e.force:navigateToURL");
        var filename=component.get("v.filename");
        
    urlEvent.setParams({
      "url": $A.get('$Resource.'+filename)
    });
    urlEvent.fire();
        
     
		
	}
})