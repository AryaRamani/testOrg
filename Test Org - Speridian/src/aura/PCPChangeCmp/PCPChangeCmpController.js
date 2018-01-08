({
    doInit: function(component, event, helper) {
        var details = component.get("v.MemberDetails");
        console.log('PCP Change' + JSON.stringify(details));
        component.set("v.Details", details);
        var plans = [{
                value: "HMO 9 - MHP",
                label: "HMO 9 - MHP"
            }, {
                value: "HMO 7 - UHC",
                label: "HMO 7 - UHC"
            }

        ];


        component.set("v.ContractPlan", plans);


        var reason = [{
                value: "Physician moved",
                label: "Physician moved"
            }, {
                value: "Physician retired",
                label: "Physician retired"
            }, {
                value: "Language Barrier",
                label: "Language Barrier"
            }, {
                value: "Quality of Medical Care",
                label: "Quality of Medical Care"
            }, {
                value: "Concerns over Communication with physician/staff",
                label: "Concerns over Communication with physician/staff"
            }, {
                value: "Physician leaving IHA",
                label: "Physician leaving IHA"
            }, {
                value: "No available appointments",
                label: "No available appointments"
            }, {
                value: "Physician deceased",
                label: "Physician deceased"
            }, {
                value: "Member moved",
                label: "Member moved"
            }, {
                value: "PCP closer to work  location/home residence",
                label: "PCP closer to work  location/home residence"
            }, {
                value: "Physician not accepting new patients",
                label: "Physician not accepting new patients"
            }, {
                value: "Listing Physician for first time",
                label: "Listing Physician for first time"
            }, {
                value: "Adding PCP through marriage",
                label: "Adding PCP through marriage"
            }, {
                value: "Quality of care and member does not want to file a formal complaint",
                label: "Quality of care and member does not want to file a formal complaint"
            }, {
                value: "Changing from pediatrician due to member's age",
                label: "Changing from pediatrician due to member's age"
            }, {
                value: "Physician non-renewed with plan",
                label: "Physician non-renewed with plan"
            }, {
                value: "Physician does not spend enough time at visit",
                label: "Physician does not spend enough time at visit"
            }, {
                value: "Personal Preference",
                label: "Personal Preference"
            }, {
                value: "Physician has inconvenient office hours",
                label: "Physician has inconvenient office hours"
            }, {
                value: "Waiting time in office",
                label: "Waiting time in office"
            }, {
                value: "Enrollment entry error",
                label: "Enrollment entry error"
            }, {
                value: "Physician did not behave in Professional manner",
                label: "Physician did not behave in Professional manner"
            }


        ];

        component.set("v.ChangeReason", reason);

        var requestedBy = [{
                value: "Authorized Rep",
                label: "Authorized Rep"
            }, {
                value: "Health Connections",
                label: "Health Connections"
            }, {
                value: "Parent",
                label: "Parent"
            }, {
                value: "Provider Initiated-Dismissal",
                label: "Provider Initiated-Dismissal"
            }, {
                value: "Provider Initiated-COC",
                label: "Provider Initiated-COC"
            }, {
                value: "Other",
                label: "Other"
            }


        ];
        component.set("v.requestedBy", requestedBy);

        /*   var action = component.get("c.fetchmemberdetails");
            action.setParams({
                     'memberId': component.get("v.member.ba_ExchangeMemberID__c")
                 });
             action.setCallback(this, function(response) {
                 var state = response.getState();
                 if (state === "SUCCESS") {
                     var res = response.getReturnValue();
                     component.set("v.Details",res);
                   
                 }
           

             });

             $A.enqueueAction(action); */

        component.set("v.helptext", "Select the change requested by, if other ");

    },

    onchangerequest: function(component, event, helper) {
        var selected = event.getSource().get("v.text");
        component.set("v.selectedchangeby", selected);
        if (selected === 'Others') {
            component.set("v.changeby", false);
            component.set("v.type",'Others')
        } else {
            component.set("v.changeby", true);
            component.set("v.type",'Member');
        }

    },

    getPCPName: function(component, event, helper) {
        var pcpname = event.getParam("codeByEvent");
        console.log('Name' + pcpname);
        var action = component.get("c.fetchpcpdata");
        action.setParams({
            'membername': pcpname
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
                // component.set("v.member",res)
                console.log('Response' + JSON.stringify(res));
                component.set("v.pcp", res);

            }


        });

        $A.enqueueAction(action);

    },

    createCaseObj: function(component, event, helper) {
        console.log('PCP Change component' + component.get("v.pcp"));
        if (component.find("planid").get("v.value") === '' || component.get("v.pcp") === null) {
            if (component.find("planid").get("v.value") === '') {
                component.set("v.alertMessage", "Please Select a Contract Plan");
                $A.util.removeClass(component.find('msg-id'), 'hideContent');
            }
            if (component.get("v.pcp") === null) {
                component.set("v.pcpMessage", "Please Enter PCP Information");
                $A.util.removeClass(component.find('error-id'), 'hideContent');
            }
        } else {

            $A.util.addClass(component.find('msg-id'), 'hideContent');
            $A.util.addClass(component.find('error-id'), 'hideContent');
            console.log(component.get("v.SelectedChangeReason"));
            if (component.get("v.type") === 'Member') {
                component.set("v.pcpCase.Change_Requested_From__c", 'Member');
            } else {


            }
            console.log('Change Requested by' + component.get("v.pcpCase.Change_Requested_From__c"));
            //Replace with Object of type case
            var CaseDetails = {

                'Details': component.get("v.Details"),
                'ChangeReasonMed': component.get("v.ChangeReasonMed"),
                'EffectiveDateChange': component.get("v.EffdateChange"),
                'EffectiveDate': component.get("v.Effdate"),
                'PCP': component.get("v.pcp"),
                'RequestedBy': component.find("reqid").get("v.value"),
                'ChangePCP': component.find("requestid").get("v.value"),
                'ContractPlan': component.find("planid").get("v.value"),
                'RequestedType': component.get("v.selectedchangeby"),
                'waiting': component.get("v.waiting")


            };
            console.log('Details' + JSON.stringify(CaseDetails));

            component.getEvent('sendtoParent').setParams({

                CaseDetails: CaseDetails,
                pcpCase: component.get("v.pcpCase"),
                pcp: component.get("v.pcp"),
                waiting:component.get("v.waiting")
            }).fire();
        }
    },

    waitinginfo: function(component, event, helper) {
        var waitinginfo = event.getSource().get("v.checked");
        component.set("v.waiting", waitinginfo);
    },

    getcontract: function(component, event, helper) {
        var plan = component.find("planid").get("v.value");
        component.set("v.pcpCase.Contract_Plan__c", plan);
    },
    
    pauseflow : function(component, event, helper){
    alert('pauseflow');
      if (component.get("v.type") === 'Member') {
                component.set("v.pcpCase.Change_Requested_From__c", 'Member');
            } else {


            }
            console.log('Change Requested by' + component.get("v.pcpCase.Change_Requested_From__c"));
            //Replace with Object of type case
            var CaseDetails = {

                'Details': component.get("v.Details"),
                'ChangeReasonMed': component.get("v.ChangeReasonMed"),
                'EffectiveDateChange': component.get("v.EffdateChange"),
                'EffectiveDate': component.get("v.Effdate"),
                'PCP': component.get("v.pcp"),
                'RequestedBy': component.find("reqid").get("v.value"),
                'ChangePCP': component.find("requestid").get("v.value"),
                'ContractPlan': component.find("planid").get("v.value"),
                'RequestedType': component.get("v.selectedchangeby"),
                'waiting': component.get("v.waiting")


            };
            console.log('Details' + JSON.stringify(CaseDetails));

            component.getEvent('pauseFlow').setParams({

                CaseDetails: CaseDetails,
                pcpCase: component.get("v.pcpCase"),
                pcp: component.get("v.pcp"),
                waiting:component.get("v.waiting")
            }).fire();
    }
    
    



})