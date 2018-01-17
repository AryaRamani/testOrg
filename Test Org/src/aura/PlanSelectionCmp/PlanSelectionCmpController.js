({
    doInit: function(component, event, helper) {
        var next = false;
        var prev = false;

        /* Set value in product type filter*/
        var type = [{
                value: "HMO ",
                label: "HMO"
            }, {
                value: "PPO",
                label: "PPO"
            }, {
                value: "POS",
                label: "POS"
            }

        ];
        
        var productlist = [];
        for (var i = 0; i < type.length; i = i + 1) {
            var producttype = {
                'type': type[i].label,
                'select': true
            }
            productlist.push(producttype);
        }
        component.set("v.producttype", productlist);


        helper.getplandata(component); /* to fetch filter information */
        helper.getproductline(component, next, prev); /*to fetch product line information*/
        helper.filterpackage(component, next, prev); /*to fetch package information*/

    },

    getproductdetails: function(component, event, helper) {
        component.set("v.product", true);
        var next = false; /*for pagination*/
        var prev = false;
        helper.getproductline(component, next, prev);  /*to get product line information when clicked on the filter tab*/
        $A.util.addClass(component.find('deductible-id'), 'hideContent');
        $A.util.removeClass(component.find('type-id'), 'hideContent');
        $A.util.removeClass(component.find('line-id'), 'hideContent');
        $A.util.addClass(component.find('line1'), 'slds-is-active');
       /* to display thet table based on the filter selected*/ 
        var lineid = component.find('line2');
        if (lineid.length === undefined) {
            $A.util.removeClass(component.find('line2'), 'slds-is-active');
        }
        for (var i = 0; i < lineid.length; i = i + 1) {
            console.log(i);
            $A.util.removeClass(component.find('line2')[i], 'slds-is-active');

        }

    },

    getdeductibles: function(component, event, helper) {
        $A.util.addClass(component.find('type-id'), 'hideContent');
        $A.util.addClass(component.find('line-id'), 'hideContent');
        $A.util.removeClass(component.find('deductible-id'), 'hideContent');
        $A.util.removeClass(component.find('line1'), 'slds-is-active');
        $A.util.removeClass(component.find('line3'), 'slds-is-active');
        $A.util.addClass(component.find('line2'), 'slds-is-active');
    },

    getprescription: function(component, event, helper) {
        $A.util.addClass(component.find('type-id'), 'hideContent');
        $A.util.addClass(component.find('line-id'), 'hideContent');
        $A.util.addClass(component.find('deductible-id'), 'hideContent');
        $A.util.removeClass(component.find('line1'), 'slds-is-active');
        $A.util.removeClass(component.find('line2'), 'slds-is-active');
        $A.util.addClass(component.find('line3'), 'slds-is-active');
    },


    getdetails: function(component, event, helper) {
        component.set("v.product", false);
        var next = false;
        var prev = false;
  /* get display names based pn filter selected*/

        // console.log('Attribute list'+ console.log(component.get("v.Attributelist")));
        var lineid = component.find('line2');
        console.log('Aura id' + lineid);
        var target = event.currentTarget.dataset.rowIndex;
        console.log('Target id' + target);
        $A.util.removeClass(component.find('line1'), 'slds-is-active');
        var lineid = component.find('line2');
        console.log('Aura id' + lineid);
        var target = event.currentTarget.dataset.rowIndex;
        console.log('Target id' + target);
        component.set("v.target", target);
        if (lineid.length === undefined) {
            $A.util.addClass(component.find('line2'), 'slds-is-active');
        }
        for (var i = 0; i < lineid.length; i = i + 1) {
            console.log(i);

            if (target == i) {

                $A.util.addClass(component.find('line2')[target], 'slds-is-active');
            } else {
                $A.util.removeClass(component.find('line2')[i], 'slds-is-active');
            }
        }
        component.set("v.target", target);
        var next = false;
        var prev = false;
        // var productlist=component.get("v.SelectedAttributes"); 
        helper.getdisplaynames(component, next, prev);

        $A.util.addClass(component.find('type-id'), 'hideContent');
        $A.util.addClass(component.find('line-id'), 'hideContent');
        $A.util.removeClass(component.find('deductible-id'), 'hideContent');
    },

    getchange: function(component, event, helper) {
 /* When display name is de-selected stores the value in another attribute*/
        console.log('Checkbox' + event.getSource().get("v.checked"));
         var filtername = component.get("v.planfilters")[component.get("v.target")];
        
        var valuelist = component.get("v.Attributelist");
       console.log('Plan Filters'+JSON.stringify(valuelist));
        var filterlist = _.find(valuelist, function(o) {
            return o.filtername === filtername;
        });
        var index = _.findIndex(valuelist, function(o) {
            return o.filtername === filtername;
        });
        var indexval=event.getSource().get("v.variant");
        console.log(event.getSource().get("v.variant"));
        console.log('Index' + index);
        console.log('Filter list' + JSON.stringify(filterlist.productfilter[index]));
        if (!event.getSource().get("v.checked")) {

            for (var i = 0; i < filterlist.productfilter.length; i = i + 1) {
                //  for(var j=0;j<res.productfilter.length;j=j+1){
                //  if(i===index){
                filterlist.productfilter[indexval].selected = false;
                valuelist.splice(indexval, 1);
                valuelist.push(filterlist);
  
            }
        } else {

            for (var i = 0; i < filterlist.productfilter.length; i = i + 1) {
 
                filterlist.productfilter[indexval].selected = true;

                //valuelist.splice(indexval, 1);
                valuelist.push(filterlist);

            }

        }

        component.set("v.Attributelist", valuelist);

    },

    findpackage: function(component, event, helper) {
    /* filter button is clicked*/
        var next = false;
        var prev = false;
       // for capturing Quote summary details  
        var FilterList = component.get("v.packageInfo");
        var setEvent = $A.get("e.c:QuoteLineSummaryEvent");
        setEvent.setParams({'packageInfo':FilterList});
        console.log('Test'+JSON.stringify(FilterList));
        setEvent.fire();
        
        helper.filterpackage(component, next, prev);
        
    },

    Next: function(cmp, event, helper) {
    /* pagination next button*/
        var next = true;
        var prev = false;
        var offset = cmp.get("v.offset");
        if (cmp.get("v.product")) {

            helper.getproductline(cmp, next, prev, offset);
        } else {
            helper.getdisplaynames(cmp, next, prev, offset);
        }
    },
    Previous: function(cmp, event, helper) {
        var next = false;
        var prev = true;
        var offset = cmp.get("v.offset");

        if (cmp.get("v.product")) {

            helper.getproductline(cmp, next, prev, offset);
        } else {
            helper.getdisplaynames(cmp, next, prev, offset);
        }
    },

    gotoNext: function(cmp, event, helper) {
        var next = true;
        var prev = false;
        var offset = cmp.get("v.off");
        alert('here' + cmp.get("v.product"));
        helper.filterpackage(cmp, next, prev, offset);

    },
    gotoPrevious: function(cmp, event, helper) {
        var next = false;
        var prev = true;
        var offset = cmp.get("v.off");
        helper.filterpackage(cmp, next, prev, offset);
    },

    moveback: function(component, event, helper) {
    /* on clcik of previous button*/
        var compEvent = component.getEvent("navigateback");
        compEvent.fire();
    }
})