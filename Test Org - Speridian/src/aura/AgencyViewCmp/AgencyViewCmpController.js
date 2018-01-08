({
   doInit: function(component, event, helper) {
      // this function call on the component load first time     
      // get the page Number if it's not define, take 1 as default
      var page = component.get("v.page") || 1;
      // get the select option (drop-down) values.   
   //var recordToDisply = component.find("recordSize").get("v.value");
    var recordToDisply = '7';
      // call the helper function   
      
      helper.getAccounts(component, page, recordToDisply);
 
   },
     editAccount: function(component, event, helper) {
        var Account = event.getParam("Account");
        var Accountidx = event.getParam("Accountidx");
        component.set("v.activeRow", Accountidx);
        component.set("v.Account", Account);
        component.set("v.modalIsOpen", true);
        helper.selectRow(component, Accountidx);
    },
 
   previousPage: function(component, event, helper) {
      // this function call on click on the previous page button  
      var page = component.get("v.page") || 1;
      // get the previous button label  
      var direction = event.getSource().get("v.label");
      // get the select option (drop-down) values.  
      //var recordToDisply = component.find("recordSize").get("v.value");
     var recordToDisply = '7';
      // set the current page,(using ternary operator.)  
      page = direction === "Previous Page" ? (page - 1) : (page + 1);
      // call the helper function
      helper.getAccounts(component, page, recordToDisply);
 
   },
 
   nextPage: function(component, event, helper) {
      // this function call on click on the next page button   
      var page = component.get("v.page") || 1;
      // get the next button label 
      var direction = event.getSource().get("v.label");
      // get the select option (drop-down) values.   
    // var recordToDisply = component.find("recordSize").get("v.value");
    var recordToDisply = '7';
      // set the current page,(using ternary operator.)  "(page + 1)"
      page = direction === "Previous Page" ? (page - 1) : (page + 1);
      // call the helper function
      helper.getAccounts(component, page, recordToDisply);
   },
 
   /*onSelectChange: function(component, event, helper) {
      // this function call on the select opetion change,	 
      var page = 1
     var recordToDisply = component.find("recordSize").get("v.value");
    // var recordToDisply = 7;
      helper.getAccounts(component, page, recordToDisply);
   },*/
    hideSICPopup: function(component, event, help){
        $A.util.addClass(component.find('popUpSICId'), 'hideContent');
        $A.util.addClass(component.find('popUpBackgroundSICId'), 'hideContent');

  
    },
    clickbox: function(component, event, help)
    {
  var index = event.getSource().get("v.text");
       event.getSource().get("v.value");
        // component.set("v.index", index);
       // console.log(index)
        
     // var index = component.get("v.index");
        if(event.getSource().get("v.value")==true){
      var Accountdata = component.get("v.Accounts");
       Accountdata[index].selected = true;
       //component.set("v.Accounts", Accountdata);
    var selectedvalue = component.get("v.AccountsNew");
            
   var selectedcode= [];
            if(selectedvalue!=undefined){
               
            for(var i=0;i<selectedvalue.length;i++){
                
                    if(selectedvalue[i]!=undefined){
      selectedcode.push(selectedvalue[i]);
                    }
                }
            }
       selectedcode.push(Accountdata[index]);
       component.set("v.AccountsNew", selectedcode);
  /*   var selectedvalue = component.get("v.CntctId");
            var selectedcode = [];
            selectedcode.push(selectedvalue);
      selectedcode.push(Accountdata[index].Id)
     component.set("v.CntctId", selectedcode);*/
            
        }
        else{
           var Accountdata = component.get("v.Accounts");
          var selectedvalue = component.get("v.AccountsNew"); 
            var indexnew = selectedvalue.indexOf(Accountdata[index])
            console.log(indexnew)
            
    selectedvalue.splice(indexnew, 1);
               
     component.set("v.AccountsNew", selectedvalue);    
            
          /*  var selectedvalue = component.get("v.CntctId");
            var selectedcode = [];
            var indexnew = selectedvalue.indexOf(Accountdata[index])
            selectedvalue.splice(indexnew, 1);
      
     component.set("v.CntctId", selectedvalue);*/
              
            
        }
      /*  var Accountdata = component.get("v.Accounts");
        Accountdata[index].selected = true;
        component.set("v.AccountsNew", Accountdata);*/
      // var k = event.currentTarget.id
     /* var chkd= event.currentTarget.checked;
        if(chkd== true){
      console.log(Number(k));
      
        var AccountNew = component.get("v.Accounts[0]");
          
            
            
            
        
       // component.set("v.AcctTm",{TeamMemberRole: "SalesRep",UserId: component.get("v.SlsRep[1].Id")});
       // var acct = component.get("v.AcctTm");
        var setEvent1 = $A.get("e.c:SelectAccountEvent");
            setEvent1.setParams({'AccountAttr':component.get("v.AccountsNew")});
       setEvent1.fire();
        var test1 = setEvent1.getParam("AccountAttr")
        console.log(test1.FirstName)
        
       
        }
        else{
           // var acct = component.get("v.AcctTm");
         var setEvent1 = $A.get("e.c:SelectAccountEvent");
        setEvent1.setParams({'AccountAttr':""});
       setEvent1.fire();
        var test1 = setEvent1.getParam("AccountAttr")
        
            
        }
        //console.log(test1);
     //   this.getElementbyClass("uiInputCheckbox");

    }*/
   },
 SaveRcd : function(component, event, helper){
    /* var index = component.get("v.index");
        var Accountdata = component.get("v.Accounts");
        Accountdata[index].selected = true;
       component.set("v.Accounts", Accountdata);
     var selectedcode = [];
        selectedcode.push(Accountdata[index]);
      console.log('SIC value'+JSON.stringify(selectedcode));*/
      var setEvent1 = $A.get("e.c:SelectAccountEvent");
     var CnId = component.get("v.AccountsNew");
     //setEvent1.setParams({'AccountAttr': component.get("v.CntctId")});
     setEvent1.setParams({'AccountAttr': component.get("v.AccountsNew")});
       setEvent1.fire();
        var test1 = setEvent1.getParam("AccountAttr")
        component.set("v.AccountsNew","");
     
    var page = component.get("v.page") || 1;
      // get the select option (drop-down) values.   
   //var recordToDisply = component.find("recordSize").get("v.value");
    var recordToDisply = '7';
      // call the helper function   
      
      helper.getAccounts(component, page, recordToDisply);
        console.log('SIC value'+JSON.stringify(CnId[0]));
       /*  $A.util.addClass(component.find('popUpSICId'), 'slds-hide');
        $A.util.addClass(component.find('popUpBackgroundSICId'), 'slds-hide');*/
      // $A.util.addClass(component.find('popUpSICId'), 'hideContent');
      //  $A.util.addClass(component.find('popUpBackgroundSICId'), 'hideContent');
},
    SrchRecord : function(component, event, helper)
    {
    var Name1 = component.find("Name1").get("v.value");
    var Value1 = component.find("Value1").get("v.value");
    console.log(Name1);
    var Result = Name1.localeCompare("--select--");
        console.log(Result);
        if(Result==0){
            
        var page = component.get("v.page") || 1;
      // get the select option (drop-down) values.   
   //var recordToDisply = component.find("recordSize").get("v.value");
    var recordToDisply = '7';
      // call the helper function   
      
      helper.getAccounts(component, page, recordToDisply);
           
            
        }
        else{
            
        
      var action2 = component.get("c.QueryCntct");
      // set the parameters to method 
      action2.setParams({
         "Name1": Name1,
         "Value1": Value1,
          "Tpe" : 'Agency'
      });
       console.log(JSON.stringify((action2.getParams())));
      // set a call back   
      action2.setCallback(this, function(a) {
         // store the response return value (wrapper class insatance)  
         
        console.log(a.getReturnValue());
         // set the component attributes value with wrapper class properties.   
 
         component.set("v.Accounts",a.getReturnValue());
          //component.set("v.Con",result.Accounts)
         component.set("v.page", "1");
         component.set("v.total", "");
         component.set("v.pages", "1");
         /* for(var i=0;i<7;i++){
         component.set("v.IdNum",i);
          }*/
         // component.set("v.IdNum",{0,1,2,3,4,5,6})
      });
      // enqueue the action 
      $A.enqueueAction(action2);  
        }
        
    },
    AddAccount : function(component, event, helper)
    {
       component.set("v.modalIsOpen",true)
    },
    closeModel : function(component, event, helper)
    {
        component.set("v.modalIsOpen",false)
    },
    setAttributeValue : function(component, event, helper){
        var eventValue= event.getParam("ClsAttr");
         component.set("v.modalIsOpen",eventValue)
    },
    HideCmp : function(component, event, helper)
    {
        var setEvent1 = $A.get("e.c:SelectAccountEvent");
     var CnId = component.get("v.AccountsNew");
        setEvent1.setParams({'AccountAttr': ""});
       setEvent1.fire();
        component.set("v.AccountsNew","");
     
    var page = component.get("v.page") || 1;
    
    var recordToDisply = '7';
        
      
      helper.getAccounts(component, page, recordToDisply);
    },
    AccountMenuSelect : function(component, event, helper) {
		var selectedMenuAction = event.getParam("value").split("_");
		var action = selectedMenuAction[0];
		var rowIdx = selectedMenuAction[1];
		var Accounts = component.get("v.Accounts");
		var Account = Accounts[rowIdx];
        console.log("test"+ JSON.stringify(Account));
		component.set("v.activeRow", rowIdx);
		if (action == "EditAccount") {
           //   var Account = event.getParam("Account");
       // var Accountidx = event.getParam("Accountidx");
       // component.set("v.activeRow", Accountidx);
       component.set("v.Account", Account);
            component.set("v.groupId", "");
      
        component.set("v.modalIsOpen", true);
            component.set("v.groupId", 'Update');
       // helper.selectRow(component, Accountidx);
			var editAccount = component.getEvent("editAccount");
			editAccount.setParams({
				"Account" : Account,
				"Accountidx": rowIdx
			});
			editAccount.fire();
		} else if (action == "DeleteAccount") {
            if(confirm('Are you sure you want to continue?')){
                
                
                 var Id1 = component.get("v.Accounts[rowIdx]");
            //console.log("Done"+JSON.stringify(Account));
			
              console.log(Account.Id);
                var action3 = component.get("c.DltGrp");
                console.log("params");
      // set the parameters to method 
           action3.setParams({
				"Accn" : Account
				
			});
                action3.setCallback(this, function(b) {
        if (b.getState() === "SUCCESS") {
           //component.set("v.Account", b.getReturnValue());
           console.log("done");
            console.log(b.getReturnValue());
            console.log("done")
            Accounts.splice(rowIdx, 1);
			component.set("v.Accounts", Accounts);
        } 
                    else{
          alert("Cannot delete the Account")
                    }
         
         });
                $A.enqueueAction(action3);  
                
            }
            else{
               //Do Nothing 
            }
           
		} else {
			// Do Nothing
		}
	},
    EditEvent : function(component, event , helper)
    {
        
        var Id = component.get("v.activeRow");
       var Ac = event.getParam("myAccount");
         var Action = event.getParam("Action");
        if(Action=='Insert'){
            var ACC = component.get("v.Accounts");
            ACC.push(Ac);
            component.set("v.Accounts",ACC);
            var page = component.get("v.page") || 1;
      // get the next button label 
      //var direction = event.getSource().get("v.label");
            var recordToDisply='7';
            helper.getAccounts(component, page, recordToDisply);
            //console.log(JSON.stringify(ACC))
       //  Cnts.push(eventValue[i])   
        }else{
      component.set("v.Accounts[Id]",Ac);
        }
      // console.log("v.Accounts[Id]");
      component.set("v.modalIsOpen",false);
      
      },
    AddAgency : function(component, event, helper)
    {
         var Ac =component.get("v.NullAccount");
         console.log(Ac);
         component.set("v.Account",component.get("v.NullAccount"));
       
         component.set("v.modalIsOpen", true);
         component.set("v.groupId", 'Insert');
       
        
    },
     handleRowSelect : function(component, event, helper)
    {
         
        var GrpId = event.currentTarget.id;
        console.log(GrpId)
        var setEvent1 = $A.get("e.c:EmployerGroupViewEvnt");
        setEvent1.setParams({'GroupId':GrpId});
       setEvent1.fire();

    }
    
    
    

   
 
})