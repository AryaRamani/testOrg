({
	submitForm : function(component, event, helper) {
      // console.log(component.get('v.con1'));
      // var test= component.get('v.con1')
        var action1 = component.get('c.CrtCntact');
     action1.setParams({
        // "Cntct" : component.get('v.con1')
         "FstName" : component.get('v.FstName'),
         "LstName" : component.get('v.LstName'),
         "Email" : component.get('v.Email'),
         "Phone" : component.get('v.Phone'),
         "Gender" : component.get('v.Gender')
        
      });  
      console.log(JSON.stringify(action1.getParams()));
      action1.setCallback(this, function(b) {
        if (b.getState() === "SUCCESS") {
           //component.set("v.SlsRep", b.getReturnValue());
            console.log("TestContact" + b.getReturnValue());
            console.log("done");
            
            
              } 
         
    });
        $A.enqueueAction(action1);
	
         var setEvent1 = $A.get("e.c:CloseContactModalEvnt");
    
       setEvent1.setParams({"ClsAttr": false});
       setEvent1.fire();
      //  console.log("done"); 
       //console.log(setEvent1.getParams('ClsAttr'));      
    },
    doInit : function(component, event, helper){
    
}
})