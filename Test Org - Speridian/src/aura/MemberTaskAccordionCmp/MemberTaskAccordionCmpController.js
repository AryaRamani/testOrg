({
	doInit : function(component, event, helper) {
	
        var section = [
            { value:"PCP Change", label: "PCP Change" },
            {  value:"COB Change",label: "COB Change" },
            { value:"Transport Request",label: "Transport Request"},
            { value:"Grievances",label: "Grievances"},
          
         ];
         
     component.set("v.sectionlabels",section);
    
	},
            
    gotoflow : function(component, event, helper){
       component.getEvent('sendtoParent').setParams({
            
           task: 'PCP Change'
        }).fire();     
     }
	
            
})