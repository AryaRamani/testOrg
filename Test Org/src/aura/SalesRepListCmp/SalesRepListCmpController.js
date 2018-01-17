({
    
    doInit : function(component, event, helper) {
       
       
    },
     updateContact : function(component, event, helper) {
    
	},
    SrchRep : function(component, event, helper) {
       helper.createc(component);
	},
    clickEvent : function(component, event, helper){  
        
        var click = event.currentTarget.id
       //var setEvent = component.getEvent("setAttribute");
        var setEvent = $A.get("e.c:SalesRepSetAttributeEvent");
        setEvent.setParams({'attributeValue':click});
        setEvent.fire();
        //var eventValue = setEvent.getParam("attributeValue");
        //console.log(click)

         //var eventValue= event.
        // console.log(test1);
},
    clickbox : function(component, event, helper){
       var k = event.currentTarget.id
       var chkd= event.currentTarget.checked;
        if(chkd== true){
      
        var SalsRep = component.get("v.SlsRep[1].Id");
        
       // component.set("v.AcctTm",{TeamMemberRole: "SalesRep",UserId: component.get("v.SlsRep[1].Id")});
       // var acct = component.get("v.AcctTm");
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
        //console.log(test1);
     //   this.getElementbyClass("uiInputCheckbox");

    }
    
})