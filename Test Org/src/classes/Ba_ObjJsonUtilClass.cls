public class Ba_ObjJsonUtilClass {
      // will create header info for the json table
    public static string getHeaders(String objName, List<String> fieldList,List<String> fldrltd,List<String> ObjNmrltd,List<List<String>> rltdobj){
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
                // system.debug('d');
            //    system.debug('"columns":'+JSON.serialize(headerList));
       
                
            }
        
        List<String> objList2 = new List<String>();
        integer i =0;
        for(String rltdobjct : ObjNmrltd ){
          
        objList2.add(rltdobjct);
           
        List<Schema.DescribeSObjectResult> sobjResult2 = Schema.describeSObjects(objList2);
        Map<String, Schema.SObjectField> fieldMap2 = sobjResult2[0].fields.getMap();
    		  for(String field : rltdobj.get(i)){
                  system.debug('qrl'+field);
                  
            
                  Schema.SObjectField fieldMeta2 = fieldMap2.get(field);
                  //String fldnm = (String)fieldMeta2;
                 if(fieldMeta2!=null){
               
                system.debug(fieldMeta2);
                Schema.DescribeFieldResult fieldDesc = fieldMeta2.getDescribe();
    			Schema.DisplayType fieldType = fieldDesc.getType();
                   //   String fieldTypeString = fieldType.name()
                   String fieldTypeString = fieldType.name();
                     system.debug('fldtp'+fieldType.name());
                          //  for(k=0;rltdobj.get(k)!=null;k++){
           /* for(String f:fldlistnew){
                if(fldlistnew == rltdobj.get(k)){
                    String fieldTypeString = fieldType.name()+'1';
                     }
            } */
        //fldlistnew = rltdobj.get(k);
            
            //}
                //  fldlistnew.add(field);
    			
    			//fieldTypMap.put(field,fieldTypeString);
    			//
    			String fld;
              fld=field;
    for(String f:fldrltd){
        if(field==f){
           
          fld= i+field;
        }
    }
    			headerWrap rec = new headerWrap(true,fieldDesc.getLabel(),fieldType.name(),fld);
    			headerList.add(rec);
                // system.debug('d');
            //    system.debug('"columns":'+JSON.serialize(headerList));
       
                  } 
            }
            i++;
            objList2.remove(0);
        }
    		system.debug('"columns":'+JSON.serialize(headerList));
       
    		return '"columns":'+JSON.serialize(headerList);
    		
    
    }
     public static string getRltdobjct(String jsonList, List<String> fieldList,Boolean Isid,List<String> fldrltd,List<String> ObjNmrltd,List<List<String>> rltdobj)
    {
        List<Object> lstofrecs = (List<Object>)JSON.deserializeUntyped(jsonList);
        List<Object> lstofrecs1 = new List<Object>();
        Object lst;
        Map<String,Object> objM =  new Map<String, Object>();
        String row='';
        for(Object obj : lstofrecs){
            Map<String,Object> objMap = (Map<String,Object>)obj;
          system.debug('done');
            
     
            ((Map<String,Object>)objMap).remove('attributes');
    			((Map<String,Object>)objMap).remove('RecordTypeId');
                 if(Isid!=true){
    			((Map<String,Object>)objMap).remove('Id');
            }
           // String w = 'Product2'
           //  ((Map<String,Object>)obj).get('Product2');
            Map<String,Object> obj1 =   new Map<String, Object>();
          Integer j=0;
            for(String rltd: ObjNmrltd){
                    Integer i=0;
              obj1 = (Map<String,Object>)ObjMap.get(rltd);
                system.debug('obj1'+(Map<String,Object>)obj1);
              ((Map<String,Object>)objMap).remove(rltd);
                system.debug('objmp'+(Map<String,Object>)objMap);
                if(obj1!=null){
           // system.debug('obj1final'+(Map<String,Object>)obj1);
            ((Map<String,Object>)obj1).remove('attributes');
            ((Map<String,Object>)obj1).remove('Id');
           // ((Map<String,Object>)obj1).remove('Name');
            
             Set<String> kySet1 = new Set<String>();
                 
              kySet1 = Obj1.keySet();
            
            for(String ky1 : kySet1)
                
            {
              
              Object v1= obj1.get(ky1);
              system.debug('ky1'+ky1);
               if(ky1=='Name')
               {
                   i++;
                   system.debug('i'+i+v1);
                   
               }
           
              String fld1=ky1; 
              for(String f:fldrltd){
        if(ky1==f){
         //  fld1= rltd+f;
            system.debug('j'+j);
             ky1 = j+ky1;
        }
    }
               objM.put(ky1,v1);
               objMap.put(ky1,v1);
              //  }
                    
                 }
                
             }            // integer j =0;
        for(String fl:rltdobj.get(j)){
        if(obj1==null){
        for(String f:fldrltd){
        if(fl==f){
           
        fl= j+f;
                 }
                                }
                         }
        else if(!obj1.containsKey(fl)  ){
                     for(String f:fldrltd){
        if(fl==f){
           
        fl= j+f;
        }
        }
                }
                     //   system.debug('testfl'+fl);
                    
                        
    					objMap.put(fl,'');
    				}
         
                j++;
            }
            
           
            
            
            
            Set<String> kySet = new Set<String>();
            kySet = ObjMap.keySet();
            obj= objM;
            for(String ky : kySet)
                
            {
                 
              Object v= objMap.get(ky);
              // system.debug('fltst'+v);
               objM.put(ky,v);
                
                system.debug('fltst'+v);
            }
            for(String fl : fieldList){
                 system.debug('ttfl'+fl);
    				if(!objMap.containsKey(fl)){
                     //   system.debug('ttfl'+fl);
                        
    					objMap.put(fl,'');
    				}
    			}
          
            
            
          
           //  lst = objM;
           
        }
         system.debug('strring'+(Map<String,Object>) objM);
       row = JSON.serialize(lstofrecs);
        system.debug('string2'+row);
        return '"rows":'+row;
}

    
    // will convert record data to json
    public static string getRows(String jsonList, List<String> fieldList,Boolean Isid){
    		List<Object> lstofrecs = (List<Object>)JSON.deserializeUntyped(jsonList);
		for(Object obj : lstofrecs){
		    //Map<String,Object> tempMap = (Map<String,Object>)obj;
    			//tempMap.remove('attributes');
    			Map<String,Object> objMap = (Map<String,Object>)obj;
    			((Map<String,Object>)obj).remove('attributes');
    			((Map<String,Object>)obj).remove('RecordTypeId');
    			//((Map<String,Object>)obj).remove('Id');
    			//
    			 if(Isid!=true){
    			((Map<String,Object>)obj).remove('Id');
            }
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
    
    public static String getJson(String jsonList, List<String> fieldList, String objName,Boolean Isid,List<String> fldrltd,List<String> ObjNmrltd,List<String> ObjNmrltdfrrow,List<List<String>> rltdobj){
    		//String rowString = sf2jsonUtil.getRows(jsonlist, fieldList,Isid);
    		String rowString = sf2jsonUtil.getRltdobjct(jsonlist, fieldList,Isid,fldrltd,ObjNmrltdfrrow,rltdobj);
        system.debug('rowstrng');
    		String headerString = sf2jsonUtil.getHeaders(objName, fieldList,fldrltd,ObjNmrltd,rltdobj);
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

}