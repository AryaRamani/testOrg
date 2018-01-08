({
    
    doInit : function(component, event, helper) {
      var action =component.get("c.CrtSalsRp");  
        action.setParams({"GrpId":component.get("v.GroupId") });
        action.setCallback(this,function(response){
            var state = response.getState();
            
            
            if(state === "SUCCESS")
            {
                console.log(JSON.stringify(response.getReturnValue()));
                component.set("v.SlsRep",response.getReturnValue());
            }
        });
        $A.enqueueAction(action); 
         
    },
     updateContact : function(component, event, helper) {
    
	},
    SrchRep : function(component, event, helper) {
       helper.createc(component);
	},
    clickEvent : function(component, event, helper){  
        
        var click = event.currentTarget.id
        console.log("click"+click)
       //var setEvent = component.getEvent("setAttribute");
        var setEvent = $A.get("e.c:SalesRepSetAttributeEvent");
        setEvent.setParams({'attributeValue':click});
        setEvent.fire();
       
},
    clickbox : function(component, event, helper){
       var k = event.currentTarget.id
       var chkd= event.currentTarget.checked;
        
        if(chkd== true){      
        var SalsRep = component.get("v.SlsRep[1].Id");
        var setEvent1 = $A.get("e.c:SalesRepSaveRecordEvent");
        setEvent1.setParams({'TeamMmbr':k});
       setEvent1.fire();
        var test1 = setEvent1.getParam("TeamMmbr")
        console.log(test1);
        }
        else{
           // var acct = component.get("v.AcctTm");
        var setEvent1 = $A.get("e.c:SalesRepSaveRecordEvent");
        setEvent1.setParams({'TeamMmbr':""});
       setEvent1.fire();
        var test1 = setEvent1.getParam("TeamMmbr")
            
        }
      

    }
    
})