public class MemberDAOClass {
	
	@AuraEnabled
 public static void createtask(String memberId) {
    
     
   Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Member').getRecordTypeId();
   Contact con=[Select id,name,ba_RatingCounty__c,Phone,Birthdate from Contact
   						 where ba_ExchangeMemberID__c=:memberId];
   			Task t=new Task();			 
   		t.WhoId = con.id;
   		t.status='completed';
   		t.Subject='Member Verification';
   		t.Description='Member is Verified and Task is created';
   		t.ActivityDate=system.today();
   		t.OwnerId=UserInfo.getUserId();
   		insert t;
   						 
 }
    
 }