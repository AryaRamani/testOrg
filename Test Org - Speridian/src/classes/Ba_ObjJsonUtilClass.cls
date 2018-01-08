public without sharing class Ba_ObjJsonUtilClass {
    
    // will create header info for the json table
    public static string getHeaders(String objName, List<String> fieldList){
    		List<String> objList = new List<String>();
    		//Map<String,String> fieldTypMap = new Map<String,String>();
    		List<headerWrap> headerList = new List<headerWrap>();
    		objList.add(objName);
    		
    		List<Schema.DescribeSObjectResult> sobjResult = Schema.describeSObjects(objList);
    		
    		Map<String, Schema.SObjectField> fieldMap = sobjResult[0].fields.getMap();
    		
    		for(String field : fieldList){
    			Schema.SObjectField fieldMeta = fieldMap.get(field);
    			Schema.DescribeFieldResult fieldDesc = fieldMeta.getDescribe();
    			Schema.DisplayType fieldType = fieldDesc.getType();
    			String fieldTypeString = fieldType.name();
    			//fieldTypMap.put(field,fieldTypeString);
    			headerWrap rec = new headerWrap(true,fieldDesc.getLabel(),fieldType.name(),field);
    			headerList.add(rec);
    		}
    		
    		system.debug('"columns":'+JSON.serialize(headerList));
    		return '"columns":'+JSON.serialize(headerList);
    		
    }
    
    // will convert record data to json
    public static string getRows(String jsonList, List<String> fieldList){
    		List<Object> lstofrecs = (List<Object>)JSON.deserializeUntyped(jsonList);
		for(Object obj : lstofrecs){
		    //Map<String,Object> tempMap = (Map<String,Object>)obj;
    			//tempMap.remove('attributes');
    			Map<String,Object> objMap = (Map<String,Object>)obj;
    			((Map<String,Object>)obj).remove('attributes');
    			((Map<String,Object>)obj).remove('RecordTypeId');
    			((Map<String,Object>)obj).remove('Id');
    			for(String fl : fieldList){
    				if(!objMap.containsKey(fl)){
    					objMap.put(fl,'');
    				}
    			}
		}
		system.debug(lstofrecs);
		String rowJson = JSON.serialize(lstofrecs);
		system.debug('"rows":'+rowJson);
		return '"rows":'+rowJson;
    }
    
    public static String getJson(String jsonList, List<String> fieldList, String objName){
    		String rowString = sf2jsonUtil.getRows(jsonlist, fieldList);
    		String headerString = sf2jsonUtil.getHeaders(objName, fieldList);
    		system.debug('{'+headerString+','+rowString+'}');
    		return '{'+headerString+','+rowString+'}';
    }
    
    public class headerWrap{
    		public boolean sortable;
    		public string label;
    		public string dataType;
    		public string name;
    		
    		headerWrap(boolean sortable, String label, String dataType, String name){
    			this.sortable = sortable;
    			this.label = label;
    			this.dataType = dataType;
    			this.name = name;
    		}
    		
    }
}
/*
List<account> ac = [select id, name from account limit 2];

String jsonLst = JSON.serialize(ac);
System.debug(jsonLst);

//sf2jsonUtil.getRows(jsonLst);

JSONGenerator gen = JSON.createGenerator(true);
gen.writeObject(ac);
system.debug(gen.getAsString());

List<Object> lstofrecs = (List<Object>)JSON.deserializeUntyped(jsonLst);
for(Object obj : lstofrecs){
    system.debug((Map<String,Object>)obj);
}
system.debug(lstofrecs);

*/