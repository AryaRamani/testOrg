public with sharing class Ba_SubGroupClasslstClass {
    
    
    @AuraEnabled
    public static void getbenefitpackage(Id classId){
        list<Id> Idlst=new list<Id>();
       /* list<BA_Class_Package__c> packagelst = [Select ba_BenefitPackageID__c from BA_Class_Package__c 
                                        where ba_ClassID__c=:classId];
                                        
        for(BA_Class_Package__c pack: packagelst){
            Idlst.add(pack.ba_BenefitPackageID__c);
        }
        
        list<BA_Asset__c> benefitlst = [Select id,ba_QuoteLineID__c,ba_RatingRegion__c,Name, ba_BenefitPackage__c, ba_Status__c,    ba_RateEffectiveDate__c, ba_RateTerminationDate__c
                                        from BA_Asset__c where id IN:Idlst ];
        SubGroupWrpClass wrp=new SubGroupWrpClass();
        wrp.benefitpackagelst=benefitlst;
        return wrp;*/
        
    }
    
    
    
    
    
    public with sharing class SubGroupWrpClass {
         
    @AuraEnabled
        public list < BA_Asset__c > benefitpackagelst; 
    }
}