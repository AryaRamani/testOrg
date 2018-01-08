({
	getServiceInfo : function(component, event, helper) {
	
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
      "recordId": component.get("v.ServiceDetails.ServiceData.Id")
    
    });
    navEvt.fire();
			
	},
	
	gotomembertask : function(component, event, helper){
	 component.getEvent('sendtoParent').setParams({
            
           sequence:'BAMMemberService'
        }).fire();
	},
	
	 gotoprevious : function(component, event, helper){
     component.getEvent('gotoPrevious').setParams({
            
            
        }).fire();
    
    
    }
	
	
	
	
})