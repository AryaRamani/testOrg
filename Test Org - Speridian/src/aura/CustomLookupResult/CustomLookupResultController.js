({
    selectCode: function(component, event, helper) {
     
        /* Event to pass the selected zip code to customLookUpCmp*/
        var getselectedcode = component.get("v.zipcode");
        var compEvent = component.getEvent("zipcodeEvt");
        compEvent.setParams({
            "codeByEvent": getselectedcode
        });
        compEvent.fire();
        
       
    },
})