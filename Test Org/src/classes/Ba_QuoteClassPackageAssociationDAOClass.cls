public class Ba_QuoteClassPackageAssociationDAOClass {

    
    @Auraenabled
    public static string getClasses(String[] ClsId){
    		//Query the object of choice
    		//List<SObject> Qt = [select ba_ClassDescription__c, Name, ba_EffectiveDate__c,ba_ProbationaryPeriod__c from ba_Quote_Request_Class__c where Id in :ClsId];
	List<SObject> Qt = [select ba_Class_Description__c, Name, ba_Class_Type__c,ba_EnrollableClass__c from BA_Group_Class_Administration__c where Id in :ClsId];
			
        
        system.debug(Qt);
       
		String jsonLst = JSON.serialize(Qt, true);
         system.debug(jsonLst);
		// This part needs the object Name and the list of api name of the fields (case sensitive). This is needed explicitly, because
		// in the query above, if fields do not have a value in them, the result records will not have the field token at all.
		//String objNm = 'ba_Quote_Request_Class__c';
		String objNm = 'BA_Group_Class_Administration__c';
		List<String> fList = new List<String>();
       //s flist.add('Id');
        flist.add('Name');
		//flist.add('ba_ClassDescription__c');
        //flist.add('ba_ProbationaryPeriod__c');
       // flist.add('ba_EffectiveDate__c');
       flist.add('ba_Class_Type__c');
        flist.add('ba_EnrollableClass__c');
        
		
		
        Boolean Isd = true; 
     List<String> objNmrltd = new List<String>();
        List<String> fListrltd = new List<String>();
        List<String> objNmrltdfrrow = new List<String>();
        List<List<String>> My_Array = new List<List<String>>();
		//sf2jsonUtil.getHeaders(objNm, fList);
		//sf2jsonUtil.getRows(jsonLst,fList);
		//passing all this to the utility
		return sf2jsonUtil.getJson(jsonLst,fList,objNm,Isd,fListrltd,objNmrltd,objNmrltdfrrow,My_Array);
    }
       
     @Auraenabled
    public static string getPackages( String[] PkgId){
        
        system.debug('PkgId'+PkgId);
    		//Query the object of choice
    		List<SObject> PP = [Select Ba_PackageName__c,Name,ba_ProductLine__c,Product_Category__c,ba_ProductType__c From Ba_Product_Flat__c where Id in :PkgId];
		system.debug(PP);
       
		String jsonLst = JSON.serialize(PP, true);
         system.debug(jsonLst);
		// This part needs the object Name and the list of api name of the fields (case sensitive). This is needed explicitly, because
		// in the query above, if fields do not have a value in them, the result records will not have the field token at all.
		String objNm = 'Ba_Product_Flat__c';
		List<String> fList = new List<String>();
       //s flist.add('Id');
        flist.add('Name');
		flist.add('Ba_PackageName__c');
        flist.add('ba_ProductLine__c');
        flist.add('Product_Category__c');
        flist.add('ba_ProductType__c');
        
		
		
        Boolean Isd = false; 
     List<String> objNmrltd = new List<String>();
        List<String> fListrltd = new List<String>();
        List<String> objNmrltdfrrow = new List<String>();
        List<List<String>> My_Array = new List<List<String>>();
		//sf2jsonUtil.getHeaders(objNm, fList);
		//sf2jsonUtil.getRows(jsonLst,fList);
		//passing all this to the utility
		return sf2jsonUtil.getJson(jsonLst,fList,objNm,Isd,fListrltd,objNmrltd,objNmrltdfrrow,My_Array);
    }

}