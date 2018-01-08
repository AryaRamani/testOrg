({
   
    
     doAction : function(component) {
         
   
    var input1 = component.find("check1");
    var input2 = component.find("check2");
    var input3 = component.find("check3");
    var input4 = component.find("check4");  
        
     //alert(input1);
     var value1 = input1.get("v.value");
     var value2 = input2.get("v.value");
     var value3 = input3.get("v.value");
     var value4 = input4.get("v.value");
       //alert(value1);
   
       if (value1 === false || value2=== false || value3=== false || value4=== false) {
           
          component.set("v.alertMessage","Please make sure to select all the items for member verification.");
           $A.util.removeClass(component.find('msg-id'), 'hideContent');
       } else {
           // input.set("v.errors", null);
            $A.util.addClass(component.find('msg-id'), 'hideContent');
            
             var action = component.get("c.createtask");
       action.setParams({
                'memberId': component.get("v.MemberDetails.MemberId") 
            });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                
              var toastEvent = $A.get("e.force:showToast");
    				toastEvent.setParams({
       				 "title": "Success!",
       				 "message": "Member is Verified. Task is created"
    			});
    		toastEvent.fire();
             component.getEvent('sendtoParent').setParams({
            	memberdetails : component.get("v.MemberDetails"),
            	type : 'MemberDetails',
            	spinner : component.get("v.showSpinner")
            }).fire();
              
              
              
            }
      

        });

        $A.enqueueAction(action);
       
        } 
         
         
    },
     handleError: function(component, event){
        
        var errorsArr  = event.getParam("errors");
        for (var i = 0; i < errorsArr.length; i++) {
            console.log("error " + i + ": " + JSON.stringify(errorsArr[i]));
        }
    },

    handleClearError: function(component, event) {
        
    },
   
    doinit : function(component, event, helper) {
        console.log('Member Verification'+component.get("v.MemberDetails"));
    }
 
})