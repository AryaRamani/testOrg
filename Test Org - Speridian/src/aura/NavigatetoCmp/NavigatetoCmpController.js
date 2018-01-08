({
	doInit : function(component, event, helper) {
   alert(component.get("v.recordId"));
         var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:MemberServicesCmp",
         componentAttributes: {
            recordId : component.get("v.recordId")
        }
        
    });
        component.set("v.showSpinner",false);
    evt.fire();
         
		
	}
})