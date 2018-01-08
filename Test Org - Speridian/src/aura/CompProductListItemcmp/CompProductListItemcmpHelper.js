({
	/**
	 * Show Loading Spinner
	 * 
	 * @param {}
	 * 
	 * @return {}
	 */
	showSpinner : function(component) {

		component.set("v.IsSpinner", true);

	},

	/**
	 * Hide Loading Spinner
	 * 
	 * @param {}
	 * 
	 * @return {}
	 */
	hideSpinner : function(component) {

		component.set("v.IsSpinner", false);

	},

	/**
	 * Fetches Selected Row HTML Section From Triggering Event
	 * 
	 * @param {Component}
	 *            component
	 * @param {event}
	 *            event
	 * @return {
	 *         <tr>} selectedRowSection
	 */
	findSelectedRow : function(component, event) {
		var selectedRowSection;
		if (event.target.tagName == undefined) // Not a Valid Section
			return;
		if (!event.target) // Not A Valid Target
			return;
		var idx = event.target.getAttribute("data-data");
		if (!idx) // Not a Valid attribute Assignment
			return;
		switch (idx) {
		case "divCol": // If Selected Section is a Column
			selectedRowSection = event.target.parentNode;
			break;
		case "divData": // If Selected Section is a ui:output data element
			selectedRowSection = event.target.parentNode.parentNode;
			break;
		default:
			selectedRowSection = undefined;
			break;
		}
		return selectedRowSection;
	},

	/**
	 * Removes Selected Row CSS From Input Tables Rows
	 * 
	 * @param {Component}
	 *            component
	 * @param {
	 *            <table>} table
	 * @return {}
	 */
	unselectAllRows : function(component, table) {
		for (var i = 0, row; row = table.rows[i]; i++) {
			$A.util.removeClass(row, "slds-is-selected");
		}
	},

	/**
	 * Adds Selected Row CSS to Input HTML Row
	 * 
	 * @param {Component}
	 *            component
	 * @param {
	 *            <tr>} row
	 * @return {}
	 */
	selectRow : function(component, row) {
		$A.util.addClass(row, "slds-is-selected");
		component.set("v.activeRow", row.getAttribute("data-data"));
		var selectProduct= component.getEvent("selectProduct");
		selectProduct.setParams({
			"productidx" : row.getAttribute("data-data")
		});
		selectProduct.fire();
	}
})