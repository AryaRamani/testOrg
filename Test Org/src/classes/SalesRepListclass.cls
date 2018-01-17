public class SalesRepListclass {
      @AuraEnabled
    public static List<User> AcctTm(){
        
        //insert Mmbr;
     // return [SELECT TeamMemberRole,UserId,User.FirstName,User.LastName,User.IsActive From AccountTeamMember];
      //return [Select First_Name__c,Last_Name__c From BA_Member__c];
      return [SELECT Id,FirstName,LastName,IsActive From User];
    }
     @AuraEnabled
    public static List<BA_Assignment_Skillset__c> QueryAccnt(String Idval){
        ID Id1 = String.valueOf(Idval);
        //insert Mmbr;
     // return [SELECT TeamMemberRole,UserId,User.FirstName,User.LastName,User.IsActive From AccountTeamMember];
      //return [Select First_Name__c,Last_Name__c From BA_Member__c];
      return [SELECT Id,Line_of_Business__c,Service_Region__c,Effective_Date__c,Group_Size__c From BA_Assignment_Skillset__c where UserId__c = :Id1];
    }
    @AuraEnabled
    public static String CrtSalsRp(String UsrId, String GrpId){
       AccountTeamMember Mmbr = new AccountTeamMember(TeamMemberRole='SalesRep',UserId=UsrId,AccountId=GrpId);
      insert Mmbr;
     // return [SELECT TeamMemberRole,UserId,User.FirstName,User.LastName,User.IsActive From AccountTeamMember];
      //return [Select First_Name__c,Last_Name__c From BA_Member__c];
     // return [SELECT TeamMemberRole,UserId,User.FirstName,User.LastName,User.IsActive From AccountTeamMember where TeamMemberRole='SalesRep'];
    return GrpId;
    }

}