({
	getGroupClass : function(component) {
    component.set("v.showSpinner",true);
	var action = component.get("c.getClassinfo");
	//console.log('Search type'+ component.get("v.searchvalue"));
	  action.setParams({
            'groupId': component.get("v.groupId"),
            /* "next": next,
            "prev": prev,
            "off": component.get("v.offset"),
            'searchtype': component.get("v.searchvalue"),
            'searchtext': component.get("v.searchtext") */
            
        });
        action.setCallback(this, function(response) {

            var state = response.getState();
            if (state === "SUCCESS") {
            	component.set("v.showSpinner",false);
                console.log('Response' + JSON.stringify(response.getReturnValue()));
                var res=response.getReturnValue();
                component.set("v.Classlst", response.getReturnValue());
               /*  component.set('v.offset', res.offst);

                component.set('v.next', res.hasnext);
                component.set('v.prev', res.hasprev); */
                // handle the response errors        
            } else if (state === "INCOMPLETE") {
                component.set("v.showSpinner",false);
                alert("From server: " + response.getReturnValue());
            } else if (state === "ERROR") {
            component.set("v.showSpinner",false);
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        // enqueue the action
        $A.enqueueAction(action);
		
		
	}
})