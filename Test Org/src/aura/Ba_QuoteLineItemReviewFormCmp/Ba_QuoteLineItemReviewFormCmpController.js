({
	doInit : function(component, event, helper) {
		helper.GetQuote(component);
        helper.GetFA(component);
        helper.GetFR(component)
        
       },
    StrikeEvent:function(component, event, helper){
        var eventValue = event.getParam("data1");
      // console.log("123"+eventValue.Product2Id);
      //  if(eventValue.Product2Id!=undefined){
            var eventValue1 = eventValue;
            console.log("evntform"+eventValue1.Id)
       component.set("v.QLIId",eventValue1.Id);
        helper.GetQuote(component);
        helper.GetFA(component);
        helper.GetFR(component)
    }
})