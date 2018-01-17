({
	getAttributeMethod : function(component,event,helper){
		 var params = event.getParam('arguments');
		 
		 
        if (params) {
        params.BA_Eligiblity_Administration__c=component.get("v.BA_Eligiblity_Administration__c");
       	params.data=component.get("v.data");
       	
       	 var validation=component.find('GroupCensus-id').validateFields();
       	  
    
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