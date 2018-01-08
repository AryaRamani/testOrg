public with sharing class LightningController {
    
     @AuraEnabled
     public static List < Account > getAccounts() {
        List<Account> acc=[Select Id,Name from Account];
        return acc;
     }

    
    @AuraEnabled
     public static void insertAccounts(Account acc) {
       insert acc;
       
     }

}