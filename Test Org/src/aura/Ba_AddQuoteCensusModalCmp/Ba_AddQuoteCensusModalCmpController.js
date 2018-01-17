({
	showMember : function(cmp, event, helper) {
	 var cmpEvent = cmp.getEvent("modalstate");
        cmpEvent.setParams({
            "ismodal" : true ,
            "info" : cmp.get("v.newinfo"),
            "value" : cmp.get("v.tobacco")
        });
        cmpEvent.fire();
	},
	
	hidePopup : function(cmp, event, helper){
	
	  var cmpEvent = cmp.getEvent("modalstate");
        cmpEvent.setParams({
            "ismodal" : false 
        });
        cmpEvent.fire();
	}
})