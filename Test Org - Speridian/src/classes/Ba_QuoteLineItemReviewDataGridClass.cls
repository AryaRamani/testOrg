public class Ba_QuoteLineItemReviewDataGridClass {
 @Auraenabled
    public static string getQLI(String[] QLIId){
    		//Query the object of choice
    		List<QuoteLineItem> Qt = [select Id,Product2.Name, ServiceDate,Predefined_Packages__r.ba_ProductLine__c,LineNumber,QuoteId,Quote.Ba_RatingRegion__c,ba_Status__c From QuoteLineItem where Id in :QLIId];
		system.debug(Qt);
		String jsonLst = JSON.serialize(Qt, true);
		// This part needs the object Name and the list of api name of the fields (case sensitive). This is needed explicitly, because
		// in the query above, if fields do not have a value in them, the result records will not have the field token at all.
		String objNm = 'QuoteLineItem';
		List<String> fList = new List<String>();
        flist.add('Id');
        flist.add('QuoteId');
        flist.add('ba_Status__c');
        flist.add('LineNumber');
       // flist.add('Predefined_Packages__r.ba_ProductLine__c');
		//fList.add('Product2.Name');
		flist.add('ServiceDate');
        
        
        
           
		//sf2jsonUtil.getHeaders(objNm, fList);
		//sf2jsonUtil.getRows(jsonLst,fList);
		//passing all this to the utility
		return sf2jsonUtil.getJson(jsonLst,fList,objNm);
    }
    
    
      @Auraenabled
    public static string getQCensus(String QLIId){
    		//Query the object of choice
    		List<Ba_Quote_Line_Census__c> Qt = [select id,ba_Age__c,ba_MemberDOB__c,ba_Relation__c,ba_FamilyRate__c,Rate__c, ba_Tobbacco_Usage__c, ba_EmployeeNumber__c from Ba_Quote_Line_Census__c where Quote_Line__c= :QLIId];
		system.debug(Qt);
		String jsonLst = JSON.serialize(Qt, true);
		// This part needs the object Name and the list of api name of the fields (case sensitive). This is needed explicitly, because
		// in the query above, if fields do not have a value in them, the result records will not have the field token at all.
		String objNm = 'Ba_Quote_Line_Census__c';
		List<String> fList = new List<String>();
        flist.add('ba_EmployeeNumber__c');
        flist.add('ba_Relation__c');
        flist.add('ba_MemberDOB__c');
        flist.add('ba_Age__c');
		flist.add('ba_FamilyRate__c');
		fList.add('ba_Tobbacco_Usage__c');
        fList.add('Rate__c');
	
     
     
		//sf2jsonUtil.getHeaders(objNm, fList);
		//sf2jsonUtil.getRows(jsonLst,fList);
		//passing all this to the utility
		return sf2jsonUtil.getJson(jsonLst,fList,objNm);
    }
}