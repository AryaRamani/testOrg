({

    /**
     * Opens Modal Popup For New Competitor
     * 
     * @param {Component}
     *            component
     * @param {Event}
     *            event
     * @param {Helper}
     *            helper
     * @return {}
     */
    addCompetitor: function(component, event, helper) {
        // for Display Model,set the "modalIsOpen" attribute to "true"
        component.set("v.activeRow", -1);
        component.set("v.modalIsOpen", true);
    },

    /**
     * Opens Modal Popup For Editing an Existing Competitor
     * 
     * @param {Component}
     *            component
     * @param {Event}
     *            event
     * @param {Helper}
     *            helper
     * @return {}
     */
    editCompetitor: function(component, event, helper) {
        var competitor = event.getParam("competitor");
        var competitoridx = event.getParam("competitoridx");
        component.set("v.activeRow", competitoridx);
        component.set("v.competitor", competitor);
        component.set("v.modalIsOpen", true);
        helper.selectRow(component, competitoridx);
    },

    /**
     * Sets Active Row Selection Attribute on Competitor Selection
     * 
     * @param {Component}
     *            component
     * @param {Event}
     *            event
     * @param {Helper}
     *            helper
     * @return {}
     */
    selectCompetitor: function(component, event, helper) {
        var competitoridx = event.getParam("competitoridx");
        component.set("v.activeRow", competitoridx);
        helper.selectRow(component, competitoridx);
    },

    /**
     * Closes Modal Popup For Add/Editing Competitor
     * 
     * @param {Component}
     *            component
     * @param {Event}
     *            event
     * @param {Helper}
     *            helper
     * @return {}
     */
    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "modalIsOpen" attribute to "Fasle"
        component.set("v.modalIsOpen", false);
    },

    /**
     * Handler Method For Add New OR Edit Existing Competitor
     * 
     * @param {Component}
     *            component
     * @param {Event}
     *            event
     * @param {Helper}
     *            helper
     * @return {}
     */
    handleAddCompetitor: function(component, event, helper) {
        var competitors = component.get("v.competitors");
        var competitor = event.getParam("competitor");
        var competitoridx = component.get("v.activeRow");
        if (competitoridx == -1)
            competitors.push(competitor);
        else
            competitors[competitoridx] = competitor;
        component.set("v.competitors", competitors);
        component.set("v.modalIsOpen", false);
    },
})