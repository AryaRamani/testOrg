({

        /* To apply validation
 		  
        validateFields: aura:method invoked from chapter component Ba_GroupSummaryChapterCmp
		Checks validation for SIC, TIN , Group Name if empty
		If validation fails returns false to the chapter component*/



        validateFields: function(component, event) {

            var error = [];
            var params = event.getParam('arguments');

            var message;
            if (params) {
                if ($A.util.isEmpty(component.get("v.group.Name")) || $A.util.isEmpty(component.get("v.group.groupsic")) || $A.util.isEmpty(component.get("v.group.TIN_EIN__c"))) {
                    // Checks if Group Name is empty. 
                    if ($A.util.isEmpty(component.get("v.group.Name"))) {

                        params.validate = false;
                        //message = 'Please enter SIC code';
                        component.find('name-id').set("v.error", true); //if validation fails, sets error to true and displays error message below the field.
                        //error.push(message);

                    } else {
                        component.find('name-id').set("v.error", false);
                    }
                    //checks if SIC is empty
                    if ($A.util.isEmpty(component.get("v.group.groupsic"))) {

                        params.validate = false;
                        //message = 'Please enter SIC code';
                        component.find('sic-id').set("v.error", true);
                        //error.push(message);

                    } else {
                        component.find('sic-id').set("v.error", false);
                    }
                    //Validation for TIN/EIN
                    if ($A.util.isEmpty(component.get("v.group.TIN_EIN__c"))) {
                        params.validate = false;
                        component.find('tin-id').set("v.error", true);


                    } else {

                        component.find('tin-id').set("v.error", false);

                    }
                } else {
                    params.validate = true;
                }

                // component.set("v.Errormessage", error);
                // alert('In child'+ params.validate);
                return params; //return validation status to chapter component
            }
        },


        getAttributeMethod: function(component, event) {
            var params = event.getParam('arguments');
            params.group = component.get("v.group");



            if (params) {
                if ($A.util.isEmpty(component.get("v.group.Name")) || $A.util.isEmpty(component.get("v.group.groupsic")) || $A.util.isEmpty(component.get("v.group.TIN_EIN__c"))) {
                    // Checks if Group Name is empty. 
                    if ($A.util.isEmpty(component.get("v.group.Name"))) {

                        params.validate = false;
                        //message = 'Please enter SIC code';
                        component.find('name-id').set("v.error", true); //if validation fails, sets error to true and displays error message below the field.
                        //error.push(message);

                    } else {
                        component.find('name-id').set("v.error", false);
                    }
                    //checks if SIC is empty
                    if ($A.util.isEmpty(component.get("v.group.groupsic"))) {

                        params.validate = false;
                        //message = 'Please enter SIC code';
                        component.find('sic-id').set("v.error", true);
                        //error.push(message);

                    } else {
                        component.find('sic-id').set("v.error", false);
                    }
                    //Validation for TIN/EIN
                    if ($A.util.isEmpty(component.get("v.group.TIN_EIN__c"))) {
                        params.validate = false;
                        component.find('tin-id').set("v.error", true);


                    } else {

                        component.find('tin-id').set("v.error", false);

                    }
                } else {
                    params.validate = true;
                }
                if (params.validate) {
                    params.navigate = true;
                } else {
                    params.navigate = false;
                }
                // component.set("v.Errormessage", error);
                // alert('In child'+ params.validate);
                return params; //return validation status to chapter component

            }
        },







        doInit: function(component, event, helper) {
            /*Event fired to master comp to start the flow. Not required for New Quote Request design*/
            var cmpEvent = component.getEvent("navigationEvt");
            cmpEvent.fire();
            // alert('group');
            /*End*/


            if (component.get("v.group") == null) {
                component.set("v.showSpinner", true);
                var action = component.get("c.getGroupInformation");
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
                                /*  alert('Group Information' + JSON.stringify(response
                                       .getReturnValue()));*/
                                helper.getSIC(component);
                                helper.getZipCode(component);
                                helper.getaddress(component);
                                helper.getIndustry(component);

                                // alert(JSON.stringify(response.getReturnValue()));
                                // var effdate = JSON.parse(JSON.stringify(response.getReturnValue().ba_EffectiveDate__c));
                                // alert('Date'+ effdate);
                                component.set("v.group", response.getReturnValue());
                                component.set("v.group.ba_EffectiveDate__c", effdate);
                                component.set("v.showSpinner", false);

                            } else {
                                // Replace With Error Handler f/w once available
                                console.log("Failed with state: " + state);
                            }
                        });
                // Enqueue Class Action
                $A.enqueueAction(action);
            }

            /*   var accountInfo = {
                   'sobjectType': 'Account',
                   'Name': 'Burlington Textiles Corp of America',
                   'AccountNumber': 'B65609253',
                   'ba_LegalEntityName__c': 'Burlington Textiles Corp of America',
                   'ba_GroupStatus__c': 'Prospect',
                   'Ownership': 'Private',
                   'Sic': 'a0e0P00000CnJu3QAF',
                   'ba_RatingZipcode__c': 'a0l0P00001IUgg5QAD',
                   'ba_RatingCounty__c': 'Miami-Dade',
                   'ba_RatingCity__c': 'Pinecrest'
               };
               var addressInfo = {
                   'sobjectType': 'BA_Address__c',
                   'ba_AddressLine_1__c': '525 S. Lexington Ave',
                   'ba_AddressLine2__c': '',
                   'ba_AddressLine3__c': '',
                   'ba_City__c': 'Pinecrest',
                   'ba_County__c': 'Miami-Dade',
                   'ba_State__c': 'FL',
                   'ba_Zipcode__c': 'a0l0P00001IUgg5QAD'            
               };
               component.set("v.group",accountInfo);
               component.set("v.address",addressInfo);*/
        }
    },

    handlezipcode: function(component, event, helper) {
        if (!$A.util.isEmpty(component.get("v.group.zipcode"))) {

            var ziplst = component.get("v.ZipCodes");
            for (var i = 0; i < ziplst.length; i = i + 1) {
                if (component.get("v.group.zipcode") == ziplst[i].Id) {
                    component.set("v.group.ba_RatingCounty__r.Name", ziplst[i].Name);
                    component.set("v.group.ba_RatingCity__c", ziplst[i].ba_City__c);
                }
            }
        }
    },

    handleeffectivedate: function(component) {
        var action = component.get("c.changedate");
        action.setParams({
            "GroupId": component.get("v.GroupId"),
            "Effdate": component.get("v.group.ba_EffectiveDate__c")
        });

        // Add Asynch Callback For Class Action
        action
            .setCallback(
                this,
                function(response) {
                    var state = response.getState();
                    if (component.isValid() && state === "SUCCESS") {



                    } else {
                        // Replace With Error Handler f/w once available
                        console.log("Failed with state: " + state);
                    }
                });
        // Enqueue Class Action
        $A.enqueueAction(action);
    },





})