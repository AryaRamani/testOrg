({
    doInit: function (component, event, helper) {
   
      /*  var accountInfo = {
            'sobjectType': 'Account',
            'Name': 'Burlington Textiles Corp of America',
            'AccountNumber': 'B65609253',
            'ba_LegalEntityName__c': 'Burlington Textiles Corp of America',
            'ba_GroupStatus__c': 'Prospect',
            'Ownership': 'Private',
            'Sic': 'a0e0P00000CnJu3QAF',
            'ba_RatingZipcode__c': 'a0l0P00001IUgg5QAD',
            'ba_RatingCounty__c': 'Miami-Dade',
            'ba_RatingCity__c': 'Pinecrest'
        }; */       
        var opts = [
            { value: "Public", label: "Public" },
            { value: "Private", label: "Private" },
            { value: "Subsidiary", label: "Subsidiary" },
            { value: "Other", label: "Other" }            
         ];
         var monthlist = [];
        for(var i=1;i<13;i=i+1){
            monthlist.push(i);
        }
		component.set("v.monthlist",monthlist); 
		//alert(monthlist);       
        // component.set("v.options", opts);
         
    }
})