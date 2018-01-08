({
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