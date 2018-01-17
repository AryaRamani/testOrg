public class TaskFlowClass {

    
    @AuraEnabled
     public static List<BA_Task_Chapter__c> getTaskChapters(String taskName, String taskflow) {
        // Add Check to make sure all fields are accessible to this user
             
        
        return [SELECT Id, ba_Sequence_Number__c, Name, ba_Chapter_Name__c, ba_Display_Name__c, ba_Chapter_Component_Name__c
                FROM BA_Task_Chapter__c WHERE ba_Task_Flow__r.ba_Task_Name__c =: taskName ORDER BY ba_Sequence_Number__c];
         
    }
    
    @AuraEnabled
     public static Pause_Task__c getTaskSequence(String taskName, String taskflow) {
        // Add Check to make sure all fields are accessible to this user
             
         list<BA_Task_Chapter__c> chapterlist= [SELECT Id, ba_Sequence_Number__c, Name, ba_Chapter_Name__c, ba_Display_Name__c, ba_Chapter_Component_Name__c
                                                FROM BA_Task_Chapter__c 
                                                WHERE ba_Task_Flow__r.ba_Task_Name__c =: taskName ORDER BY ba_Sequence_Number__c
                                               ];
         list<BA_Task_Chapter__c> tasklist=new list<BA_Task_Chapter__c>();
         if(taskflow!=''){
          Pause_Task__c pause= [Select Chapter_Component__c,Sequence_number__c,Stored_Value__c from Pause_Task__c
                              where id=:taskflow];
    /* BA_Task_Chapter__c chapter=[Select Id, ba_Sequence_Number__c, Name from
                                   BA_Task_Chapter__c where
                                   ba_Chapter_Component_Name__c=:pause.Chapter_Component__c]; */
            return pause;
             
         }
         else{
       return null;
         }
    }
    
    
     @AuraEnabled
     public static void saveFlowdetails(String taskflow, String chapter,Decimal sequence,String objval ) {
      /*   system.debug([Select id,ba_Task_Name__c from BA_
      ]);
         system.debug('Flow'+taskflow);
      Pause_Task__c pause=new Pause_Task__c();
      String component = (String) System.JSON.deserialize(chapter, String.class);
     
      system.debug('Component Name'+component);
      String flowname = (String) System.JSON.deserialize(taskflow, String.class);
       BA_Task_Flow__c flow=  [Select id, ba_Task_Name__c from BA_Task_Flow__c where ba_Task_Name__c=:flowname];
         pause.Task_Flow__c=flow.id;
         pause.Chapter_Component__c=component;
         pause.Stored_Value__c= objval;
         pause.Sequence_number__c=sequence;
         insert pause; */
    }
    
}