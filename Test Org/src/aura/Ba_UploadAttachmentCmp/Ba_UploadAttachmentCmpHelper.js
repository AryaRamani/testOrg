({

    getcorrespondence: function(component) {
    component.set("v.showSpinner",true);
        var action = component.get("c.getAttachments");
        action.setParams({
            'groupId': component.get("v.GroupId"),
            'searchtype': component.get("v.searchvalue"),
            'searchtext': component.get("v.searchtext")
        });

        // set call back 
        action.setCallback(this, function(response) {

            var state = response.getState();
            if (state === "SUCCESS") {
            component.set("v.showSpinner",false);
                console.log('Response' + JSON.stringify(response.getReturnValue()));
                var res=response.getReturnValue();
                if(res.length>0){
            /*     var uniqueItems = _.orderBy(response.getReturnValue(), function(x) {
                return x.ba_CreatedDate__c;
            }, ['desc']);*/
                component.set("v.pAttlist", res);
                component.set("v.masterlistSize", component.get("v.attlist").length);
                component.set("v.startPosn", 0);
                component.set("v.endPosn", component.get("v.pageSize") - 1);
                this.paginate(component);
                }
                else{
                }
                // handel the response errors        
            } else if (state === "INCOMPLETE") {
            component.set("v.showSpinner",false);
                alert("From server: " + response.getReturnValue());
            } else if (state === "ERROR") {
            component.set("v.showSpinner",false);
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        // enqueue the action
        $A.enqueueAction(action);
    },

    getstatus: function(component) {
    component.set("v.showSpinner",true);
        var action = component.get("c.getstatusinfo");

        action.setCallback(this, function(response) {

            var state = response.getState();
            if (state === "SUCCESS") {
            component.set("v.showSpinner",false);
                console.log('Response' + JSON.stringify(response.getReturnValue()));
                component.set("v.statusoptions", response.getReturnValue());
                // handel the response errors        
            } else if (state === "INCOMPLETE") {
            component.set("v.showSpinner",false);
                alert("From server: " + response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                component.set("v.showSpinner",false);
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        // enqueue the action
        $A.enqueueAction(action);
    },

    gettype: function(component) {
    component.set("v.showSpinner",true);
        var action = component.get("c.gettypeinfo");

        action.setCallback(this, function(response) {

            var state = response.getState();
            if (state === "SUCCESS") {
            component.set("v.showSpinner",false);
                console.log('Response' + JSON.stringify(response.getReturnValue()));
                component.set("v.typeoptions", response.getReturnValue());
                // handel the response errors        
            } else if (state === "INCOMPLETE") {
            component.set("v.showSpinner",false);
                alert("From server: " + response.getReturnValue());
            } else if (state === "ERROR") {
            component.set("v.showSpinner",false);
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        // enqueue the action
        $A.enqueueAction(action);
    },

    paginate: function(component) {
    
        var wlist = component.get("v.pAttlist");
        component.set("v.attlist", wlist);
        if (wlist.length > component.get("v.pageSize")) {
            var subWrapperlist = [];
            for (var i = 0; i < component.get("v.pageSize"); i = i + 1) {
                subWrapperlist.push(wlist[i]);
            }
            console.log('Att'+JSON.stringify(subWrapperlist));
            component.set("v.attlist", subWrapperlist);
           
        }
    },

    next: function(component) {
    component.set("v.showSpinner",true);
        var wlist = component.get("v.pAttlist");
        var endPosn = component.get("v.endPosn");
        var startPosn = component.get("v.startPosn");
        var subWrapperlist = [];
        console.log('End in next'+component.get("v.endPosn"));
        for (var i = 0; i < component.get("v.pageSize"); i++) {
            ++endPosn;
            if (wlist.length > endPosn) {
                subWrapperlist.push(wlist[endPosn]);
            }
            startPosn++;
        }
        component.set("v.attlist", subWrapperlist);
        component.set("v.endPosn", endPosn);
        component.set("v.startPosn", startPosn);
        component.set("v.showSpinner",false);
    },

    previous: function(component) {
    component.set("v.showSpinner",true);
        var wlist = component.get("v.pAttlist");
        var startPosn = component.get("v.startPosn");
        var endPosn = component.get("v.endPosn");
        var subWrapperlist = [];
        var pageSize = component.get("v.pageSize");

        startPosn -= pageSize;
        if (startPosn > -1) {
            for (var i = 0; i < pageSize; i++) {
                if (startPosn > -1) {
                    subWrapperlist.push(wlist[startPosn]);
                    startPosn++;
                    endPosn--;
                }
            }
            startPosn -= pageSize;
           component.set("v.attlist", subWrapperlist);
        component.set("v.endPosn", endPosn);
        component.set("v.startPosn", startPosn);
          component.set("v.showSpinner",false); 
        }
    },
        
        uploadselctedFile : function(component){
          var action = component.get("c.insertcorresp");
            action.setParams({
                'groupId': component.get("v.GroupId"),
                
            });

            // set call back 
            action.setCallback(this, function(response) {

                var state = response.getState();
                if (state === "SUCCESS") {
                component.set("v.myRecordId",response.getReturnValue());
                        
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
   },
    
    createcorresp : function(component, event, helper){
        var att=component.get("v.pAttlist");
        var Wrplist = component.get("v.AttachmentList");
        if(Wrplist==undefined){
        	Wrplist =[];
        }
       // alert('In correspondance');
         var action = component.get("c.createcorrespondence");
			action.setParams({
            'groupId': component.get("v.parentId"),
            'fileName': component.get("v.fileName"),
            'typeinfo': component.get("v.selectedType"),
            'status': component.get("v.selectedStatus"),
            'Parentfield' : component.get("v.parentfield"),
            'MemberId': component.get("v.Rowdata1").Id,
        });

        action.setCallback(this, function(response) {
			//alert('Response'+JSON.stringify(response));
            var state = response.getState();
            if (state === "SUCCESS") {
            component.set("v.showSpinner",false);
           
            Wrplist.push(response.getReturnValue());
            component.set("v.AttachmentList",Wrplist);
             alert('Result'+JSON.stringify(component.get("v.AttachmentList")));
                att.push(response.getReturnValue().coresp);
                console.log('Response'+JSON.stringify(response.getReturnValue()));
                      var uniqueItems = _.orderBy(att, function(x) {
                return x.ba_CreatedDate__c;
            }, ['desc']);
                     component.set("v.pAttlist",uniqueItems);
                     console.log('Attachment list sorted'+JSON.stringify(component.get("v.pAttlist")));
                     this.paginate(component);
                     var toastEvent = $A.get("e.force:showToast");
	    				toastEvent.setParams({
	       				 "title": "Success!",
	       				 "message": "Your file is uploaded successfully",
                            "type" : "success"
	    			});
	    		toastEvent.fire();

               // console.log('Response' + JSON.stringify(response.getReturnValue()));
               //component.set("v.statusoptions", response.getReturnValue());
                // handel the response errors        
            } else if (state === "INCOMPLETE") {
            component.set("v.showSpinner",false);
                alert("From server: " + response.getReturnValue());
            } else if (state === "ERROR") {
                var errors = response.getError();
                if (errors) {
                component.set("v.showSpinner",false);
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        // enqueue the action
        $A.enqueueAction(action);
        
    },
    savedocument: function(component, event, helper) {
    
        console.log('Selected option' + component.get("v.selectedoption"));
        if (component.get("v.selectedoption") === 'url') {
            console.log('Dropdown' + component.get("v.selectedType"));
            if (component.get("v.docclink") === null || component.get("v.docclink") === undefined || component.get("v.selectedType") == '' || component.get("v.selectedType") === undefined || component.get("v.selectedStatus") == '' || component.get("v.selectedStatus") === undefined) {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": "Required fields missings",
                    "type": "error"
                });
                toastEvent.fire();
                //alert('complete all the required fields');
            } else {
                component.set("v.showSpinner", true);
                var att = component.get("v.pAttlist");
                var action = component.get("c.createdoccurl");
                action.setParams({
                    'groupId': component.get("v.parentId"),
                    'documenturl': component.get("v.docclink"),
                    'typeinfo': component.get("v.selectedType"),
                    'status': component.get("v.selectedStatus"),
                    'Parentfield' : component.get("v.parentfield")
                });

                // set call back 
                action.setCallback(this, function(response) {

                    var state = response.getState();
                    if (state === "SUCCESS") {
                       component.set("v.showSpinner", false);
                       var res = response.getReturnValue();
                       if (res === undefined || res === null) {} else {
                            att.push(response.getReturnValue());
                            var uniqueItems = _.orderBy(att, function(x) {
                                return x.ba_CreatedDate__c;
                            }, ['desc']);
                            //alert(JSON.stringify(uniqueItems));
                            component.set("v.pAttlist", uniqueItems);
                            console.log('Attribute list'+JSON.stringify(component.get("v.pAttlist")));
                            this.paginate(component);
                            //console.log('Response' + JSON.stringify(response.getReturnValue()));
                            //component.set("v.attlist", response.getReturnValue());
                            // handle the response errors   
                        } 
                    } else if (state === "INCOMPLETE") {
                        component.set("v.showSpinner", false);
                        alert("From server: " + response.getReturnValue());
                    } else if (state === "ERROR") {
                        var errors = response.getError();
                        if (errors) {
                            if (errors[0] && errors[0].message) {
                                component.set("v.showSpinner", false);
                                console.log("Error message: " + errors[0].message);
                            }
                        } else {
                            console.log("Unknown error");
                        }
                    }
                });
                // enqueue the action
                $A.enqueueAction(action);
              
                $A.util.addClass(component.find('popUpId'), 'hideContent');
                $A.util.addClass(component.find('popUpBackgroundId'), 'hideContent');
            }
        } else
        if (component.get("v.selectedoption") === 'file') {
            if (component.get("v.selectedType") == '' || component.get("v.selectedType") === undefined || component.get("v.selectedStatus") == '' || component.get("v.selectedStatus") === undefined || component.get("v.fileName") === null || component.get("v.fileName") === undefined || component.get("v.fileName") === '') {
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    "title": "Error!",
                    "message": "Required fields missings",
                    "type": "error"
                });
                toastEvent.fire();
            } else {
                //  helper.uploadHelper(component, event);
                //  helper.uploadselctedFile(component);
                this.createcorresp(component);
                $A.util.addClass(component.find('linkId'), 'hideContent');
                $A.util.addClass(component.find('fileId'), 'hideContent');
                $A.util.addClass(component.find('popUpId'), 'hideContent');
                $A.util.addClass(component.find('popUpBackgroundId'), 'hideContent');
            }
        }

    },
    
})