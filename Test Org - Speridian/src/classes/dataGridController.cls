public with sharing class dataGridController {
    
    @Auraenabled
    public static string getAccounts(){
    		//Query the object of choice
    		List<account> ac = [select id, name, AccountNumber, Industry from account limit 10];
		system.debug(ac);
		String jsonLst = JSON.serialize(ac, true);
		// This part needs the object Name and the list of api name of the fields (case sensitive). This is needed explicitly, because
		// in the query above, if fields do not have a value in them, the result records will not have the field token at all.
		String objNm = 'Account';
		List<String> fList = new List<String>();
		flist.add('Name');
		fList.add('Industry');
		flist.add('AccountNumber');
		//sf2jsonUtil.getHeaders(objNm, fList);
		//sf2jsonUtil.getRows(jsonLst,fList);
		//passing all this to the utility
		return sf2jsonUtil.getJson(jsonLst,fList,objNm);
    }
    
    //Doesnt work
    @Auraenabled
    public static string getAccountsTwo(){
    		//Query the object of choice
    		List<account> ac = [select id, name, AccountNumber, Industry from account limit 10];
		system.debug(ac);
		String jsonLst = JSON.serialize(ac);
		return jsonLst;
    }
    
}