public with sharing class Ba_RelatedListClass {
    
    
     @AuraEnabled
 	public static list<String> getRelatedObj(String objname){
 		Schema.DescribeSObjectResult R = Account.SObjectType.getDescribe();
 		list<String> objectlist=new list<String>();
 		Set<String> setObj=new Set<String>();
		for (Schema.ChildRelationship cr: R.getChildRelationships()) 
		{
  			system.debug('====child object==='+cr.getChildSObject());
  			setObj.add(String.valueOf(cr.getChildSObject()));
		}
		objectlist.addall(setobj);
		return objectlist;
 	}
}