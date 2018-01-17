({
	doInit : function(component, event, helper) {
        
        
        var action = component.get("c.Value");
                 component.set("v.showSpinner",true);
        action.setParams({"GrpId":component.get("v.GroupId")});
        //action.setParams({"GrpId":"GrpId"})
         component.set("v.showSpinner",false); 
		action.setCallback(this, function(response){
			var state = response.getState();
			console.log('State'+state);
			if(state === "SUCCESS"){
				component.set("v.data",JSON.parse(response.getReturnValue()));     
			}
		});
		
		$A.enqueueAction(action);
       
     
	}
})