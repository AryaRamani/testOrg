public class QuoteSalesRepListclass {
      @AuraEnabled
    public static List<User> AcctTm(){
      return [SELECT Id,FirstName,LastName,IsActive From User];
    }
     @AuraEnabled
    public static List<BA_Assignment_Skillset__c> QueryAccnt(String Idval){
      //ID Id1 = String.valueOf(Idval);
     // system.debug(Idval);
      return [SELECT Id,Line_of_Business__c,Service_Region__c,Effective_Date__c,Group_Size__c From BA_Assignment_Skillset__c where UserId__c = :Idval];
    }
    @AuraEnabled
    public static List<AccountTeamMember> CrtSalsRp(String UsrId, String GrpId){
          return [SELECT TeamMemberRole,UserId,User.FirstName,User.LastName,User.IsActive,AccountId From AccountTeamMember where AccountId = :GrpId ];
       
    }

}