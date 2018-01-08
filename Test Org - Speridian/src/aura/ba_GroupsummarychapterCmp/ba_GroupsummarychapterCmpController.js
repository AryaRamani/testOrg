({
	doInit : function(component, event, helper) {
		  /*Event fired to master comp to start the flow. Not required for New Quote Request design*/
		 
        var cmpEvent = component.getEvent("navigationEvt");
        cmpEvent.fire(); 
      
         /*End*/ 
         
		/*var initComplete = component.getEvent("ChapterInitCmpEvt");
		initComplete.setParams({
			"componentName" : "ba_GroupsummarychapterCmp"
		});
		initComplete.fire(); */
	},
	
	
	
	/* aura:method invoked from the Master flow component to get attribute methods
		returns attribute methods as well as validation status from the child components
		returns false if validation fails in child components
	 */
	 
	getAttributeMethod : function(component,event){
		 var params = event.getParam('arguments');
		 params.group=component.get("v.group");
		 
		 var validation=component.find('GrpSummary').validateFields();
		
        if (params) {
    
          // alert('Validation'+validation.validate);
          if(validation.validate){
             params.navigate=true;
          }
          else{
          params.navigate=false;
          }
         // alert('Navigation'+params.navigate);
            return params;
        }
	}
})