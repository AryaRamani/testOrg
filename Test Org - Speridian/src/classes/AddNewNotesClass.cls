public class AddNewNotesClass {
@AuraEnabled
    public static String CreateNote(String Title,String Notes,String GroupId){
        note Nts = New note(Title= Title ,Body= Notes,ParentId =GroupId);
        
       insert Nts;
       return Title;
    }
    
    @AuraEnabled
    public static list<ContentNoteDetails> getNotes(String GroupId){
    	list<Id> DocumentId=new list<Id>();
    	list<ContentNoteDetails> noteWrplst=new list<ContentNoteDetails>();
    	list<contentdocumentlink> linklst=[Select contentdocumentId from contentdocumentlink where LinkedEntityId=:GroupId];
    		for(contentdocumentlink link:linklst){
    			DocumentId.add(link.contentdocumentId);
    		}
       list<contentNote> notelst=[Select id,Title,content from contentNote where Id IN:DocumentId];
       for(ContentNote noteinfo: notelst){
       	ContentNoteDetails info = new ContentNoteDetails();
       	info.NoteId=noteinfo.Id;
       	info.title=noteinfo.Title;
       	info.Content=(noteinfo.content).toString();
       	noteWrplst.add(info);
       }
       system.debug(noteWrplst);
       return noteWrplst;
    }
    
    
    
  public class ContentNoteDetails {
     
    @AuraEnabled
    public Id NoteId ;
     
    @AuraEnabled 
    public String title ;
     
    @AuraEnabled 
    public String Content ;
  }
    
    
   
}