({
    doInit: function(component, event, helper) {
        var currentTaskflow = component.get("v.currentTaskFlow");
       // alert('Init'+component.get("v.resume"));
       helper.fetchgroupInformation(component);
        var resume=component.get("v.resume");
        if(resume){
             helper.fetchchapterinfo(component);
        }
       else{
        var chatperName = "";
        if (!$A.util.isEmpty(currentTaskflow)) {
        	
            helper.fetchTaskChapters(component, currentTaskflow);

        } else {
            console.log("currentTaskFlow attribute is null");
        }
        }
    },
    
    handleFlowSubmit : function(component, event, helper){
        alert('EligibilityInfo'+JSON.stringify(component.get("v.EligibilityInfo")));
        alert('Group Info'+JSON.stringify(component.get("v.groupInfo")));
    	alert('GrpBenefitPackage' + JSON.stringify(component.get("v.GrpBenefitPackage")));
    	alert('SubGroup' + JSON.stringify(component.get("v.SubGroup")));
    	alert('SubGrouplist' + JSON.stringify(component.get("v.SubGrouplst")));
    	alert('Group Billing' + JSON.stringify(component.get("v.GrpBilling")));
    	alert('Billing address'+JSON.stringify(component.get("v.Address")));
    	helper.commitinformation(component);
    },
    
    itemsChange : function(component, event,helper){
      //   alert('here');
    },

  /* handleNavigationAction: function(component, event, helper) {
        var Objatt = event.getParam("Objatt");
        if (event.getParam("Objatt") != undefined) {
            console.log('Alert' + JSON.stringify(event.getParam("Objatt")));
            if (Objatt.GrpBenefitPackage != undefined) {
                if (Objatt.GrpBenefitPackage.length > 0) {
                    component.set("v.GrpBenefitPackage", Objatt.GrpBenefitPackage);
                }
            }
            
            component.set("v.SubGroup", Objatt.SubGroup);
            
        }
    }, */
    
    


    handleNavigateNext: function(component, event, helper) {
        helper.showSpinner(component);
        var navigateFromChapterNo = component.get("v.currentChapterSequence");
        var navigateToChapterNo;
        console.log('Selection' + event.getParam("label"));
        var benefit=component.get("v.GrpBenefitPackage");
        if(benefit==undefined||benefit.length==0){
        }else{
        component.set("v.selectedbenefit",benefit);
       // alert('selectedBenefitPackage' + JSON.stringify(component.get("v.selectedbenefit")));
        }
        if (event.getParam("label")=='Yes') {

           
         
           
             navigateToChapterNo = navigateFromChapterNo - 1;
           // component.set("v.selection","No")
           
        } else {
            navigateToChapterNo = navigateFromChapterNo + 1;
        }
        component.set("v.selection",false);
        var taskChapters = component.get("v.taskChapters");
        
        if(taskChapters[navigateFromChapterNo].ba_Chapter_Component_Name__c === 'Ba_SubGroupFrmCmp'){
        helper.getsubgrpinfo(component);
        }
        else{
        }
       
        helper.navigateChapter(component, taskChapters, navigateToChapterNo,
            navigateFromChapterNo);
        component.set("v.currentChapterSequence", navigateToChapterNo);
        
        helper.hideSpinner(component);
    },

    handleNavigation: function(component, event, helper) {
    var resume=component.get("v.resume");
    if(!resume){
       var taskChapters = component.get("v.taskChapters");
        helper.navigateChapter(component, taskChapters, 0, -1);
       }
    },

    /**
     * Handler Method For Child navigatePrevEvt Events
     * 
     * @param {Component}
     *            component
     * @param {c:NavigateFlowEvt}
     *            event
     * @param {Helper}
     *            helper
     * @return {}
     */
    handleNavigatePrevious: function(component, event, helper) {
        helper.showSpinner(component);
        var navigateFromChapterNo = component.get("v.currentChapterSequence");
        var navigateToChapterNo = navigateFromChapterNo - 1;
        var taskChapters = component.get("v.taskChapters");
        helper.navigateChapter(component, taskChapters, navigateToChapterNo,
            navigateFromChapterNo);
        component.set("v.currentChapterSequence", navigateToChapterNo);
        helper.hideSpinner(component);
    },

    /**
     * Handler Method For Child flowPauseEvt Events
     * 
     * @param {Component}
     *            component
     * @param {c:NavigateFlowEvt}
     *            event
     * @param {Helper}
     *            helper
     * @return {}
     */
    handleFlowPause: function(component, event, helper) {
     var taskChapters = component.get("v.taskChapters");
    var info = {
            'EligibilityInfo': component.get("v.EligibilityInfo"),
            'GrpBenefitPackage': component.get("v.GrpBenefitPackage"),
            'SubGroup': component.get("v.SubGroup"),
            'GrpBilling': component.get("v.GrpBilling"),
            'Address': component.get("v.Address")
        };

        var getTaskChptrAction = component.get("c.pauseFlowInfo");
        getTaskChptrAction.setParams({
            "GroupId": component.get("v.GroupId"),
            "info": JSON.stringify(info),
            "task": taskChapters[component.get("v.currentChapterSequence")]       
       });

        // Add Asynch Callback For Class Action
        getTaskChptrAction
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                        //	alert('In success');
                        alert('Success');


                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(getTaskChptrAction);
    },

    /**
     * Handler Method For Child flowCancelEvt Events
     * 
     * @param {Component}
     *            component
     * @param {c:NavigateFlowEvt}
     *            event
     * @param {Helper}
     *            helper
     * @return {}
     */
    handleFlowCancel: function(component, event, helper) {},
    
    
    
})