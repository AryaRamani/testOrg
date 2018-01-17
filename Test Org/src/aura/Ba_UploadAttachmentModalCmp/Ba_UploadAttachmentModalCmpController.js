({
	 handleUploadFinished : function(component, event, helper){
     var uploadedFiles = event.getParam("files");
        console.log('File'+uploadedFiles[0].name);
     component.set("v.fileName",uploadedFiles[0].name);
    },
    
     getuploadtype: function(component, event, helper) {
        console.log('Event' + event.getSource().get("v.value"));
        var option = event.getSource().get("v.value");
        component.set("v.selectedoption", option);
        if (event.getSource().get("v.value") === 'file') {
            $A.util.addClass(component.find('linkId'), 'hideContent');
            $A.util.removeClass(component.find('fileId'), 'hideContent');
        } else {
            if (event.getSource().get("v.value") === 'url') {
                $A.util.addClass(component.find('fileId'), 'hideContent');
                $A.util.removeClass(component.find('linkId'), 'hideContent');
            }
        }
    },
    
    savedocument : function(component ,event, helper){
      
        var cmpEvent = component.getEvent("upload");
        cmpEvent.setParams({
            "type" : component.get("v.selectedType"),
            "status" : component.get("v.selectedStatus"),
            "selectedoption" : component.get("v.selectedoption"),
            "docclink" : component.get("v.docclink"),
            'fileName': component.get("v.fileName"),
           });
        cmpEvent.fire();
        component.set("v.selectedType", 'None');
                component.set("v.selectedStatus", 'None');
                component.set("v.docclink", '');
                component.find('file').set("v.checked", false);
                component.find('url').set("v.checked", false);
                $A.util.addClass(component.find('linkId'), 'hideContent');
                $A.util.addClass(component.find('fileId'), 'hideContent');
    },
    
    hidePopup : function(component ,event, helper){
     var cmpEvent = component.getEvent("upload");
        cmpEvent.setParams({
           "hide" : true
           });
        cmpEvent.fire();
    }

})