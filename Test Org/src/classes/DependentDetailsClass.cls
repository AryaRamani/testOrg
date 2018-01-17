public  with sharing class  DependentDetailsClass {
    
    
     @AuraEnabled
 public static list<Contact> fetchDependentDetails() {
     
 	 id recordType = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Dependent').getRecordTypeId();
     
 	List<Contact> details=[Select LastName, FirstName,ba_Relation1__c, Birthdate ,ba_TobaccoUse__c from Contact
 						 where RecordTypeId=:recordType];
     
    
 	return details;
 }
    

}