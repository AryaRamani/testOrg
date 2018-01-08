public class Ba_AttachmentUploadClass {
    
    @AuraEnabled
    public static CorrespondenceWrp saveChunk(Id groupId, String fileName, String base64Data, String contentType, String fileId, String typeinfo, String status) {
        // check if fileId id ''(Always blank in first chunk), then call the saveTheFile method,
        //  which is save the check data and return the attachemnt Id after insert, 
        //  next time (in else) we are call the appentTOFile() method
        //   for update the attachment with reamins chunks   
        system.debug('GroupId'+groupId);
         CorrespondenceWrp  cor =new  CorrespondenceWrp();
        if (fileId == '') {
        cor = saveTheFile(groupId, fileName, base64Data, contentType, typeinfo,status);
        } else {
            appendToFile(fileId, base64Data);
        }
 
        return cor;
    }
 
    public static CorrespondenceWrp saveTheFile(Id groupId, String fileName, String base64Data, String contentType, String typeinfo, String status) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        system.debug('Group Id'+groupId);
        system.debug('File Name'+fileName);
        BA_Correspondence__c corres=new BA_Correspondence__c();
        corres.Name= fileName;
        corres.Document_Status__c = typeinfo;
        corres.ba_DocumentType__c = status;
        
        corres.ba_Group__c = groupId;
        corres.ba_CreatedDate__c =System.today();
        insert corres;
        
        ContentVersion conVer = new ContentVersion();
        //conVer.ContentLocation = 'E'; // S specify this document is in SF, use E for external files
        conVer.PathOnClient = fileName; // The files name, extension is very important here which will help the file in preview.
        conVer.Title = fileName; // Display name of the files
        conVer.VersionData = EncodingUtil.base64Decode(base64Data); // converting your binary string to Blog
        conVer.IsMajorVersion=false;
        insert conVer;
        
        Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:conVer.Id].ContentDocumentId;
 
        //Create ContentDocumentLink
            ContentDocumentLink cDe = new ContentDocumentLink();
            cDe.ContentDocumentId = conDoc;
            cDe.LinkedEntityId =corres.Id ; // you can use objectId,GroupId etc
            cDe.ShareType = 'V'; // Inferred permission, checkout description of ContentDocumentLink object for more details
            //cDe.Visibility = 'InternalUsers';
            insert cDe; 
 CorrespondenceWrp wrp=new CorrespondenceWrp();
 wrp.fileId=conVer.Id;
 wrp.coresp=corres;
      /*  Attachment oAttachment = new Attachment();
        oAttachment.parentId = parentId;
 
        oAttachment.Body = EncodingUtil.base64Decode(base64Data);
        oAttachment.Name = fileName;
        oAttachment.ContentType = contentType;
 
        insert oAttachment; 
 
        return oAttachment.Id;*/
        return wrp;
    }
 
    private static void appendToFile(Id fileId, String base64Data) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
 
        Contentversion ver = [
            SELECT Id, VersionData
            FROM Contentversion
            WHERE Id =: fileId
        ];
 
        String existingBody = EncodingUtil.base64Encode(ver.VersionData);
 
        ver.VersionData = EncodingUtil.base64Decode(existingBody + base64Data);
 
        update ver;
    }
    
   @AuraEnabled
   public static list<BA_Correspondence__c> getAttachments(String groupId, String searchtype, String searchtext){
    system.debug('Search text'+searchtext);
    if(searchtext==null){
        searchtype='All';
    }
        
   /* list<Id> corrId=new list<Id>();
    list<ContentDocument> condocc=[Select id from ContentDocument ];
    list<id> docclist=new list<id>();
    for(ContentDocument docc:condocc){
        docclist.add(docc.Id);
    }
    
     list<ContentDocumentlink> conlist = [Select id,LinkedEntityId from ContentDocumentlink where ContentDocumentId IN:docclist ];
     system.debug('Content Document'+conlist);
     for(ContentDocumentlink con: conlist){
        corrId.add(con.LinkedEntityId);
     } */
     list<BA_Correspondence__c> corrlist = new  list<BA_Correspondence__c>();
     if(searchtype=='All'){
    corrlist=[Select id, Name, Document_Status__c, ba_DocumentType__c,ba_CreatedDate__c 
                                            from BA_Correspondence__c 
                                            where ba_Group__c =: groupId];
     }
    else if(searchtype=='Type'){
     corrlist=[Select id, Name, Document_Status__c, ba_DocumentType__c,ba_CreatedDate__c 
                                            from BA_Correspondence__c 
                                            where ba_Group__c =: groupId
                                            AND ba_DocumentType__c=:searchtext];
     }
     else if(searchtype=='Status'){
    corrlist=[Select id, Name, Document_Status__c, ba_DocumentType__c,ba_CreatedDate__c 
                                            from BA_Correspondence__c 
                                            where ba_Group__c =: groupId
                                            AND Document_Status__c=:searchtext];
     }
     else if(searchtype=='Title'){
        String searchval='%' + searchtext+'%';
          corrlist=[Select id, Name, Document_Status__c, ba_DocumentType__c,ba_CreatedDate__c 
                                            from BA_Correspondence__c 
                                            where ba_Group__c =: groupId
                                            AND Name LIKE :searchval];
     }
     
     System.debug('Correspondence list'+corrlist);
     
    
        return corrlist;
    
    
   }
   
 @AuraEnabled
 public static list<string> getstatusinfo(){
     List<String> options = new List<String>();
        
   Schema.DescribeFieldResult fieldResult = BA_Correspondence__c.Document_Status__c.getDescribe();
   List<Schema.PicklistEntry> statuslist = fieldResult.getPicklistValues();
        
   for( Schema.PicklistEntry entry : statuslist)
   {
      options.add(entry.getLabel());
   }       
   return options;
 }
 
  @AuraEnabled
 public static list<string> gettypeinfo(){
     List<String> options = new List<String>();
        
   Schema.DescribeFieldResult fieldResult = BA_Correspondence__c.ba_DocumentType__c.getDescribe();
   List<Schema.PicklistEntry> typelist = fieldResult.getPicklistValues();
        
   for( Schema.PicklistEntry entry : typelist)
   {
      options.add(entry.getLabel());
   }       
   return options;
 }
    
    
    @AuraEnabled
    public static String saveChunk(Id groupId){
        BA_Correspondence__c corres=new BA_Correspondence__c();
        corres.Name= 'fileName';
        corres.Document_Status__c = 'New';
        corres.ba_DocumentType__c = 'status';
        
        corres.ba_Group__c = groupId;
        corres.ba_CreatedDate__c =System.today();
        insert corres;
        return corres.Id;
    }
                                              
 
 
 @AuraEnabled
 public static BA_Correspondence__c createdoccurl(Id groupId, String documenturl, String typeinfo, String status ){
    BA_Correspondence__c corres=new BA_Correspondence__c();
        corres.Name=documenturl;
        corres.Document_Status__c = typeinfo;
        corres.ba_DocumentType__c = status;
        
        corres.ba_Group__c = groupId;
        corres.ba_CreatedDate__c =System.today();
        insert corres;
        return corres;
 }
    
    @AuraEnabled
    public static CorrespondenceWrp createcorrespondence(Id groupId, String fileName, String typeinfo, String status, String Parentfield) {
        
        ContentDocumentLink link=[Select id,ContentDocumentId from ContentDocumentLink where LinkedEntityId =: groupId limit 1 ];
        BA_Correspondence__c corres=new BA_Correspondence__c();
        corres.Name=fileName;
        corres.Document_Status__c = typeinfo;
        corres.ba_DocumentType__c = status;
        
        corres.ba_CreatedDate__c =System.today();
        insert corres;
        
         ContentVersion ver=[Select id,ContentDocumentId,VersionData from ContentVersion where ContentDocumentId =: link.ContentDocumentId ];       
         ContentVersion conVer = new ContentVersion();
        //conVer.ContentLocation = 'E'; // S specify this document is in SF, use E for external files
        conVer.PathOnClient = fileName; // The files name, extension is very important here which will help the file in preview.
        conVer.Title = fileName; // Display name of the files
        conVer.VersionData = ver.VersionData; // converting your binary string to Blob
        conVer.IsMajorVersion=false;
        //insert conVer;
        
        Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:ver.Id].ContentDocumentId;
 
        //Create ContentDocumentLink
            ContentDocumentLink cDe = new ContentDocumentLink();
            cDe.ContentDocumentId = conDoc;
            cDe.LinkedEntityId =corres.Id ; // you can use objectId,GroupId etc
            cDe.ShareType = 'V'; // Inferred permission, checkout description of ContentDocumentLink object for more details
            //cDe.Visibility = 'InternalUsers';
            insert cDe; 
            delete link;
        CorrespondenceWrp wrp=new CorrespondenceWrp();
        
 wrp.fileId=ver.Id;
 wrp.coresp=corres;
        system.debug('Response'+wrp);
        return wrp;
          //  delete ver;
        //link.LinkedEntityId = corres.Id;
  
    }
 
 
 public with sharing class CorrespondenceWrp { 
          @AuraEnabled
       public Id fileId;
        
        @AuraEnabled
       public BA_Correspondence__c coresp;
    }
   

}