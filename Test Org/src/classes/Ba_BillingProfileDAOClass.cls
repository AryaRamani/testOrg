public class Ba_BillingProfileDAOClass {

    @AuraEnabled   
    public static Ba_Address__c GetAddr(String GrpId){
      return[SELECT q.ba_AddressLine_1__c,ba_AddressLine2__c,ba_City__c FROM BA_Address__c q where q.id in (select s.Address__c From BA_Account_Addr_Intersection__c s where s.Account__c = :GrpId
      																										AND Primary__c=true)];
             
    }
}