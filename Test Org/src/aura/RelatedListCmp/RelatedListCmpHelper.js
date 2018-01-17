({
    // to get related object names from apex
    getChildObjectList : function (component,event,helper){
        var ObjectId;
        var objName = component.get("v.ParentObjtName");
        if(component.get("v.Account")){
            ObjectId = component.get("v.Account");
        } else ObjectId= component.get("v.recordId");
        var getChildObjs = component.get("c.getChildObjects");
        getChildObjs.setParams({
            "objId" : ObjectId,
            "ParObjName" : objName
            
        });
        getChildObjs.setCallback(this,function(response){
            var state = response.getState();
            if(state === "SUCCESS"){
                var cobj = response.getReturnValue(); //JSON.stringify(response.getReturnValue());
               console.log("obj:"); console.log(cobj);
                //component.set("v.ChildObjects",cobj);
              
                var arr = [];
                for (var prop in cobj) {
                	var item = {value : prop.substring(0), label:cobj[prop]};
                	arr.push(item);
                }
                console.log("arr");console.log(arr);
                    
                 var values = ["CombinedAttachments"];
           		component.set("v.ChildObjects",arr);
                 var childobjects = component.get("v.ChildObj");
            	var selectedOptions, newValues;
            	if(childobjects){
                    childobjects = childobjects.toLowerCase();
                    selectedOptions= childobjects.split(",");
                	
                }//else newValues = values;
                newValues= values.concat(selectedOptions);
                component.set("v.defaultOptions", newValues);
               
          }
         });
          $A.enqueueAction(getChildObjs);
        
     },
     getSelectedObj : function(options,cmp,helper){
     //   alert(options);
         cmp.set("v.SelectedOptions",options);
         
    },
    getDetailsDyn : function(childObjs,component,event,helper){
        
         var ObjectId;
         var selectedOptions =childObjs ;
       /* if(childObjs){
            alert(childObjs)
            var childObjts =  component.get("v.ChildObj");
         selectedOptions = childObjts.split(",");
        }
        else selectedOptions = component.get("v.SelectedOptions");
         */
        var objName = component.get("v.ParentObjtName");
        
        if(component.get("v.Account")){
            ObjectId = component.get("v.Account");
        } else ObjectId= component.get("v.recordId");
        
        
        var action = component.get("c.fetchDetails");
            action.setParams({
                "ObjId" : ObjectId,
                 "CrNames" : selectedOptions,
                "ParentObjName": objName
            });
       
        
        action.setCallback(this,function(res){
            var state = res.getState();
            console.log('Success:');
            console.log(res.getReturnValue());
            if(state === "SUCCESS"){
                 component.set("v.showSpinner",false);
           		 component.set("v.childRecords",res.getReturnValue());
                console.log('Child records'+JSON.stringify(res.getReturnValue()));
              //  alert(JSON.stringify(res.getReturnValue()));
            }
            else {
                component.set("v.showSpinner",false);
                console.log("Errors:")
                console.log(res.getError());
            }
        });
        $A.enqueueAction(action);
        
    }
    ,
	getdetails: function(component,event,helper) {

         var action = component.get("c.fetchAccountdetails");
         action.setParams({
         "Accountid": component.get("v.Account") 
       
      });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
                console.log('res'+JSON.stringify(res));
                
                component.set("v.contactdetails", res.fetchcontactdetails);
                 component.set("v.oppdetails", res.fetchOppdetails);
                 component.set("v.casedetails", res.fetchCasedetails);
                component.set("v.notedetails",res.fetchnotedetails);
                component.set("v.Quotedetails",res.fetchquotedetails);
                component.set("v.Correspondancedetails",res.fetchcorresponddetails);
                component.set("v.Subgroupdetails",res.fetchsubgroupdetails);
               component.set("v.Groupclassdetails",res.fetchgroupdetails);
                component.set("v.Benefitdetails",res.fetchbenefitdetails);
                component.set("v.Addressdetails",res.fetchaddressdetails);

                
                 component.set("v.contacttotal", res.contacttotal);
                  component.set("v.Opptotal", res.Opptotal);
                  component.set("v.Casetotal", res.Casetotal);
                component.set("v.notetotal",res.notetotal);
                component.set("v.quotetotal",res.quotetotal);
                component.set("v.Correspondtotal",res.Correspondtotal);
                component.set("v.groupclasstotal",res.groupclasstotal);
                component.set("v.benefittotal",res.benefittotal);
                component.set("v.addresstotal",res.addresstotal);
               component.set("v.subgrouptotal",res.subgrouptotal);
                 component.set("v.showSpinner",false);
            }
            else {
                console.log(response.getError());
                  component.set("v.showSpinner",false);
            }
            // console.log('contact details'+JSON.stringify(res));

        });
        
        $A.enqueueAction(action);  	
	},
})