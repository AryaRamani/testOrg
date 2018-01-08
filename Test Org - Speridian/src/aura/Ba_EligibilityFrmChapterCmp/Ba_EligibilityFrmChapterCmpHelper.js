({
	showtoast : function(component, message) {
		var toastEvent = $A.get("e.force:showToast");
		toastEvent.setParams({
        "title": "Warning!",
        "message": message,
        "type" : "warning"
    });
    toastEvent.fire();
	}
})