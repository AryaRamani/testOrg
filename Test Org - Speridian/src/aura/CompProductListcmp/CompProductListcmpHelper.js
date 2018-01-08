({
	/**
	 * Propogates Active Row Selection up the Component Chain
	 * 
	 * @param {Component}
	 *            component
	 * @param {Integer}
	 *            componentidx
	 * @return {}
	 */
	selectRow : function(component, productidx) {
		var activeCompProductChange = component
				.getEvent("activeCompProductChange");
		activeCompProductChange.setParams({
			"productidx" : productidx
		});
		activeCompProductChange.fire();
	}
})