({
	fetchTaskChapters:function(component,currentTaskflow) {
        
	  component.set("v.showSpinner",true);
        console.log('curretn task flow'+currentTaskflow);
        
	  var helper = this;
    	var chapterName = "";
    	var componentName = "";
       var flow=component.get("v.taskflow");
        console.log('taskflow'+flow);
    	component.set("v.currentTaskFlow",currentTaskflow);
        
        console.log('Current Task'+currentTaskflow);
         var getTaskChptrAction = component.get("c.getTaskChapters");
        getTaskChptrAction.setParams({
            "taskName": currentTaskflow,
            "taskflow": component.get("v.taskflow")
        });

        getTaskChptrAction.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.taskChapters", response.getReturnValue());
                component.set("v.showSpinner",false);
                console.log('Response'+JSON.stringify(response.getReturnValue()))
                 var taskChapters = component.get("v.taskChapters");
     
                    var sequence=0;
                  //console.log('Task' +JSON.stringify(component.get("v.taskChapters"));
                 helper.navigateChapter(component,component.get("v.taskChapters"),sequence); 
                
                
            }
           
            
             else {
                console.log("Failed with state: " + state);
            }
               
               
        });
        
        $A.enqueueAction(getTaskChptrAction);
    },
    
      navigateChapter : function(component,taskChapters,currentChapterNo){
        console.log('Current Chapter No'+currentChapterNo);
          console.log('Current chapter Name'+JSON.stringify(component.get("v.taskChapters")));
    component.set("v.currentChapter",taskChapters[currentChapterNo].ba_Chapter_Name__c);   
          
    	component.set("v.currentChapterSequence",taskChapters[currentChapterNo].ba_Sequence_Number__c);
    	if(taskChapters[currentChapterNo].ba_Sequence_Number__c == 1){
    		component.set("v.previousChapter",undefined);
    	}
    	else{
    		component.set("v.previousChapter",taskChapters[currentChapterNo - 1].ba_Chapter_Name__c);
    	}
    	if(taskChapters[currentChapterNo].ba_Sequence_Number__c == taskChapters.length){
    		component.set("v.nextChapter",undefined);
    	}
    	else{
    		component.set("v.nextChapter",taskChapters[currentChapterNo + 1].ba_Chapter_Name__c);    	
    	}
    	
    	component.set("v.currentChapter",taskChapters[currentChapterNo].ba_Chapter_Component_Name__c);
    	 console.log('SObject Value'+component.get("v.StoredValues.objtype[0].ba_Member__c"));
    	
    	 component.set("v.activeChapter",
						taskChapters[currentChapterNo].ba_Chapter_Name__c);
          
                      
		component.set("v.taskChapters",taskChapters);
           console.log('Active chapters are'+JSON.stringify(component.get("v.activeChapter")));
		 console.log('Task Chapters'+JSON.stringify(component.get("v.taskChapters")));
				var taskChapterCmp = component.find("TaskChapterCmp");
				taskChapterCmp.setActiveSelection();
    	var container = component.find("taskFormContainer");
    	 
    	
    	 component.set("v.showSpinner",false);
    	 if (container.isValid()){
    		 var body = container.get("v.body");
    		 
    		  $A.createComponent("c:"+taskChapters[currentChapterNo].ba_Chapter_Component_Name__c, {
    		  
    		 'cellinfo' : component.get("v.StoredValues.cellinfo"),
    		 'AllDependent': component.get("v.StoredValues.Dependent")
            }, function(newCmp) {
             
                if (component.isValid()) {
                   
                    component.set("v.body", newCmp);
                    $A.util.addClass(component.find('taskFormContainer'), 'bounceInLeft');
                }
            });
            
    	
    	 }
    			
    	},
    
    handleNavigateNext: function(component) {
    	
        var chapters = component.get("v.taskChapters");
        console.log('Chapters In event handler'+JSON.stringify(chapters));
        var currentChapterId = component.get("v.currentChapterSequence");
       
        var navigateFromComponent = component.find(chapters[currentChapterId]);
        
        var navigateToComponent = component.find(chapters[currentChapterId + 1]);
      
        
       // currentChapterId = currentChapterId + 1;
         console.log('Currentchapter'+currentChapterId);
         console.log('NextChapter'+chapters[currentChapterId + 1]);
        component.set("v.previousChapter", chapters[currentChapterId - 1]);
        component.set("v.currentChapter", chapters[currentChapterId]);
        component.set("v.nextChapter", chapters[currentChapterId + 1]);
        component.set("v.currentChapterSequence", currentChapterId);
        var currentChapter=component.get("v.currentChapter");
        currentChapterId = currentChapterId + 1;
       component.set("v.currentChapterSequence", currentChapterId);
       
        var container = component.find("taskFormContainer");
        component.set("v.activeChapter",
						chapters[currentChapterId-1].ba_Chapter_Name__c);
				var taskChapterCmp = component.find("TaskChapterCmp");
				taskChapterCmp.setActiveSelection();
      
      component.set("v.showSpinner",false);
    	 if (container.isValid()){
    		 var body = container.get("v.body");
    		  $A.createComponent("c:"+currentChapter.ba_Chapter_Component_Name__c, {
    		  
    		 'cellinfo' : component.get("v.StoredValues.cellinfo"),
    		 'AllDependent': component.get("v.StoredValues.Dependent")
            }, function(newCmp) {
                if (component.isValid()) {
                    
                    component.set("v.body", newCmp);
                }
            });
    		 
    	 }
       
        component.set("v.showSpinner",false);
        //console.log("Previous Chapter: " + component.get("v.previousChapter") + "; Current Chapter: " + component.get("v.currentChapter") + "; Next Chapter: " + component.get("v.nextChapter") + "; CurrentChapterIterationr: " + component.get("v.CurrentChapterIteration"))
        
    
    },
    
    handleNavigatePrevious : function(component){
     console.log('In previous handler');
     
     var chapters = component.get("v.taskChapters");
     var currentChapterId = component.get("v.currentChapterSequence");
     currentChapterId = currentChapterId - 1;
     console.log('Navigate Back chapter ID'+ currentChapterId);
     component.set("v.previousChapter", chapters[currentChapterId - 1]);
     console.log('In previous'+JSON.stringify(chapters[currentChapterId - 1]));
        component.set("v.currentChapter", chapters[currentChapterId]);
        component.set("v.nextChapter", chapters[currentChapterId + 1]);
        component.set("v.currentChapterSequence", currentChapterId);
     var currentChapter=chapters[currentChapterId - 1];
     console.log('In previous: current chapter'+ JSON.stringify(currentChapter));
       console.log('Current'+currentChapter.ba_Chapter_Component_Name__c);
       component.set("v.activeChapter",
						currentChapter.ba_Chapter_Name__c);
				var taskChapterCmp = component.find("TaskChapterCmp");
				taskChapterCmp.setActiveSelection();
        component.set("v.showSpinner",false);
       var container = component.find("taskFormContainer");
    	 if (container.isValid()){
    		 var body = container.get("v.body");
    		  $A.createComponent("c:"+currentChapter.ba_Chapter_Component_Name__c, {
    		  
    		  
    		 
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