public class Ba_QuoteLineItemReviewDataGridClass {
 @Auraenabled
    public static string getQLI(String[] QLIId){
    		//Query the object of choice
    		List<QuoteLineItem> Qt = [select Id,Product2.Name,Predefined_Packages__r.Ba_BasePackageName__c,Predefined_Packages__r.Name, ServiceDate,LineNumber,QuoteId,Quote.Ba_RatingRegion__c,ba_Status__c From QuoteLineItem where Id in :QLIId];
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
        
        
        Boolean Isd = true; 
           
        
        List<String> objNmrltd = new List<String>();
        objNmrltd.add('Product2');
       objNmrltd.add('Quote');
      objNmrltd.add('Ba_Product_Flat__c');
        List<String> objNmrltdfrrow = new List<String>();
         objNmrltdfrrow.add('Product2');
        objNmrltdfrrow.add('Quote');
       objNmrltdfrrow.add('Predefined_Packages__r');
        
         List<String> fListrltd = new List<String>();
        fListrltd.add('Name');
      //  fListrltd.add('Description');
        // fListrltd.add('Family');
        // fListrltd.add('ba_RatingRegion__c');
      // fListrltd.add('Ba_ProductLine__c');
		//sf2jsonUtil.getHeaders(objNm, fList);
		//sf2jsonUtil.getRows(jsonLst,fList);
		//passing all this to the utility
		//
		List<List<String>> My_Array = new List<List<String>>();
        
       
   //create the 'columns'
  
    
        List<String> lst1 = new List<String>();
       lst1.add('Name');
      //  lst1.add('ProductCode');
        //  lst1.add('Description');
        List<String> lst2 = new List<String>();
       // lst2.add('Name');
        lst2.add('ba_RatingRegion__c');
     //   lst2.add('Description');
       List<String> lst3 = new List<String>();
        lst3.add('Ba_BasePackageName__c');
        lst3.add('Name');
  My_Array.add(lst1);
  My_Array.add(lst2);
  My_Array.add(lst3);

        
       // system.debug('myarray1'+My_Array.get(0).get(2));

		//sf2jsonUtil.getHeaders(objNm, fList);
		//sf2jsonUtil.getRows(jsonLst,fList);
		//passing all this to the utility
		return Ba_ObjJsonUtilClass.getJson(jsonLst,fList,objNm,Isd,fListrltd,objNmrltd,objNmrltdfrrow,My_Array);
	//return sf2jsonUtil.getJson(jsonLst,fList,objNm,Isd,fListrltd,objNmrltd,objNmrltdfrrow);
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
	
       Boolean Isd = false; 
        List<String> objNmrltd = new List<String>();
        List<String> fListrltd = new List<String>();
        List<String> objNmrltdfrrow = new List<String>();
      List<List<String>> My_Array = new List<List<String>>();
		//sf2jsonUtil.getHeaders(objNm, fList);
		//sf2jsonUtil.getRows(jsonLst,fList);
		//passing all this to the utility
		return Ba_ObjJsonUtilClass.getJson(jsonLst,fList,objNm,Isd,fListrltd,objNmrltd,objNmrltdfrrow,My_Array);
    }
}