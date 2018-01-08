({
    doInit: function(component, event, helper) {
        // alert('Parent Id'+component.get("v.ParentId"));

        var currentTaskflow = component.get("v.currentTaskFlow");
        // alert('Init'+component.get("v.resume"));
        if (component.get("v.resume")) {
            component.set("v.GroupId", component.get("v.pauseflow").Ba_Parent_Id__c);
        }

        helper.fetchgroupInformation(component);
        //  alert('Resume'+component.get("v.resume"));

        var chatperName = "";
        if (!$A.util.isEmpty(currentTaskflow.ba_Task_Name__c)) {

            helper.fetchTaskChapters(component, currentTaskflow);

        } else {
            console.log("currentTaskFlow attribute is null");

        }
    },

    handleNavigateNext: function(component, event, helper) {
        // $A.util.removeClass(component.find("taskFormContainer"), "bounceInRight");
        //component.set("v.IsSpinner", true);
       
        var taskbody = component.find('taskFormContainer').get("v.body");
        var resultObj = component.get("v.Attlist");
        if (resultObj == undefined) {
            resultObj = [];
        }
        // alert(taskbody.find('childId'));
        if (typeof component.get("v.body")[0].getAttributeMethod == 'function') {
            var auraMethodResult = component.get("v.body")[0].getAttributeMethod();

            //alert('Result'+JSON.stringify(auraMethodResult));
            // resultObj.push(auraMethodResult);
            //component.set("v.Attlist",resultObj);
            // alert(''+JSON.stringify(component.get("v.Attlist")));
            alert('In parent' + auraMethodResult.navigate);
            if (auraMethodResult.navigate) {
                var seq = component.get("v.currentChapterSequence");
                var result = component.get("v.Attlist");
                // var GroupInfo={'GroupId':component.get("v.GroupId")};
                var attributes = _.assign(result, auraMethodResult);
                //alert('Att in next'+JSON.stringify(attributes));
                seq = seq + 1;
                component.set("v.currentChapterSequence", seq);
                component.set("v.Attlist", attributes);
                var navDirection = "Forward";
                component.set("v.Direction", navDirection);
                helper.createChapterDiv(component, attributes,helper);
            } else {
                component.set("v.IsSpinner", false);
            }

        } else {
            var seq = component.get("v.currentChapterSequence");
            var attributes = component.get("v.Attlist");
            seq = seq + 1;
            component.set("v.currentChapterSequence", seq);


            helper.createChapterDiv(component, attributes,helper);
        }
        component.set("v.IsSpinner", false);

    },

    handleNavigatePrevious: function(component, event, helper) {
       
        var navDirection = "Backward";
        component.set("v.Direction", navDirection);
        var seq = component.get("v.currentChapterSequence");
        var GroupInfo = {
            'GroupId': component.get("v.GroupId")
        };
        seq = seq - 1;
        var attributes = component.get("v.Attlist");
        //var attributes=_.assign(result,GroupInfo );
        component.set("v.currentChapterSequence", seq);
        // alert('Attribute'+JSON.stringify(attributes));
        helper.createChapterDiv(component, attributes,helper);
    },

    handleFlowSubmit: function(component, event, helper) {
        var taskbody = component.find('taskFormContainer').get("v.body");

        var auraMethodResult = component.get("v.body")[0].getAttributeMethod();
        var result = component.get("v.Attlist");

        var attributes = _.assign(result, auraMethodResult);
        component.set("v.Attlist", result);
        console.log('Submit data' + JSON.stringify(component.get("v.Attlist")));
        helper.commitInformation(component);
    },

    handleFlowPause: function(component, event, helper) {
        var taskbody = component.find('taskFormContainer').get("v.body");

        var auraMethodResult = component.get("v.body")[0].getAttributeMethod();
        var result = component.get("v.Attlist");

        var attributes = _.assign(result, auraMethodResult);
        component.set("v.Attlist", result);
        helper.pauseflow(component);
    },

    handleFlowCancel: function(component) {
        var evt = $A.get("e.force:navigateToComponent");
        evt.setParams({
            componentDef: 'c:EmployerGroupTaskModalCmp',

        });
        evt.fire();
    }


})