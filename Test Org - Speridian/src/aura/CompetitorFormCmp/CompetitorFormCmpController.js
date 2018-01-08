({
    /**
     * Form Submit Action Controller
     * 
     * @param {Component}
     *            component
     * @param {Event}
     *            event
     * @param {Helper}
     *            helper
     * @return {}
     */
    submitForm: function(component, event, helper) {

        if (helper.validateCompetitor(component)) {
            // Create the new Competitor
            var newCompetitor = component.get("v.competitor");
            helper.saveCompetitor(component, newCompetitor);
        }
    },

})