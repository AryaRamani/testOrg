({
	doInit : function(component, event, helper) {
	console.log(component.get("v.recordId"));
	if(component.get("v.recordId")!==undefined){
	    component.set("v.currentChapterSequence",1);
	}
	   var currentTaskflow = component.get("v.currentTaskFlow");
        console.log('current task flow'+currentTaskflow);
        
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
        var nextseq=0;
        var task;
	 var member=event.getParam("memberdetails");
	 var pcpCase=event.getParam("pcpCase");
	 var pcp=event.getParam("pcp");
	 if(pcpCase!=undefined){
	 component.set("v.pcpCase",pcpCase);
	 component.set("v.pcp",pcp);
	 }
	 if(event.getParam("service")!==undefined){
	   component.set("v.service",event.getParam("service"));
	 }
	 
	 var spinner=event.getParam("spinner");
	 component.get("v.showSpinner",spinner);
	var navigatetask= event.getParam("task");
	
	
	 
	 var servicedata=event.getParam("ServiceDetails");
	 if(member!=undefined){
	 component.set("v.MemberDetails",member);
	 
	 }
	 else{
	 member=component.get("v.MemberDetails");
	 }
        if(event.getParam("CaseDetails")!==undefined){
            var casedata=event.getParam("CaseDetails");
            component.set("v.CaseDetails",casedata);
        }
	 var type= event.getParam("type");
	 var sequence=event.getParam("sequence");
	 console.log('sequence'+sequence);
        if(sequence!==undefined || navigatetask!==undefined ){
	 if(sequence!==undefined){
	task=sequence;
      component.set("v.sequence",true);
	
	helper.fetchTaskChapters(component,task,navigate);
	 }
	
	 if(navigatetask!==undefined){
	component.set("v.currentTaskFlow",task);
     component.set("v.sequence",false);     
	var navigate=true;
     task=navigatetask
	helper.fetchTaskChapters(component,task,navigate);
	}
        }
	else{
	
	 helper.handleNavigateNext(component, member, type, casedata, servicedata);
	 }
		
	},
    
    navigateBack : function(component, event, helper){
	helper.handleNavigatePrevious(component);
	}
	
})