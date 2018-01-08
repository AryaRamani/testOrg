({
	CreateCmp : function(component) {
        console.log("vdata"+component.get("v.data"));
        $A.createComponent("c:strike_dataGrid", {"data":component.get("v.data")

        }, function(newCmp) {
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
        });
	}
})