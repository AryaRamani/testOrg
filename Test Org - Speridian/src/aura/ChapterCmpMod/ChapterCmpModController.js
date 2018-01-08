({
  display : function(component, event, helper) {
       var toggleText = component.find("tooltip");
    $A.util.toggleClass(toggleText, "toggle");
   
  },

  displayOut : function(component, event, helper) {
       var toggleText = component.find("tooltip");
    $A.util.toggleClass(toggleText, "toggle");
  }
})