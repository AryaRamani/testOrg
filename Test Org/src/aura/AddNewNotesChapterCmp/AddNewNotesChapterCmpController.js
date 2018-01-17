({
    doInit: function(component, event, helper) {
        var initComplete = component.getEvent("ChapterInitCmpEvt");
        initComplete.setParams({
            "componentName": "AddNewNotesChapterCmp"
        });
        initComplete.fire();
    }
})