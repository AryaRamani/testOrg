public class MemberSearchController {
    
    @AuraEnabled
 public static Memberdetails fetchmemberdetails(String memberId) {
     Memberdetails member=new Memberdetails();
     try{
   Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Member').getRecordTypeId();
   Contact con=[Select id,name,ba_RatingCounty__c,Phone,Birthdate from Contact
   						 where ba_ExchangeMemberID__c=:memberId
   						       AND RecordTypeId=:recordTypeId ];
         member.MemberId=memberId;
 		 member.MemberName=con.name;
         member.Phone=con.Phone;
         member.Birthdate=con.Birthdate;
         
   
    BA_Address__c addr=[Select id,ba_Zipcode__r.ba_Zipcode__c, ba_AddressLine_1__c, ba_AddressLine2__c, ba_City__c, ba_State__c from BA_Address__c 
                                where ba_AddressType__c='Principal'
                                 AND ba_Zipcode__c=:con.ba_RatingCounty__c LIMIT 1];
 
 		system.debug('Contact'+addr.ba_Zipcode__r.ba_Zipcode__c);	
 		
 		
 		
 		member.Address1=addr.ba_AddressLine_1__c;
 		member.Address2=addr.ba_AddressLine2__c;
 		member.City=addr.ba_City__c;
 		member.State=addr.ba_State__c;
 		member.ZipCode=addr.ba_Zipcode__r.ba_Zipcode__c;
 		system.debug('Contact'+member);
        return member;
     }
     catch(QueryException e){
         
     }
       return null; 
 
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
     
      @AuraEnabled 
    public Date BirthDate;
    
    
    
    public Memberdetails() {
       
  }
 
 	
 	
 } 


}