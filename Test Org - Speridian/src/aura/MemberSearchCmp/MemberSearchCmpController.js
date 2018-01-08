({
	
    Search:function(component,event,helper)
    {
         var conid=component.get("v.searchmember");
         component.set("v.showSpinner",true);
         var action = component.get("c.fetchmemberdetails");
       action.setParams({
                'memberId': component.get("v.searchmember")
            });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                
                var res = response.getReturnValue();
               console.log('MemberSearch'+JSON.stringify(res));
                if(res===''||res===null){
                      component.set("v.showSpinner",false);
                     $A.util.addClass(component.find('message-id'), 'slds-show');
                    component.set("v.Message",'No Member found. Enter the correct Member ID');
                }
                else{
                 $A.util.addClass(component.find('message-id'), 'slds-hide');
                component.set("v.memberdetails",res);
                component.getEvent('sendtoParent').setParams({
            
            memberdetails : res,
            type : 'MemberDetails',
             spinner : component.get("v.showSpinner")
        }).fire();
                console.log(JSON.stringify(component.get("v.memberdetails")));
                }
              
            }
      

        });

        $A.enqueueAction(action);
            
  
    }
})