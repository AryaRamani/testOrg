({
	doInit : function(component, event, helper) {
	var dataObj =	{    "columns":[
        {
            "sortable":true,
            "label":"Employee Id",
            "dataType":"STRING",
            "name":"Id"
        },
        {
            "sortable":true,
            "label":"First Name",
            "dataType":"STRING",
            "name":"FName"
        },
        {
            "sortable":true,
            "label":"Last Name",
            "dataType":"STRING",
            "name":"LName"
        }
    ],
    "rows":[
        {
            "Id":"1001",
            "FName":"Test",
            "LName":"Last Name Test"
        },
        
        {
            "Id":"1002",
            "FName":"Test 2",
            "LName":"Last Name Test"
        }
        

    ]
}
var dataObj1 =	{    "columns":[
        {
            "sortable":true,
            "label":"Employee Id",
            "dataType":"STRING",
            "name":"Id"
        },
        {
            "sortable":true,
            "label":"First Name",
            "dataType":"STRING",
            "name":"FName"
        },
        {
            "sortable":true,
            "label":"Last Name",
            "dataType":"STRING",
            "name":"LName"
        }
    ],
    "rows":[
        {
            "Id":"1005",
            "FName":"Test",
            "LName":"Last Name Test"
        },
        
        {
            "Id":"1002",
            "FName":"Test 33",
            "LName":"Last Name Test"
        }
        

    ]
}
component.set("v.MemberData",dataObj);	
component.set("v.NonPlanData",dataObj1);		
	},
	
	
	handleRowSelection : function(component, event, helper) {
	//alert('Here');
		alert(event.getParam('data1'));
	}
})