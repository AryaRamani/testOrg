({
    /**
     * Propogates Active Row Selection up the Component Chain
     * 
     * @param {Component}
     *            component
     * @param {Integer}
     *            componentidx
     * @return {}
     */
    selectRow: function(component, competitoridx) {
        var activeCompetitorChange = component.getEvent("activeCompetitorChange");
        activeCompetitorChange.setParams({
            "competitoridx": competitoridx
        });
        activeCompetitorChange.fire();
    }
})