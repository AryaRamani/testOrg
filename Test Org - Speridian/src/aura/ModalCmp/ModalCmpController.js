({
	
	
	
	
	 hideSICPopup: function(component, event, helper) {
        /* To close the pop-up on button click*/
        $A.util.addClass(component.find('popUpSICId'), 'hideContent');
        $A.util.addClass(component.find('popUpBackgroundSICId'), 'hideContent');
    },
    
        searchsic : function(component, event, helper){
   
    console.log('input'+component.get("v.SearchKeyWord"));
    var getInputkeyword= component.get("v.SearchKeyWord");
    //component.set("v.setSpinner",'true');
     var action = component.get("c.fetchsicCodedata");
      // set param to method  
        action.setParams({
            'searchcode': getInputkeyword
          });
      // set a callBack    
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
            // component.set("v.setSpinner",'false');
                var storeResponse = response.getReturnValue();
              
          
                
                // set searchResult list with return value from server.
                component.set("v.sicdetails", storeResponse);
                console.log('Response'+JSON.stringify(storeResponse));
               
    /*    var compEvent = component.getEvent("siccodeEvt");
        compEvent.setParams({
            "listofSIC": storeResponse
        });
        compEvent.fire();*/
            }
 
        });
         $A.enqueueAction(action);
        },
        
        
        selectsic: function(component, event, helper) {
    /* on selecting the checkbox to get the index of the list*/
        var index = event.getSource().get("v.text");
        component.set("v.index", index);


    },

    getsicvalue: function(component, event, helper) {
    /* to set the selected pop-up value in the SIC field. Retrieves the list of SIC and checks the appropriate SIC record*/
        var index = component.get("v.index");
        var sicdata = component.get("v.sicdetails");
        sicdata[index].selected = true;
        component.set("v.sicdetails", sicdata);
        var selectedcode = sicdata[index].sicCode;
        console.log('SIC value'+JSON.stringify(selectedcode));
      //  component.set("v.sicCode", selectedcode);
         var compEvent = component.getEvent("siccodeEvt");
        compEvent.setParams({
            "SIC": selectedcode
        });
        compEvent.fire();
         $A.util.addClass(component.find('popUpSICId'), 'slds-hide');
        $A.util.addClass(component.find('popUpBackgroundSICId'), 'slds-hide');
     

    },
    
})