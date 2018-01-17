({
	 /**
	 * aura method to be invoked from Master Flow
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return parameters to be sent to master component
	 */ 
    
    
    
    getAttributeMethod: function(component, event, helper) {
        var params = event.getParam('arguments');
        params.navigate = true; //no validation in child components. Can move to next component
        return params;   //returns to master component
    }
})