({
	createObjrow : function(component) {
		 var RowItemList = component.get("v.packagelist");
        RowItemList.push({
            
            'CarrierName': '',
            'PlanName': '',
            'Product':'',
            'Type': '',
            'Category':''
        });
        
        // set the updated list to attribute (contactList) again    
        component.set("v.packagelist", RowItemList);
	}
})