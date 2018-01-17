({
	getdetails : function(component, event, helper) {
		alert('Here');
		var lineid = component.find('line2');
      console.log('Aura Id'+lineid);
        	for(var cmp in lineid) {
        	$A.util.toggleClass(lineid[cmp], 'slds-is-active');  
        	$A.util.toggleClass(lineid[cmp], 'slds-is-inactive');  
       }
	}
})