({
   init: function (cmp, event, helper) {
        cmp.set('v.mycolumns', [
            {label: 'Contact Name', fieldName: 'Name', type: 'text',sortable:'true'},
                {label: 'Phone', fieldName: 'Phone', type: 'phone'},
                {label: 'Email', fieldName: 'Email', type: 'email'}
            ]);
        helper.getData(cmp);
    },
    
     updateColumnSorting: function (cmp, event, helper) {
        var fieldName = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        // assign the latest attribute with the sorted column fieldName and sorted direction
        cmp.set("v.sortedBy", fieldName);
        cmp.set("v.sortedDirection", sortDirection);
        helper.sortData(cmp, fieldName, sortDirection);
    },
    
    getSelectedName : function(component, event, helper){
             var selectedRows = event.getParam('selectedRows');
       
        // Display that fieldName of the selected rows
        for (var i = 0; i < selectedRows.length; i++){
            alert("You selected: " + selectedRows[i].Name);
        }
    
    }
})