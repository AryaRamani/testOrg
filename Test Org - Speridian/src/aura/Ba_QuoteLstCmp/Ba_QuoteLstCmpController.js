({
    doInit: function(component, event, helper) {
        /* Retrieve the Quote info on page load */
        var next = false;
        var prev = false;
        helper.getQuote(component, next, prev);


        var opts = [{
            value: "Created",
            label: "Created"
        }, {
            value: "Accepted",
            label: "Accepted"
        }, {
            value: "Installed",
            label: "Installed"
        }];
        component.set("v.statuslst", opts);

    },

    getLineItems: function(component, event, helper) {
        /* On click of Quote row to get the QUote line item*/
        var target = event.currentTarget.dataset.rowIndex;
        var ids = component.find('row-id');
        if (ids.length === undefined) {
            $A.util.addClass(component.find('row-id'), 'row');
        }
        console.log('Id' + ids);
        for (var i = 0; i < ids.length; i = i + 1) {
            if (target == i) {
                $A.util.addClass(component.find('row-id')[i], 'row');
            } else {
                $A.util.removeClass(component.find('row-id')[i], 'row');
            }
        }
        component.set("v.target", target);
        var next = false;
        var prev = false;

        helper.getQuoteLineItem(component, next, prev);

    },

    Previous: function(cmp, event, helper) {
        /* Pagination on previous button for Quote*/
        var next = false;
        var prev = true;
        var offset = cmp.get("v.offset");
        helper.getQuote(cmp, next, prev, offset);

    },

    Next: function(cmp, event, helper) {
        /* Pagination on next button for Quote*/
        var next = true;
        var prev = false;
        var offset = cmp.get("v.offset");
        helper.getQuote(cmp, next, prev, offset);
    },

    getsearchresults: function(component, event, helper) {
        /* filter Quote searching based on the options*/
        helper.getQuote(component);
    },
    
    getsearchtype: function(component, event, helper) {
        /*filter Quote line Item searching based on the line Item*/
        helper.getQuoteLineItem(component);
    },
    
    hasPrevious: function(cmp, event, helper) {
        /*pagination on next button for line Item*/
        var next = false;
        var prev = true;
        var offset = cmp.get("v.off");
        helper.getQuoteLineItem(cmp, next, prev, offset);

    },
    
    hasNext: function(cmp, event, helper) {
        /*pagination on next button for line Item*/
        var next = true;
        var prev = false;
        var offset = cmp.get("v.off");
        helper.getQuoteLineItem(cmp, next, prev, offset);
    },

    getsearchValue: function(component, event, helper) {
        /*to clear search text on change of filter option for Quote*/
        component.set("v.searchtext", '');
    },
    
    changetype: function(component, event, helper) {
        /*to clear search text on change of filter option for Quote Line Item*/
        component.set("v.searchkey", '');
    },
    
    getselection: function(component, event, helper){
    /* to store the Quote Line Item selection*/
    console.log('Checkbox'+event.getSource().get("v.variant"));
    var selectedlist=component.get("v.selectedlst");
    console.log('Checked'+event.getSource().get("v.checked"));
    var index= event.getSource().get("v.variant"); //get the index value
    var lineItem= component.get("v.LineItemlst")[index];
    if(event.getSource().get("v.checked")){
    	selectedlist.push(component.get("v.")[index]); //if Quote line iTem is selected push it in a list
    }
    else{
    var count=selectedlist.indexOf(component.get("v.LineItemlst")[index]); //if unchecked find the index from list
    selectedlist.splice(count, 1);				//remove from the list
    
    }
    
    component.set("v.selectedlst",selectedlist); //set the list in an attribute of type object
    console.log('Selected list'+JSON.stringify(component.get("v.selectedlst")));
    
    }


})