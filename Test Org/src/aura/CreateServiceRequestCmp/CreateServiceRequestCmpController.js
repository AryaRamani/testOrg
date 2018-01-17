({
	doInit : function(component, event, helper){
	var area = [
            { value:"Member Services", label: "Member Services" }
            
          
         ];
 
    component.set("v.Area",area);  
    
    var method = [
            { value:"Phone", label: "Phone" }
            
          
         ];
         
   var priority = [
            { value:"3-Medium", label: "3-Medium" }
            
          
         ];
         

 
    component.set("v.Area",area);  
    component.set("v.contactmethod", method);
      component.set("v.priority", priority);
    console.log('Member Details'+JSON.stringify(component.get("v.MemberDetails")));
    console.log('Case Details'+JSON.stringify(component.get("v.CaseDetails")));
    
    
	},
    
    createServiceDetails : function(component, event, helper){
    console.log('PCP Case'+JSON.stringify(component.get("v.pcpCase")));
         var action = component.get("c.createservice");
       action.setParams({
               'memberId': component.get("v.MemberDetails.MemberId"),
                'waitinginfo' : component.get("v.CaseDetails.waiting"),
                 'pcp' : JSON.stringify(component.get("v.pcpCase")),
                'servicedetails' : component.get("v.service")
               
               
            });
        action.setCallback(this, function(response) {
            var state = response.getState();
           
            if (state === "SUCCESS") {
            var servicedetails=response.getReturnValue();
              var CaseDetails = {
         
            'ServiceData':servicedetails,
            'Area':component.find("area-id").get("v.value"),
            'contactmethod':component.find("prefer-id").get("v.value"),
            'priority' : component.find("priorityid").get("v.value"),
            'summary' : component.get("v.summary") 
            
            
        };
       console.log('Details'+JSON.stringify(CaseDetails));
        
      component.getEvent('sendtoParent').setParams({
            
            ServiceDetails : CaseDetails,
            service : component.get("v.service")
         
        }).fire();
               
              
            }
             });
          
        $A.enqueueAction(action);
    },
    
    gotoprevious : function(component, event, helper){
     component.getEvent('gotoPrevious').setParams({
            
            
            
        }).fire();
    
    
    },
    
    
})