({
	getGroupinfo : function(component) {
	//to fetch group information
	component.set("v.showSpinner",true);
	var action = component.get("c.getGroupInformation"); 
	
	  action.setParams({
            'groupId': component.get("v.GroupId"), //pass the group Id set as default value in markup
            
            
        });
        action.setCallback(this, function(response) {

            var state = response.getState();
            if (state === "SUCCESS") {
            component.set("v.showSpinner",false);
                console.log('Response' + JSON.stringify(response.getReturnValue()));
                var res=response.getReturnValue();
                 component.set("v.subgroup",res);    //set the group information in an attribute of type object
                 component.set("v.subgroup.type",'STD-standard'); //set the default value in type and status
                 component.set("v.subgroup.status",'Pending');    
                 component.set("v.subgroup.Number",'000');
                 component.set("v.subgroup.Address",[]);
                
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
	
	getaddress : function(component){
	component.set("v.showSpinner",true);
	var action = component.get("c.getGroupAddress"); 
	
	  action.setParams({
            'groupId': component.get("v.GroupId"), //pass the group Id set as default value in markup
            
            
        });
        action.setCallback(this, function(response) {

            var state = response.getState();
            if (state === "SUCCESS") {
            	component.set("v.showSpinner",false);
                console.log('Adddress Response' + JSON.stringify(response.getReturnValue()));
                var res=response.getReturnValue();
               component.set("v.AddressList",res.Addresslist); //returns the address Id's related to the group
               component.set("v.PrimaryAddrid",res.primaryAddr); //Id of the primary address
               console.log('Adddress Response' + JSON.stringify(component.get("v.AddressList")));
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
	
	
	getratingregion : function(component){
	component.set("v.showSpinner",true);
	var action = component.get("c.getGroupRatingRegion"); 
	
	  action.setParams({
            'groupId': component.get("v.GroupId"), //pass the group Id set as default value in markup
            
            
        });
        action.setCallback(this, function(response) {

            var state = response.getState();
            if (state === "SUCCESS") {
            	component.set("v.showSpinner",false);
                console.log('Rating Response' + JSON.stringify(response.getReturnValue()));
                var res=response.getReturnValue();
                
                component.set("v.Rating",res.Ratingregion); //get all the rating region in the zip code
                if( component.get("v.subgroup")!=undefined){
                component.set("v.subgroup.groupregion",res.groupregion); //rating region related to the group
                
                }
               // alert('Sub Group'+JSON.stringify(component.get("v.subgroup")));	
               
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
	}
})