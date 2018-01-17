public with sharing class RelatedListClass {

    public static  map<String,string> RelatinshiptoNameMap ;
    public static map<String,schema.SobjectField> ObjNameParentIdFieldMap;
    @AuraEnabled // to get related records upon passing the Record ID 
    public static list<ChildRecordDetails> fetchDetails(Id ObjId, list<String> CrNames, String ParentObjName){
        list<ChildRecordDetails>   ChildRecordDetailsList = new list<ChildRecordDetails>(); 
        if(ObjId != NULL){
            
            
            String sObjName = ObjId.getSObjectType().getDescribe().getName();  // to get the object name from given Id
            Map<String,String> childObjectList = getChildObjects(ObjId,sObjName);
             
            list<String> list1 = new list<String>();
            list<String> objnameKeyset = new list<String>();
            objnameKeyset.addAll(ObjNameParentIdFieldMap.keySet());
            list1 = crnames.isEmpty()  ? objnameKeyset: CrNames;
            Boolean isCustomList =  crnames.isEmpty() ? False : True ;
            system.debug('--ObjNameParentIdFieldMap-->'+ObjNameParentIdFieldMap);
            system.debug('-list1-->'+list1);
            // add attachments to the related list 
            
            ChildRecordDetails attachments  = new ChildRecordDetails();
            list<ContentDocumentLink> docdetails=[SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId =: objId ] ;
            list<id>iddetails=new list<id>();
            
            for(ContentDocumentLink d:docdetails){
                iddetails.add(d.ContentDocumentId);
            }
            
            attachments.SobjectList =[Select id,Title from ContentDocument Where ID In :iddetails order by lastModifiedDate DESC LIMIT 2]; 
            attachments.ObjLabel = 'Notes and Attachments';
            attachments.ChildRelationShipName = 'CombinedAttachments';
            attachments.Count = iddetails.size();
            attachments.ObjName = 'ContentDocument';
            ChildRecordDetailsList.add(attachments);
            system.debug('size'+iddetails.size());
            
            for(String ObjName : list1){
                try{
                    ObjName = ObjName.toLowerCase();
                    schema.DescribeSObjectResult CObjResults = schema.getGlobalDescribe().get(ObjName).getDescribe();    // to get label  
                    
                    if(ObjName != 'CombinedAttachments' && ObjName != sObjName && objName != 'Attachment' && objName != 'EmailMessage' && objName != 'Event' 
                       && objName !='Task' && objName != 'ContentDocumentLink' && objName != 'DuplicateRecordItem'
                       && objName != 'Note'  ){
                           
                           ChildRecordDetails childRecord  = new ChildRecordDetails();
                           String CountQuery = 'select Count() from ';
                           String recordQuery = 'select id,name from  ';
                           String whrcnditn =  ObjNameParentIdFieldMap.get(objName) + '= \''+ objId + '\' ' ;  
                           CountQuery += objName + ' where ' +whrcnditn;
                           recordQuery += objName + ' where ' + whrcnditn + ' order by lastModifiedDate DESC LIMIT 2';
                           if(ObjName =='case'){
                               recordQuery =  'select id,caseNumber from  '+ objName + ' where ' + whrcnditn + ' order by lastModifiedDate DESC LIMIT 2';
                           }
                           childRecord.Count = Database.Countquery(CountQuery);
                           childRecord.ObjName = ObjName;
                           if( childRecord.Count >=1){
                               list<SObject> childRecords = Database.query(recordQuery);
                               childRecord.SobjectList =childRecords;
                           }
                           childRecord.ObjLabel = CObjResults.getLabel();
                           childRecord.ChildRelationShipName = RelatinshiptoNameMap.get(ObjName);
                           ChildRecordDetailsList.add(childRecord);
                       }
                    
                }
                catch(exception e)
                {system.debug(''+e.getMessage()+''+e.getStackTraceString());}
            }
            system.debug('Child records'+ChildRecordDetailsList);
            return ChildRecordDetailsList;
             
        }
        else {
            Map<String,String> childObjectList = getChildObjects(NULL,ParentObjName); // name to label map 
            ChildRecordDetails attachments  = new ChildRecordDetails();
            attachments.ObjLabel = 'Notes and Attachments';
            attachments.ChildRelationShipName = 'CombinedAttachments';
            attachments.ObjName = 'ContentDocument';
            attachments.count=0;
            ChildRecordDetailsList.add(attachments);
            system.debug('Notes'+ChildRecordDetailsList);
            for(String objName : childObjectList.keySet()){
                if(objName != 'CombinedAttachments'){
                ChildRecordDetails childRecord  = new ChildRecordDetails();
                childRecord.ObjName = objName;
                childRecord.ObjLabel = childObjectList.get(objName);
                childRecord.ChildRelationShipName = RelatinshiptoNameMap.get(ObjName);
                childRecord.count =0;
                childRecord.SobjectList = new list<Sobject>();
                ChildRecordDetailsList.add(childRecord);
                }
            }
            system.debug('Child records'+ChildRecordDetailsList);
            return ChildRecordDetailsList;
             
            }
            
           
    }
    public class ChildRecordDetails{
        @AuraEnabled public list<Sobject> SobjectList ;
        @AuraEnabled public String ObjName;
        @AuraEnabled public Integer Count;
        @AuraEnabled public String ObjLabel;
        @AuraEnabled public String ChildRelationShipName;
       
       
    }
    // to get the child objects list upon passing the record Id 
    @AuraEnabled 
    public static Map<String,String> getChildObjects(Id objId,String ParObjName)
    {
       
        Map<String,String> childObjects = new map<String,String>();
        String sObjName;
        if(objId != null){
            sObjName = ObjId.getSObjectType().getDescribe().getName();  // to get the object name from given Id
        }else sObjName = ParObjName;
        schema.DescribeSObjectResult ObjResults = schema.getGlobalDescribe().get(sObjName).getDescribe();    
        List<Schema.ChildRelationship> CR = ObjResults.getChildRelationships(); 
        RelatinshiptoNameMap = new map<String,string>();    
        ObjNameParentIdFieldMap = new map<String,schema.SobjectField>();
        
        
        for(schema.ChildRelationship cc : CR){
            String crName = cc.getRelationshipName();
                if(String.isNotBlank(crName) ){
                    Schema.DescribeSObjectResult objectDescription = cc.getChildSobject().getDescribe();
                    
                    if( objectDescription.isQueryable() && objectDescription.isAccessible() && objectDescription.isCreateable() )  {
                        RelatinshiptoNameMap.put( String.valueOf(cc.getChildSobject()).toLowerCase(),crName);
                        ObjNameParentIdFieldMap.put(String.valueOf(cc.getChildSobject()).toLowerCase(),cc.getField());
                    }
                }
            String ObjName=  String.valueOf(cc.getChildSobject());
            if(String.isNotBlank(crName) && ObjName != sObjName && objName != 'Attachment' && objName != 'EmailMessage' 
               && objName != 'Event' && objName !='Task'  && objName != 'ContentDocumentLink' && objName != 'DuplicateRecordItem'
                     && objName != 'Note' ){
                Schema.DescribeSObjectResult objectDescription = cc.getChildSobject().getDescribe();
                if( objectDescription.isQueryable() && objectDescription.isAccessible() && objectDescription.isCreateable() )  {
                    childObjects.put(objName.toLowerCase(), String.valueOf(objectDescription.getLabel()) );
                   
                }
            }
                   
        }
        childObjects.put('CombinedAttachments', 'Notes and Attachments');
        return childObjects;
    }    
    
   @AuraEnabled
   public static Accountdetails fetchAccountdetails( id Accountid) {
      
     system.debug('accountid'+ Accountid);
    Accountdetails det =  new Accountdetails();
    // set the pageSize,Page(Number), total records and accounts List(using OFFSET)   
   
        det.contacttotal = [select count() from Contact where Accountid=:Accountid ];
     if( det.contacttotal !=0){
         
          det.fetchcontactdetails=[select  id,Name,Title,Email,Phone from Contact  where AccountId =:Accountid  order by createdDate DESC LIMIT 1];
          system.debug('contactdetaild'+ det.fetchcontactdetails);
     }
     
      det.Opptotal = [SELECT count() FROM Opportunity where Accountid=:Accountid ];
     
     if( det.Opptotal !=0)
     {
         det.fetchOppdetails=[select id,Name,StageName,Amount,CloseDate from Opportunity where Accountid =:Accountid order by createdDate DESC LIMIT 1];

     }
      det.Casetotal = [SELECT count() FROM Case where Accountid=:Accountid ];
     
     if( det.Casetotal!=0){
         
              det.fetchCasedetails=[select id,CaseNumber, Contact.Name,Subject,Priority  from Case where Accountid =:Accountid order by CreatedDate DESC LIMIT 1];

     }
     

     list<ContentDocumentLink> docdetails=[SELECT ContentDocumentId FROM ContentDocumentLink WHERE LinkedEntityId =: Accountid ] ;
    
     list<id>iddetails=new list<id>();
     
     for(ContentDocumentLink d:docdetails){
         iddetails.add(d.ContentDocumentId);
     }

     system.debug('docdetails got'+ docdetails);
     det.notetotal=iddetails.size() ;
     
     system.debug('notetotal'+ det.notetotal);
     if( det.notetotal !=0){
       
      det.fetchnotedetails=[Select id,Title from ContentDocument Where ID In :iddetails order by CreatedDate desc LIMIT 1]; 
         system.debug('fetchnotedetailsof content doc'+ det.fetchnotedetails);
 }
       
      det.quotetotal = [SELECT count() FROM Quote where Accountid=:Accountid ];
     
     if( det.quotetotal !=0)
     {
         det.fetchquotedetails=[select id,QuoteNumber,Name,IsSyncing,ExpirationDate from Quote where Accountid =:Accountid order by createdDate DESC LIMIT 1];
         system.debug('fetchquotedetails'+ det.fetchquotedetails);
     }
       
       
     det.Correspondtotal = [SELECT count() FROM  BA_Correspondence__c where ba_Group__c=:Accountid];

     if( det.Correspondtotal !=0)
     {
         det.fetchcorresponddetails=[select id,Name from BA_Correspondence__c where ba_Group__c =:Accountid order by createdDate DESC LIMIT 1];
         system.debug('fetchcorresponddetails'+ det.fetchcorresponddetails);
     }
       
       
         det.subgrouptotal = [SELECT count() FROM  BA_Subgroup__c where ba_Group__c =:Accountid];

     if( det.subgrouptotal !=0)
     {
         det.fetchsubgroupdetails=[select id,Name from BA_Subgroup__c where ba_Group__c =:Accountid order by createdDate DESC LIMIT 1];
         system.debug('fetchsubgroupdetails'+ det.fetchsubgroupdetails);
     }
       
       
       
           det.benefittotal = [SELECT count() FROM  BA_Asset__c where ba_Group__c =:Accountid];

     if( det.benefittotal !=0)
     {
         det.fetchbenefitdetails=[select id,Name from BA_Asset__c where ba_Group__c =:Accountid order by createdDate DESC LIMIT 1];
         system.debug('fetchbenefitdetails'+ det.fetchbenefitdetails);
     }
           
          det.groupclasstotal = [SELECT count() FROM  BA_Class_Package__c where ba_Group__c =:Accountid];

     if( det.groupclasstotal !=0)
     {
         det.fetchgroupdetails=[select id,Name from BA_Class_Package__c where ba_Group__c =:Accountid order by createdDate DESC LIMIT 1];
         system.debug('fetchgroupdetails'+ det.fetchgroupdetails);
     }
     list<Id> accntAddrsIds = new list<Id>();
     for(Ba_Account_Addr_Intersection__c addrs : [SELECT Id,Address__c FROM  Ba_Account_Addr_Intersection__c where Account__c =:Accountid]){
         accntAddrsIds.add(addrs.Address__c);
     }
     det.addresstotal = [SELECT COUNT() from BA_Address__c where Id IN :accntAddrsIds];

     if( det.addresstotal !=0)
     {
         det.fetchaddressdetails=[select id,Name from BA_Address__c where Id IN:accntAddrsIds order by createdDate DESC LIMIT 1];
         system.debug('fetchaddressdetails'+ det.fetchaddressdetails);
     }
       
        return det;
     }
    
 // create a wrapper class with @AuraEnabled Properties    
 public class Accountdetails {
     
    @AuraEnabled
    public Contact fetchcontactdetails ;
     
    @AuraEnabled 
    public Opportunity fetchOppdetails ;
     
    @AuraEnabled 
    public Case fetchCasedetails ;
     
    @AuraEnabled 
    public ContentDocument  fetchnotedetails;
     
     @AuraEnabled 
     public Quote fetchquotedetails;
     
      @AuraEnabled 
     public  BA_Correspondence__c fetchcorresponddetails;
     
     @AuraEnabled
     public BA_Class_Package__c fetchgroupdetails;
     
       @AuraEnabled 
     public  BA_Subgroup__c fetchsubgroupdetails;
   
      @AuraEnabled 
     public  BA_Asset__c fetchbenefitdetails;
     
     @AuraEnabled
     public BA_Address__c fetchaddressdetails;
     
    

    @AuraEnabled
    public Integer contacttotal ;

   @AuraEnabled
    public Integer Correspondtotal ;
          
    @AuraEnabled
    public Integer Opptotal ;
     
    @AuraEnabled 
    public Integer Casetotal ;
     
    @AuraEnabled 
    public Integer notetotal ;
     
    @AuraEnabled
    public Integer quotetotal;
    
    @AuraEnabled
    public Integer subgrouptotal;
    
      @AuraEnabled
    public Integer benefittotal;
     
      @AuraEnabled
    public Integer groupclasstotal;
     
      @AuraEnabled
    public Integer addresstotal;
   
     
   }

    
}