public with sharing class CompetitorProductDAOClass {

    @AuraEnabled
    public static List < BA_Group_Competitor_Product__c > getCompetitorProducts(String parentCompetitorId) {
        // Add Check to make sure all fields are accessible to this user
        return [SELECT Id,  Name,
            ba_ParentCompetitor__c
           
            FROM BA_Group_Competitor_Product__c WHERE ba_ParentCompetitor__c =: parentCompetitorId
        ];
    }
        
         @AuraEnabled
    public static BA_Group_Competitor_Product__c saveCompetitorProduct(BA_Group_Competitor_Product__c competitorproduct) {
        // Perform isUpdatable() checking first, then
        
        // Set Custom 'System Fields' 

        
        upsert competitorproduct;
        return competitorproduct;
    }
    
     @AuraEnabled
    public static BA_Group_Competitor_Product__c deleteCompetitorProduct(BA_Group_Competitor_Product__c competitorproduct) {
        // Perform isUpdatable() checking first, then
        delete competitorproduct;
        
        return competitorproduct;
    }
}