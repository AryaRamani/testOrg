({
	init : function(component, event, helper) {
		  /*  component.set('v.selectedId[0][0]','123');
        component.set('v.selectedId[0][1]','234');
         component.set('v.selectedId[1][0]','abc');
        component.set('v.selectedId[1][1]','def');
        console.log('slid'+component.get('v.selectedId'));*/
        var action = component.get("c.getPackages");
       
		
		action.setCallback(this, function(response){
			var state = response.getState();
			console.log('State'+state);
			if(state == "SUCCESS"){
                component.set("v.showSpinner",false);
				//component.set("v.selectedlst",JSON.parse(response.getReturnValue()));
              console.log("gotit"+JSON.stringify(JSON.parse(response.getReturnValue())));
                
                console.log("done12");
			}
		});
		
		$A.enqueueAction(action);
	},
   Add : function(component, event, helper) 
    {
        component.set('v.modalIsOpen',true);
    },
    closeModel : function(component, event, helper) {
        
         var Strng=new Array() ;
         var Lst= component.get("v.selectedlst");
        var ln = component.get('v.lngth');
        if(ln==undefined){
            ln=0;
        }
        
         for(var i=ln,l=0;Lst[i]!=undefined;i++,l++){
           //var cind= component.get('v.ClsIndx');
          //var vr= 'v.selectedlst[i].Id';
         Strng[l]=Lst[i].Id;
              // evnt[i].Id;
              console.log(Strng[l]);
      
       }
      //  Strng[0]= component.get('v.selectedlst[0].Id');
        
        //JSON.stringify(component.get('v.selectedlst[i]'))==undefined
        console.log('strng'+Strng);
        
        //indx=0;
          var indx =component.get('v.ClsIndx');
        var ls = component.get('v.selectedId['+indx+']');
        if(ls!=undefined){
        var ln2= ls.length;
        }
        else{
            ln2=0;
        }
        for(var n=ln2,p=0;Strng[p]!=undefined;n++,p++){
            component.set('v.selectedId['+indx+']['+n+']',Strng[p]);
             }
        
        
        //existing
      //   var indx =component.get('v.ClsIndx');
        var action = component.get("c.getPackages");
        action.setParams({'PkgId':component.get('v.selectedId['+indx+']')});
         var Ls= component.get('v.selectedlst')
         component.set('v.lngth',Ls.length);
		
		action.setCallback(this, function(response){
		var state = response.getState();
		console.log('State'+state);
		if(state == "SUCCESS"){
                component.set("v.showSpinner",false);
				component.set("v.data1",JSON.parse(response.getReturnValue()));
              console.log("gotit"+JSON.stringify(JSON.parse(response.getReturnValue())));
                $A.createComponent("c:strike_dataGrid", {"data":component.get("v.data1")

        }, function(newCmp) {
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
        });
                component.set('v.modalIsOpen',false);
                console.log("done12");
			}
			
			 var pack=component.get("v.Classpackagelist");
                var packagelist={
                     'ClassId': component.get("v.ClassId")[indx],
                     'packlist' : component.get("v.data1")
                }
                
                pack.push(packagelist);
                component.set("v.Classpackagelist",pack);
		});
		
		$A.enqueueAction(action);
       
       
          
        var clsid=component.get('v.ClassId');
       var cl= clsid[indx];
        var dt = component.get('v.data1');
       var qrcp=component.get('v.QRCP');
        var lng1 =qrcp.length;
        var r =0;
        if(lng1!=undefined){
            r =lng1;
        }
        
        for(var m=ln,l=lng1;Lst[m]!=undefined;m++,l++){
              //qrcp[m] = {'Name':dt.rows[0].Name,'ba_ClassID__c':cl,	'ba_PredefinedPackage__c':component.get('v.selectedId['+indx+']['+m+']')} 
            
       //   component.set('v.QRCP['+m+']',{'Name':dt.rows[m].Name,'ba_ClassID__c':cl,	'ba_PredefinedPackage__c':component.get('v.selectedId['+indx+']['+m+']')} )
        component.set('v.QRCP['+l+']',{'Name':Lst[m].Name,'ba_ClassID__c':cl,	'ba_PredefinedPackage__c':Lst[m].Id} )
        //console.log('qrp'+ JSON.stringify(component.get('v.QRCP['+m+']')));
            
            console.log('qrp'+ JSON.stringify(component.get('v.QRCP['+m+']')));
        }
          
         

    
},
    EditEvent: function(component, event, helper){
       //  component.set('v.data',event.getParam("data"));
  var evnt = event.getParam("data");
        var Strng =[];
       for(var i=0; evnt[i]!=undefined;i++)
       {
           Strng[i]=evnt[i].Id;
      
       }
           component.set('v.selectedId',Strng);
        
        console.log(component.get('v.selectedId') );
        var action = component.get("c.getPackages");
        action.setParams({'PkgId':component.get('v.selectedId')});
     
		
		action.setCallback(this, function(response){
			var state = response.getState();
			console.log('State'+state);
			if(state == "SUCCESS"){
                component.set("v.showSpinner",false);
				component.set("v.data1",JSON.parse(response.getReturnValue()));
              console.log("gotit"+JSON.stringify(JSON.parse(response.getReturnValue())));
                   $A.createComponent("c:strike_dataGrid", {"data":component.get("v.data1"),"parent":"parent"

        }, function(newCmp) {
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
        });
                console.log("done12");
			}
		});
		
		$A.enqueueAction(action);
       
        console.log('evtdta'+JSON.stringify(event.getParam("data")));
          
                 $A.createComponent("c:strike_dataGrid", {"data":component.get("v.data1"),"parent":"parent"

        }, function(newCmp) {
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
        });
    },
    
    Strike: function(component, event, helper){
         var evnt = event.getParams('data1');
      //  var prnt = event.getParams('Parent');
    //   var stp=component.get('v.stop');
        console.log(evnt);
        alert('Data'+JSON.stringify(evnt));
        // console.log('indx'+component.get('v.Indx'));
       // console.log('ev123'+JSON.stringify(evnt.data1.Id));
    var clsId = component.get('v.ClassId');
        var validId=0;
        var Ind;
        for(var k =0;clsId[k]!=undefined;k++)
        {
            if(clsId[k]==evnt.data1.Id){
              Ind=k;
            }
            else{
               validId=validId+1; 
            }
        }
        if(validId==k)
        {
            clsId[k]=evnt.data1.Id;
            Ind=k;
            
        }
        component.set('v.ClassId',clsId);
      component.set('v.ClsIndx',Ind);
            console.log('cls'+component.get('v.ClassId'));
        
        
        
        
         component.set('v.showSpinner',true);
         var action = component.get("c.getPackages");
        action.setParams({'PkgId':component.get('v.selectedId['+Ind+']')});
      
		
		action.setCallback(this, function(response){
			var state = response.getState();
			console.log('State'+state);
			if(state == "SUCCESS"){
                
                component.set("v.showSpinner",false);
				component.set("v.data1",JSON.parse(response.getReturnValue()));
              console.log("gotit"+JSON.stringify(JSON.parse(response.getReturnValue())));
                $A.createComponent("c:strike_dataGrid", {"data":component.get("v.data1")

        }, function(newCmp) {
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
        });
          //alert('Data'+JSON.stringify(component.get("v.data1")));
                component.set('v.modalIsOpen',false);
                console.log("done12");
               
                
              
			}
		});
		
		$A.enqueueAction(action);
        
        
    } 
    ,
    strChanged: function (component, event, helper){
         var Strng =[] ;
        
        console.log('vl'+JSON.stringify(component.get('v.selectedlst')));
        console.log('vl1'+JSON.stringify(component.get('v.selectedlst[0].Id')));
      /*  var Lst= component.get("v.selectedlst")
       {       for(var i=0;Lst[i]!=undefined;i++)
//var cind= component.get('v.ClsIndx');
          //var vr= 'v.selectedlst[i].Id';
         Strng[i]=Lst[i].Id;
              // evnt[i].Id;
              console.log(Strng[i]);
      
       }*/
      //  Strng[0]= component.get('v.selectedlst[0].Id');
        
        //JSON.stringify(component.get('v.selectedlst[i]'))==undefined
     //   console.log('strng'+Strng);
        
        //   component.set('v.selectedId',Strng);
        
      //  console.log('1'+component.get('v.selectedId[0][0]') );
           },
    setAttributeValue : function(component,event,helper){
        
      component.set('v.Indx',event.getParam("Indx"));
}
  ,
    Remove : function(component,event,helper){
    
        
           var clsid = component.get('v.ClassId')  
      var Ind = component.get('v.Indx');
      /*  var slctd =[];
          slctd = component.get('v.selectedId');
        var slctd1=[];
         for(var j=0;j<3;j++)
         {
             slctd1[j] = slctd[j];
            
console.log('sl123'+slctd1[j]);             
         }
       slctd1 = slctd1.splice(1,1);
        //console.log
     /*   for(var i=Ind;i<3;i++)
        {
            
            slctd1[i]=slctd1[i+1]
            console.log('sl'+slctd1[i]);
        }*/
       // component.set('v.selectedId',slctd1);
      
        
      var dat = component.get('v.data1.rows');
        var id=dat[Ind].Id;
        dat.splice(Ind,1);
         console.log('dt0'+JSON.stringify(dat[0]));
        component.set('v.data1.rows',dat);
        console.log(JSON.stringify(component.get('v.data1')));
      /* var selected= component.get('v.selectedlst');
       
        selected.splice(Ind,1);*/
      //  component.set('v.selectedlst',selected);
       var index1= component.get('v.ClsIndx');
        var slctid= component.get('v.selectedId['+index1+']');
        for(var i=0;slctid[i]!=undefined;i++){
            if(slctid[i]==id){
                Ind=i;
            }
        }
        slctid.splice(Ind,1);
        
        //component.set('v.lngth',component.get('v.lngth')-1);
        component.set('v.selectedId['+index1+']',slctid);
        $A.createComponent("c:strike_dataGrid", {"data":component.get("v.data1")

        }, function(newCmp) {
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
        });
        
        
         var qrcp = component.get('v.QRCP');
        
        for(var m=0;qrcp[m]!=undefined;m++){
              //qrcp[m] = {'Name':dt.rows[0].Name,'ba_ClassID__c':cl,	'ba_PredefinedPackage__c':component.get('v.selectedId['+indx+']['+m+']')} 
            if(qrcp[m].ba_PredefinedPackage__c==id && qrcp[m].ba_ClassID__c==clsid[index1]){
                qrcp.splice(m,1);
            }
            component.set('v.QRCP',qrcp);
            console.log('qrc'+ JSON.stringify(component.get('v.QRCP') ));           
       //   component.set('v.QRCP['+m+']',{'Name':dt.rows[m].Name,'ba_ClassID__c':cl,	'ba_PredefinedPackage__c':component.get('v.selectedId['+indx+']['+m+']')} )
       // console.log('qrp'+ JSON.stringify(component.get('v.QRCP['+m+']')));
        }
        
}

    
    
    
})