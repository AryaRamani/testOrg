({
	  selectsic: function(component, event, helper) {
    /* on selecting the checkbox to get the index of the list*/
        var index = event.getSource().get("v.text");

        if(component.get("v.sicdetails")[index].selected){
        component.set("v.index", index);
        }
        else{
        component.set("v.index", null);
        }

    },
	
	
	
	 getsicvalue: function(component, event, helper) {
    /* to set the selected pop-up value in the SIC field. Retrieves the list of SIC and checks the appropriate SIC record*/
    
      if(component.get("v.index")==null){
         var toastEvent = $A.get("e.force:showToast");
         toastEvent.setParams({
        	 "title": "Warning!",
        	 "message": "Select SIC Code.",
        	 "type" : "error"
    });
    toastEvent.fire();
      }
      else{
        var index = component.get("v.index");
        var sicdata = component.get("v.sicdetails");
        sicdata[index].selected = true;
        for(var i=0;i<sicdata.length;i=i+1){
          if(i===index){
          }else{
             sicdata[i].selected = false;
          }
        }
        component.set("v.sicdetails", sicdata);
        var selectedcode = sicdata[index].sicCode;
        console.log('SIC value'+JSON.stringify(selectedcode));
        var cmpEvent = component.getEvent("sicCodeEvent");
        cmpEvent.setParams({
            "sicCode" : selectedcode });
        cmpEvent.fire();
        
     }
     

    },
    
    hideSICPopup : function(component, event, helper){
        var cmpEvent = component.getEvent("sicCodeEvent");
     
        cmpEvent.fire();
    }
    
    
})