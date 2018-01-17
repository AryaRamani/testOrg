({
    doInit: function(component, event, helper) {
        component.set("v.showSpinner", true);
        //component.set("v.parentGroupId",'0017F000008bbfDQAQ')
        var action = component.get("c.GetAddr");
        action.setParams({
            "GrpId": component.get("v.GroupId")
        })
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log('State' + state);
            if (state == "SUCCESS") {
                component.set("v.showSpinner", false);
                component.set("v.Address", response.getReturnValue());
                console.log("gotit" + JSON.stringify(response.getReturnValue()));
                console.log("done12");
            }
        });

        $A.enqueueAction(action);
        //   component.set("v.BP.Ba_Email__c","");




    },
    onSingleSelectChange: function(component, event, helper) {
        /* var slct = component.find("BMid")
      var sl = slct.get("v.value");
        
        var Addr = component.get("v.Address");
        //var Addr;
        console.log(sl)
        if(sl=='Paper' && (Addr==null || Addr==""))
        {
            component.set("v.showSpinner",true);
            //component.set("v.parentGroupId",'0017F000008bbfDQAQ')
            var action = component.get("c.GetAddr");
          action.setParams({"GrpId":component.get("v.parentGroupId")})
		action.setCallback(this, function(response){
			var state = response.getState();
			console.log('State'+state);
			if(state == "SUCCESS"){
                component.set("v.showSpinner",false);
				component.set("v.Address",response.getReturnValue());
              console.log("gotit"+JSON.stringify(response.getReturnValue()));
                console.log("done12");
			}
		});
		
		$A.enqueueAction(action);
            component.set("v.BP.Ba_Email__c","");
        }
        else
        {
            
           // $A.util.addClass(component.find("Emailid"), "disabl");
            component.set("v.Address","");
            component.set("v.BP.Ba_Email__c",component.get("v.Email"));
        }
       /* if(sl=='Electronic')
        {
            component.set("v.Address","");
            
        }*/

    },

    /**
     * aura method to be invoked from Master Flow
     * 
     * @param {Component}
     *            component
     * @param {Event}
     *            event
     * @param {Helper}
     *            helper
     * @return parameters to be sent to master component - Billing Information
     */

    getAttributeMethod: function(component, event, helper) {
        var params = event.getParam('arguments');
        params.BP = component.get("v.BP");
        params.Address = component.get("v.Address");
        if($A.util.isEmpty(component.get("v.BP.Name"))||$A.util.isEmpty(component.get("v.Address.ba_AddressLine_1__c"))){
         if($A.util.isEmpty(component.get("v.BP.Name"))){
        var name = component.find('Nameid').get("v.validity.valueMissing");
        component.find('Nameid').showHelpMessageIfInvalid();
        }
        if($A.util.isEmpty(component.get("v.Address.ba_AddressLine_1__c"))){
        var name = component.find('Address1Id').get("v.validity.valueMissing");
        component.find('Address1Id').showHelpMessageIfInvalid();
        }
        params.navigate = false;
        
        }
        else{
        params.navigate = true;
        alert('Billing Profile method2'+params);
        }
        return params; //returns to master component
    }
})