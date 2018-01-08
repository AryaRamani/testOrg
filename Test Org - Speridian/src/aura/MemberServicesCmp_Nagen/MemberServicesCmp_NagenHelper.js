({
    fetchTaskChapters:function(component,currentTaskflow,navigate) {
	  
	  var helper = this;
    	var chapterName = "";
    	var componentName = "";
        var getTaskChptrAction = component.get("c.getTaskChapters");
        getTaskChptrAction.setParams({
            "taskName": currentTaskflow
        });

        getTaskChptrAction.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.taskChapters", response.getReturnValue());
                console.log('task chapter records'+JSON.stringify(response.getReturnValue()))
                var taskChapters = component.get("v.taskChapters");
                console.log('Chapters: ');
                // why are we doing this loop ?
                for(var taskChapter in taskChapters)
                {
                	chapterName = taskChapters[taskChapter].ba_Chapter_Name__c;
                	console.log(chapterName);
                	componentName = "c:" + taskChapters[taskChapter].ba_Chapter_Component_Name__c;
                	// Create Chapter
                	//helper.createChapterDiv(component, chapterName, componentName, helper);
                }
                //Initialze Attributes
                if(navigate){
                var seq=0;
                 helper.navigateChapter(component,taskChapters,seq); 
                }
                else if(component.get("v.recordId")!==undefined){
	             var seq=1;
	            
        // this is for when the component is in the member detail page
         var action = component.get("c.fetchmember");
       action.setParams({
                'memberId': component.get("v.recordId")
            });
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
               
                component.set("v.MemberData",response.getReturnValue());
              console.log(JSON.stringify(component.get("v.MemberData")));
              helper.navigateChapter(component,taskChapters,seq); 
            }
      

        });

        $A.enqueueAction(action);
            
	            }
	            else{
	            seq=0;
	            helper.navigateChapter(component,taskChapters,seq); 
	            }
                               
            	
            } else {
                console.log("Failed with state: " + state);
            }
        });
        
        $A.enqueueAction(getTaskChptrAction);
		
	},
	
	createChapterDiv: function(component, chapterName, componentName, helper) {    	
        $A.createComponent(
            "aura:HTML", {
                tag: "div",
                "aura:id" : chapterName,
                HTMLAttributes: {
                    "id": "div" + chapterName,                    
                    "class": "slds-form-element__group slds-show"
                }},

                function(chapterDivCmp) {
                    var container = component.find("taskFormContainer");
                    if (container.isValid()) {
                        var body = container.get("v.body");
                        body.push(chapterDivCmp);
                        container.set("v.body", body);
                        console.log('DIV'+component.get("v.body"));
                        helper.createChapterComponent(component, chapterDivCmp,componentName)
                    }
                });
    },
    
     createChapterComponent: function(component, chapterDivCmp, componentName) {
    	
    	    $A.createComponent(componentName, {
    	    "ChapterInitCmpEvt" : component.getReference("c.childInitComplete")
            }, function(newCmp) {
            	   if (chapterDivCmp.isValid()) {                    
                   var body = chapterDivCmp.get("v.body");
                   body.push(newCmp);
                   chapterDivCmp.set("v.body", body);
                }
            });
    },
    
     navigateChapter : function(component,taskChapters,currentChapterNo){
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
    	var container = component.find("taskFormContainer");
    	 if (container.isValid()){
    		 var body = container.get("v.body");
    		  console.log('Test'+JSON.stringify(component.get("v.MemberData")));
    		  $A.createComponent("c:"+taskChapters[currentChapterNo].ba_Chapter_Component_Name__c, {
    		  'MemberDetails' : component.get("v.MemberData")
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
    	
    	handleNavigateNext: function(component, type, attributes) {
    	
        var chapters = component.get("v.taskChapters");
        var currentChapterId = component.get("v.currentChapterSequence");
       
        var navigateFromComponent = component.find(chapters[currentChapterId]);
        
        var navigateToComponent = component.find(chapters[currentChapterId + 1]);
      
        
        currentChapterId = currentChapterId + 1;
         console.log('Currentchapter'+currentChapterId);
         console.log('NextChapter'+chapters[currentChapterId + 1]);
        component.set("v.previousChapter", chapters[currentChapterId - 1]);
        component.set("v.currentChapter", chapters[currentChapterId]);
        component.set("v.nextChapter", chapters[currentChapterId + 1]);
        component.set("v.currentChapterSequence", currentChapterId);
        var currentChapter=component.get("v.previousChapter");
       console.log('Current'+currentChapter.ba_Chapter_Component_Name__c);
       console.log('Member'+type);
       component.set("v.showSpinner",false);
        var container = component.find("taskFormContainer");
    	 if (container.isValid()){
    		 var body = container.get("v.body");
    		  $A.createComponent("c:"+currentChapter.ba_Chapter_Component_Name__c, {
    		  attributes
            }, function(newCmp) {
                if (component.isValid()) {
                    
                    component.set("v.body", newCmp);
                }
            });
    		 //var navigateComponentDiv = body[currentChapterNo].find(taskChapters[currentChapterNo].ba_Chapter_Name__c);
    		 //console.log("Found Div " + JSON.stringify(body));
    	 }
       
        
        //console.log("Previous Chapter: " + component.get("v.previousChapter") + "; Current Chapter: " + component.get("v.currentChapter") + "; Next Chapter: " + component.get("v.nextChapter") + "; CurrentChapterIterationr: " + component.get("v.CurrentChapterIteration"))
        
    
    }
	
    
    
})