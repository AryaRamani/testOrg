public class Ba_GroupClassPackageClass {
    
    
    @AuraEnabled
    public static list<BA_Classes__c> getClassinfo(String groupId){
        
        list<BA_Classes__c> classlist=[Select Id, ba_ClassDescription__c, Name, ba_EffectiveDate__c	, Enrollable_Class__c, ba_ProbationaryPeriod__c,ba_ClassStatus__c
                                      from BA_Classes__c where ba_Group__c =: groupId  ];
        return classlist;
        
        
    }

}