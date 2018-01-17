({

    doInit: function(component, event, helper) {
    /* Retrive SIC details for pop-up*/
        component.set("v.showSpinner", true);
        var action = component.get("c.fetchSICdetails");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.showSpinner", false);
                var res = response.getReturnValue();
                component.set("v.sicdetails", res);
            }
            //  console.log('SIC'+JSON.stringify(res));

        });

        $A.enqueueAction(action);
    },



    populatename: function(component, event, helper) {
        /* To auto populate the Legal Entity Name*/
        var groupname = component.get("v.group.Name");
        component.set("v.group.ba_LegalEntityName__c", groupname);
        console.log('GroupName' + groupname);

    },

    /*   populateCounty: function(component, event, helper) {
          Auto populate the county and city name
           var zipcode = component.get("v.selectedCode");
           var action = component.get("c.fetchZipInfo");
           // set param to method  
           action.setParams({
               'codeValue': zipcode
           });
           // set a callBack    
           action.setCallback(this, function(response) {
               var state = response.getState();
               if (state === "SUCCESS") {
                   var zipdetails = response.getReturnValue();
                   component.set("v.zipdata", zipdetails);
                   console.log('Zipdata' + JSON.stringify(zipdetails));

               }

           });
           // enqueue the Action  
           $A.enqueueAction(action);

       }, */

    getselectedCode: function(component, event, helper) {
        /* Get the selected Zip code through event from LookupCmp*/
       
            var zipcode = event.getParam("codeByEvent");
            component.set("v.zipdata.ba_Zipcode__c", zipcode);
            component.set("v.showSpinner", true);
            var action = component.get("c.fetchZipInfo");
            // set param to method  
            action.setParams({
                'codeValue': zipcode
            });
            // set a callBack    
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                	component.set("v.showSpinner", false);
                    var zipdetails = response.getReturnValue();
                    component.set("v.zipdata", zipdetails);
                    console.log('Zipdata' + JSON.stringify(zipdetails));

                }

            });
            // enqueue the Action  
            $A.enqueueAction(action);
        
    },

    getsicdetails: function(component, event, helper) {
/* display the pop-up on icon click*/
 // component.set("v.showModal",'True');
 // console.log('Modal'+component.get("v.showModal"));
 

        $A.util.removeClass(component.find('popUpSICId'), 'hideContent');
        $A.util.removeClass(component.find('popUpBackgroundSICId'), 'hideContent');
    },

    
    eligibiltiypage: function(component, event, helper) {
    /* on clik of Next button check for validation and save the record*/
        
        if ( component.get("v.sicCode") == null || component.get("v.sicCode") == undefined || component.get("v.sicCode") == '' || component.get("v.group.ba_EffectiveDate__c") == null || component.get("v.group.ba_EffectiveDate__c") == undefined || component.get("v.group.ba_EffectiveDate__c") == '' || component.get("v.zipdata.ba_Zipcode__c") == null || component.get("v.zipdata.ba_Zipcode__c") == undefined || component.get("v.zipdata.ba_Zipcode__c") == '') {
            
            if (component.get("v.sicCode") == null || component.get("v.groupname") == undefined || component.get("v.groupname") == '') {
                component.set("v.sicCodeMsg", 'Please Select SIC code');
                $A.util.removeClass(component.find('msg2-id'), 'hideContent');
            } else {
                $A.util.addClass(component.find('msg2-id'), 'hideContent');
            }
            if (component.get("v.group.ba_EffectiveDate__c") == null || component.get("v.group.ba_EffectiveDate__c") == undefined || component.get("v.group.ba_EffectiveDate__c") == '') {
                component.set("v.effectivedateMsg", 'Please Enter a date');
                $A.util.removeClass(component.find('msg3-id'), 'hideContent');
            } else {
                $A.util.addClass(component.find('msg3-id'), 'hideContent');
            }
            if (component.get("v.zipdata.ba_Zipcode__c") == null || component.get("v.zipdata.ba_Zipcode__c") == undefined || component.get("v.zipdata.ba_Zipcode__c") == '') {
                component.set("v.selectedCodeMsg", 'Please Enter the Zip code');
                console.log('Code' + component.get("v.selectedCodeMsg"));
                $A.util.removeClass(component.find('msg4-id'), 'hideContent');
            } else {
                $A.util.addClass(component.find('msg4-id'), 'hideContent');
            }

        } else {
           
            $A.util.addClass(component.find('msg2-id'), 'hideContent');
            $A.util.addClass(component.find('msg3-id'), 'hideContent');
            $A.util.addClass(component.find('msg4-id'), 'hideContent');
           
            var action = component.get("c.insertprospectinfo");
            // set param to method  
            action.setParams({
                'gname': component.get("v.group"),
                
                "zip": component.get("v.zipdata"),
               
                "sicval": component.get("v.sicCode"),
                
            });
            // set a callBack    
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                		//alert('Prospect Information inserted successfully');
                		console.log('SIC'+component.get("v.sicCode"));
                		var event2 = $A.get("e.c:navigateProspectEvt");
                		
        event2.setParams({
            "navigateto" : "c:EligibilityInfoCmp",
            "group" : component.get("v.group"),
            "zip" : component.get("v.zipdata"),
            "sicval" : component.get("v.sicCode")
		});
        event2.fire();

                }

            });
            // enqueue the Action  
            $A.enqueueAction(action);

        }
    },

  /*  getSICdata: function(component, event, helper) {
     handler for event fired from SIC pop-up lookup
        var sic_code = event.getParam("SIC");

      
        
        console.log('SIC' + sic_code);
        component.set("v.sicCode", sic_code);

    },*/
    
     hideSICPopup: function(component, event, helper) {
        /* To close the pop-up on button click*/
        $A.util.addClass(component.find('popUpSICId'), 'hideContent');
        $A.util.addClass(component.find('popUpBackgroundSICId'), 'hideContent');
    },
    
        searchsic : function(component, event, helper){
   
    console.log('input'+component.get("v.SearchKeyWord"));
    var getInputkeyword= component.get("v.SearchKeyWord");
    //component.set("v.setSpinner",'true');
    component.set("v.showSpinner", true);
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
            component.set("v.showSpinner", false);
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
       var selectedcode= event.getParam("sicCode");
        
       component.set("v.sicCode", selectedcode);
       /*  var compEvent = component.getEvent("siccodeEvt");
        compEvent.setParams({
            "SIC": selectedcode
        });
        compEvent.fire(); */
         $A.util.addClass(component.find('popUpSICId'), 'hideContent');
        $A.util.addClass(component.find('popUpBackgroundSICId'), 'hideContent');
     

    },
    
    
    
	

    
    


})