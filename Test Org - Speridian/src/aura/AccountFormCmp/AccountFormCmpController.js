({
	doInit : function(component, event, helper) {
        var Action = component.get("v.parentGroupId");
       
        
	
       // console.log("k"+JSON.stringify(k));
	},
    submitForm : function(component, event, helper){
      //  console.log("123")
        console.log(JSON.stringify(component.get("v.Account")));
        var Action = component.get("v.parentGroupId");
        if(Action=='Insert'){
             var action1 = component.get('c.CrtAgncy');
        
        action1.setParams({"Agncy":component.get("v.Account")});
         action1.setCallback(this, function(b) {
        if (b.getState() === "SUCCESS") {
           component.set("v.Account", b.getReturnValue());
            //console.log("Scc")
            console.log(b.getReturnValue());
        } 
          else{
              console.log("error");
          }
         
         });
       
        $A.enqueueAction(action1)
        
        
        var Account1 = component.get("v.Account")
         var editAc = $A.get("e.c:AccountViewEditEvent");
			editAc.setParams({
				"myAccount" : Account1,
                "Action" : 'Insert'
				
			});
			editAc.fire();
           // component.set("v.Account","");
        
        }else{
       var action1 = component.get('c.UpdtGrp');
        
        action1.setParams({"Acc":component.get("v.Account")});
         action1.setCallback(this, function(b) {
        if (b.getState() === "SUCCESS") {
           component.set("v.Account", b.getReturnValue());
            console.log(b.getReturnValue());
        } 
          else{
              console.log("error");
          }
         
         });
       
        $A.enqueueAction(action1)
        var Account1 = component.get("v.Account")
         var editAc = $A.get("e.c:AccountViewEditEvent");
			editAc.setParams({
				"myAccount" : Account1
				
			});
			editAc.fire();
         //   component.set("v.Account","");
        
        }
        
        
        
    }
})