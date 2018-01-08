({
    fetchTaskChapters: function(component, currentTaskflow) {
        component.set("v.IsSpinner", true);
        var helper = this;
        var chapterName = "";
        var componentName = "";
        // Apex Class Action
        var getTaskChptrAction = component.get("c.getTaskChapters");
        getTaskChptrAction.setParams({
            "taskName": currentTaskflow
        });

        // Add Asynch Callback For Class Action
        getTaskChptrAction
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                        component.set("v.taskChapters", response
                            .getReturnValue());
                        var taskChapters = component
                            .get("v.taskChapters");
                        for (var taskChapter in taskChapters) {
                            chapterName = taskChapters[taskChapter].ba_Chapter_Name__c;
                            componentName = "c:" +
                                taskChapters[taskChapter].ba_Chapter_Component_Name__c;
                            // Create Chapter
                            helper.createChapterDiv(component,
                                chapterName, componentName, helper);
                        }
                    console.log('Resume'+component.get("v.resume"));
                       


                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(getTaskChptrAction);
    },


    createChapterDiv: function(component, chapterName, componentName, helper) {
        $A.createComponent("aura:HTML", {
            tag: "div",
            "aura:id": chapterName,
            HTMLAttributes: {
                "id": "div" + chapterName,
                "class": "slds-form-element__group slds-hide"
            }
        }, function(chapterDivCmp) {
            var container = component.find("taskFormContainer");
            if (container.isValid()) {
                var body = container.get("v.body");
                body.push(chapterDivCmp);
                container.set("v.body", body);
               
               
                helper.createChapterComponent(component, chapterDivCmp,
                    componentName);
                    
            }
        });
    },


    createChapterComponent: function(component, chapterDivCmp, componentName) {


        $A.createComponent(componentName, {
            'BA_Eligiblity_Administration__c': component.getReference("v.EligibilityInfo"),
            'selectedlst': component.getReference("v.GrpBenefitPackage"),
            'subgroup': component.getReference("v.SubGroup"),
            'BP': component.getReference("v.GrpBilling"),
            'GroupId': component.get("v.GroupId"),
            'selectno': component.getReference("v.selection"),
            'selectyes': component.getReference("v.selection"),
            'Address': component.getReference("v.Address"),
            'SelectedQuoteLine': component.getReference("v.selectedbenefit"),
            'taskDisplayName': component.getReference("v.activeChapter"),
            'group' : component.getReference("v.groupInfo"),
            'NewNotes' : component.getReference("v.Notes"),
            

        }, function(newCmp) {
            if (chapterDivCmp.isValid()) {
                var body = chapterDivCmp.get("v.body");
                body.push(newCmp);
                chapterDivCmp.set("v.body", body);
            }
        });
    },

    navigateChapter: function(component, taskChapters, navigateToChapterNo,
        navigateFromChapterNo) {
        var helper = this;
        var navDirection = "forward";
        if (navigateToChapterNo > navigateFromChapterNo) {
            navDirection = "forward";
        } else {
            navDirection = "backward";
        }
        //Set First Chapter Attribute
        if (navigateToChapterNo == 0) {
            component.set("v.firstChapter", true);
        } else {
            component.set("v.firstChapter", false);
        }
        //Set Last Chapter Attribute
        if ((navigateToChapterNo + 1) == taskChapters.length) {
            component.set("v.lastChapter", true);
        } else {
            component.set("v.lastChapter", false);
        }
        // Hide & Show Components For Navigation

        var container = component.find("taskFormContainer");
        if (container.isValid()) {
            var body = container.get("v.body");


            // Hide From Navigation Div Container If Not First Chapter
            if (navigateFromChapterNo > -1) {
                var navigateFromComponentDiv = body[navigateFromChapterNo]
                    .find(taskChapters[navigateFromChapterNo].ba_Chapter_Name__c);


                // console.log("auraMethodResult: " + auraMethodResult);
                this.fadeOutComponent(navigateFromComponentDiv, navDirection);
            }
            // Show To Navigation Div Container If Not Last Chapter
            if (navigateToChapterNo < taskChapters.length) {
                var navigateToComponentDiv = body[navigateToChapterNo]
                    .find(taskChapters[navigateToChapterNo].ba_Chapter_Name__c);
                   // alert('Body'+body[navigateToChapterNo]);
                   // alert(navigateToComponentDiv)
                // Set Active Chapter In Task Chapter Component
                component.set("v.activeChapter",
                    taskChapters[navigateToChapterNo].ba_Chapter_Name__c);
                var taskChapterCmp = component.find("TaskChapterCmp");
                taskChapterCmp.setActiveSelection();

                // Set Navigation Component Button Actions
                var navigateFlowCmp = component.find("NavigateFlowCmp");
                navigateFlowCmp.setNavActions();
                this.fadeInComponent(navigateToComponentDiv, navDirection);

            }
            component.set("v.IsSpinner", false);

        } else {
            component.set("v.IsSpinner", false);
            console
                .log("No Valid Container Found with aura:id 'taskFormContainer'");
        }

    },

    /**
     * Show Loading Spinner
     * 
     * @param {}
     * 
     * @return {}
     */
    showSpinner: function(component) {

        component.set("v.IsSpinner", true);

    },

    /**
     * Hide Loading Spinner
     * 
     * @param {}
     * 
     * @return {}
     */
    hideSpinner: function(component) {

        component.set("v.IsSpinner", false);

    },

    /**
     * Fade In Component with Animation
     * 
     * @param {Component}
     *            navigateToComponentDiv
     * @param {String}
     *            navDirection
     * @return {}
     */
    fadeInComponent: function(navigateToComponentDiv, navDirection) {
        if (navigateToComponentDiv.isValid()) {
            $A.util.removeClass(navigateToComponentDiv, "slds-hide");
            if (navDirection == "forward") {
                $A.util.addClass(navigateToComponentDiv, "bounceInRight");
            } else {
                $A.util.addClass(navigateToComponentDiv, "bounceInLeft");
            }
        }
    },

    /**
     * Hide Component
     * 
     * @param {Component}
     *            navigateFromComponentDiv
     * @param {String}
     *            navDirection
     * @return {}
     */
    fadeOutComponent: function(navigateFromComponentDiv, navDirection) {
        if (navigateFromComponentDiv.isValid()) {
            $A.util.removeClass(navigateFromComponentDiv, "bounceInRight");
            $A.util.removeClass(navigateFromComponentDiv, "bounceInLeft")
            $A.util.addClass(navigateFromComponentDiv, "slds-hide");
        }
    },

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

    commitinformation: function(component, event, helper) {
        var info = {
            'eligibility': component.get("v.EligibilityInfo"),
            'benefitpackage': component.get("v.GrpBenefitPackage"),
            'Subgrplst': component.get("v.SubGrouplst"),
            'Billing': component.get("v.GrpBilling"),
            'Address': component.get("v.Address"),
            'Notes':component.get("v.Notes"),
            'group' : component.get("v.groupInfo")
        };

        var getTaskChptrAction = component.get("c.creategroupInformation");
        getTaskChptrAction.setParams({
            "GroupId": component.get("v.GroupId"),
            "info": JSON.stringify(info)
        });

        // Add Asynch Callback For Class Action
        getTaskChptrAction
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                        //	alert('In success');
                        var toastEvent = $A.get("e.force:showToast");
                        toastEvent.setParams({
                            "title": "Success!",
                            "message": "",
                            "type":"success"
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
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(getTaskChptrAction);


    },

    getsubgrpinfo: function(component, event, helper) {
        var subgrouplst = component.get("v.SubGrouplst");
        // parse and stringify to dereference the value from the attribute
        var subgroup = JSON.parse(JSON.stringify(component.get("v.SubGroup")));
        //var subgroup = component.get("v.SubGroup");
       // alert('List' + JSON.stringify(subgrouplst));
       // alert('Object' + JSON.stringify(component.get("v.SubGroup")));
        if (component.get("v.SubGroup").Number === '000') {} else {

            subgrouplst.push(subgroup);

          //  alert('AfterList' + JSON.stringify(subgrouplst));
            component.set("v.SubGrouplst", subgrouplst);

        }



    },
    
    
    fetchchapterinfo : function(component){
    console.log('Paused'+component.get("v.pauseflow"));
    alert('In resume');
       var getTaskChptrAction = component.get("c.resumetaskflow");
        getTaskChptrAction.setParams({
            "pauseFlow": component.get("v.pauseflow")
        });

        // Add Asynch Callback For Class Action
        getTaskChptrAction
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                       console.log('Response for paused task'+response
                            .getReturnValue());
                        var result=response.getReturnValue()
                       	component.set("v.EligibilityInfo",result.EligibilityInfo);
                       	component.set("v.GrpBenefitPackage",result.GrpBenefitPackage);
                       //	component.set("v.SubGroup",result.SubGroup);
                       //	component.set("v.GrpBilling",result.GrpBilling);
                       //	component.set("v.Address",result.Address);
                       	component.set("v.currentChapterSequence",component.get("v.pauseflow.Task_Chapter__r.ba_Sequence_Number__c"));
						//
						   var navigateTo=component.get("v.currentChapterSequence");
				          var navigateFrom=component.get("v.currentChapterSequence")+1;
						// this.navigateChapter(component, taskChapters, navigateTo, navigateFrom);
						 var currentTaskflow = component.get("v.currentTaskFlow");
						 this.fetchTaskChapters(component, currentTaskflow);
						 
						
						    var taskChapters = component.get("v.taskChapters");
						   this.navigateChapter(component, taskChapters, navigateTo, navigateFrom);
						
                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(getTaskChptrAction);
    }

})