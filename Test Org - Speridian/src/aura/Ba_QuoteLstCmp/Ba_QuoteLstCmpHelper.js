({
	getQuote : function(component,next, prev, offset) {
	component.set("v.showSpinner",true);
	var action = component.get("c.getQuoteinfo");
	console.log('Search type'+ component.get("v.searchvalue"));
	  action.setParams({
            'groupId': component.get("v.GroupId"),
             "next": next,
            "prev": prev,
            "off": component.get("v.offset"),
            'searchtype': component.get("v.searchvalue"),
            'searchtext': component.get("v.searchtext")
            
        });
        action.setCallback(this, function(response) {

            var state = response.getState();
            if (state === "SUCCESS") {
            	component.set("v.showSpinner",false);
                console.log('Response' + JSON.stringify(response.getReturnValue()));
                var res=response.getReturnValue();
                component.set("v.Quotelst", response.getReturnValue().Quotelist);
                 component.set('v.offset', res.offst);

                component.set('v.next', res.hasnext);
                component.set('v.prev', res.hasprev);
                // handel the response errors        
            } else if (state === "INCOMPLETE") {
                component.set("v.showSpinner",false);
                alert("From server: " + response.getReturnValue());
            } else if (state === "ERROR") {
            component.set("v.showSpinner",false);
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        // enqueue the action
        $A.enqueueAction(action);
		
	},
	
	
	getQuoteLineItem: function(component, next, prev, offset){
	 //component.set("v.showSpinner",true);
	 var QuoteId=component.get("v.Quotelst")[component.get("v.target")].Id;
	 console.log('Quote Id'+QuoteId);
	 component.set("v.selectedQuoteId",QuoteId);
	  var appEvent = $A.get("e.c:DataTableEvt");
        appEvent.setParams({
        'QuoteId': component.get("v.selectedQuoteId")
            });
        appEvent.fire();
	/* var action = component.get("c.getLineIteminfo");
	  action.setParams({
	        'groupId': component.get("v.groupId"),
            'QuoteId': component.get("v.Quotelst")[component.get("v.target")].Id,
             "next": next,
            "prev": prev,
            "off": component.get("v.off"),
             'searchtype': component.get("v.searchtype"),
            'searchtext': component.get("v.searchkey")
            
            
        });
        action.setCallback(this, function(response) {

            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.showSpinner",false);
                
                 $A.util.addClass(component.find('message'), 'hideContent');
                console.log('Response' + JSON.stringify(response.getReturnValue().lineItemlist.length));
                
                if(response.getReturnValue().lineItemlist.length>0){
                var res= response.getReturnValue();
                component.set("v.LineItemlst",response.getReturnValue().lineItemlist);
                 component.set('v.off', res.offst);

                component.set('v.Isnext', res.hasnext);
                component.set('v.Isprev', res.hasprev);
                
                 var selectlst=component.get("v.selectedlst");
                 var itemlst=component.get("v.LineItemlst");
                // var lineTemlst=[];
               // alert(JSON.stringify(component.get("v.selectedlst")));
                console.log('Selected list'+JSON.stringify(component.get("v.selectedlst")));
                 for(var i=0;i<component.get("v.selectedlst").length;i=i+1){
                        for(var j=0;j<component.get("v.LineItemlst").length;j=j+1){
                        console.log('Selected list'+ selectlst[i].Id);
                        console.log('list'+ itemlst[j].Id);    //If the Quote line is present in the selected list, set the checkbox to true
                        if(selectlst[i].Id===itemlst[j].Id){
                        
                           itemlst[j].selected=true;
                           console.log('select'+ JSON.stringify(itemlst[j]));
                           
                        }
                        
                        }
                 }
                 component.set("v.LineItemlst",itemlst);
                $A.util.removeClass(component.find('bodyid'), 'hideContent');
                }
                else{
                component.set("v.message",'No records found');    
                $A.util.removeClass(component.find('message'), 'hideContent');
                $A.util.addClass(component.find('bodyid'), 'hideContent');
                }
                // handel the response errors        
            } else if (state === "INCOMPLETE") {
                component.set("v.showSpinner",false);
                alert("From server: " + response.getReturnValue());
            } else if (state === "ERROR") {
                component.set("v.showSpinner",false);
                var errors = response.getError();
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });
        // enqueue the action
        $A.enqueueAction(action);*/
	}
	})