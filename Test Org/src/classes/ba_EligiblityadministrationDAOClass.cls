public virtual class ba_EligiblityadministrationDAOClass {
        @AuraEnabled
    public static List<BA_Eligiblity_Administration__c> getEligiblityAdministrationQuestions() {
        // Add Check to make sure all fields are accessible to this user
        return [SELECT Id, Name, ba_Eligiblity_Question__c, Data_Type__c, Field_Name__c, ba_Field_Values__c, ba_Calculated__c, ba_Picklist__c, ba_Default_Value__c
                FROM BA_Eligiblity_Administration__c ORDER BY ba_Field_Sequence__c];
    }
    
    @AuraEnabled
    public static BA_Eligiblity_Administration__c setEligiblityAdministration(BA_Eligiblity_Administration__c eligibilityAdministration) {
        // Perform isUpdatable() checking first, then
        
        // Set Custom 'System Fields' 
        
        
        upsert eligibilityAdministration;
        return eligibilityAdministration;
    }
    
     @AuraEnabled
    public static BA_Eligiblity_Administration__c deleteEligiblityAdministration(BA_Eligiblity_Administration__c eligibilityAdministration) {
        // Perform isUpdatable() checking first, then
        delete eligibilityAdministration;        
        return eligibilityAdministration;
    }
}