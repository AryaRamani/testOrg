public with sharing class Ba_GroupSummaryClass {
    
    
    @AuraEnabled
	public static Account getGroupInformation(String GroupId) {
		// Add Check to make sure all fields are accessible to this user
	return [SELECT Id, Name, AccountNumber,ba_LegalEntityName__c,ba_EffectiveDate__c,Ownership,Sic, ba_Email_Address__c, ba_RatingCounty__c,ba_RatingCounty__r.Name, TIN_EIN__c, ba_GroupStatus__c,ba_RatingZipcode__c,
			 ba_RatingCity__c
			 from Account where id =: GroupId];

	}
	
	   @AuraEnabled
	public static BA_Address__c  getGroupAddress(String GroupId) {
		// Add Check to make sure all fields are accessible to this user
	   Ba_Account_Addr_Intersection__c intersect=[Select id,Address__c 
	   												from Ba_Account_Addr_Intersection__c 
	   												where Account__c=:GroupId
	   												AND Primary__c=true
	   												LIMIT 1];	
	   												
	   BA_Address__c addrlst =[Select id, ba_AddressLine_1__c, ba_AddressLine2__c, ba_AddressLine3__c, ba_City__c, ba_County__c, ba_State__c, ba_Zipcode__c
	   									from BA_Address__c
	   									where id=:intersect.Address__c LIMIT 1];
	   
	   return addrlst;

	}
	
	 @AuraEnabled
	public static list<BA_SicCode__c>  getGroupSIC() {
	list <BA_SicCode__c> SIClist=[Select id, Name, ba_SICCode__c from BA_SicCode__c];
	return SIClist;
	}
	
	 @AuraEnabled
	public static list<BA_Zipcode_Admin__c>  getGroupZip() {
		list<BA_Zipcode_Admin__c> ziplist = [Select id,Name, ba_Zipcode__c, ba_County__c, ba_City__c from BA_Zipcode_Admin__c  ];
		return ziplist;
	}
	
	 @AuraEnabled
	public static void  changedate(String GroupId, String Effdate) {
		Account acc=new Account(id=GroupId);
		acc.ba_EffectiveDate__c=Date.valueof(Effdate);
		update acc;
	}
	
	
	 @AuraEnabled
	public static list<String>  getIndustryInfo() {
		List<String> options = new List<String>();
        
   Schema.DescribeFieldResult fieldResult =
 Account.Industry.getDescribe();
   List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        
   for( Schema.PicklistEntry f : ple)
   {
      options.add(f.getLabel());
   }       
   return options;
	}
	
	
	
}