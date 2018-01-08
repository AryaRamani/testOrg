({
	doInit : function(component, event, helper) {
       // var recId=component.get("v.recordId");
         var next = false;
        var prev = false;
        var offset = component.get("v.off");
       console.log(JSON.stringify( component.get("v.recordnames")));
        if(component.get("v.retrieve")){ 
       helper.getdata(component,next, prev, offset);
       }
        
	},
    getsearchresults : function(component, event, helper){
      var next = false;
        var prev = false;
       
        component.set("v.off",0);
        component.set("v.counter",1);
        var offset=component.get("v.off");
       helper.getdata(component,next, prev, offset);   
    },
    
      gotoNext: function(cmp, event, helper) {
        var next = true;
        var prev = false;
        var offset = cmp.get("v.off");
       var counter=cmp.get("v.counter");
          counter=counter+1;
          cmp.set("v.counter",counter);
        helper.getdata(cmp, next, prev, offset);

    },
    gotoPrevious: function(cmp, event, helper) {
        var next = false;
        var prev = true;
        var offset = cmp.get("v.off");
         var counter=cmp.get("v.counter");
          counter=counter-1;
          cmp.set("v.counter",counter);
        helper.getdata(cmp, next, prev, offset);
    },
    
    getpagesize : function(component,event, helper){
       console.log( component.find('page-id').get("v.value"));
        var pagesize=component.find('page-id').get("v.value");
        component.set("v.off",0);
        var offset=component.get("v.off");
        component.set("v.pagesize",pagesize);
        var next = false;
        var prev = false;
        helper.getdata(component, next, prev, offset);
        
    },
    
    sortByField : function(component, event, helper){
        var index = event.currentTarget.dataset.rowIndex;
        var next = false;
        var prev = false;
        component.set("v.off",0);
        component.set("v.counter",1);
        var offset=component.get("v.off");
        console.log('Index'+index);
        component.set("v.index",index);
        console.log('Field Name'+component.get("v.fieldnames")[index]);
       
        helper.getdata(component, next, prev, offset);
        
    },
    
    handleDataTableEvent : function(component, event, helper){
      var filtersearch= event.getParam("QuoteId");
        component.set("v.filtersearch",filtersearch);
       var next = false;
        var prev = false;
        var offset = component.get("v.off"); 
       helper.getdata(component,next, prev, offset);
    },
    
    /*getselectedId : function(component, event, helper){
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
        var selectedval= component.get("v.recordnames")[target].Id;
        var cmpEvent = component.getEvent("rowselect");
        cmpEvent.setParams({
            "selectedId" : selectedval });
        cmpEvent.fire();
    } */
    
    getselection : function(component,event, helper){
      console.log('Checkbox'+event.getSource().get("v.variant"));
    var selectedlist=component.get("v.selectedlst");
    console.log('Checked'+event.getSource().get("v.checked"));
    var index= event.getSource().get("v.variant"); //get the index value
    var lineItem= component.get("v.recordnames")[index];
    if(event.getSource().get("v.checked")){
    	selectedlist.push(component.get("v.recordnames")[index]); //if selected push it in a list
    }
    else{
    var count=selectedlist.indexOf(component.get("v.selectedlst")[index]); //if unchecked find the index from list
    selectedlist.splice(count, 1);				//remove from the list
    component.set("v.selectedlst",selectedlist);
    }
    
    console.log('Selected Values'+JSON.stringify(selectedlist));
   
    },
    
    handleNavigateNext : function(component, event, helper){
    console.log('In Data Table');
     var cmpEvent = component.getEvent("navigateEvt");
        cmpEvent.setParams({
           "Objatt" : component.get("v.selectedlst"),
          
           });
        cmpEvent.fire();
    },
    
    getSelectedLst : function(component, event, helper){
  
     var params = event.getParam('arguments');
     
     params.GrpBenefitPackage = component.get("v.selectedlst");
     // alert('Params'+JSON.stringify(params));
        if (params) {
            var selectionlist = params.GrpBenefitPackage;
            console.log("Selection: " + selectionlist);
            return params;
        }
    }
});