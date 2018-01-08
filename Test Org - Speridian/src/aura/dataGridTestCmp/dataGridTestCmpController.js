({
	doInit : function(component, event, helper) {
		var action = component.get("c.getAccounts");
		
		action.setCallback(this, function(response){
			var state = response.getState();
			console.log('State'+state);
			if(state == "SUCCESS"){
				component.set("v.data",JSON.parse(response.getReturnValue()));
			}
		});
		
		$A.enqueueAction(action);
	}
})