({
	handleUploadFinished : function(component, event, helper) {
      
        // Get the list of uploaded files
        var uploadedFiles = event.getParam("files");
       
         var toastEvent = $A.get("e.force:showToast");
    toastEvent.setParams({
        "title": "Success!",
        "message": "File "+uploadedFiles[0].name+" Uploaded successfully."
    });
    toastEvent.fire();
        
	}
})