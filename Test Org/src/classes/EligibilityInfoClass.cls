public with sharing  class EligibilityInfoClass {
	
	@AuraEnabled
 public static List < EligibilityInfoClass.EligibilityInfoWrpClass > fetchquestions() {
 	list<EligibilityInfoWrpClass> eligiblelist=new list<EligibilityInfoWrpClass>();
 	
 	list<BA_Eligiblity_Administration__c> eligibilitylist=[Select ba_Eligiblity_Question__c from BA_Eligiblity_Administration__c ];
 	for(BA_Eligiblity_Administration__c admin:eligibilitylist ){
 		EligibilityInfoClass.EligibilityInfoWrpClass info=new EligibilityInfoWrpClass();
 		info.question=admin.ba_Eligiblity_Question__c;
 		eligiblelist.add(info);
 	}
 	return eligiblelist;
 	
 }
    
   
 
 /*Wrapper class for eligibility information*/
 
 public with sharing class EligibilityInfoWrpClass {
 	@AuraEnabled 
    public String infodata;
    
    @AuraEnabled 
    public string question;
    
    public EligibilityInfoWrpClass() {
       
  }
 
 	
 	
 } 

}