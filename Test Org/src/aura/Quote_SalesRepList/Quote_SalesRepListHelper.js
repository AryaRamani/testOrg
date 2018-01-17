({
    Doinit : function(component) {
         
    },
  
 createc : function(component){    
     var action1 = component.get('c.AcctTm');  
      action1.setCallback(this, function(b) {
        if (b.getState() === "SUCCESS") {
           component.set("v.SlsRep", b.getReturnValue());
            console.log(b.getReturnValue());
              } 
        
    });
     $A.enqueueAction(action1)
         
      var SalsRepclick = component.get("v.SlsRep[0].Id"); 
      var setEvent2 = $A.get("e.c:SalesRepSetAttributeEvent");
      setEvent2.setParams({'attributeValue':component.get("v.SlsRep[0].Id")});
      setEvent2.fire();
     
    }
    
})