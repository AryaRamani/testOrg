public with sharing class Ba_GroupClassesDAOClass {   
    @Auraenabled
    public static string getValues(){
    		//Query the object of choice
    		List<BA_Classes__c> ac = [select Name, ba_ClassDescription__c, Enrollable_Class__c FROM BA_Classes__c];
           // List<BA_Classes__c> bc = [SELECT ba_ProbationaryPeriod__c FROM BA_Classes__c];
       
		system.debug(ac);
		String jsonLst = JSON.serialize(ac, true);
		// This part needs the object Name and the list of api name of the fields (case sensitive). This is needed explicitly, because
		// in the query above, if fields do not have a value in them, the result records will not have the field token at all.
		String objNm = 'BA_Classes__c';
        Boolean SId = false;
		List<String> fList = new List<String>();
		//flist.add('Selection__c');
        flist.add('Name');
		fList.add('ba_ClassDescription__c');
		flist.add('Enrollable_Class__c');
       
       // flist.add('ba_ProbationaryPeriod__c');
		//sf2jsonUtil.getHeaders(objNm, fList);
		//sf2jsonUtil.getRows(jsonLst,fList);
		//passing all this to the utility
        //return sf2jsonUtil.getJson(jsonLst,fList,objNm) ;
       List<String> objNmrltd = new List<String>();
        List<String> fListrltd = new List<String>();
        List<String> objNmrltdfrrow = new List<String>();
       List<List<String>> My_Array = new List<List<String>>();
        return sf2jsonUtil.getJson(jsonLst,fList,objNm,SId,fListrltd,objNmrltd,objNmrltdfrrow,My_Array);
         //return [SELECT ba_ProbationaryPeriod__c, FROM BA_Classes__c]; 
    }
}