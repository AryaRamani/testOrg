({
	/**
	 * Do Init
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	doInit : function(component, event, helper) {
		var parentGroupId = component.get("v.parentGroupId");

		if (!$A.util.isEmpty(parentGroupId)) {
			helper.showSpinner(component);
			// Apex Controller Action
			var action = component.get("c.getGroupCompetitors");
			action.setParams({
				"parentGroupId" : parentGroupId
			});

			// Set Callback behavior when response is recieved from Apex
			// Controller
			action.setCallback(this, function(response) {
				var state = response.getState();
				if (component.isValid() && state === "SUCCESS") {
					component.set("v.competitors", response.getReturnValue());
					helper.hideSpinner(component);
				} else {
					console.log("Failed with state: " + state);
				}
			});

			// Send action off to be executed
			$A.enqueueAction(action);
		} else {
			console.log("parentGroupId Is Null");
		}
	},

	/**
	 * Fires Events For Edit & Delete Menu Actions
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	competitorMenuSelect : function(component, event, helper) {
		var selectedMenuAction = event.getParam("value").split("_");
		var action = selectedMenuAction[0];
		var rowIdx = selectedMenuAction[1];
		var competitors = component.get("v.competitors");
		var competitor = competitors[rowIdx];
		component.set("v.activeRow", rowIdx);
		if (action == "EditCompetitor") {
			var editCompetitor = component.getEvent("editCompetitor");
			editCompetitor.setParams({
				"competitor" : competitor,
				"competitoridx": rowIdx
			});
			editCompetitor.fire();
		} else if (action == "DeleteCompetitor") {
			competitors.splice(rowIdx, 1);
			component.set("v.competitors", competitors);
		} else {
			// Do Nothing
		}
	},

	/**
	 * Handles Selection of List Item Row
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	handleRowSelect : function(component, event, helper) {
		var selectedRowSection = helper.findSelectedRow(component, event);
		if (selectedRowSection == undefined) {
			// Do Nothing
		} else {
			var table = selectedRowSection.parentNode;
			helper.unselectAllRows(component, table);
			helper.selectRow(component, selectedRowSection);
		}
	},

})