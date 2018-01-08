({
   getAccounts: function(component, page, recordToDisply) {
 
      // create a server side action. 
      var action = component.get("c.fetchAccount");
      // set the parameters to method 
      action.setParams({
         "pageNumber": page,
         "recordToDisply": recordToDisply,
          "Type":'Employer Group'
      });
      // set a call back   
      action.setCallback(this, function(a) {
         // store the response return value (wrapper class insatance)  
         var result = a.getReturnValue();
         console.log('result ---->' + JSON.stringify(result));
         // set the component attributes value with wrapper class properties.   
 
         component.set("v.Accounts", result.Accounts);
          component.set("v.Account",result.Accounts)
         component.set("v.page", result.page);
         component.set("v.total", result.total);
         component.set("v.pages", Math.ceil(result.total / recordToDisply));
         /* for(var i=0;i<7;i++){
         component.set("v.IdNum",i);
          }*/
         // component.set("v.IdNum",{0,1,2,3,4,5,6})
      });
      // enqueue the action 
      $A.enqueueAction(action);
   },
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
		component.set("v.activeRow", row.getAttribute("data-data"));
		
	}
})