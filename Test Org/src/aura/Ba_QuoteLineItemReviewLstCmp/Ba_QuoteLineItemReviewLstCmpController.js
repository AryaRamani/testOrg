({
    getQuoteline: function(component) {
        console.log('&&&&&&Quote line selection' + JSON.stringify(component.get("v.SelectedQuoteLine")));
        var selection = component.get("v.SelectedQuoteLine");
        var selectionlst = [];
        for (var i = 0; i < selection.length; i = i + 1) {
            selectionlst.push(selection[i].Id);
        }
        component.set("v.QLIId", selectionlst);
        var action = component.get("c.getQLI");
        action.setParams({
            "QLIId": component.get("v.QLIId")
        });
        action.setCallback(this, function(response) {
            component.set("v.showSpinner", true);
            var state = response.getState();
            console.log('State' + state);
            if (state === "SUCCESS") {
                component.set("v.showSpinner", false);
                component.set("v.data", JSON.parse(response.getReturnValue()));
                console.log("gotit" + JSON.stringify(JSON.parse(response.getReturnValue())));

            }
        });

        $A.enqueueAction(action);
    },




    init: function(component, event, helper) {
        /*  var test = '{ "columns":[{"sortable":true,"label":"QuoteID", "dataType":"STRING", "name":"QuoteID"},  { "sortable":true,"label":"Line#","dataType":"STRING","name":"Line#"},{ "sortable":true,"label":"Effective Date","dataType":"DATE","name":"Effective Date"}],"rows":[{"QuoteID":"Edge Communications","Line#":"(512) 757-6000","Effective Date":"28/18/2017"},{"QuoteID":"Burlington Textiles Corp of America","Line#":"(336) 222-7000","Effective Date":"28/18/2017"}] }';
        var data =  JSON.parse(test);
		component.set("v.data",data);
       console.log("test"+JSON.stringify(component.get("v.data")));*/
        var QLIId = component.get("v.QLIId");

        var action = component.get("c.getQLI");
        action.setParams({
            "QLIId": component.get("v.QLIId")
        });
        action.setCallback(this, function(response) {
            component.set("v.showSpinner", true);
            var state = response.getState();
            console.log('State' + state);
            if (state === "SUCCESS") {
                component.set("v.showSpinner", false);
                component.set("v.data", JSON.parse(response.getReturnValue()));
                console.log("gotit" + JSON.stringify(JSON.parse(response.getReturnValue())));
                console.log("done12");
            }
        });

        $A.enqueueAction(action);
        /*  console.log("done");
        console.log("got"+component.get("v.data"));
	
      
           $A.createComponent("c:strike_dataGrid", {"data":component.get("v.data")

        }, function(newCmp) {
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
        });*/




        /*    var action1 = component.get('c.SrchGroup');
       
      action1.setCallback(this, function(b) {
        if (b.getState() === "SUCCESS") {
            var test1 = b.getReturnValue();
             var data1 =  JSON.parse(test1);
           component.set("v.data", data1);
            console.log(b.getReturnValue());
            
            
              } 
         
    });
        $A.enqueueAction(action1)*/
    },
    tst: function(component, event, helper) {
        $A.createComponent("c:strike_dataGrid", {
            "data": component.get("v.data"),
            "parent": "parent"

        }, function(newCmp) {
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
        });
    }
})