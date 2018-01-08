public class SelectAgencyclass {
     @AuraEnabled
    public static List<Account> Saccnt(String GrpId)//have to query the id from the selected opportunity & pass as parameter
    {
        return[SELECT b.id,b.AccountNumber,b.Name,b.CleanStatus,b.ba_EffectiveDate__c  FROM Account b where b.id = : GrpId];
        
    }

}