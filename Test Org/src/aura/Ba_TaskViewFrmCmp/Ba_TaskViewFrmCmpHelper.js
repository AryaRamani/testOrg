({
	pausetask : function(component) {
	
        
		 var action = component.get("c.getRSMFlows");
      
        action.setCallback(this, function(a) {
         // store the response return value (wrapper class insatance)  
         var result = a.getReturnValue();
         console.log('result ---->' + JSON.stringify(result));
        // alert(JSON.stringify(result));
            if(result.length>0){
         // set the component attributes value with wrapper class properties.   
                   component.set("v.pauseflow",result);
                  
            }
              
      });
              
      $A.enqueueAction(action);
		
	},
	
	
	fetchtaskflow : function(component,event,helper){
	     
		 var action = component.get("c.getTaskFlows");
        action.setParams({'Entity':component.get("v.TaskEntity")
        });
        action.setCallback(this, function(a) {
         // store the response return value (wrapper class insatance)  
         var result = a.getReturnValue();
         console.log('result ---->' + JSON.stringify(result));
         this.pausetask(component);
            if(result.length>0){
         // set the component attributes value with wrapper class properties.   
                   component.set("v.taskName",result);
                   //helper.resumetask(component);
            }
                else{
                    component.set("v.taskMsg",'No Task flow found');
                }
      });
              
      $A.enqueueAction(action);
	}
})