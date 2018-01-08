({
	doInit : function(component, event, helper) {
	 console.log('Paused task ID'+component.get("v.taskflow"));
	   var currentTaskflow = component.get("v.currentTaskFlow");
	   console.log("current task flow "+currentTaskflow);
         var chatperName = "";
    	 if (!$A.util.isEmpty(currentTaskflow))
    	 {
    		helper.fetchTaskChapters(component,currentTaskflow);
    	 }
    	 else
    	 {
    		 console.log("currentTaskFlow attribute is null");
    	 }
	},
    
    handleNavigation : function(component, event, helper){
      console.log('In event handler');
      var agency=event.getParam("Agency");
        component.set("v.showSpinner",true);
       component.set("v.Agency",agency);
        component.set("v.Producer",producer);
      var producer=event.getParam("Producer");
        console.log('Option'+event.getParam("option"));
        if(event.getParam("option")){
            var sequence=component.get("v.currentChapterSequence");
            sequence=sequence+1;
            component.set("v.currentChapterSequence",sequence);
        }
      component.set("v.showSpinner",true);  
      helper.handleNavigateNext(component);
    },
    
  
     navigateBack : function(component, event, helper){
         component.set("v.showSpinner",true);
     var cellinfo=event.getParam('cellinfo');
    console.log('Event handled'+JSON.stringify(cellinfo));
    var dependent=event.getParam('AllDependent');
    console.log('All dependents in parent'+dependent);
    var obj = {
                    'cellinfo': cellinfo,
                    'Dependent' : dependent,
                    

                };
                
     component.set("v.StoredValues",obj);
	helper.handleNavigatePrevious(component);
	}
})