public with sharing class TaskflowAdminDAOClass {
	
	
	@AuraEnabled
	 public static List<BA_Task_Chapter__c> getTaskChapters(String taskName) {
        // Add Check to make sure all fields are accessible to this user
        return [SELECT Id, ba_Sequence_Number__c, Name, ba_Chapter_Name__c, ba_Display_Name__c, ba_Chapter_Component_Name__c
                FROM BA_Task_Chapter__c WHERE ba_Task_Flow__r.ba_Task_Name__c =: taskName ORDER BY ba_Sequence_Number__c];
    }
    
    @AuraEnabled
	 public static Account getGroupInformation(String GroupId) {
        // Add Check to make sure all fields are accessible to this user
        return [SELECT Id, Name, ba_Email_Address__c, ba_RatingCounty__c, TIN_EIN__c, ba_GroupStatus__c from Account where id=:GroupId];
    }
    
    
    
    @AuraEnabled
    public static MemberSearchController.Memberdetails fetchmember(String memberId) {
    	MemberSearchController.Memberdetails member=new MemberSearchController.Memberdetails();
     try{
  // Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Member').getRecordTypeId();
  Contact con=new Contact();
   con=[Select id,name,ba_ParentMember__c,ba_ExchangeMemberID__c,ba_RatingCounty__c,Phone,Birthdate, RecordTypeId, RecordType.Name from Contact
   						 where id=:memberId LIMIT 1
   						        ];
   						        system.debug('RecordTYpe'+con.RecordType.Name);
   	if(con.RecordType.Name=='Member'){
   		
   	
         member.MemberId=con.ba_ExchangeMemberID__c;
 		 member.MemberName=con.name;
         member.Phone=con.Phone;
         member.Birthdate=con.Birthdate;
         
   BA_Address__c addr=new BA_Address__c();
    addr=[Select id,ba_Zipcode__r.ba_Zipcode__c, ba_AddressLine_1__c, ba_AddressLine2__c, ba_City__c, ba_State__c from BA_Address__c 
                                where ba_AddressType__c='Principal'
                                 AND ba_Zipcode__c=:con.ba_RatingCounty__c];
 
 		system.debug('Contact'+addr.ba_Zipcode__r.ba_Zipcode__c);	
 		
 		
 		if(addr!=null){
 		member.Address1=addr.ba_AddressLine_1__c;
 		member.Address2=addr.ba_AddressLine2__c;
 		member.City=addr.ba_City__c;
 		member.State=addr.ba_State__c;
 		member.ZipCode=addr.ba_Zipcode__r.ba_Zipcode__c;
 		}
 		system.debug('Contact'+member);
        return member;
     }
     else if(con.RecordType.Name=='Authorized Contact'){
     	contact auth=[Select id,name,ba_ExchangeMemberID__c,ba_RatingCounty__c,Phone,Birthdate, RecordTypeId, RecordType.Name from Contact
   						 where id=:con.ba_ParentMember__c];
   		system.debug('Authorized Contact'+auth);
   		member.MemberId=auth.ba_ExchangeMemberID__c;
 		 member.MemberName=auth.name;
         member.Phone=auth.Phone;
         member.Birthdate=auth.Birthdate;
         
   
    BA_Address__c addr=[Select id,ba_Zipcode__r.ba_Zipcode__c, ba_AddressLine_1__c, ba_AddressLine2__c, ba_City__c, ba_State__c from BA_Address__c 
                                where ba_AddressType__c='Principal'
                                 AND ba_Zipcode__c=:auth.ba_RatingCounty__c ];
 
 		system.debug('Contact'+addr.ba_Zipcode__r.ba_Zipcode__c);	
 		
 		
 		
 		member.Address1=addr.ba_AddressLine_1__c;
 		member.Address2=addr.ba_AddressLine2__c;
 		member.City=addr.ba_City__c;
 		member.State=addr.ba_State__c;
 		member.ZipCode=addr.ba_Zipcode__r.ba_Zipcode__c;
 		system.debug('Authorized Contact Member'+member);
        return member;
   		
     	

}
     
    
     }
     catch(QueryException e){
         
     }
       return member; 
    }
     
    
     
    
}