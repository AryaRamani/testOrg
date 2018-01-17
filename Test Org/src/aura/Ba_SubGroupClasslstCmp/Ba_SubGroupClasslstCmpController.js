({
	getbenefitpackages : function(component,event, helper){
	helper.getbenefitpackage(component);
	},
	
	next : function(component, event, helper) {
   
    	helper.next(component);
	},
	previous : function(component, event, helper) {
		helper.previous(component);
	},
	
	doInit : function(component, event, helper){
	console.log('In init');
	   component.set("v.startPosn", 0);
       component.set("v.endPosn", component.get("v.pageSize") - 1);
         var wlist = component.get("v.GroupClassParentlst");
       
        if (wlist.length > component.get("v.pageSize")) {
            var subWrapperlist = [];
            for (var i = 0; i < component.get("v.pageSize"); i = i + 1) {
                subWrapperlist.push(wlist[i]);
            }
           
                        component.set("v.GroupClasslst", subWrapperlist);
        }
        else{
        component.set("v.GroupClasslst", wlist);
        }
         console.log('Group Class'+JSON.stringify(component.get("v.GroupClassParentlst")));
	}
})