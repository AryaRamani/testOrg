({ 
        doInit: function(component, event, helper) {
            /*Event fired to master comp to start the flow. Not required for New Quote Request design*/
           // var cmpEvent = component.getEvent("navigationEvt"); by me 
          //  cmpEvent.fire(); by me
            /*End*/
if (component.get("v.group") == null) {
              //  component.set("v.showSpinner", true);
                var action = component.get("c.getGroupInformation");
                action.setParams({
                    "GroupId": component.get("v.GroupId")
                });

                // Add Asynch Callback For Class Action
                action
                    .setCallback(
                        this,
                        function(response) {
                            var state = response.getState();
                            if (component.isValid() && state === "SUCCESS") {
                                /*  alert('Group Information' + JSON.stringify(response
                                       .getReturnValue()));*/
                               //by me helper.getSIC(component);
                                helper.getZipCode(component);
                                helper.getaddress(component);
                               // alert(JSON.stringify(response.getReturnValue()));
                                var effdate = JSON.parse(JSON.stringify(response.getReturnValue().ba_EffectiveDate__c));
                               // alert('Date'+ effdate);
                                component.set("v.group", response.getReturnValue());
                               //by me component.set("v.group.ba_EffectiveDate__c",effdate);
                                component.set("v.showSpinner", false);

                            } else {
                                // Replace With Error Handler f/w once available
                                console.log("Failed with state: " + state);
                            }
                        });
                // Enqueue Class Action
                $A.enqueueAction(action);
            }

          

    
        },

  handlezipcode: function(component, event, helper) {
        if (!$A.util.isEmpty(component.get("v.group.zipcode"))) {

            var ziplst = component.get("v.ZipCodes");
            for (var i = 0; i < ziplst.length; i = i + 1) {
                if (component.get("v.group.zipcode") == ziplst[i].Id) {
                    component.set("v.group.ba_RatingCounty__r.Name", ziplst[i].Name);
                   
                }
            }
        }
    }

 


})