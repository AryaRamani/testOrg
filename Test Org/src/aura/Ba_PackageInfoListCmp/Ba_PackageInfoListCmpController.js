({
	doInit : function(component, event, helper) {
		//helper.createObjrow(component);
		
		var opts = [
            { "class": "optionClass", label: "HMO", value: "HMO" },
            { "class": "optionClass", label: "PPO", value: "PPO" },
            { "class": "optionClass", label: "POS", value: "POS" }

        ];
        
        
		var category = [
            { "class": "optionClass", label: "Medical", value: "Medical" },
            { "class": "optionClass", label: "Dental", value: "Dental" },
            { "class": "optionClass", label: "Vision", value: "Vision" },
          
        ];
            
        var hdhp = [
             { "class": "optionClass", label: "Yes", value: "Yes" },
            { "class": "optionClass", label: "No", value: "No" },
        ];
		component.set("v.hdhp",hdhp);
		 var age = [
             { "class": "optionClass", label: "19/23", value: "19/23" },
            { "class": "optionClass", label: "23/28", value: "23/28" },
        ];        
        component.set("v.studentage",age);
            
            var ratelist=[{
            name:'Medical', readonly:false},{name:'Prescription Drug', readonly:false},
            {name:'Incentives', readonly:false},{name:'Medical management',readonly:false},
            {name: 'Total',readonly:true}
            ];
        
        component.set("v.rateslist",ratelist);
        
        component.set("v.planName",opts);
        component.set("v.producttype",opts);
        component.set("v.productline",opts);
        component.set("v.productcategory",category);
        
        
        
		
	},
	
	AddNewRow : function(component, event, helper){
		helper.createObjrow(component);
	
	},
            
            
   /*   AddNewProduct : function(component, event, helper){
        var productlist=[];
        var index=component.get("v.target");
        
        if(index===undefined){
            alert('Please select a competitor');
        }
        else{
            var packageobj=component.get("v.packagelist")[index]; //group competitor
            
        productlist= component.get("v.productlist"); //competitor product list
            if(productlist===undefined){
                productlist =[];
            } 
        var productobj=component.get("v.productObj");
        var ratelist=component.get("v.rateslist")[4];
        productobj.ba_Subscriber__c=ratelist.subscriber;
         productobj.ba_SubscriberSpouse__c=ratelist.spouse;
        productobj.ba_SubscriberChild__c=ratelist.children; 
        productobj.ba_Family__c=ratelist.family;
        productobj.Competitor = packageobj.CarrierName;
       //alert('Product'+JSON.stringify(productobj));
          
        productlist.push(productobj);
            
             // alert('Product list'+JSON.stringify(productlist));
         var related
         var objlist={
                competitor: packageobj ,
                product : productlist
        };
     
        component.set("v.GrpCompetitor",objlist);
       alert('Object'+JSON.stringify(objlist));
        component.set("v.productlist",productlist);
        component.set("v.productObj",{});
        component.set("v.rateslist",[]);
         var ratinglist=[{
            name:'Medical', readonly:false},{name:'Prescription Drug', readonly:false},
            {name:'Incentives', readonly:false},{name:'Medical management',readonly:false},
            {name: 'Total',readonly:true}
            ];
        
        component.set("v.rateslist",ratinglist);
            
        }
     },*/
    
    rowSelection : function(component, event, helper){
    $A.util.removeClass(component.find('product-id'), 'hideContent');
         var target = event.currentTarget.dataset.rowIndex;
        var index = component.get("v.target");
           var wrpclass; 
        if(index!==undefined){
        wrpclass = component.get("v.packagelist")[index];
      //  wrpclass.competitor=component.get("v.packagelist")[index];
        wrpclass.competitorproduct=component.get("v.productObj");
        wrpclass.productrates = component.get("v.rateslist");
          var wrplist=component.get("v.packagelist");
           wrplist[index]=wrpclass;
        component.set("v.packagelist",wrplist);
            alert('Wrapper'+ JSON.stringify(wrplist));
        }
        var wrpobj=component.get("v.packagelist")[target];
        if(wrpobj.productrates==undefined){
            wrpclass=component.get("v.packagelist")[target];
            alert('wrapper'+wrpclass);
              var ratelist=[{
            name:'Medical', readonly:false},{name:'Prescription Drug', readonly:false},
            {name:'Incentives', readonly:false},{name:'Medical management',readonly:false},
            {name: 'Total',readonly:true}
            ];
        
        component.set("v.rateslist",ratelist);
            wrpclass.productrates = component.get("v.rateslist");
        }
        component.set("v.productObj",{});
        
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
        var packagelist = component.get("v.packagelist");
        for(var i=0;i<packagelist.length;i=i+1){
            
            if(i==target){
               
                component.set("v.productObj",packagelist[i].competitorproduct);
                component.set("v.rateslist",packagelist[i].productrates);
            }
            
        }
        
        
           
            
            
        
       // component.set("v.productlist",comp);
        
            
        
        
    },
    
    calculate : function(component, event, helper){
      var ratelist = component.get("v.rateslist");
         var subtotal=0,spousetotal=0,childtotal=0,familytotal=0;
        for(var i=0;i<ratelist.length-1;i=i+1){
          
            if(ratelist[i].subscriber!==undefined){
           subtotal=parseInt(subtotal)+parseInt(ratelist[i].subscriber);
            }
             if(ratelist[i].spouse!==undefined){
           spousetotal=parseInt(spousetotal)+parseInt(ratelist[i].spouse);
             }
             if(ratelist[i].children!==undefined){
           childtotal=parseInt(childtotal)+parseInt(ratelist[i].children);
             }
           if(ratelist[i].family!==undefined){ 
           familytotal= parseInt(familytotal)+parseInt(ratelist[i].family);
           }
        }
       ratelist[ratelist.length-1].subscriber=subtotal;
       ratelist[ratelist.length-1].spouse=spousetotal;
       ratelist[ratelist.length-1].children=childtotal;
       ratelist[ratelist.length-1].family=familytotal;
      component.set("v.rateslist",ratelist);
        
    },
    
    getAttributeMethod : function(component,event){
    var wrpclass;
     var index = component.get("v.target");
     wrpclass = component.get("v.packagelist")[index];
     if(wrpclass!=undefined){
      //  wrpclass.competitor=component.get("v.packagelist")[index];
        wrpclass.competitorproduct=component.get("v.productObj");
        wrpclass.productrates = component.get("v.rateslist");
          var wrplist=component.get("v.packagelist");
           wrplist[index]=wrpclass;
        component.set("v.packagelist",wrplist);
        }
        alert('list'+JSON.stringify(wrplist));
        var packagelist=component.get("v.packagelist");
         var params = event.getParam('arguments');
        
        var validate = true;
         params.packagelist=component.get("v.packagelist");
        
      for(var i=0;i<packagelist.length;i=i+1){
            if(packagelist[i].CarrierName==''){
               validate = false;
               if(packagelist.length===1){
              component.find('text-id').set("v.errors",[{message:"Please input Carrier Name"}]);
              }
              else{
                   component.find('text-id')[i].set("v.errors",[{message:"Please input Carrier Name"}]);
              }
            }
            else{
             if(packagelist.length===1){
              component.find('text-id').set("v.errors",null);
              }
              else{
                   component.find('text-id')[i].set("v.errors",null);
              }
            }
            
        } 
        
        if(validate == true){
            params.navigate=true;
        }
        else{
            params.navigate=false;
        }
        
        alert('params'+JSON.stringify(params));
        return params; 
    }
    
})