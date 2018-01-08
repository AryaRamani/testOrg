({
	doInit : function(component, event, helper) {
   component.set("v.showSpinner",true);
         var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:MemberServicesCmp",
         componentAttributes: {
            recordId : component.get("v.recordId")
        }
        
    });
      
    evt.fire();
      component.set("v.showSpinner",false);
         
		
	}
})