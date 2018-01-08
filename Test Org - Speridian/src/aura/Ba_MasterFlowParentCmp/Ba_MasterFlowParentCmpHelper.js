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
                        component.set("v.IsSpinner", false);
                       component.set("v.taskChapters", response
                            .getReturnValue());
                        console.log('Task Chapters' + JSON.stringify(response.getReturnValue()));
                       var result=response.getReturnValue();
                       var tasklist=[];
                        var GroupInfo={'GroupId':component.get("v.GroupId"),
                         'class': "bounceInRight"};
                         var attributes=GroupInfo;
                         component.set("v.Attlist",attributes);
                       for(var i=0;i<result.length;i=i+1){
                         var name="c:"+result[i].ba_Chapter_Component_Name__c;
                         tasklist.push([name,attributes]);
                       }
                         
                       this.navigateChapter(component,attributes,tasklist);
                     /*   if(component.get("v.resume")){
                              this.getpausedflow(component);
                        }
                        else{
                         var GroupInfo={'GroupId':component.get("v.GroupId"),
                         'class': "bounceInRight"};
                         var attributes=GroupInfo;
                         component.set("v.Attlist",attributes);
                        
                       this.navigateChapter(component,attributes);
                   } */
                   
                  
                       


                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(getTaskChptrAction);
        },
    
    
    
    navigateChapter : function(component,attributes,tasklist){
	   var helper = this;
		
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
		
		
		
	
	
        
        console.log('Index'+navigateToChapterNo);
		// creating components dynamically
		var container = component.find("taskFormContainer");
		if (container.isValid()) {
			/*var body = container.get("v.body");
			
			 $A.createComponents(tasklist,
			 attributes,
			
			 function(newCmp) {
            if (component.isValid()) {
              component.set("v.body", newCmp);
              // alert(component.get("v.body")[0]);
               // alert('In create'); 
                
                }
            }); */
            
            $A.createComponents(tasklist,
    function(components, status, errorMessage){
    alert(status);
        if (status === "SUCCESS") {
      
           var body = component.get("v.body");
                    body.push(components[navigateToChapterNo]);
                    component.set("v.body", body);
        }
        else if (status === "INCOMPLETE") {
            console.log("No response from server or client is offline.")
            // Show offline error
        }
        else if (status === "ERROR") {
            console.log("Error: " + errorMessage);
            // Show error message
        }
    }
);
          
			
		} else {
			console.log("No Valid Container Found with aura:id 'taskFormContainer'");
		}
		// Set Navigation Component Button Actions
		var navigateFlowCmp = component.find("NavigateFlowCmp");
		navigateFlowCmp.setNavActions();
		
		//this.fadeInComponent(component);
		
		component.set("v.IsSpinner", false);
		
	},
})