({
	doInit : function(component, event, helper) {
	     var action=component.get("c.getRelatedObj");
         action.setParams({
           "objname" : component.get("v.objectName"),
          
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
             var res=response.getReturnValue();
             console.log('Response'+res);
             var objlst=component.get("v.RelatedObject");
             for(var i=0;i<res.length;i=i+1){
             var obj=
             		{'label': res[i], 'value': res[i]
             		}
           
           objlst.push(obj);
            }
             component.set("v.RelatedObject",objlst);          
            console.log('list'+JSON.stringify(objlst));
            }


        });

        $A.enqueueAction(action); 
		
	},
	
	hidePopup : function(component, event,helper){
	 $A.util.addClass(component.find('popUpId'), 'hideContent');
     $A.util.addClass(component.find('popUpBackgroundId'), 'hideContent');
	},
	
	handleChange : function(component, event, helper){
	  console.log(event.getParam('value'));
	  
	},
	
	getObjects  : function(component, event, helper){
	console.log('Selected objects'+JSON.stringify(component.get("v.SelectedObject")));
	 $A.util.addClass(component.find('popUpId'), 'hideContent');
     $A.util.addClass(component.find('popUpBackgroundId'), 'hideContent');
	},
	
})