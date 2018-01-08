({
    fetchTaskChapters: function(component) {
    	component.set("v.IsSpinner", true);
        var getTaskChptrAction = component.get("c.getTaskChapters");
        getTaskChptrAction.setParams({
            "taskName": component.get("v.currentTaskFlow")
        });

        // Add Asynch Callback For Class Action
        getTaskChptrAction
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    component.set("v.IsSpinner", false);
                    if (component.isValid() && state === "SUCCESS") {
                        component.set("v.taskChapters", response
                            .getReturnValue());
                        console.log('Task Chapters' + JSON.stringify(response.getReturnValue()));
                       this.navigateChapter(component);
                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(getTaskChptrAction);

    },
    
   navigateChapter : function(component ,event, helper){
	   var helper = this;
		/*var navDirection = "forward";
		if (navigateToChapterNo > navigateFromChapterNo) {
			navDirection = "forward";
		} else {
			navDirection = "backward";
		}*/
		
		//  Get all the task chapters
		var taskChapters=component.get("v.taskChapters"); 
		
		//Set First Chapter Attribute
		var navigateToChapterNo = component.get("v.currentChapterSequence");
		console.log('Current chapter Sequence'+ navigateToChapterNo);
		if (navigateToChapterNo == 0) {
			component.set("v.firstChapter", true);
		} else {
			component.set("v.firstChapter", false);
		}
	   console.log('If first Chapter'+ component.get("v.firstChapter"));
	   
	   
		//Set Last Chapter Attribute
		if ((navigateToChapterNo + 1 ) == taskChapters.length) {
			component.set("v.lastChapter", true);
		} else {
			component.set("v.lastChapter", false);
		}
		
		console.log('If last Chapter'+ component.get("v.lastChapter"));
				
		component.set("v.activeChapter",taskChapters[navigateToChapterNo].ba_Chapter_Name__c);
		console.log('Active chapter Name'+ component.get("v.activeChapter"));
		
		var taskChapterCmp = component.find("TaskChapterCmp");
		taskChapterCmp.setActiveSelection();
		var objatt;
		console.log('Object'+JSON.stringify(component.get("v.Objattribute")));
		
		
		objatt = component.get("v.Objattribute")[navigateToChapterNo-1];
	
        console.log('Object att'+ JSON.stringify(objatt));
        console.log('Index'+navigateToChapterNo);
		// creating components dynamically
		var container = component.find("taskFormContainer");
		if (container.isValid()) {
			var body = container.get("v.body");
			 $A.createComponent("c:"+taskChapters[navigateToChapterNo].ba_Chapter_Component_Name__c, 
			objatt  , function(newCmp) {
            if (component.isValid()) {
              component.set("v.body", newCmp);
                    
                }
            });
			
		} else {
			console.log("No Valid Container Found with aura:id 'taskFormContainer'");
		}
		// Set Navigation Component Button Actions
		var navigateFlowCmp = component.find("NavigateFlowCmp");
		navigateFlowCmp.setNavActions();
	}
})