public with sharing class AddQuoteCensusClass {
	
	 @AuraEnabled
 public static list<Contact> fetchquoteinfo(String GroupId) {
Account acc=[Select Id, Active__c from account where id=:GroupId];
 	if(acc.Active__c=='Yes'){
 	list<BA_EG_Contact_Intersection__c> junction=[Select id, Contact__c from BA_EG_Contact_Intersection__c 
 													where Account__c=:GroupId ];
   list<String> conid=new list<String>();											
   for(BA_EG_Contact_Intersection__c inter:junction){
   	  conid.add(inter.Contact__c);
   }
    list<Contact> con=[Select id, ba_ExchangeMemberID__c, LastName, FirstName, Birthdate, ba_TobaccoUse__c
    					from Contact
    					where id IN:conid 
                      AND ba_MemberType__c='Subscriber'];
    					
 	// Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Member').getRecordTypeId();
 	/* List<Contact> con=[Select id, ba_ExchangeMemberID__c, LastName, FirstName, Birthdate, ba_TobaccoUse__c
 						 from Contact
 						 where RecordTypeId=:recordTypeId]; */
 	return con;
 	}
 	else
 	{
 		return null;
 	}
 }
    
    
   @AuraEnabled
 public static list<Contact> fetchdependents(String GroupId) {
 	list<BA_EG_Contact_Intersection__c> junction=[Select id, Contact__c from BA_EG_Contact_Intersection__c 
 													where Account__c=:GroupId ];
   list<String> conid=new list<String>();											
   for(BA_EG_Contact_Intersection__c inter:junction){
   	  conid.add(inter.Contact__c);
   }
    list<Contact> con=[Select id, ba_ExchangeMemberID__c, LastName, FirstName, Birthdate, ba_Relation__c,ba_TobaccoUse__c
    					from Contact
    					where id IN:conid 
                      AND ba_MemberType__c='Dependent'];
    					
 	// Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Member').getRecordTypeId();
 	/* List<Contact> con=[Select id, ba_ExchangeMemberID__c, LastName, FirstName, Birthdate, ba_TobaccoUse__c
 						 from Contact
 						 where RecordTypeId=:recordTypeId]; */
 	return con;
 }
    
}