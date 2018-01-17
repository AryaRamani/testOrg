({
    fetchTaskChapters: function(component, currentTaskflow, navigate) {

        var helper = this;
        var chapterName = "";
        var componentName = "";
        var getTaskChptrAction = component.get("c.getTaskChapters");
        console.log('current task flow ' + currentTaskflow);
        getTaskChptrAction.setParams({
            "taskName": currentTaskflow
        });

        getTaskChptrAction.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.taskChapters", response.getReturnValue());
                console.log('Response' + JSON.stringify(response.getReturnValue()))
                var taskChapters = component.get("v.taskChapters");
                console.log('Chapters: ');
                for (var taskChapter in taskChapters) {
                    chapterName = taskChapters[taskChapter].ba_Chapter_Name__c;
                    console.log(chapterName + ' ');
                    componentName = "c:" + taskChapters[taskChapter].ba_Chapter_Component_Name__c;
                    // Create Chapter
                    //helper.createChapterDiv(component, chapterName, componentName, helper);
                }
                //Initialze Attributes

                if (component.get("v.sequence")) {

                    var seq = 2;
                    helper.navigateChapter(component, taskChapters, seq);
                } else if (navigate) {
                    var seq = 0;
                    helper.navigateChapter(component, taskChapters, seq);
                } else if (component.get("v.recordId") !== undefined) {
                    var seq = 1;


                    var action = component.get("c.fetchmember");
                    action.setParams({
                        'memberId': component.get("v.recordId")
                    });
                    action.setCallback(this, function(response) {
                        var state = response.getState();

                        if (state === "SUCCESS") {

                            component.set("v.MemberData", response.getReturnValue());
                            console.log(JSON.stringify(component.get("v.MemberData")));
                            helper.navigateChapter(component, taskChapters, seq);
                        }


                    });

                    $A.enqueueAction(action);

                } else {
                    seq = 0;
                    helper.navigateChapter(component, taskChapters, seq);
                }
                console.log('Sequence Number' + seq);

            } else {
                console.log("Failed with state: " + state);
            }
            component.set("v.title", taskChapters[seq].ba_Display_Name__c);
        });

        $A.enqueueAction(getTaskChptrAction);


    },

    createChapterDiv: function(component, chapterName, componentName, helper) {
        $A.createComponent(
            "aura:HTML", {
                tag: "div",
                "aura:id": chapterName,
                HTMLAttributes: {
                    "id": "div" + chapterName,
                    "class": "slds-form-element__group slds-show"
                }
            },

            function(chapterDivCmp) {
                var container = component.find("taskFormContainer");
                if (container.isValid()) {
                    var body = container.get("v.body");
                    body.push(chapterDivCmp);
                    container.set("v.body", body);
                    console.log('DIV' + component.get("v.body"));
                    helper.createChapterComponent(component, chapterDivCmp, componentName)
                }
            });
    },

    createChapterComponent: function(component, chapterDivCmp, componentName) {

        $A.createComponent(componentName, {
            "ChapterInitCmpEvt": component.getReference("c.childInitComplete")
        }, function(newCmp) {
            if (chapterDivCmp.isValid()) {
                var body = chapterDivCmp.get("v.body");
                body.push(newCmp);
                chapterDivCmp.set("v.body", body);
            }
        });
    },

    navigateChapter: function(component, taskChapters, currentChapterNo) {
        component.set("v.currentChapter", taskChapters[currentChapterNo].ba_Chapter_Name__c);
        component.set("v.currentChapterSequence", taskChapters[currentChapterNo].ba_Sequence_Number__c);
        if (taskChapters[currentChapterNo].ba_Sequence_Number__c == 1) {
            component.set("v.previousChapter", undefined);
        } else {
            component.set("v.previousChapter", taskChapters[currentChapterNo - 1].ba_Chapter_Name__c);
        }
        if (taskChapters[currentChapterNo].ba_Sequence_Number__c == taskChapters.length) {
            component.set("v.nextChapter", undefined);
        } else {
            component.set("v.nextChapter", taskChapters[currentChapterNo + 1].ba_Chapter_Name__c);
        }
        component.set("v.activeChapter",
            taskChapters[currentChapterNo].ba_Chapter_Name__c);
        console.log('Active chapters are' + JSON.stringify(component.get("v.activeChapter")));

        var taskChapterCmp = component.find("TaskChapterCmp");
        taskChapterCmp.setActiveSelection();
        var container = component.find("taskFormContainer");

        if (container.isValid()) {
            var body = container.get("v.body");
            console.log('Test' + JSON.stringify(component.get("v.MemberDetails")));
            $A.createComponent("c:" + taskChapters[currentChapterNo].ba_Chapter_Component_Name__c, {
                'MemberDetails': component.get("v.MemberDetails")
            }, function(newCmp) {

                if (component.isValid()) {

                    component.set("v.body", newCmp);
                }
            });
            //var navigateComponentDiv = body[currentChapterNo].find(taskChapters[currentChapterNo].ba_Chapter_Name__c);
            //console.log("Found Div " + JSON.stringify(body));
        }
        /*var container = component.find("taskFormContainer");
            	var body = container.get("v.body");
            	var cmp = body[0].find("BANewProspectGroup_GroupSummary");
            	console.log("component : " +  JSON.stringify(cmp));
            	$A.util.removeClass(cmp,"slds-show");
            	$A.util.addClass(cmp,"slds-hide");*/

        //console.log("Current Chapter" + component.get("v.currentChapter")); 
    },

    handleNavigateNext: function(component, member, type, casedata, servicedata) {

        var chapters = component.get("v.taskChapters");
        var currentChapterId = component.get("v.currentChapterSequence");

        var navigateFromComponent = component.find(chapters[currentChapterId]);

        var navigateToComponent = component.find(chapters[currentChapterId + 1]);


        currentChapterId = currentChapterId + 1;
        console.log('Currentchapter' + currentChapterId);
        console.log('NextChapter' + chapters[currentChapterId + 1]);
        component.set("v.previousChapter", chapters[currentChapterId - 1]);
        component.set("v.currentChapter", chapters[currentChapterId]);
        component.set("v.nextChapter", chapters[currentChapterId + 1]);
        component.set("v.currentChapterSequence", currentChapterId);
        var currentChapter = component.get("v.previousChapter");
        console.log('Current' + currentChapter.ba_Chapter_Component_Name__c);
        component.set("v.title", currentChapter.ba_Display_Name__c);
        console.log('Member' + JSON.stringify(member));

        var container = component.find("taskFormContainer");
        //	$A.util.addClass(component.find("taskFormContainer"), "bounceInRight");

        component.set("v.activeChapter",
            chapters[currentChapterId - 1].ba_Chapter_Name__c);
        var taskChapterCmp = component.find("TaskChapterCmp");
        taskChapterCmp.setActiveSelection();


        if (container.isValid()) {
            var body = container.get("v.body");
            $A.createComponent("c:" + currentChapter.ba_Chapter_Component_Name__c, {

                'MemberDetails': member,
                'CaseDetails': casedata,
                'ServiceDetails': servicedata,
                'pcpCase': component.get("v.pcpCase"),
                'pcp': component.get("v.pcp"),
                'service': component.get("v.service")

            }, function(newCmp) {
                if (component.isValid()) {

                    component.set("v.body", newCmp);
                }
            });
            //var navigateComponentDiv = body[currentChapterNo].find(taskChapters[currentChapterNo].ba_Chapter_Name__c);
            //console.log("Found Div " + JSON.stringify(body));
        }


        //console.log("Previous Chapter: " + component.get("v.previousChapter") + "; Current Chapter: " + component.get("v.currentChapter") + "; Next Chapter: " + component.get("v.nextChapter") + "; CurrentChapterIterationr: " + component.get("v.CurrentChapterIteration"))


    },

    handleNavigatePrevious: function(component) {
        console.log('In previous handler');
        console.log('Case Details' + JSON.stringify(component.get("v.CaseDetails")));
        var chapters = component.get("v.taskChapters");
        var currentChapterId = component.get("v.currentChapterSequence");
        currentChapterId = currentChapterId - 1;
        console.log('Navigate Back chapter ID' + currentChapterId);
        component.set("v.previousChapter", chapters[currentChapterId - 1]);
        component.set("v.currentChapter", chapters[currentChapterId]);
        component.set("v.activeChapter",
            chapters[currentChapterId-1].ba_Chapter_Name__c);
        var taskChapterCmp = component.find("TaskChapterCmp");
        taskChapterCmp.setActiveSelection();
        component.set("v.nextChapter", chapters[currentChapterId + 1]);
        component.set("v.currentChapterSequence", currentChapterId);
        var currentChapter = component.get("v.previousChapter");
        console.log('In previous: current chapter' + currentChapter);
        console.log('Current' + currentChapter.ba_Chapter_Component_Name__c);
        component.set("v.title", currentChapter.ba_Display_Name__c);
        var container = component.find("taskFormContainer");
        if (container.isValid()) {
            var body = container.get("v.body");
            $A.createComponent("c:" + currentChapter.ba_Chapter_Component_Name__c, {
                'MemberDetails': component.get("v.MemberDetails"),
                'CaseDetails': component.get("v.CaseDetails"),
                'pcpCase': component.get("v.pcpCase"),
                'pcp': component.get("v.pcp"),
                'service': component.get("v.service")


            }, function(newCmp) {
                if (component.isValid()) {

                    component.set("v.body", newCmp);
                }
            });
            //var navigateComponentDiv = body[currentChapterNo].find(taskChapters[currentChapterNo].ba_Chapter_Name__c);
            //console.log("Found Div " + JSON.stringify(body));
        }
    }



})