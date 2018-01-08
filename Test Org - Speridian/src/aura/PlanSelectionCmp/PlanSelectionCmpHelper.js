({
    getplandata: function(component) {
        component.set("v.showSpinner", true);
        var action = component.get("c.fetchplandata");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
                component.set("v.showSpinner", false);
                
                console.log('Filters' + res);
               // var result = _.uniq(res);
                component.set("v.planfilters", res);
                console.log('Plan Filters'+res);
                
            }
        });

        $A.enqueueAction(action);
    },

    getproductline: function(component, next, prev, offset) {
        component.set("v.showSpinner", true);
        var action = component.get("c.fetchproductline");
        action.setParams({
            "next": next,
            "prev": prev,
            "off": offset
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
                component.set("v.showSpinner", false);
                var productlist = [];
                console.log('Product line Response' + res);
                component.set('v.offset', res.offst);

                component.set('v.next', res.hasnext);
                component.set('v.prev', res.hasprev);
                for (var k = 0; k < res.productline.length; k = k + 1) {

                    var producttype = {
                        'line': res.productline[k],
                        'select': true
                    }
                    productlist.push(producttype);
                }

                component.set("v.productline", productlist);
            }


        });

        $A.enqueueAction(action);
    },

    getdisplaynames: function(component, next, prev, offset) {
        var valuelist = [];
        var attlist = [];
        var target = component.get("v.target");
        var offset = component.get("v.offset");
        console.log('Offset' + offset)
        valuelist = component.get("v.Attributelist");
        component.set("v.showSpinner", true);
        var action = component.get("c.fetchplaninfo");
        action.setParams({
            filter: component.get("v.planfilters")[target],
            "next": next,
            "prev": prev,
            "off": offset
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var res = response.getReturnValue();
                component.set('v.offset', res.offst);

                component.set('v.next', res.hasnext);
                component.set('v.prev', res.hasprev);
                console.log('Filter Name' + JSON.stringify(res.productfilter));


                //   component.set("v.Attributelist",valuelist);

                var filterlist = _.find(valuelist, function(o) {
                    return o.filtername === res.filtername;
                });
                console.log('Filterlist' + filterlist);
                if (filterlist === undefined) {
                    valuelist.push(res);
                    console.log('Valuelist' + JSON.stringify(valuelist));
                } else {
                    console.log('Attribute Map' + JSON.stringify(valuelist));
                    for (var i = 0; i < filterlist.productfilter.length; i = i + 1) {
                        for (var j = 0; j < res.productfilter.length; j = j + 1) {

                            if (!filterlist.productfilter[i].selected) {
                                if (filterlist.productfilter[i].displaynames === res.productfilter[j].displaynames) {
                                    res.productfilter[j].selected = false;
                                }

                            }
                        }
                    }
                    console.log('Changed Response' + JSON.stringify(res));
                    console.log('Filter list matched' + JSON.stringify(filterlist));
                }
                component.set("v.showSpinner", false);
                component.set("v.productAttributes", res);
            }

        });

        $A.enqueueAction(action);

    },

    filterpackage: function(component, next, prev, offset) {
        console.log('Product type' + JSON.stringify(component.get("v.producttype")));
        var typefilterlist = [];
        var linefilterlist = [];
        var type = component.get("v.producttype");
        for (var k = 0; k < type.length; k = k + 1) {
            console.log('Type' + type[k].select);
            if (!type[k].select) {
                typefilterlist.push(type[k].type);
            }
        }
        for (var z = 0; z < component.get("v.productline").length; z = z + 1) {
            if (!component.get("v.productline")[z].select) {
                linefilterlist.push(component.get("v.productline")[z].line);
            }
        }

        var filter = component.get("v.Attributelist");
        var packagelist = [];
        for (var i = 0; i < filter.length; i++) {
            for (var j = 0; j < filter[i].productfilter.length; j = j + 1) {
                if (!filter[i].productfilter[j].selected) {
                    packagelist.push(filter[i].productfilter[j]);
                }
            }

        }
        var offset = component.get("v.off");
        component.set("v.packagelist", packagelist);
        console.log('Package' + JSON.stringify(packagelist));
        component.set("v.showSpinner", true);
        var action = component.get("c.fetchpackageinfo");
        action.setParams({
            filter: JSON.stringify(component.get("v.packagelist")),
            typefilter: typefilterlist,
            linefilter: linefilterlist,
            "next": next,
            "prev": prev,
            "off": offset
        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var packagelist = [];
                console.log('Final Filter list' + JSON.stringify(response.getReturnValue()));
                var res = response.getReturnValue();
                component.set("v.showSpinner", false);

                component.set('v.offset', res.offst);

                component.set('v.Isnext', res.hasnext);
                component.set('v.Isprev', res.hasprev);
                for (var k = 0; k < res.packagefilters.length; k = k + 1) {
                    var pack = res.packagefilters[k];
                    var filter = {

                        'select': true,
                        'packageId': pack.ba_BusinessPackageId__c,
                        'packagename': pack.ba_PackageName__c,
                        'packagecode': pack.ba_PackageCode__c
                    }
                    packagelist.push(filter);
                }
                component.set("v.packageInfo", packagelist);
            }

        });
        
 
       
        $A.enqueueAction(action);
        
       
    }
})