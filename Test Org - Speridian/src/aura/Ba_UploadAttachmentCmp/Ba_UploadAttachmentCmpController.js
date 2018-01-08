({
    doInit: function(component, event, helper) {
    
   
    if(component.get("v.parentfield")=='Group'){
        helper.getcorrespondence(component);
        var GroupId=component.get("v.GroupId");
         component.set("v.parentId",GroupId);
        
        }
        helper.getstatus(component);
        helper.gettype(component);
    },

    handleFilesChange: function(component, event, helper) {
        var fileName = 'No File Selected..';
        console.log('file length' + event.getSource().get("v.files").length);
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
    
    getAttributeMethod : function(component, event, helper){
         var params = event.getParam('arguments');
		 params.pAttlist=component.get("v.pAttlist");
		 
        if (params) {
        console.log(JSON.stringify(params));
          
            return params;
        }
   },



    hidePopup: function(component, event, helper) {
        $A.util.addClass(component.find('popUpId'), 'hideContent');
        $A.util.addClass(component.find('popUpBackgroundId'), 'hideContent');
    },

    

    getsearchresults: function(component, event, helper) {
        helper.getcorrespondence(component);
        console.log('Selected' + component.get("v.searchvalue"));
        console.log('Search text' + component.get("v.searchtext"));
    },

    sortByName: function(component, event, helper) {
        component.set("v.showSpinner", true);
        var items = component.get("v.pAttlist");
        if (component.get("v.sort1") === "down") {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.Name;
            }, ['desc']);
            // component.set("v.attlist", uniqueItems);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner", false);
            component.set("v.sort1", "up");
        } else {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.Name;
            }, ['asc']);
            // component.set("v.attlist", uniqueItems);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner", false);
            component.set("v.sort1", "down");
        }

    },

    sortByStatus: function(component, event, helper) {
        component.set("v.showSpinner", true);
        var items = component.get("v.pAttlist");
        if (component.get("v.sort2") === "down") {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.Document_Status__c;
            }, ['desc']);
            // component.set("v.attlist", uniqueItems);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner", false);
            component.set("v.sort2", "up");
        } else {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.Document_Status__c;
            }, ['asc']);
            //  component.set("v.attlist", uniqueItems);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner", false);
            component.set("v.sort2", "down");
        }

    },

    sortByType: function(component, event, helper) {
        component.set("v.showSpinner", true);
        var items = component.get("v.pAttlist");
        if (component.get("v.sort3") === "down") {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.ba_DocumentType__c;
            }, ['desc']);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner", false);
            component.set("v.sort3", "up");
        } else {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.ba_DocumentType__c;
            }, ['asc']);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner", false);
            component.set("v.sort3", "down");
        }

    },

    sortByDate: function(component, event, helper) {
        component.set("v.showSpinner", true);
        var items = component.get("v.pAttlist");
        if (component.get("v.sort4") === "down") {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.ba_CreatedDate__c;
            }, ['desc']);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner", false);
            component.set("v.sort4", "up");
        } else {
            var uniqueItems = _.orderBy(items, function(x) {
                return x.ba_CreatedDate__c;
            }, ['asc']);
            component.set("v.pAttlist", uniqueItems);
            helper.paginate(component);
            component.set("v.showSpinner", false);
            component.set("v.sort4", "down");
        }

    },

    next: function(component, event, helper) {
        console.log('End position' + component.get("v.endPosn"));
        console.log('Length' + component.get("v.pAttlist").length);
        helper.next(component);
    },
    previous: function(component, event, helper) {
        helper.previous(component);
    },
    
    handleModalAction : function(component, event, helper){
     var ishide=event.getParam("hide");
     if(ishide){
    	   $A.util.addClass(component.find('popUpId'), 'hideContent');
        $A.util.addClass(component.find('popUpBackgroundId'), 'hideContent');
     }else{
    	var type=event.getParam("type");
    	component.set("v.selectedType",type);
    	var status = event.getParam("status");
    	component.set("v.selectedStatus",status);
    	var option=event.getParam("selectedoption");
    	component.set("v.selectedoption",option);
    	var link=event.getParam("docclink");
    	component.set("v.docclink",link);
    	var filename=event.getParam("fileName");
    	if(filename!==undefined){
    	component.set("v.fileName",filename);
    	}
    	
    	helper.savedocument(component);
    }
    },
    
    handleNavigateNext : function(component, event, helper){
    var label=event.getParam("label");
    console.log('Label in handler'+label);
      var cmpEvent = component.getEvent("navigateEvt");
        cmpEvent.setParams({
           "Objatt" : component.get("v.pAttlist"),
           "name" : "pAttlist"
           });
        cmpEvent.fire();
    
    }
})