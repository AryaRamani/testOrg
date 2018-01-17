public with sharing class TaskflowAdminDAO {
	
	@AuraEnabled
	 public static List<BA_Task_Chapter__c> getTaskChapters(String taskName) {
        // Add Check to make sure all fields are accessible to this user
        return [SELECT Id, ba_Sequence_Number__c, Name, ba_Chapter_Name__c, ba_Display_Name__c, ba_Chapter_Component_Name__c
                FROM BA_Task_Chapter__c WHERE ba_Task_Flow__c =: [SELECT Id FROM BA_Task_Flow__c WHERE ba_Task_Name__c =: taskName]];
    }
    
}