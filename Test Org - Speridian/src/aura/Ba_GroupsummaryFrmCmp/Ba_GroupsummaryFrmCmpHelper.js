({
	getaddress : function(component) {
	component.set("v.showSpinner",true);
	var action = component.get("c.getGroupAddress");
        action.setParams({
            "GroupId": component.get("v.GroupId")
        });

        // Add Asynch Callback For Class Action
        action
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {
                       
                        component.set("v.address",response
                            .getReturnValue());
                            component.set("v.showSpinner",false);
                          
                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(action);
		
	},
	
	
	getSIC : function(component){
    component.set("v.showSpinner",true);
	var action = component.get("c.getGroupSIC");
       

        // Add Asynch Callback For Class Action
        action
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    
                    if (component.isValid() && state === "SUCCESS") {
                       
                    /*  alert(JSON.stringify(response
                            .getReturnValue()));*/
                      var result=response.getReturnValue();
                     
                      for(var i=0;i<result.length;i=i+1){
                      if(result[i].ba_SICCode__c==component.get("v.group.Sic")){
                           var value=result[i].Id;
                           
                           component.set("v.group.groupsic",value);
                      }
                      component.set("v.showSpinner",false);
                      }
                          
                    } else {
                    component.set("v.showSpinner",false);
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(action);
	},
	
	getZipCode : function(component, event, helper){
	component.set("v.showSpinner",true);
	var action = component.get("c.getGroupZip");
        
        // Add Asynch Callback For Class Action
        action
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    component.set("v.showSpinner",false);
                    if (component.isValid() && state === "SUCCESS") {
                      var result=response.getReturnValue();
                     component.set("v.ZipCodes",result);
                      for(var i=0;i<result.length;i=i+1){
                      if(result[i].ba_Zipcode__c==component.get("v.group.ba_RatingZipcode__c")){
                           var value=result[i].Id;
                           component.set("v.group.zipcode",value);
                      }
                      }  
                       
                          
                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(action);
	},
	 getIndustry: function(component) {
  var action = component.get("c.getIndustryInfo");
        
        // Add Asynch Callback For Class Action
        action
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {

                    		component.set("v.Industrylist",response.getReturnValue());

                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(action);
}
	
})