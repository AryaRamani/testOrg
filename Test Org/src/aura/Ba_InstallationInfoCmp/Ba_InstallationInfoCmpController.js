({
	doInit : function(component, event, helper) {
	console.log('In installation'+JSON.stringify(component.get("v.pAttlist")));
	 var cmpEvent = component.getEvent("navigationEvt");
        cmpEvent.fire();
	}
})