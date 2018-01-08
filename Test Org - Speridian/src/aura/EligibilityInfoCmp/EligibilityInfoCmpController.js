({
	doInit : function(component, event, helper) {
	  /* Retrive eligibility questions*/
        var action = component.get("c.fetchquestions");
        		//component.get('v.GroupId',"a0W7F000000QMABUA4")
                 // action.setParams({"GroupId":'0017F000008bbfDQAQ'});
           /* if(action!="")   
            {
                action.setParams({'GrpId':component.get('v.GroupId')});
            }*/
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
                component.set("v.eligibilityinfo", res);
                
            }
            //  console.log('SIC'+JSON.stringify(res));

        });

        $A.enqueueAction(action);
		
	},
	
	prospectpage : function(component, event, helper){
	var event2 = $A.get("e.c:navigateProspectEvt");
                	
        event2.setParams({
			"navigateto" : "c:InsertProspectCmp"
		});
        event2.fire();

                }
	},
 

})