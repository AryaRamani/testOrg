({
	getselection : function(component, event, helper) {
		console.log(event.getSource().get("v.label"));
		if(event.getSource().get("v.label")==='Yes'){
		   $A.util.addClass(component.find('tpasection-id'), 'hideContent'); 
		   /*Fire an event to navigate to chapter 15*/
		  
		}
		else{
		/* displays next section if no is selected*/
		   $A.util.removeClass(component.find('tpasection-id'), 'hideContent');
		}
        component.set("v.selection",event.getSource().get("v.label"));
		 var appEvent = $A.get("e.c:ba_navigationAttAppEvt");
		   appEvent.setParams ({
		   "selection" : event.getSource().get("v.label")
		   });
		   appEvent.fire();
	}
})