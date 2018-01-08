({
    // MAX_FILE_SIZE: 4 500 000, //Max file size 4.5 MB 
    // CHUNK_SIZE: 750 000, //Chunk Max size 750Kb 

    uploadHelper: function(component, event) {
        // start/show the loading spinner   
        //component.set("v.showLoadingSpinner", true);
        // get the selected files using aura:id [return array of files]
        var fileInput = component.find("fileId").get("v.files");
        // get the first file using array index[0]  
        var file = fileInput[0];
        var self = this;
        if(file===undefined || file===null){
          var toastEvent = $A.get("e.force:showToast");
	    				toastEvent.setParams({
	       				 "title": "Warning!",
	       				 "message": "Please Select a file"
	    			});
	    		toastEvent.fire();
        	//alert('Select a file');
        }
        else{
        // check the selected file size, if select file size greter then MAX_FILE_SIZE,
        // then show a alert msg to user,hide the loading spinner and return from function  
        if (file.size > self.MAX_FILE_SIZE) {
            // component.set("v.showLoadingSpinner", false);
            component.set("v.fileName", 'Alert : File size cannot exceed ' + self.MAX_FILE_SIZE + ' bytes.\n' + ' Selected file size: ' + file.size);
             var toastEvent = $A.get("e.force:showToast");
	    				toastEvent.setParams({
	       				 "title": "Warning!",
	       				 "message": "File size cannot exceed " + self.MAX_FILE_SIZE + ' bytes.\n' + ' Selected file size: ' + file.size
	    			});
	    		toastEvent.fire();
            return;
        }

        // create a FileReader object 
        var objFileReader = new FileReader();
        // set onload function of FileReader object   
        objFileReader.onload = $A.getCallback(function() {
            var fileContents = objFileReader.result;
            var base64 = 'base64,';
            var dataStart = fileContents.indexOf(base64) + base64.length;

            fileContents = fileContents.substring(dataStart);
            // call the uploadProcess method 
            self.uploadProcess(component, file, fileContents);
        });

        objFileReader.readAsDataURL(file);
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
    },

    uploadProcess: function(component, file, fileContents) {
        // set a default size or startpostiton as 0 
        var startPosition = 0;
        // calculate the end size or endPostion using Math.min() function which is return the min. value   
        var endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);

        // start with the initial chunk, and set the attachId(last parameter)is null in begin
        this.uploadInChunk(component, file, fileContents, startPosition, endPosition, '');
    },


    uploadInChunk: function(component, file, fileContents, startPosition, endPosition, attachId) {
        // call the apex method 'saveChunk'
        var getchunk = fileContents.substring(startPosition, endPosition);
        var att=component.get("v.pAttlist");
        console.log('Group Id' + component.get("v.groupId"));
        component.set("v.showSpinner",true);
        var action = component.get("c.saveChunk");
        action.setParams({
            'groupId': component.get("v.groupId"),
            'fileName': file.name,
            'base64Data': encodeURIComponent(getchunk),
            'contentType': file.type,
            'fileId': attachId,
            'typeinfo': component.get("v.selectedType"),
            'status': component.get("v.selectedStatus")
        });

        // set call back 
        action.setCallback(this, function(response) {
            // store the response / Attachment Id  
            var res=response.getReturnValue(); 
            attachId = res.fileId;
            var state = response.getState();
            if (state === "SUCCESS") {
            component.set("v.showSpinner",false);
                // update the start position with end postion
                startPosition = endPosition;
                endPosition = Math.min(fileContents.length, startPosition + this.CHUNK_SIZE);
                // check if the start postion is still less then end postion 
                // then call again 'uploadInChunk' method , 
                // else, diaply alert msg and hide the loading spinner
                if (startPosition < endPosition) {
                    this.uploadInChunk(component, file, fileContents, startPosition, endPosition, attachId);
                } else {
                     att.push(res.coresp);
                      var uniqueItems = _.orderBy(att, function(x) {
                return x.ba_CreatedDate__c;
            }, ['desc']);
                     component.set("v.pAttlist",uniqueItems);
                     console.log('Attachment list sorted'+JSON.stringify(component.get("v.pAttlist")));
                     this.paginate(component);
                     var toastEvent = $A.get("e.force:showToast");
	    				toastEvent.setParams({
	       				 "title": "Success!",
	       				 "message": "Your file is uploaded successfully"
	    			});
	    		toastEvent.fire();


                    // component.set("v.showLoadingSpinner", false);
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
                 var uniqueItems = _.orderBy(response.getReturnValue(), function(x) {
                return x.ba_CreatedDate__c;
            }, ['desc']);
                component.set("v.pAttlist", uniqueItems);
                component.set("v.masterlistSize", component.get("v.attlist").length);
                component.set("v.startPosn", 0);
                component.set("v.endPosn", component.get("v.pageSize") - 1);
                this.paginate(component);
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
         var action = component.get("c.createcorresp");
			action.setParams({
            'groupId': component.get("v.groupId"),
            'fileName': component.get("v.fileName"),
            'typeinfo': component.get("v.selectedType"),
            'status': component.get("v.selectedStatus")
        });

        action.setCallback(this, function(response) {
			alert('Response'+JSON.stringify(response));
            var state = response.getState();
            if (state === "SUCCESS") {
            component.set("v.showSpinner",false);
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
	       				 "message": "Your file is uploaded successfully"
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
        
    }
})