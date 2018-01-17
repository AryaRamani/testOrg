({

    fetchgroupInformation: function(component, event, helper) {
        var getTaskChptrAction = component.get("c.getGroupInformation");
        getTaskChptrAction.setParams({
            "GroupId": component.get("v.GroupId")
        });

        // Add Asynch Callback For Class Action
        getTaskChptrAction
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                        console.log('Group Information' + JSON.stringify(response
                            .getReturnValue()));
                        component.set("v.groupInfo", response
                            .getReturnValue());


                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(getTaskChptrAction);
    },



    fetchTaskChapters: function(component, currentTaskflow, helper) {
        component.set("v.IsSpinner", true);
        var helper = this;
        var chapterName = "";
        var componentName = "";
        // Apex Class Action
        var getTaskChptrAction = component.get("c.getTaskChapters");
        getTaskChptrAction.setParams({
            "taskId": currentTaskflow.Id
        });

        // Add Asynch Callback For Class Action
        getTaskChptrAction
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                        component.set("v.IsSpinner", false);
                        component.set("v.taskChapters", response
                            .getReturnValue());
                        console.log('Task Chapters' + JSON.stringify(response.getReturnValue()));
                        var result = response.getReturnValue();

                           this.fetchNavigationlogic(component);
                        if (component.get("v.resume")) {
                            this.getpausedflow(component);
                        } else {
                            var GroupInfo = {
                                'GroupId': component.get("v.GroupId"),
                                'class': "bounceInRight"
                            };
                            var attributes = GroupInfo;

                            component.set("v.Attlist", attributes);
                            this.createChapterDiv(component, attributes, helper);
                        }



                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(getTaskChptrAction);
    },

    createChapterDiv: function(component, attributes, helper) {
      var helper=this;
        $A.createComponent("aura:HTML", {
            tag: "div",

            HTMLAttributes: {

                "class": "bounceInRight"
            }
        }, function(chapterDivCmp) {
            var container = component.find("taskFormContainer");
            if (container.isValid()) {
                var body = container.get("v.body");
                body.push(chapterDivCmp);
                container.set("v.body", body);


                helper.navigateChapter(component, chapterDivCmp,
                    attributes);

            }
        });

    },



    navigateChapter: function(component, chapterDivCmp, attributes) {
        var helper = this;

        //  Get all the task chapters
        var taskChapters = component.get("v.taskChapters");

        //Set First Chapter Attribute
        var navigateToChapterNo = component.get("v.currentChapterSequence");
        console.log('Current chapter Sequence' + navigateToChapterNo);
        if (navigateToChapterNo == 0) {
            component.set("v.firstChapter", true);
        } else {
            component.set("v.firstChapter", false);
        }
        console.log('If first Chapter' + component.get("v.firstChapter"));


        //Set Last Chapter Attribute
        if ((navigateToChapterNo + 1) == taskChapters.length) {
            component.set("v.lastChapter", true);
        } else {
            component.set("v.lastChapter", false);
        }

        console.log('If last Chapter' + component.get("v.lastChapter"));
        //alert('navigateToChapterNo'+navigateToChapterNo);
        //alert(taskChapters[navigateToChapterNo].ba_Chapter_Name__c);
        component.set("v.activeChapter", taskChapters[navigateToChapterNo].ba_Chapter_Name__c);
        console.log('Active chapter Name' + component.get("v.activeChapter"));

        var taskChapterCmp = component.find("TaskChapterCmp");
        taskChapterCmp.setActiveSelection();

        /* $A.createComponent("aura:HTML", {
            tag: "div",
            
            HTMLAttributes: {
               
                "class": "bounceInRight"
            }
        }, function(chapterDivCmp) {
            var container = component.find("taskFormContainer");
            if (container.isValid()) {
                var body = container.get("v.body");
                body.push(chapterDivCmp);
                container.set("v.body", body);
               
               
                helper.navigateChapter(component, chapterDivCmp,
                    componentName);
                    
            }
        });*/





        console.log('Index' + navigateToChapterNo);
        // creating components dynamically
        var container = component.find("taskFormContainer");
        if (container.isValid()) {
            var body = chapterDivCmp.get("v.body");

            $A.createComponent("c:" + taskChapters[navigateToChapterNo].ba_Chapter_Component_Name__c,
                attributes,

                function(newCmp, status, errorMessage) {

                    if (status === "SUCCESS") {

                        component.set("v.body", newCmp);
                        $A.util.addClass(container, "bounceInRight");
                        // alert(component.get("v.body")[0]);
                        // alert('In create'); 
                    } else if (status === "ERROR") {
                        console.log("Error: " + errorMessage);
                        // Show error message
                    }

                });


        } else {
            console.log("No Valid Container Found with aura:id 'taskFormContainer'");
        }
        // Set Navigation Component Button Actions
        var navigateFlowCmp = component.find("NavigateFlowCmp");
        navigateFlowCmp.setNavActions();
        $A.util.removeClass(container, "bounceInRight");
        //this.fadeInComponent(component);
        window.scrollTo(0, 0);
        component.set("v.IsSpinner", false);

    },

    fadeInComponent: function(component) {
        var navDirection = component.get("v.Direction");
        var navigateToComponentDiv = component.find('taskFormContainer'); //component.get("v.body")[0];  
        //alert('Direction'+navDirection);
        // alert('In direction');
        if (navDirection == "forward") {
            $A.util.addClass(navigateToComponentDiv, "bounceInRight");
        } else {
            $A.util.addClass(navigateToComponentDiv, "bounceInLeft");
        }

    },

    pauseflow: function(component) {
        component.set("v.IsSpinner", true);
        var helper = this;
        // alert(component.get("v.taskDisplayName")); 

        var action = component.get("c.pauseFlowInfo");
        action.setParams({
            "GroupId": component.get("v.GroupId"),
            "info": JSON.stringify(component.get("v.Attlist")),
            "task": component.get("v.taskChapters")[component.get("v.currentChapterSequence")].Id,
            "flowname": component.get("v.currentTaskFlow.ba_Display_Name__c")
        });

        // Add Asynch Callback For Class Action
        action
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                        component.set("v.IsSpinner", false);

                        var evt = $A.get("e.force:navigateToComponent");
                        evt.setParams({
                            componentDef: 'c:Ba_EmployerGroupTaskModalCmp',

                        });
                        evt.fire();



                    } else {
                        // Replace With Error Handler f/w once available
                        component.set("v.IsSpinner", false);
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(action);

    },

    getpausedflow: function(component,event,helper) {
        var action = component.get("c.resumetaskflow");
        action.setParams({
            'pauseFlow': component.get("v.pauseflow")
        });

        // Add Asynch Callback For Class Action
        action
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                        component.set("v.IsSpinner", false);

                        // alert('Resume Response'+JSON.parse(response.getReturnValue()));
                        component.set("v.Attlist", JSON.parse(response
                            .getReturnValue()));
                        var attributes = component.get("v.Attlist");
                        var seq = component.get("v.pauseflow.Task_Chapter__r.ba_Sequence_Number__c");
                       // alert('Sequence' + seq);
                        component.set("v.currentChapterSequence", seq - 1);
                       // this.navigateChapter(component, attributes);
                        this.createChapterDiv(component, attributes, helper);
                        //alert();
                        
                    } else {
                        // Replace With Error Handler f/w once available
                        component.set("v.IsSpinner", false);
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(action);
    },

    commitInformation: function(component) {

        var action = component.get("c.commitRecordInfo");
        action.setParams({
            'GroupId': component.get("v.GroupId"),
            'AttInfo': JSON.stringify(component.get("v.Attlist")),
            'flowname' : component.get("v.currentTaskFlow.ba_Task_Name__c")
        });

        // Add Asynch Callback For Class Action
        action
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                        component.set("v.IsSpinner", false);

                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": "Success!",
                            "message": "Flow completed successfully .",
                            "type": "success"
                        });
                        toastEvent.fire();
                        var navEvt = $A.get("e.force:navigateToSObject");
                        navEvt.setParams({
                            "recordId": component.get("v.GroupId"),
                            "slideDevName": "related"
                        });
                        navEvt.fire();


                    } else {
                        // Replace With Error Handler f/w once available
                        component.set("v.IsSpinner", false);
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(action);

    },
    
    fetchNavigationlogic : function(component){
    
    var action = component.get("c.navigationlogic");
        action.setParams({
            
            'flowname' : component.get("v.currentTaskFlow.ba_Task_Name__c")
        });

        // Add Asynch Callback For Class Action
        action
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                        component.set("v.IsSpinner", false);
                         component.set("v.SequenceDir",response.getReturnValue());
                        // alert(JSON.stringify(component.get("v.SequenceDir")));
                    } else {
                        // Replace With Error Handler f/w once available
                        component.set("v.IsSpinner", false);
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(action);
    },
    
    changeNavigatenext : function(component,event, helper){
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
                seq = component.get("v.SequenceDir.Sequence_To__c")-1;
                component.set("v.currentChapterSequence", seq);
                component.set("v.Attlist", attributes);
                var navDirection = "Forward";
                component.set("v.Direction", navDirection);
                this.createChapterDiv(component, attributes,helper);
                //alert('Back'+seq);
                
                //alert('Back'+component.get("v.currentChapterSequence"));
            } else {
                component.set("v.IsSpinner", false);
            }

        } else {
            var seq = component.get("v.currentChapterSequence");
            var attributes = component.get("v.Attlist");
            seq = component.get("v.SequenceDir.Sequence_To__c")-1;
            component.set("v.currentChapterSequence", seq);


            this.createChapterDiv(component, attributes,helper);
            
        }
    }


})