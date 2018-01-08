public with sharing class PCPChangeController {
	
	@AuraEnabled
 public static Memberdetails fetchmemberdetails(String memberId) {
   Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Member').getRecordTypeId();
   Contact con=[Select id,name,ba_RatingCounty__c from Contact
   						 where ba_ExchangeMemberID__c=:memberId
   						       AND RecordTypeId=:recordTypeId ];
   
   
    BA_Address__c addr=[Select id,ba_Zipcode__r.ba_Zipcode__c, ba_AddressLine_1__c, ba_AddressLine2__c, ba_City__c, ba_State__c from BA_Address__c 
                                where ba_AddressType__c='Principal'
                                 AND ba_Zipcode__c=:con.ba_RatingCounty__c];
 
 		system.debug('Contact'+con);	
 		
 		Memberdetails member=new Memberdetails();
 		member.MemberId=memberId;
 		member.MemberName=con.name;
 		member.Address1=addr.ba_AddressLine_1__c;
 		member.Address2=addr.ba_AddressLine2__c;
 		member.City=addr.ba_City__c;
 		member.State=addr.ba_State__c;
 		member.ZipCode=addr.ba_Zipcode__r.ba_Zipcode__c;
 		system.debug('Contact'+member);
       return member;
 
 }	
 
 @AuraEnabled
 public static Memberdetails fetchpcpdata(String membername) {
 	
   
   Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Producer').getRecordTypeId();
   
    Contact con=[Select id,name,ba_RatingCounty__c,phone from Contact where name=:membername AND RecordTypeId=:recordTypeId];
   
    BA_Address__c addr=[Select id,ba_Zipcode__r.ba_Zipcode__c, ba_AddressLine_1__c, ba_AddressLine2__c, ba_City__c, ba_State__c from BA_Address__c 
                                where ba_AddressType__c='Principal'
                                 AND ba_Zipcode__c=:con.ba_RatingCounty__c];
 
 		system.debug('Contact'+addr.ba_Zipcode__r.ba_Zipcode__c);	
 		
 		Memberdetails pcp=new Memberdetails();
 		
 		pcp.MemberName=membername;
 		pcp.Address1=addr.ba_AddressLine_1__c;
 		pcp.Address2=addr.ba_AddressLine2__c;
 		pcp.Phone=con.Phone;
 		pcp.City=addr.ba_City__c;
 		pcp.State=addr.ba_State__c;
 		pcp.ZipCode=addr.ba_Zipcode__r.ba_Zipcode__c;
 		system.debug('Contact'+pcp);
       return pcp;
 					

 
 
 }	
 
 
 public with sharing class Memberdetails {
 	@AuraEnabled 
    public String MemberId;
    
    @AuraEnabled 
    public String MemberName;
    
      @AuraEnabled 
    public String Phone;
    
    @AuraEnabled 
    public String Address1;
    
    @AuraEnabled 
    public String Address2;
    
    @AuraEnabled 
    public String City;
    
    @AuraEnabled 
    public String State;
    
    @AuraEnabled 
    public String ZipCode;
    
    
    
    public Memberdetails() {
       
  }
 
 	
 	
 } 

}