({
    /**
     * Form Submit Action Controller
     * 
     * @param {Component}
     *            component
     * @return {Boolean} validCompetitor
     */
    validateCompetitor: function(component) {
        // Replace with Stricter Validation Rules
        var validCompetitor = true;
        var nameField = component.find("competitorName");
        var nameValue = nameField.get("v.value");
        if ($A.util.isEmpty(nameValue)) {
            validCompetitor = false;
            nameField.set("v.errors", [{
                message: "Competitor Name can't be blank."
            }]);
        } else {
            nameField.set("v.errors", null);
        }
        return (validCompetitor);
    },

    /**
     * Save Action Helper
     * 
     * @param {Component}
     *            component
     * @param {BA_Group_Competitor__c}
     *            newCompetitor
     */
    saveCompetitor: function(component, newCompetitor) {
        var saveCompetitor = component.getEvent("saveCompetitor");
        newCompetitor.ba_Group__c = component.get("v.parentGroupId");
        saveCompetitor.setParams({
            "competitor": newCompetitor
        });
        saveCompetitor.fire();
        component.set("v.competitor", {
            'sobjectType': 'BA_Group_Competitor__c',
            'ba_CompetitorName__c': '',
            'ba_ContractsEnrolled__c': 0,
            'ba_Created__c': '',
            'ba_Group__c': '',
            'Notes__c': ''
        });
    },
})