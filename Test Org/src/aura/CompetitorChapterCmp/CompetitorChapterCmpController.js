({
    /**
     * Do Init
     * 
     * @param {Component}
     *            component
     * @param {Event}
     *            event
     * @param {Helper}
     *            helper
     * @return {}
     */
    doInit: function(component, event, helper) {
        var initComplete = component.getEvent("ChapterInitCmpEvt");
        initComplete.setParams({
            "componentName": "CompetitorChapterCmp"
        });
        initComplete.fire();
    },

    /**
     * Sets Active Row Selection Attribute on Competitor Selection & Notifies Child Component Of the Change
     * 
     * @param {Component}
     *            component
     * @param {Event}
     *            event
     * @param {Helper}
     *            helper
     * @return {}
     */
    activeCompetitorChange: function(component, event, helper) {
        var competitoridx = event.getParam("competitoridx");
        var compProductListcmp = component.find("compProductListcmp");
        component.set("v.activeRow", competitoridx);
        compProductListcmp.parentRecordChanged();
    },

})