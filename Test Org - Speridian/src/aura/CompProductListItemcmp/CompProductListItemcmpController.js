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
		var parentCompetitorId = component.get("v.parentCompetitorId");
		var activeParentRow = component.get("v.activeParentRow");
		var products = component.get("v.products");
		if (!$A.util.isEmpty(parentCompetitorId)) {
			helper.showSpinner(component);
			// Apex Controller Action
			var action = component.get("c.getCompetitorProducts");
			action.setParams({
				"parentCompetitorId" : parentCompetitorId
			});

			action.setCallback(this,
					function(response) {
						var state = response.getState();
						if (component.isValid() && state === "SUCCESS") {
							component.set("v.products", response
									.getReturnValue());
							helper.hideSpinner(component);
						} else {
							console.log("Failed with state: " + state);
						}
					});
			$A.enqueueAction(action);
		} else if (!$A.util.isEmpty(activeParentRow)) {
			for (var i = 0; i < products.length; i++) {
				if (products[i].ba_ParentCompetitor_Row__c == activeParentRow)
					products[i].ba_ShowRow__c = true;
				else
					products[i].ba_ShowRow__c = false;
			}
			component.set("v.products", products);
			console.log(JSON.stringify(component.get("v.products")));

		} else {
			console
					.log("parentCompetitorId Is Null and Active Parent Row Is Null");
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
	productMenuSelect : function(component, event, helper) {
		var selectedMenuAction = event.getParam("value").split("_");
		console.log(selectedMenuAction);
		var action = selectedMenuAction[0];
		var rowIdx = selectedMenuAction[1];
		var products = component.get("v.products");
		var product = products[rowIdx];
		component.set("v.activeRow", rowIdx);
		if (action == "EditProduct") {
			var editProduct = component.getEvent("editProduct");
			editProduct.setParams({
				"product" : product,
				"productidx" : rowIdx
			});
			editProduct.fire();
		} else if (action == "DeleteProduct") {
			products.splice(rowIdx, 1);
			component.set("v.products", products);
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