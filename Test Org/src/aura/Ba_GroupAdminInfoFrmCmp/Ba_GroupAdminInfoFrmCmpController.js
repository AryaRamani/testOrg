({
    getselection: function(component, event, helper) {
        console.log(event.getSource().get("v.label"));
        if (event.getSource().get("v.label") === 'Yes') {
            $A.util.addClass(component.find('tpasection-id'), 'hideContent');
            /*Fire an event to navigate to chapter 15*/
            

        } else {
            /* displays next section if no is selected*/
            $A.util.removeClass(component.find('tpasection-id'), 'hideContent');
        }
       component.set("v.selection",event.getSource().get("v.label"));

      /*  var action = component.get("c.navigationlogicupdate");
         action.setParams({
            
            'status' :event.getSource().get("v.label")
        });
        action
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {

                    } else {

                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(action); */

    },
    
    getAttributeMethod: function(component, event, helper) {
        var params = event.getParam('arguments');
        params.Selection = component.get("v.selection");
        params.navigate = true; //no validation in child components. Can move to next component
        return params; //returns to master component
    }
    
    
})