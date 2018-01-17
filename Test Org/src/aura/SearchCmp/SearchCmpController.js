({
    doInit:function(component,event,helper) {
        /* to retrieve the datalist values of contact*/
          var action = component.get("c.fetchlist");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
                component.set("v.details", res);
              //  var restoresearch=res;
            }
            //  console.log('SIC'+JSON.stringify(res));

        });

        $A.enqueueAction(action);
    },
    
    Search: function(component, event, helper) {
        var searchKeyFld = component.find("searchId");
        var srcValue = searchKeyFld.get("v.value");
        if (srcValue == '' || srcValue == null) {
            // display error message if input value is blank or null
            searchKeyFld.set("v.errors", [{
                message: "Enter Search Keyword."
            }]);
        } else {
            searchKeyFld.set("v.errors", null);
            // call helper method
           // helper.porducerlist(component,event);
            helper.SearchHelper(component, event);
        }
    },
    
    // to select check box of contact
     selectcontact: function(component, event, helper) {
    /* on selecting the checkbox to get the index of the list*/
        var index = event.getSource().get("v.text");
        component.set("v.index", index);
         console.log('Index'+index);


    },
})