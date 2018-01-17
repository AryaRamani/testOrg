({
    submitForm: function(component, event, helper) {
        var test2 = component.get('v.Type');
        if($A.util.isEmpty(test2)){
            component.find('Type').set("v.errors",[{message:"Please enter Note Title"}]);
        }
        else{
        component.set("v.Nots", {
            title: component.get("v.Type"),
            Content: component.get("v.Notes")
        });
        var test = component.get('v.Nots');
       // alert('Test' + test);
        //  console.log(JSON.stringify(test))
        var setEvent1 = component.getEvent("closeModal");

        // var CnId = component.get("v.contactsNew");
        setEvent1.setParams({
            'Notesnw': test,
            'closeMdl': false,
            'Type': test2
        });
        setEvent1.fire();


}


    },
    doInit: function(component, event, helper) {

    }
})