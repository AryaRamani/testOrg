({
	doInit : function(component, event, helper) {
        
   
	var AccountID = component.get("v.AccountID");	
    var action = component.get("c.SCntct"); 
       
       
    action.setParams({"AccountID": component.get("v.GroupId")}); 

			
			// Set Callback behavior when response is recieved from Apex
			// Controller
			action.setCallback(this, function(response) {
				var state = response.getState();
				if (component.isValid() && state === "SUCCESS") {
					component.set("v.Contacts", response.getReturnValue());//error
					//helper.hideSpinner(component); //error
				} else {
					console.log("Failed with state: " + state);
				}
			});

			// Send action off to be executed
			$A.enqueueAction(action);
		//}error 
       /* else
        {
			console.log("parentGroupId Is Null");
		}*/
	},
    clickEvent : function( component, event, helper){
     var Indx = event.currentTarget.id;
     component.set("v.Indx",Indx)
     
      var selectedRowSection = helper.findSelectedRow(component, event);
       // console.log("SlNew"+selectedRowSection);
		if (selectedRowSection == undefined) {
			// Do Nothing
			console.log("Done");
		} else {
			var table = selectedRowSection.parentNode;
			var table = selectedRowSection.parentNode;
			helper.unselectAllRows(component, table);
			helper.selectRow(component, selectedRowSection);
        }
    // var Cnt = component.get("v.Contacts");
        
        //Cnt.splice(Indx, 1);
        //component.set("v.Contacts",Cnt);
            
    },
    
    selectContact: function(component, event, helper) {
        var competitoridx = event.getParam("contactidx");
        component.set("v.activeRow", contactidx);
        helper.selectRow(component, contactidx);
    },
    
    DeleteContact : function(component, event, helper)
    {
        var Cnt = component.get("v.Contacts");
        var Indx = component.get("v.Indx");
        Cnt.splice(Indx, 1);
        component.set("v.Contacts",Cnt);
    },
    AddContact: function(component, event, helper){
        var setEvent = $A.get("e.c:AddContactInfoEvent");
        setEvent.setParams({'IsOpen':true});
        setEvent.fire();
    
},
    GetRcd: function(component, event, helper)
    {
      var eventValue= event.getParam("ContactAttr");
        var Cnts = component.get("v.Contacts");
        if(eventValue!=undefined)
        {
            for(var i=0;i<eventValue.length;i++){
                if(eventValue[i]!=undefined)            
            Cnts.push(eventValue[i])
            }
        }
        component.set("v.Contacts",Cnts) ;
       //eventValue.splice(0, 1);
      /*  for(var i=0;i<12;i++){
        //component.set("v.Contacts[i]",eventValue[i]) ;
            console.log('Eachvalue'+JSON.stringify(eventValue[i]));
    }*/
        console.log('Value'+JSON.stringify(eventValue));
    },
    submitForm : function(component,event, helper)
    {
       // component.get("submitForm");
       console.log("DoneTest");
      var action2 = component.get("c.AssociateCntct");
      // set the parameters to method 
     var Cns = component.get("v.Contacts");
        var len = Cns.length;
        for(var i=0; i<len;i++)
        {
        Cns[i].AccountId="0017F00000AujuYQAR"
            //"0017F000009T3XtQAK"       //"0017F000008bbfDQAQ"
        
        }
      action2.setParams({
         "GroupId": "0017F00000AujuYQAR",
         "Con": Cns,
          "Index": Cns.length
         
      });
       console.log('Params'+JSON.stringify((action2.getParams())));
      // set a call back   
      action2.setCallback(this, function(a) {
         // store the response return value (wrapper class insatance)  
         
        console.log('Arathy'+ JSON.stringify(a.getReturnValue()));
        //  console.log("Test");
         // set the component attributes value with wrapper class properties.   
 
        });
      // enqueue the action 
      $A.enqueueAction(action2);
       component.set("v.showSpinner",true);
                var compEvent = component.getEvent("sendtoParent");
        
        compEvent.fire();
        
    },
    
    Previous : function(component, event, helper){
        component.set("v.showSpinner",true);
        var compEvent = component.getEvent("navigateback");
       
        compEvent.fire();

    },
    
    

     getSelectedLst : function(component, event, helper){
     var params = event.getParam('arguments');
        if (params) {
            var selectionlist = params.selectionlist;
            console.log("Selection: " + selectionlist);
            return selectionlist;
        }
    },
    
     /**
	 * aura method to be invoked from Master Flow
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return parameters to be sent to master component
	 */ 
    
      
    getAttributeMethod: function(component, event, helper) {
        var params = event.getParam('arguments');
        params.navigate = true; //no validation in child components. Can move to next component
        return params;   //returns to master component
    }
    
})