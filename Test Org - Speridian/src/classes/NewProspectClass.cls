public with sharing class NewProspectClass {
	
 
 
/* To get the Zip code in the lookUp */ 
 @AuraEnabled
 public static List < String > fetchZipCode(String searchcode) {
  String searchKey = searchcode + '%';
  
  List < String > returnzipcode = new List < String > ();
  
  list < BA_Zipcode_Admin__c > Zipcodelist=new list<BA_Zipcode_Admin__c>();
  
  if(searchcode==null||searchcode==''){
  	   Zipcodelist = [select id, ba_Zipcode__c from BA_Zipcode_Admin__c];
  	
  }
  else{
  	 Zipcodelist = [select id, ba_Zipcode__c from BA_Zipcode_Admin__c where ba_Zipcode__c LIKE: searchKey];
  	
  }
 system.debug('Zip'+Zipcodelist);
  for (BA_Zipcode_Admin__c zip: Zipcodelist) {
     returnzipcode.add(zip.ba_Zipcode__c);
     }
  return returnzipcode;
 }	
 
 
	 
 
 /* To fetch County and City based on Zip code*/
 @AuraEnabled
 public static BA_Zipcode_Admin__c fetchZipInfo(String codeValue) {
     	
   BA_Zipcode_Admin__c zipinfo=[Select ba_County__c,ba_City__c,ba_Zipcode__c from BA_Zipcode_Admin__c where ba_Zipcode__c=:codeValue];
     system.debug(zipinfo.ba_County__c);
   return zipinfo; 	
 	
 
 }
 
 /*  To fetch SIC details to display in the pop-up as soon as the component is loaded */
 @AuraEnabled
 public static list<NewProspectClass.SICDetailsWrpClass> fetchSICdetails() {
 	
 	list<NewProspectClass.SICDetailsWrpClass> sicwrplst=new list<NewProspectClass.SICDetailsWrpClass>();
 	
 	list <BA_SicCode__c> siclst=[Select ba_SICCode__c from BA_SicCode__c];
 	
 	for(BA_SicCode__c code:siclst){
 		SICDetailsWrpClass sicwrp=new SICDetailsWrpClass();
 		sicwrp.sicCode=code.ba_SICCode__c;
 		sicwrp.selected=false;
 		sicwrplst.add(sicwrp);
 	}
  
 	return sicwrplst;
 
 }
 
 
 /* to fetch SIC details based on search in pop-up*/
 @AuraEnabled
 public static list<NewProspectClass.SICDetailsWrpClass> fetchsicCodedata(String searchcode) {
 	 String searchKey = searchcode + '%';
 	list<NewProspectClass.SICDetailsWrpClass> sicwrplst=new list<NewProspectClass.SICDetailsWrpClass>();
 	
 	list <BA_SicCode__c> siclst = new list <BA_SicCode__c>();
 	if(searchcode==null||searchcode==''){
 	 siclst=[Select ba_SICCode__c from BA_SicCode__c ];	
 	}
 	else{
 	 siclst=[Select ba_SICCode__c from BA_SicCode__c where BA_SicCode__c LIKE : searchKey ];
 	}
 	
 	for(BA_SicCode__c code:siclst){
 		SICDetailsWrpClass sicwrp=new SICDetailsWrpClass();
 		sicwrp.sicCode=code.ba_SICCode__c;
 		sicwrp.selected=false;
 		sicwrplst.add(sicwrp);
 	}
  
 	return sicwrplst;
 
 }
 
 /*To insert records in Trasient record type*/
  @AuraEnabled
 public static void insertprospectinfo (Account gname, BA_Zipcode_Admin__c zip, String sicval) {
 	Id recordTypeId = Schema.SObjectType.Account.getRecordTypeInfosByName().get('Transient').getRecordTypeId();
 	BA_Zipcode_Admin__c admin=[Select Id from BA_Zipcode_Admin__c where ba_County__c=:zip.ba_County__c];
 	Account acc=new Account();
 	acc.Name=gname.Name;
 	
 	
 	acc.ba_EffectiveDate__c=gname.ba_EffectiveDate__c;
 	acc.ba_GroupStatus__c=gname.ba_GroupStatus__c;
 	acc.ba_RatingZipcode__c=zip.ba_Zipcode__c;
 	acc.ba_RatingCounty__c=zip.ba_County__c;
 	acc.ba_RatingCity__c= zip.ba_City__c;
 	acc.ba_LegalEntityName__c=gname.ba_LegalEntityName__c;
 	acc.phone=gname.Phone;
 	acc.Sic=sicval;
 	acc.RecordTypeId =recordTypeId;
 	insert acc;
 	
 }
 
 /*Wrapper class for SIC details pop-up*/
 
 public with sharing class SICDetailsWrpClass {
 	@AuraEnabled 
    public boolean Selected;
    
    @AuraEnabled 
    public String sicCode;
    
    public SICDetailsWrpClass() {
        this.Selected = false ;
  }
 
 	
 	
 } 


    
}