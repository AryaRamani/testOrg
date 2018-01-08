({

	/**
	 * Opens Modal Popup For New Competitor Product
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	addnew : function(component, event, helper) {
		component.set("v.activeRow", -1);
		component.set("v.modalIsOpen", true);
	},

	/**
	 * Opens Modal Popup For Editing an Existing Competitor Product
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	editProduct : function(component, event, helper) {
		var product = event.getParam("product");
		var productidx = event.getParam("productidx");
		component.set("v.activeRow", productidx);
		component.set("v.product", product);
		component.set("v.modalIsOpen", true);
		helper.selectRow(component, productidx);
	},

	/**
	 * Closes Modal Popup For Add/Editing Competitor Product
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	closeModel : function(component, event, helper) {
		// for Hide/Close Model,set the "modalOpen" attribute to "Fasle"
		component.set("v.modalIsOpen", false);
	},

	/**
	 * Sets Active Row Selection Attribute on Competitor Product Selection
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	selectCompetitorProduct : function(component, event, helper) {
		var productidx = event.getParam("productidx");
		component.set("v.activeRow", productidx);
		helper.selectRow(component, productidx);
	},

	/**
	 * Handler Method For Add New OR Edit Existing Competitor Product
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	handleAddCompProduct : function(component, event, helper) {
		var products = component.get("v.products");
		var product = event.getParam("product");
		var productidx = component.get("v.activeRow");
		var competitoridx = component.get("v.activeParentRow");
		var chldprodlistcmp = component.find("compProductListItemChld");
		product.ba_ParentCompetitor_Row__c = competitoridx;
		if (productidx == -1)
			products.push(product);
		else
			products[productidx] = product;
		component.set("v.products", products);
		component.set("v.modalIsOpen", false);
		chldprodlistcmp.refreshProductList();
	},
	
	
	/**
	 * Communicates Change in Parent Context to Refresh Child Component
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	parentRecordChanged : function(component, event, helper) {
		var chldprodlistcmp = component.find("compProductListItemChld");
		chldprodlistcmp.refreshProductList();
	},
})