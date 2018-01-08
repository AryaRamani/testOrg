({
    doInit : function(component, event, helper){
       // if(component.get("v.Account") || component.get("v.recordId"))
       {
            component.set("v.showSpinner",true);
           
            var childobjects = component.get("v.ChildObj");
            var selectedOptions;
            if(childobjects){ selectedOptions= childobjects.split(",");}
            helper.getDetailsDyn(selectedOptions,component, event, helper);
            
            var ChildObjects = component.get("v.ChildObjects");
           if(ChildObjects.length == 0)  helper.getChildObjectList(component,event,helper);
        }
    // alert('child Objects'+JSON.stringify( component.get("v.childRecords")));  
    },
    
    handleid:function(component,event,helper)
    { 
       
        var id = event.getParam("Accountid");   
        component.set("v.Account",id);
        if(component.get("v.Account")){
            component.set("v.showSpinner",true);
            var childObjts =  component.get("v.ChildObj");
         	var selectedOptions,values;
            
            if(childObjts && component.get("v.SelectedOptions").length == 0 ){ selectedOptions= childObjts.split(",");}
            else if(childObjts && component.get("v.SelectedOptions").length != 0){ 
                values = childObjts.split(",");
                selectedOptions=component.get("v.SelectedOptions");
                selectedOptions.push(values);                
            }else {selectedOptions=component.get("v.SelectedOptions");}
            helper.getDetailsDyn(selectedOptions,component, event, helper);
            var ChildObjects = component.get("v.ChildObjects");
           if(ChildObjects.length == 0) helper.getChildObjectList(component,event,helper);
          
        }  
    },
    // to navigate to related list
    gotoRelatedList : function(component,event,helper){
      
         if(component.get("v.Account")){
            var objname=event.currentTarget.id; // id = child relationship name
          	var relatedListEvent = $A.get("e.force:navigateToRelatedList");
            relatedListEvent.setParams({
                "relatedListId": objname,
                 "parentRecordId": component.get("v.Account")
            });
            relatedListEvent.fire();
        }
    },
    // to navigate to sObject dynamically
    navigateToObject:function(component,event,helper){
         var Id =event.currentTarget.id; // id = child record Id 
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({
            "recordId":Id,
            "slideDevName": "detail"
            
        });
        navEvt.fire();        
    },
    showPopUp : function (component,event){
       component.set("v.showModel",true);
      
    },
    hideModal : function(component){
    	 component.set("v.showModel",false);
	},
    gotoRelatedAttachments :function(component,event,helper){
         if(component.get("v.Account")){
            var relatedListEvent = $A.get("e.force:navigateToRelatedList");
            relatedListEvent.setParams({
                "relatedListId":"CombinedAttachments",
                 "parentRecordId": component.get("v.Account")
            });
                
            relatedListEvent.fire();
        }
    },
    getSelectedOptions : function(component,event,helper){
    	var selectedOptionsList = event.getParam("value");
      //  helper.getSelectedObj(selectedOptionsList,component,helper);
        component.set("v.SelectedOptions",selectedOptionsList);
    },
    sendToApex: function(component,event,helper)
    {
        var selectedOption = component.get("v.SelectedOptions");
         component.set("v.showSpinner",true);
       
        helper.getDetailsDyn(selectedOption,component,event,helper);
         component.set("v.showModel",false);
     //   alert(selectedOption);
    },
    navigateToContact : function (component, event, helper) {
            var navEvt = $A.get("e.force:navigateToSObject");
  		  navEvt.setParams({
        
      "recordId":component.get("v.contactdetails.Id"),
         "slideDevName": "detail"
      
    });
    navEvt.fire();
           
},
   
    
    navigateToOpportunity:function (component, event, helper) {
     
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
        
      "recordId":component.get("v.oppdetails.Id"),
         "slideDevName": "detail"
      
    });
    navEvt.fire();
},
      navigateToQuote:function (component, event, helper) {
     
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
        
      "recordId":component.get("v.Quotedetails.Id"),
         "slideDevName": "detail"
      
    });
    navEvt.fire();
},
 
 
    navigateToCase:function (component, event, helper) {
     
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
      "recordId":component.get("v.casedetails.Id"),
         "slideDevName":"detail"
      
    });
    navEvt.fire();
},

    navigateToAttach:function (component, event, helper) {
     
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
        
      "recordId":component.get("v.notedetails.Id"),
         "slideDevName": "detail"
      
    });
    navEvt.fire();
},
   
    navigateToCorrespond:function (component, event, helper) {
     
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
        
      "recordId":component.get("v.Correspondancedetails.Id"),
         "slideDevName": "detail"
      
    });
    navEvt.fire();
},
 
    navigateToSubgroup:function (component, event, helper) {
     
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
        
      "recordId":component.get("v.Subgroupdetails.Id"),
         "slideDevName": "detail"
      
    });
    navEvt.fire();
},
    
    navigateToBenefit:function (component, event, helper) {
     
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
        
      "recordId":component.get("v.Benefitdetails.Id"),
         "slideDevName": "detail"
      
    });
    navEvt.fire();
},
    navigateToGrpclass:function (component, event, helper) {
     
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
        
      "recordId":component.get("v.Groupclassdetails.Id"),
         "slideDevName": "detail"
      
    });
    navEvt.fire();
},
    navigateToAddress:function (component, event, helper) {
     
    var navEvt = $A.get("e.force:navigateToSObject");
    navEvt.setParams({
        
      "recordId":component.get("v.Addressdetails.Id"),
         "slideDevName": "detail"
      
    });
    navEvt.fire();
},
    
    
    
 
    gotoRelatedListCont : function (component, event, helper) {
    if(component.get("v.Account")){
        var relatedListEvent = $A.get("e.force:navigateToRelatedList");
        relatedListEvent.setParams({
            "relatedListId": "Contacts",
             "parentRecordId": component.get("v.Account")
        });
            
        relatedListEvent.fire();
    }
},
    
    gotoRelatedListopp : function (component, event, helper) {
        if(component.get("v.Account")){
            var relatedListEvent = $A.get("e.force:navigateToRelatedList");
            relatedListEvent.setParams({
                "relatedListId": "Opportunities",
                 "parentRecordId": component.get("v.Account")
            });
                
            relatedListEvent.fire();
        }
},
  
    gotoRelatedListcase:function (component, event, helper) {
        if(component.get("v.Account")){
            var relatedListEvent = $A.get("e.force:navigateToRelatedList");
            relatedListEvent.setParams({
                "relatedListId":"Cases",
                 "parentRecordId": component.get("v.Account")
            });
                
            relatedListEvent.fire();
        }
},
    
    gotoRelatedListquote : function (component, event, helper) {
        if(component.get("v.Account")){
          var relatedListEvent = $A.get("e.force:navigateToRelatedList");
            relatedListEvent.setParams({
                "relatedListId": "Quotes",
                 "parentRecordId": component.get("v.Account")
            });
            relatedListEvent.fire();
        }
},
     gotoRelatedListcorrespond:function (component, event, helper) {
         if(component.get("v.Account")){
            var relatedListEvent = $A.get("e.force:navigateToRelatedList");
            relatedListEvent.setParams({
                 "relatedListId": "Correspondence__r",
                 "parentRecordId": component.get("v.Account")
            });
                
            relatedListEvent.fire();
         }
},
    gotoRelatedListadd:function (component, event, helper) {
        if(component.get("v.Account")){
            var relatedListEvent = $A.get("e.force:navigateToRelatedList");
            relatedListEvent.setParams({
                "relatedListId":"Account_Addresses__r",
                 "parentRecordId": component.get("v.Account")
            });
                
            relatedListEvent.fire();
        }
},
    gotoRelatedListgrpclass:function (component, event, helper) {
          if(component.get("v.Account")){
            var relatedListEvent = $A.get("e.force:navigateToRelatedList");
            relatedListEvent.setParams({
                "relatedListId":"Group_Class_Packages__r",
                 "parentRecordId": component.get("v.Account")
            });
                
            relatedListEvent.fire();
          }
},
    
    
    gotoRelatedListbenefit:function (component, event, helper) {
          if(component.get("v.Account")){
            var relatedListEvent = $A.get("e.force:navigateToRelatedList");
            relatedListEvent.setParams({
                "relatedListId":"Benefit_Package__r",
                 "parentRecordId": component.get("v.Account")
            });
                
            relatedListEvent.fire();
          }
},

    gotoRelatedListsubgroup:function (component, event, helper) {
        if(component.get("v.Account")){
            var relatedListEvent = $A.get("e.force:navigateToRelatedList");
            relatedListEvent.setParams({
                "relatedListId":"Subgroup__r",
                 "parentRecordId": component.get("v.Account")
            });
                
            relatedListEvent.fire();
        }
}
    
    
})