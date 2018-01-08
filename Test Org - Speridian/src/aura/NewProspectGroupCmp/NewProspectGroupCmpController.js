({
    doInit : function(component, event, helper){
      
       
        $A.createComponent("c:InsertProspectCmp", {
            }, function(newCmp) {
                if (component.isValid()) {
                    
                    component.set("v.body", newCmp);
                }
            });
        
    },
    
    
    
    
    NavigateComponent : function(component, event, helper) {
	
	var navigateto=event.getParam("navigateto");
	var group=event.getParam("group");
	var zip=event.getParam("zip");
	var sicval=event.getParam("sicval");
	if(group!=undefined||zip!=undefined||sicval!=undefined){
		component.set("v.group",group);
		component.set("v.zipdata",zip);
		component.set("v.sicCode",sicval);
	}
	$A.createComponent(navigateto, {
	"group":component.get("v.group"),
	"zipdata" : component.get("v.zipdata"),
	"sicCode": component.get("v.sicCode"),

            }, function(newCmp) {
                if (component.isValid()) {
                    component.set("v.body", newCmp);
                }
            });
		
	}
})