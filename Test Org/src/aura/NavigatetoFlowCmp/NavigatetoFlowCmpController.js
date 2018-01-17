({
	doInit : function(component, event, helper) {
        var evt = $A.get("e.force:navigateToComponent");
    evt.setParams({
        componentDef : "c:MemberServicesCmp",
        componentAttributes: {
            taskflow : component.get("v.recordId")
        }
    });
    evt.fire();
		
	}
})