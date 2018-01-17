public with sharing class CompetitorDAOClass {

    @AuraEnabled
    public static List<BA_Group_Competitor__c> getGroupCompetitors(String parentGroupId) {
        // Add Check to make sure all fields are accessible to this user
        return [SELECT Id, ba_CompetitorName__c, ba_ContractsEnrolled__c, ba_Created__c, ba_Group__c, 	Notes__c
                FROM BA_Group_Competitor__c WHERE ba_Group__c=: parentGroupId];
    }
    
    @AuraEnabled
    public static BA_Group_Competitor__c saveCompetitor(BA_Group_Competitor__c competitor) {
        // Perform isUpdatable() checking first, then
        
        // Set Custom 'System Fields' 
        competitor.put('ba_Created__c',system.now());
        
        upsert competitor;
        return competitor;
    }
    
     @AuraEnabled
    public static BA_Group_Competitor__c deleteCompetitor(BA_Group_Competitor__c competitor) {
        // Perform isUpdatable() checking first, then
        delete competitor;
        
        return competitor;
    }
}