({
    doInit: function(component, event, helper) {

    },
    CloseInfoCmp: function(component, event, helper) {
        var eventValue1 = event.getParam("IsOpen");
        console.log("eventValue1");

        $A.util.removeClass(component.find('ContactInfo'), 'slds-show');
        $A.util.addClass(component.find('ContactInfo'), 'slds-hide');
        $A.util.removeClass(component.find('ContactList'), 'slds-hide');
        $A.util.addClass(component.find('ContactList'), 'slds-show');
    },
    setAttributeValue: function(component, event, helper) {
        $A.util.removeClass(component.find('ContactList'), 'slds-show');
        $A.util.addClass(component.find('ContactList'), 'slds-hide');
        $A.util.removeClass(component.find('ContactInfo'), 'slds-hide');
        $A.util.addClass(component.find('ContactInfo'), 'slds-show');
    }
})