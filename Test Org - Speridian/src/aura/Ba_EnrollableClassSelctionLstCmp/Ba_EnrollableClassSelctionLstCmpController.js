({
	doInit : function(component, event, helper) {
		var action = component.get("c.getValues");
         component.set("v.showSpinner",true); 
		action.setCallback(this, function(response){
			var state = response.getState();
			console.log('State'+state);
            component.set("v.showSpinner",false);  
			if(state == "SUCCESS"){
				component.set("v.data",JSON.parse(response.getReturnValue()));
               
			}
		});
		
		$A.enqueueAction(action);
       
    
	},
    
  
   getAttributeMethod : function(component, event, helper){
         var params = event.getParam('arguments');
		 params.enrollselectedlst=component.get("v.enrollselectedlst");
		 params.GrpClass=component.get("v.GrpClass");
		 
        if (params) {
        console.log(JSON.stringify(params));
          if(component.get("v.GrpClass.ba_ProbationaryPeriod__c")==='None')
          {
        	  component.find('select-id').set("v.errors",'Please select a Probationary period');
               params.navigate=false;
          
          }
          else{
                params.navigate=true;
          }
            return params;
        }
   }
})