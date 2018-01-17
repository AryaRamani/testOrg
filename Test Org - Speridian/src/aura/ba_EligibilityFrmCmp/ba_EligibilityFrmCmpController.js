({
    doInit: function(component, event, helper) {
        /*Event fired to master comp to start the flow*/
        var cmpEvent = component.getEvent("navigationEvt");
        cmpEvent.fire(); 
         /*End*/ 
     
       if(component.get("v.BA_Eligiblity_Administration__c")==''||component.get("v.BA_Eligiblity_Administration__c")==null){
      
        var action = component.get("c.getEligiblityAdministrationQuestions");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.BA_Eligiblity_Administration__c", response.getReturnValue());
                helper.mapEligiblityQuestions(component, event, helper);
            } else {
                console.log("ERROR RETRIEVING ELIGIBILITY QUESTIONS");
            }
        });
        $A.enqueueAction(action);
        }
    },
    
      getSelectedLst : function(component, event, helper){
   /*  var params = event.getParam('arguments');
        if (params) {
            var selectionlist = params.selectionlist;
            console.log("Selection: " + selectionlist);
            return selectionlist;
        }*/
    },
    
    strikeInputChanged: function(component, event, helper) {   
    	console.log(component.get("v.BA_Eligiblity_Administration__c"));
        var srcCmp = event.getSource();
        var fieldName = srcCmp.get("v.name");
        var fieldType = srcCmp.get("v.type");
        var fieldValue ;
        if(fieldType == "checkbox")
        	fieldValue = srcCmp.get("v.checked");
        else
        	fieldValue = srcCmp.get("v.value");
        var readOnlyFld = srcCmp.get("v.readonly");
        if(readOnlyFld == "false"){
        	helper.updateCalculatedFields(component);
        }    	
    },
    
       handleNavigateNext : function(component, event, helper){
   /* console.log('In Eligibiltiy Info');
    var BA_Eligiblity_Administration__c=component.get("v.BA_Eligiblity_Administration__c")
     var cmpEvent = component.getEvent("navigateEvt");
        cmpEvent.setParams({
           "Objatt" : {BA_Eligiblity_Administration__c},
           "label" : event.getParam("label")
           });
        cmpEvent.fire(); */
    },
    
    
})