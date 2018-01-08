({
	doInit : function(component, event, helper) {
       // component.set('v.CERx.Ba_Category__c','Prescription/Rx');
       // component.set('v.CEHealth.Ba_Category__c','Health');
		
	},
    
    getAttributeMethod : function(component, event, helper){
	       var params = event.getParam('arguments');
		 params.CEHealth=component.get("v.CEHealth");
		 params.CERx= component.get("v.CERx");
        if (params) {
        console.log(JSON.stringify(params));
          
            return params;
        }
	}
})