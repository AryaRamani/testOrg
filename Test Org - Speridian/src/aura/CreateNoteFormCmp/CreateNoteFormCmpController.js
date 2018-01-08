({
    submitForm : function(component, event, helper) {
       var test2 = component.get('v.Type');
      component.set("v.Nots", {
            title: component.get("v.Type"),
            Content: component.get("v.Notes")
        });
       var test= component.get('v.Nots');
       alert('Test'+test);
     //  console.log(JSON.stringify(test))
      var setEvent1 = $A.get("e.c:AddNotesFormCloseEvnt");
    // var CnId = component.get("v.contactsNew");
        setEvent1.setParams({'Notesnw': test, 'closeMdl': false, 'Type': test2});
      setEvent1.fire();
     
        
        
      
		
    },
    doInit : function(component, event, helper){
    
}
})