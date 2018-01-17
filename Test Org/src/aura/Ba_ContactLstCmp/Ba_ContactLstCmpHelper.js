({
	findSelectedRow : function(component, event) {
		var selectedRowSection;
		if (event.target.tagName == undefined) // Not a Valid Section
			return;
		if (!event.target) // Not A Valid Target
			return;
		var idx = event.target.getAttribute("data-data");
        console.log("idx"+event.target.parentNode);
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
        //console.log("Sl"+selectedRowSection);
		return selectedRowSection;
	},
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
	//	component.set("v.activeRow", row.getAttribute("data-data"));
		
	}
})