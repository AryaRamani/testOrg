({
    doInit: function(component, event, helper) {

      if(component.get("v.parentfield")=='Group'){
       var getTaskChptrAction = component.get("c.getNotes");
        getTaskChptrAction.setParams({
            "GroupId": component.get("v.GroupId")
        });

        // Add Asynch Callback For Class Action
        getTaskChptrAction
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                 
                    if ( state == "SUCCESS") {
                       
                        component.set("v.Notes",response.getReturnValue());

                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(getTaskChptrAction);
        }
    },
    Showmodal: function(component, event, helper) {
        component.set("v.modalIsOpen", true)
    },
    closeModel: function(component, event, helper) {
        component.set("v.modalIsOpen", false)
    },
    setAttributeValue: function(component, event, helper) {
        var eventValue = event.getParam("closeMdl");
        var eventValue1 = event.getParam("Notesnw");
        var eventValue2 = event.getParam("Type");
        component.set("v.modalIsOpen", eventValue);
       /* component.set("v.Notes", {
            Title: eventValue2,
            Body: eventValue1
        });*/
        var notelst=component.get("v.Notes");
        if(notelst==undefined){
        
        	notelst=[];
        }
        notelst.push(eventValue1);
      //  alert(JSON.stringify(eventValue1));
        component.set("v.Notes",notelst);
        
        component.set("v.NewNotes",eventValue1);

    },
    Save: function(component, event, helper) {
        var Value = component.get("v.Notes[0].Title");
        var Value1 = component.get("v.Notes[0].Body");
        console.log(Value);
        var action2 = component.get("c.CreateNote");
        // set the parameters to method 
        action2.setParams({
            "Title": Value,
            "Notes": Value1,
            "GroupId": "0017F000008bbfDQAQ"
        });
        console.log(JSON.stringify((action2.getParams())));
        // set a call back   
        action2.setCallback(this, function(a) {
            // store the response return value (wrapper class insatance)  

            console.log(a.getReturnValue());
        });
        // enqueue the action 
        $A.enqueueAction(action2);

    }
})