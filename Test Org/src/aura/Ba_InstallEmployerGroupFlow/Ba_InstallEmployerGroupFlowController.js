({
	doInit : function(component, event, helper) {
	
		var currentTaskflow = component.get("v.currentTaskFlow");
		var chatperName = "";
		if (!$A.util.isEmpty(currentTaskflow)) {
			
			helper.fetchTaskChapters(component);
		} else {
			console.log("currentTaskFlow attribute is null");
		}
		
	},
	
	handleNavigateAction : function(component, event, helper){
	alert('Label in parent'+event.getParam("label"));
	if(event.getParam("label")=="Next"){
	
	    console.log('In handler of next button');
	    var obj = event.getParam("Objatt");
	   component.set("v.Objattribute",obj);
	    var data=component.get("v.Objattribute");
	    if(data==null){
	    var data=[];
	    }
	     data.push(event.getParam("Objatt"));
	    
	    component.set("v.Objattribute",data);
	    console.log('Attribute data'+JSON.stringify(data));
		var navigateFromChapterNo = component.get("v.currentChapterSequence");
		var navigateToChapterNo = navigateFromChapterNo + 1;
		var taskChapters = component.get("v.taskChapters");
		component.set("v.currentChapterSequence",navigateToChapterNo);
		helper.navigateChapter(component);
		}
		else if(event.getParam("label") == "Previous"){
		alert('Attribute'+JSON.stringify(component.get("v.Objattribute")));
		  console.log('Previous button');
		  var navigateFromChapterNo = component.get("v.currentChapterSequence");
		var navigateToChapterNo = navigateFromChapterNo - 1;
		var taskChapters = component.get("v.taskChapters");
		component.set("v.currentChapterSequence",navigateToChapterNo);
		helper.navigateChapter(component);
		}
		
		
	}
})