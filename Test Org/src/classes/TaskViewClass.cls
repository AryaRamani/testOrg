public class TaskViewClass {
@AuraEnabled
     public static List<BA_Task_Flow__c> getTaskFlows(String Entity) {
        // Add Check to make sure all fields are accessible to this user
       
      return [SELECT Id,ba_Display_Name__c,CreatedDate,ba_Task_Name__c FROM BA_Task_Flow__c  where ba_Entity_Name__c =:Entity ORDER BY ba_Display_Name__c ];
      
    }
    
    @AuraEnabled
     public static List<Pause_Task__c> getRSMFlows(String Entity) {
         
        String usr = UserInfo.getUserId();
        // Add Check to make sure all fields are accessible to this user
        return [SELECT Name,CreatedById,Task_Chapter__r.ba_Task_Flow__r.ba_Chapter_Name__c,Task_Chapter__r.ba_Sequence_Number__c,Task_Chapter__r.ba_Task_Flow__r.ba_Task_Name__c,Ba_Parent_Id__c FROM Pause_Task__c where createdby.Id=:usr ORDER BY Name ];
    }
}