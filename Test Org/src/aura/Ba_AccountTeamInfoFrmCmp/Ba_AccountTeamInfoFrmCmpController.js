({
	doInit : function(component, event, helper) {
		
	},
	
	getAttributeMethod : function(component,event){
		 var params = event.getParam('arguments');
		 params.AccTeam=component.get("v.AccTeam");
		 params.AccTeam1=component.get("v.AccTeam1");
		 params.AccTeam2=component.get("v.AccTeam2");
		// alert('Account team info'+JSON.stringify(params));
        if (params) {
         if ($A.util.isEmpty(component.get("v.AccTeam2"))) {
            params.navigate=false;
            component.set("v.error",true);
            //component.set("v.errorMessage",'Please select an UnderWriter');
            }
            else{
               params.navigate=true;
                component.set("v.error",false);
            }
            
            return params;
        }
	}
})