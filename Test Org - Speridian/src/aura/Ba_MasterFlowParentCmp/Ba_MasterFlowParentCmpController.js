({
	doInit: function(component, event, helper) {
        var currentTaskflow = component.get("v.currentTaskFlow");
        // alert('Init'+component.get("v.resume"));
       helper.fetchgroupInformation(component);
        alert('Resume'+component.get("v.resume"));
        var chatperName = "";
        if (!$A.util.isEmpty(currentTaskflow)) {

          helper.fetchTaskChapters(component, currentTaskflow);

        } else {
            console.log("currentTaskFlow attribute is null");

        }
    },
})