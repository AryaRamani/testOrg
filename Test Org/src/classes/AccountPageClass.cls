public with sharing class AccountPageClass {
    @AuraEnabled
 public static list<Account> fetchAccountDetails(){
     
     List<Account> details=[Select Name, Site from Account
 						];
     
 	return details;
        
 }

}