({
	doInit : function(component, event, helper) {
	console.log(component.get("v.recordId"));
	if(component.get("v.recordId")!==undefined){
	    component.set("v.currentChapterSequence",1);
	}
	   var currentTaskflow = component.get("v.currentTaskFlow");
	   var chatperName = "";
    	 if (!$A.util.isEmpty(currentTaskflow))
    	 {
    		helper.fetchTaskChapters(component,currentTaskflow,false);
    	 }
    	 else
    	 {
    		 console.log("currentTaskFlow attribute is null");
    	 }
	},
	
	getDetails : function(component, event, helper) {
        console.log('Event received');
	 var member=event.getParam("memberdetails");
	 var spinner=event.getParam("spinner");
	 component.get("v.showSpinner",spinner);
	var task= event.getParam("task");
	console.log('Task'+task);
	
	 
	 var servicedata=event.getParam("ServiceDetails");
	 if(member!=undefined){
	 component.set("v.MemberDetails",member);
	 
	 }
	 else{
	 member=component.get("v.MemberDetails");
	 }
        if(event.getParam("CaseDetails")!==undefined){
            var casedata=event.getParam("CaseDetails");
        }
	 var type= event.getParam("type");
	 if(task!==undefined){
	component.set("v.currentTaskFlow",task);
	var navigate=true;
	helper.fetchTaskChapters(component,task,navigate);
	}
	else{
	
	 helper.handleNavigateNext(component, member, type, casedata, servicedata);
	 }
		
	}
	
})