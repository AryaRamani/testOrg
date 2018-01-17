({
    doInit: function(component, event, helper) {
        var Entity = component.get("v.TaskEntity");
        console.log("Entity" + Entity);
        var action = component.get("c.getTaskFlows");
        action.setParams({
            'Entity': Entity
        });
        action.setCallback(this, function(a) {
            // store the response return value (wrapper class insatance)  
            var result = a.getReturnValue();
            console.log('result ---->' + JSON.stringify(result));
            helper.pausetask(component);
            if (result.length > 0) {
                // set the component attributes value with wrapper class properties.   
                component.set("v.taskName", result);
                //helper.resumetask(component);
            } else {
                component.set("v.taskMsg", 'No Task flow found');
            }
        });

        $A.enqueueAction(action);

    },
    StartTask: function(component, event, helper) {
        /*   var id = event.currentTarget.id;
           console.log(id);
           component.set("v.modalIsOpen",false);
           if (id=="Add New Prospect"){
               var x= "c:NewProspectGroupFlowCmp";
           }
           if (id=="Member Verification"){
               var x= "c:MemberServicesCmp";
           }
           if (id=="PCP Change"){
               var x= "c:PCPChangeCmp";
           }
           $A.createComponent(x, {

           }, function(newCmp) {
               if (component.isValid()) {
                   component.set("v.body", newCmp);
               }
           });*/

        var taskflow = event.getSource().get("v.title");
        
        if (!$A.util.isEmpty(component.get("v.ParentId"))) {
            // alert('task'+JSON.stringify(taskflow));
            var evt = $A.get("e.force:navigateToComponent");
            evt.setParams({
                componentDef: 'c:Ba_NewQuoteRequestFlowCmp',
                componentAttributes: {


                    currentTaskFlow: taskflow,
                    GroupId: component.get("v.ParentId")
                }
            });
            evt.fire();


            var setEvent1 = $A.get("e.c:EmployerGroupViewHideEvnt");
            setEvent1.setParams({
                'HideCmp': "True"
            });
            setEvent1.fire();

            //console.log(id);
        } else {
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                "title": "Warning!",
                "message": "Select a related Entity.",
                "type": "warning"
            });
            toastEvent.fire();

        
        }
    },


    ResumeTask: function(component, event, helper) {
        var pausedflow = event.getSource().get("v.title");
        // alert(JSON.stringify(pausedflow)); 
        var flowname = "c:" + pausedflow.Task_Chapter__r.ba_Task_Flow__r.ba_Chapter_Name__c
            // alert('Flow name'+pausedflow.Task_Chapter__r.ba_Task_Flow__r.ba_Task_Name__c);
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef: flowname,
            componentAttributes: {
                resume: true,
                pauseflow: pausedflow,
                currentTaskFlow: pausedflow.Task_Chapter__r.ba_Task_Flow__r,

            }
        });
        evt.fire();

        /* $A.createComponent(flowname, 
    	 	{
		   	resume : true,
            pauseflow: pausedflow,
            currentTaskFlow: pausedflow.Task_Chapter__r.ba_Task_Flow__r.ba_Task_Name__c,
            ParentId: component.get("v.ParentId")
   }
        , function(newCmp) {
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
 }); */

    },

    handleid: function(component, event, helper) {
        var id = event.getParam("Accountid");
        component.set("v.ParentId", id);
        helper.fetchtaskflow(component);
        //  alert('Id'+id);
    }
})