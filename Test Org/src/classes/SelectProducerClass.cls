public class SelectProducerClass {
@AuraEnabled
    public static List<Contact> SCntct(String AgncyId){

     return[SELECT q.id,q.FirstName,q.LastName,q.CleanStatus,q.ba_EffectiveDate__c,q.ba_TerminationDate__c  FROM Contact q where q.id in (select s.Contact__c From BA_EG_Contact_Intersection__c s where s.Account__c = :AgncyId)];
    }
}
//where Account= :parentGroupId