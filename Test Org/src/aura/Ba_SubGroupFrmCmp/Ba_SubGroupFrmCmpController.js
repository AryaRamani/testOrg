({
    doInit: function(component, event, helper) {
        helper.getGroupinfo(component); //fetch group information for the first sub group created
        helper.getaddress(component); //fetch group address
        helper.getratingregion(component); //fetch rating region;

    },

    handleNavigateAction: function(component, event, helper) {
        var SubGroup = component.get("v.subgroup");
        var cmpEvt = component.getEvent("navCompFlow");
        cmpEvt.setParams({
            "Objatt": {
                SubGroup
            }
        });
        cmpEvt.fire();
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
     * @return parameters to be sent to master component - Sub Group Information
     */

    getAttributeMethod: function(component, event, helper) {
        var params = event.getParam('arguments');
        var subGrouplst = [];
        //  alert(component.get("v.subgroup.Address").length);
        if (component.get("v.subgroup.Number") !== '000') {
            if ($A.util.isEmpty(component.get("v.subgroup.Name")) || component.get("v.subgroup.Address").length === 0||component.get("v.subgroup.Address")==null) {
                if (component.get("v.subgroup.Address").length === 0) {
                    component.find('addr-id').set("v.error", true);
                }
                params.navigate = false;
            } else {

                params.navigate = true;
                subGrouplst = component.get("v.subgrouplst");
                subGrouplst.push(component.get("v.subgroup"));
                component.set("v.subgrouplst", subGrouplst);
                params.subgrouplst = component.get("v.subgrouplst");
                params.subgroup = component.get("v.subgroup");
                console.log('************' + JSON.stringify(params));
                params.navigate = true; //no validation in child components. Can move to next component
                alert('In sub Group Form' + JSON.stringify(params));
            }
        } else {
            params.navigate = true;
        }
        return params; //returns to master component

    }
})