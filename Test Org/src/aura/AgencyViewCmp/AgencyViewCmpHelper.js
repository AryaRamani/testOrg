({
   getAccounts: function(component, page, recordToDisply) {
 
      // create a server side action. 
      var action = component.get("c.fetchAccount");
      // set the parameters to method 
      action.setParams({
         "pageNumber": page,
         "recordToDisply": recordToDisply,
          "Type":'Agency'
      });
      // set a call back   
      action.setCallback(this, function(a) {
         // store the response return value (wrapper class insatance)  
         var result = a.getReturnValue();
         console.log('result ---->' + JSON.stringify(result));
         // set the component attributes value with wrapper class properties.   
 
         component.set("v.Accounts", result.Accounts);
          component.set("v.Account",result.Accounts)
         component.set("v.page", result.page);
         component.set("v.total", result.total);
         component.set("v.pages", Math.ceil(result.total / recordToDisply));
         /* for(var i=0;i<7;i++){
         component.set("v.IdNum",i);
          }*/
         // component.set("v.IdNum",{0,1,2,3,4,5,6})
      });
      // enqueue the action 
      $A.enqueueAction(action);
   }
})