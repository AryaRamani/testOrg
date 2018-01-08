public class Ba_GroupAttachmentClass {
@Auraenabled
    public static string Value(String GrpId){
    		//Query the object of choice
    		List<BA_Correspondence__c> ac = [Select id, Name, Document_Status__c, ba_DocumentType__c,ba_CreatedDate__c,ba_Group__c from BA_Correspondence__c where ba_Group__c =:GrpId ];
           // List<BA_Classes__c> bc = [SELECT ba_ProbationaryPeriod__c FROM BA_Classes__c];
       
		system.debug('Test'+ac);
		String jsonLst = JSON.serialize(ac, true);
		// This part needs the object Name and the list of api name of the fields (case sensitive). This is needed explicitly, because
		// in the query above, if fields do not have a value in them, the result records will not have the field token at all.
		String objNm = 'BA_Correspondence__c';
		List<String> fList = new List<String>();
		flist.add('ba_Check__c');
        flist.add('Name');
	//	fList.add('Document_Status__c');
		//flist.add('ba_DocumentType__c');
      //  flist.add('ba_CreatedDate__c');
		//sf2jsonUtil.getHeaders(objNm, fList);
		//sf2jsonUtil.getRows(jsonLst,fList);
		//passing all this to the utility
		system.debug('Test2'+jsonLst);
        system.debug('Test3'+flist);
        
        return sf2jsonUtil.getJson(jsonLst,fList,objNm) ;
}
}