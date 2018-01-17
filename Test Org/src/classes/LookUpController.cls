public with sharing class LookUpController {
	
	
/* To get the Zip code in the lookUp */ 
 @AuraEnabled
 public static List < String > fetchZipCode(String searchcode) {
  String searchKey = searchcode + '%';
  List < String > returnzipcode = new List < String > ();
  List < BA_Zipcode_Admin__c > Zipcodelist = [select id, ba_Zipcode__c from BA_Zipcode_Admin__c where ba_Zipcode__c LIKE: searchKey];
 system.debug('Zip'+Zipcodelist);
  for (BA_Zipcode_Admin__c zip: Zipcodelist) {
     returnzipcode.add(zip.ba_Zipcode__c);
     }
  return returnzipcode;
 }	
 
 
 /* To get the PCP information in the lookUp */ 
 @AuraEnabled
 public static List < String > fetchpcp(String searchcode) {
  String searchKey = searchcode + '%';
  List < String > returnpcpinfo = new List < String > ();
 Id recordTypeId = Schema.SObjectType.Contact.getRecordTypeInfosByName().get('Producer').getRecordTypeId();
  List < Contact > pcplist = [select id, Name from Contact where Name LIKE: searchKey 
  									AND RecordTypeId=:recordTypeId];
 
  for (Contact con: pcplist) {
     returnpcpinfo.add(con.Name);
     }
  return returnpcpinfo;
 }	
 

    
}