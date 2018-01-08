public with sharing class Ba_FileTemplateClass {
    
    
    @AuraEnabled
	public static Id displaytemplatefile(String filename) {
		StaticResource sr = [Select body, name from StaticResource where Name =: filename]; 
		String body = sr.Body.toString();
		
 list<ContentVersion> ver=[Select id,ContentDocumentId,VersionData from ContentVersion where Title=: filename];       
		if(ver.size()==0){
         ContentVersion conVer = new ContentVersion();
		//conVer.ContentLocation = 'E'; // S specify this document is in SF, use E for external files
		conVer.PathOnClient = filename; // The files name, extension is very important here which will help the file in preview.
		conVer.Title = fileName; // Display name of the files
		conVer.VersionData = Blob.valueof(body); // converting your binary string to Blob
		conVer.IsMajorVersion=false;
		//insert conVer;
		insert conVer;
		
		Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:conVer.Id].ContentDocumentId;
		system.debug('@@@@@@@@@file Id'+ conDoc);
		return conDoc;
		}
		else{
			Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =:Ver[0].Id].ContentDocumentId;
			return conDoc;
		}
	}
}