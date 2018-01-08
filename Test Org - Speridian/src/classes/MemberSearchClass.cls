public  with sharing class MemberSearchClass {
   @AuraEnabled
    public static contact fetchcontact( String memberId) {
    
      Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Member').getRecordTypeId();  
      contact con= [SELECT id, name FROM Contact 
      								where ba_ExchangeMemberID__c=:memberId
      								 AND RecordTypeId=:recordTypeId ];
       
       return con;
    }


}