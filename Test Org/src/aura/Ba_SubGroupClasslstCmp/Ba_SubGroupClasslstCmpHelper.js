({
	getbenefitpackage : function(component) {
     var target = event.currentTarget.dataset.rowIndex;
     var ids=component.find('row2-id');
         if(ids.length===undefined){
             $A.util.addClass(component.find('row2-id'), 'row');
        }
        console.log('Id'+ids);
        for(var i=0;i<ids.length;i=i+1){
            if(target==i){
                 $A.util.addClass(component.find('row2-id')[i],'row');
            }
            else{
                $A.util.removeClass(component.find('row2-id')[i],'row');
            }
        }
      
    console.log('Target index'+event.currentTarget.dataset.rowIndex);
    var GroupClasslstId=component.get("v.GroupClasslst")[target].Id;
    console.log('Group Class Id'+GroupClasslstId);
    component.set("v.showSpinner",true);
	var action = component.get("c.getbenefitpackage");
	
	  action.setParams({
            'classId': GroupClasslstId,
           //  "next": next,
        //        "prev": prev,
        //      "off": component.get("v.offset"),
    
            
        });
        action.setCallback(this, function(response) {

            var state = response.getState();
            if (state === "SUCCESS") {
            	component.set("v.showSpinner",false);
                console.log('Response' + JSON.stringify(response.getReturnValue()));
                var res=response.getReturnValue();
                console.log('Response: Benefit package'+JSON.stringify(res));
               component.set("v.benefitpacklst", response.getReturnValue().benefitpackagelst);
               //  component.set('v.offset', res.offst);

               // component.set('v.next', res.hasnext);
           //     component.set('v.prev', res.hasprev);
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
	
	previous: function(component){
	 component.set("v.showSpinner",true);
        var wlist = component.get("v.GroupClassParentlst");
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
           component.set("v.GroupClasslst", subWrapperlist);
        component.set("v.endPosn", endPosn);
        component.set("v.startPosn", startPosn);
          component.set("v.showSpinner",false); 
          }
        },
        
     next: function(component) {
    	component.set("v.showSpinner",true);
        var wlist = component.get("v.GroupClassParentlst");
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
        component.set("v.GroupClasslst", subWrapperlist);
        component.set("v.endPosn", endPosn);
        component.set("v.startPosn", startPosn);
        component.set("v.showSpinner",false);
    },
})