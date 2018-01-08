({
	 doInit : function(component,event,helper) {
	 
	},
	
	gotoSelected : function(component, event, helper) {
	 
		
	},
	
	 sectionOne : function(component, event, helper) {
      var acc = component.find('articleOne');
      console.log('Aura Id'+acc);
        	for(var cmp in acc) {
        	$A.util.toggleClass(acc[cmp], 'slds-show');  
        	$A.util.toggleClass(acc[cmp], 'slds-hide');  
       }
    },
})