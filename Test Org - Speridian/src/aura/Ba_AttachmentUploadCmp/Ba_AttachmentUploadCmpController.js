({
    doInit: function(component, event, helper) {
        helper.getcorrespondence(component);
        helper.getstatus(component);
        helper.gettype(component);
    },
    handleFilesChange: function(component, event, helper) {
        var fileName = 'No File Selected..';
        console.log('file length'+event.getSource().get("v.files").length );
        if (event.getSource().get("v.files").length > 0) {
            fileName = event.getSource().get("v.files")[0]['name'];
        }
        
        component.set("v.fileName", fileName);
        if (component.find("fileId").get("v.files").length > 0) {

            // helper.uploadHelper(component, event);
        } else {
        var toastEvent = $A.get("e.force:showToast");
	    				toastEvent.setParams({
	       				 "title": "Failure!",
	       				 "message": "Please select a valid file"
	    			});
	    		toastEvent.fire();
           // alert('Please Select a Valid File');
        }
    },

    openModal: function(component, event, helper) {

        $A.util.removeClass(component.find('popUpId'), 'hideContent');
        $A.util.removeClass(component.find('popUpBackgroundId'), 'hideContent');
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

    hidePopup: function(component, event, helper) {
        $A.util.addClass(component.find('popUpId'), 'hideContent');
        $A.util.addClass(component.find('popUpBackgroundId'), 'hideContent');
    },

    savedocument: function(component, event, helper) {
        console.log('Selected option' + component.get("v.selectedoption"));
        if (component.get("v.selectedoption") === 'url') {
        console.log('Dropdown'+ component.get("v.selectedType"));
        if(component.get("v.docclink") === null||component.get("v.docclink")===undefined || component.get("v.selectedType") == '' || component.get("v.selectedType")===undefined || component.get("v.selectedStatus") == ''|| component.get("v.selectedStatus")===undefined ){
       var toastEvent = $A.get("e.force:showToast");
	    				toastEvent.setParams({
	       				 "title": "Warning!",
	       				 "message": "complete all the required fields"
	    			});
	    		toastEvent.fire();
       //alert('complete all the required fields');
       }
       else{
       component.set("v.showSpinner",true);
        var att=component.get("v.pAttlist");
            var action = component.get("c.createdoccurl");
            action.setParams({
                'groupId': component.get("v.GroupId"),
                'documenturl': component.get("v.docclink"),
                'typeinfo': component.get("v.selectedType"),
                'status': component.get("v.selectedStatus")
            });

            // set call back 
            action.setCallback(this, function(response) {

                var state = response.getState();
                if (state === "SUCCESS") {
                component.set("v.showSpinner",false);
                var res=response.getReturnValue();
                if(res===undefined || res===null){
                }
                else{
                att.push(response.getReturnValue());
                 var uniqueItems = _.orderBy(att, function(x) {
                return x.ba_CreatedDate__c;
            }, ['desc']);
            component.set("v.pAttlist",uniqueItems);
            helper.paginate(component);
                    //console.log('Response' + JSON.stringify(response.getReturnValue()));
                    //component.set("v.attlist", response.getReturnValue());
                    // handle the response errors   
                    }     
                } else if (state === "INCOMPLETE") {
                component.set("v.showSpinner",false);
                    alert("From server: " + response.getReturnValue());
                } else if (state === "ERROR") {
                    var errors = response.getError();
                    if (errors) {
                        if (errors[0] && errors[0].message) {
                        component.set("v.showSpinner",false);
                            console.log("Error message: " + errors[0].message);
                        }
                    } else {
                        console.log("Unknown error");
                    }
                }
            });
            // enqueue the action
            $A.enqueueAction(action);
            component.set("v.selectedType", 'None');
        component.set("v.selectedStatus", 'None');
        component.set("v.docclink", '');
        component.find('file').set("v.checked", false);
        component.find('url').set("v.checked", false);
        $A.util.addClass(component.find('linkId'), 'hideContent');
        $A.util.addClass(component.find('fileId'), 'hideContent');
        $A.util.addClass(component.find('popUpId'), 'hideContent');
        $A.util.addClass(component.find('popUpBackgroundId'), 'hideContent');
            }
        } else
        if (component.get("v.selectedoption") === 'file') {
         if(component.get("v.selectedType") == '' || component.get("v.selectedType")===undefined || component.get("v.selectedStatus") == ''|| component.get("v.selectedStatus")===undefined || component.get("v.fileName") === null|| component.get("v.fileName")===undefined || component.get("v.fileName")==='' ){
       alert('complete all the required fields');
       }
       else{
          //  helper.uploadHelper(component, event);
            //  helper.uploadselctedFile(component);
              helper.createcorresp(component);
            $A.util.addClass(component.find('linkId'), 'hideContent');
        $A.util.addClass(component.find('fileId'), 'hideContent');
        $A.util.addClass(component.find('popUpId'), 'hideContent');
        $A.util.addClass(component.find('popUpBackgroundId'), 'hideContent');
            }
        }
        
    },
    
    handleUploadFinished : function(component, event, helper){
     var uploadedFiles = event.getParam("files");
        console.log('File'+uploadedFiles[0].name);
     component.set("v.fileName",uploadedFiles[0].name);
    },

    getsearchresults: function(component, event, helper) {
        helper.getcorrespondence(component);
        console.log('Selected' + component.get("v.searchvalue"));
        console.log('Search text' + component.get("v.searchtext"));
    },

    sortByName: function(component,event,helper) {
        component.set("v.showSpinner",true);
        var items = component.get("v.pAttlist");
        if (component.get("v.sort1") === "down") {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.Name;
            }, ['desc']);
           // component.set("v.attlist", uniqueItems);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner",false);
            component.set("v.sort1", "up");
        } else {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.Name;
            }, ['asc']);
           // component.set("v.attlist", uniqueItems);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner",false);
            component.set("v.sort1", "down");
        }

    },

    sortByStatus: function(component,event,helper) {
    component.set("v.showSpinner",true);
        var items = component.get("v.pAttlist");
        if (component.get("v.sort2") === "down") {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.Document_Status__c;
            }, ['desc']);
            // component.set("v.attlist", uniqueItems);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner",false);
            component.set("v.sort2", "up");
        } else {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.Document_Status__c;
            }, ['asc']);
          //  component.set("v.attlist", uniqueItems);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner",false);
            component.set("v.sort2", "down");
        }

    },

    sortByType: function(component,event,helper) {
    component.set("v.showSpinner",true);
        var items = component.get("v.pAttlist");
        if (component.get("v.sort3") === "down") {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.ba_DocumentType__c;
            }, ['desc']);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner",false);
            component.set("v.sort3", "up");
        } else {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.ba_DocumentType__c;
            }, ['asc']);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner",false);
            component.set("v.sort3", "down");
        }

    },

    sortByDate: function(component,event,helper) {
    component.set("v.showSpinner",true);
        var items = component.get("v.pAttlist");
        if (component.get("v.sort4") === "down") {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.ba_CreatedDate__c;
            }, ['desc']);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner",false);
            component.set("v.sort4", "up");
        } else {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.ba_CreatedDate__c;
            }, ['asc']);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner",false);
            component.set("v.sort4", "down");
        }

    },
    
    next : function(component, event, helper) {
    console.log('End position'+component.get("v.endPosn"));
    console.log('Length'+ component.get("v.pAttlist").length);
helper.next(component);
},
previous : function(component, event, helper) {
helper.previous(component);
}
})