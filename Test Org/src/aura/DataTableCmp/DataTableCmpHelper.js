({
	getdata : function(component,next, prev, offset) {
		component.set("v.showSpinner",true);
        var index=component.get("v.index");
        var order;
        if (component.get("v.sort1") === "down") {
          order='desc';
             component.set("v.sort1", "up");
            }
        else{
            order='asc';
            component.set("v.sort1", "down");
        }
        var fieldlst=[];
        for(var i=0;i<component.get("v.fieldnames").length;i=i+1){
        fieldlst.push(component.get("v.fieldnames")[i].value);
        }
        console.log('Offset'+component.get("v.off"));
        console.log('Page size'+component.get("v.pagesize"));
        console.log('FIlter search'+component.get("v.filtersearch"));
		 var action=component.get("c.getRecords");
       action.setParams({
           "objname" : component.get("v.objectName"),
           "fields" : fieldlst,
            "next": next,
            "prev": prev,
            "off": component.get("v.off"),
           "page" : component.get("v.pagesize"),
           "sortfield" : fieldlst[index],
           "sorttype" : order,
           "filtersearch" : component.get("v.searchvalue"),
           "searchtext" : component.get("v.searchtext"),
           "searchfield" : component.get("v.searchfield"),
           "filtervalue" : component.get("v.filtersearch")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
               var res=response.getReturnValue();
              //  var reclist=[];
              component.set("v.showSpinner",false);
              console.log('Response'+JSON.stringify(res));
               console.log('Records'+JSON.stringify(res.reclist));
                component.set("v.recordnames",res.reclist);
                 component.set('v.off', res.offset);
				console.log('Offset in succcess'+component.get("v.off"));
                component.set('v.next', res.hasnext);
                component.set("v.prev", res.hasprev);
                var page=Math.ceil(res.count/component.get("v.pagesize"));
                console.log('Page number'+page);
                component.set("v.totalsize",page);
                console.log('Count'+res.count);
            }


        });

        $A.enqueueAction(action); 
	}
})