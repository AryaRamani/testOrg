({
	GetQuote : function(component) {
        component.set("v.showSpinner",true);
		var action = component.get("c.SrchQuote");
        action.setParams({"QLIId":component.get("v.QLIId")})
		action.setCallback(this, function(response){
			var state = response.getState();
			console.log('State'+state);
			if(state == "SUCCESS"){
                component.set("v.showSpinner",false);
				component.set("v.QLI",response.getReturnValue());
             
               // console.log("done12");
			}
		});
		
		$A.enqueueAction(action);
	},
    GetFA : function(component){
component.set("v.showSpinner",true);
       var action1 = component.get("c.SrchFA");
		  action1.setParams({"QLIId":component.get("v.QLIId")})
		action1.setCallback(this, function(response){
			var state1 = response.getState();
			console.log('State'+state1);
			if(state1 == "SUCCESS"){
                component.set("v.showSpinner",false);
				component.set("v.QuoteLine",response.getReturnValue());
             
                console.log("FA"+response.getReturnValue());
			}
            //console.log("FA"+response.getReturnValue());
		});
		
		$A.enqueueAction(action1);        
    },
    GetFR: function(component){
        component.set("v.showSpinner",true);
        
    var action2 = component.get("c.SrchFR");
        action2.setParams({"QLIId":component.get("v.QLIId")});
		
		action2.setCallback(this, function(response){
			var state2 = response.getState();
			console.log('State'+state2);
			if(state2 == "SUCCESS"){
                component.set("v.showSpinner",false);
				var result = response.getReturnValue()
             component.set("v.EntroleeCount",result.EntroleeCount);
                component.set("v.MonthlyRate",result.Rate);
                }
            //console.log("FA"+response.getReturnValue());
		});
		
		$A.enqueueAction(action2); 
}
    
})