({
    Doinit : function(component) {
  
         
    },
  
 createc : function(component){
     // component.set("v.Mmbr", {Id: "123", First_Name__c: "Test", Last_Name__c: "Test1"});
      
      var action1 = component.get('c.AcctTm');
       
      action1.setCallback(this, function(b) {
        if (b.getState() === "SUCCESS") {
           component.set("v.SlsRep", b.getReturnValue());
            console.log(b.getReturnValue());
            
            
              } 
         
    });
        $A.enqueueAction(action1)
       
       
           var SalsRepclick = component.get("v.SlsRep[0].Id"); 
        var setEvent2 = $A.get("e.c:Ba_SalesRepSetAttributeEvt");
        setEvent2.setParams({'attributeValue':component.get("v.SlsRep[0].Id")});
       setEvent2.fire();
     
        

       
    //console.log(SalsRepclick);
     
    }
    
})