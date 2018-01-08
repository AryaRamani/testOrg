({

	/**
	 * Form Submit Action Controller
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	submitForm : function(component, event, helper) {
		if (helper.validate(component)) {
			// Create the new Competitor Product
			var newProduct = component.get("v.product");
			helper.saveProduct(component, newProduct);

		}
	},
})