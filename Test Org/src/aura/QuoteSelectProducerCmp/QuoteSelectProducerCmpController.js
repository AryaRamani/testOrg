({
	doInit : function(component, event, helper) {
	
         component.set("v.showSpinner",true);
         var action =component.get("c.SCntct");
        //Have to pass the parentgroupId and AgencyId 
        //var parentGroupId = component.get("v.parentGroupId");
       // AgncyId
       
        action.setParams({"AgncyId":component.get("v.agency") });
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state === "SUCCESS")
            {
                 component.set("v.showSpinner",false);
                console.log(JSON.stringify(response.getReturnValue()));
                component.set("v.Producer",response.getReturnValue());
                console.log('Producer'+JSON.stringify(component.get("v.Producer")));
            }
        });
        $A.enqueueAction(action);
        //checking 
        
       /*  if (!$A.util.isEmpty(parentGroupId)) {
			helper.showSpinner(component);
			// Apex Controller Action
			action = component.get("c.SCntct");
			action.setParams({
				"parentGroupId" : parentGroupId
			});
            
       // $A.enqueueAction(action);
            
            //checking
			$A.enqueueAction(action);
		} else {
			console.log("parentGroupId Is Null");
		}*/
        
        
      
		
	},
    
    gotoNextstep : function(component, event, helper){
        component.set("v.showSpinner",true);
         var compEvent = component.getEvent("sendtoParent");
        compEvent.setParams({
            "Agency": component.get("v.agency"),
            "Producer": component.get("v.Producer")
        });
        compEvent.fire();
    },
    
    moveback : function(component, event, helper){
        component.set("v.showSpinner",true);
        var compEvent = component.getEvent("navigateback");
        compEvent.setParams({
          "Agency": component.get("v.agency"),
            "Producer": component.get("v.Producer")
        });
        compEvent.fire();
    },
    
    getAgencyId : function(component, event, helper){
     var agencyId=event.getParam("AgencyId");
        
         component.set("v.showSpinner",true);
         var action =component.get("c.SCntct");
        //Have to pass the parentgroupId and AgencyId 
        //var parentGroupId = component.get("v.parentGroupId");
       // AgncyId
           console.log('Agency Id'+agencyId);
        action.setParams({"AgncyId": agencyId });
        action.setCallback(this,function(response){
            var state = response.getState();
            console.log(state);
            if(state === "SUCCESS")
            {
                 component.set("v.showSpinner",false);
                console.log(JSON.stringify(response.getReturnValue()));
                component.set("v.Producer",response.getReturnValue());
                console.log('Producer'+JSON.stringify(component.get("v.Producer")));
                 console.log('Length'+component.get("v.Producer").length);
        
            }
        });
        $A.enqueueAction(action);
       
    }
})