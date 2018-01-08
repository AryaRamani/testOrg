({
	doInit : function(component, event, helper) {
       },
    
  //set attribute to disply salesrep details 
    setAttributeValue : function(component, event, helper)
    {
        
        var eventValue= event.getParam("attributeValue");
       
       // var eventValue = "0057F000000J7f9QAC";
       // component.set("v.AttrTst", eventValue);
        var action1 = component.get('c.QueryAccnt');
        action1.setParams({"Idval":eventValue});
       
      action1.setCallback(this, function(b) {
        if (b.getState() === "SUCCESS") {
           component.set("v.Detl", b.getReturnValue());
            console.log(b.getReturnValue());
        } 
         
    });
        $A.enqueueAction(action1)

	    
         },
    //NextRecordbutton
            SaveRecord : function(component, event, helper) {
        var eventValue1= component.get('v.myvalue');
              //  component.set('v.GroupId',"0017F000008bbfDQAQ")
       
       if(eventValue1!=""){
       var action1 = component.get('c.CrtSalsRp');
                    action1.setParams({'UsrId':eventValue1,'GrpId':component.get('v.GroupId')});
       
      action1.setCallback(this, function(b) {
        if (b.getState() === "SUCCESS") {
         console.log(b.getReturnValue());
            
        } 
         
    });
        $A.enqueueAction(action1)
                }
    
       },
    //Set the User Id on click checkbox select in parent
    setId : function(component, event, helper){
        var eventValue1= event.getParam("TeamMmbr");
       component.set("v.myvalue",eventValue1)
       
        }
    
})