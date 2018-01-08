({
	doInit : function(component, event, helper) {
	
       
            component.set("v.showSpinner",true);
            //component.set("v.parentGroupId",'0017F000008bbfDQAQ')
            var action = component.get("c.GetAddr");
          action.setParams({"GrpId":component.get("v.GroupId")})
		action.setCallback(this, function(response){
			var state = response.getState();
			console.log('State'+state);
			if(state == "SUCCESS"){
                component.set("v.showSpinner",false);
				component.set("v.Address",response.getReturnValue());
              console.log("gotit"+JSON.stringify(response.getReturnValue()));
                console.log("done12");
			}
		});
		
		$A.enqueueAction(action);
         //   component.set("v.BP.Ba_Email__c","");
    
        
        
	},
    onSingleSelectChange :function(component, event, helper){
  
       /* if(sl=='Electronic')
        {
            component.set("v.Address","");
            
        }*/
        
    }
})