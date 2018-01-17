({
    
   
	getAttributeMethod : function(component,event,helper){
		 var params = event.getParam('arguments');
      //  params.data= component.get('v.data');
        params.ClsId= component.get('v.ClsId');
        params.selectedlst= component.get('v.selectedlst');
        params.QRCP= component.get('v.QRCP');
        params.data1= component.get('v.data1');
        params.selectedId= component.get('v.selectedId');
        params.ClsIndx= component.get('v.ClsIndx');
         params.Indx= component.get('v.Indx');
         params.ClassId= component.get('v.ClassId');
         params.lngth= component.get('v.lngth');
         params.Classpackagelist=component.get("v.Classpackagelist");
       alert('Parameters'+JSON.stringify(params.Classpackagelist));
		params.navigate=true;
        
         // alert('Navigation'+params.navigate);
            return params;
        
       	 
	},
    
    
    
    
    
    init : function(component, event, helper){
       var enlst = component.get('v.enrollselectedlst');
        for(var i=0;enlst[i]!=undefined;i++){
            component.set('v.ClsId['+i+']',enlst[i].Id)
        }
        
	        component.set("v.showSpinner",true);
        var action = component.get("c.getClasses");
        action.setParams({"ClsId":component.get("v.ClsId")})
		
		action.setCallback(this, function(response){
			var state = response.getState();
			console.log('State'+state);
			if(state == "SUCCESS"){
                component.set("v.showSpinner",false);
				component.set("v.data",JSON.parse(response.getReturnValue()));
              console.log("gotit"+JSON.stringify(JSON.parse(response.getReturnValue())));
                
                 $A.createComponent("c:strike_dataGrid", {"data":component.get("v.data"),"parent":"parent"

        }, function(newCmp) {
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
        });
                console.log("done12");
			}
		});
		
		$A.enqueueAction(action);
        console.log("done");
        console.log("got"+component.get("v.data"));
	//var d = '{"columns":[{"sortable":true,"label":"Account Name",dataType":"STRING","name":"Name"},{"sortable":true,"label":"Account Phone","dataType":"PHONE","name":"Phone" },{"sortable":true,"label":"Website","dataType":"URL","name":"Website"],"rows":[{"Name":"Edge Communications","Phone":"(512) 757-6000","Website":"http://edgecomm.com"},{"Name":"Burlington Textiles Corp of America","Phone":"(336) 222-7000","Website":"www.burlington.com"},{"Name":"Grand Hotels & Resorts Ltd","Phone":"(312) 596-1000","Website":"www.grandhotels.com"},{"Name":"United Oil & Gas, UK","Phone":"+44 191 4956203","Website":"http://www.uos.com"}]}';
   //component.set("v.data",d);
       
        
        
        
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
	}
	
	/*getAttributeMethod : function(component,event,helper){
		 var params = event.getParam('arguments');
		 
		 
   
       
     
             params.navigate=true;
        
         // alert('Navigation'+params.navigate);
            return params;
        
       	 
	}*/
})