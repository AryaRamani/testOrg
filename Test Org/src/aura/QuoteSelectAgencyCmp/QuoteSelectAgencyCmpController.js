({
	doInit : function(component, event, helper) {
        //Add functionality to create new Agency or remove an agency.
        //On selection of agency the producer should be displayed.
        var action =component.get("c.Saccnt");
         action.setParams({"GrpId":component.get("v.GroupId") });
        action.setCallback(this,function(response){
            var state = response.getState();
           // alert("hi");
            console.log(state);
            if(state === "SUCCESS")
            {
                console.log(JSON.stringify(response.getReturnValue()));
                component.set("v.Agency",response.getReturnValue());
              //  $A.util.removeClass(component.find('prod-id'), 'hideContent');
            }
        });
        $A.enqueueAction(action);
		
	},
	
	getproducers : function(component, event, helper){
	var target = event.currentTarget.dataset.rowIndex;
	console.log('Target'+target);
	var ids = component.find('row-id');
		if (ids.length === undefined) {
			$A.util.addClass(component.find('row-id'), 'row');
		}
		console.log('Id' + ids);
		for (var i = 0; i < ids.length; i = i + 1) {
			if (target == i) {
				$A.util.addClass(component.find('row-id')[i], 'row');
			} else {
				$A.util.removeClass(component.find('row-id')[i], 'row');
			}
		}
	    console.log('Agency'+JSON.stringify(component.get("v.Agency")));
		var agency=component.get("v.Agency")[target].Id;
		component.set("v.agencyId",agency);
         var compEvent = component.getEvent("sendtoProducer");
        compEvent.setParams({
            "AgencyId": component.get("v.agencyId"),
            
        });
        compEvent.fire();
		
	
	}
})