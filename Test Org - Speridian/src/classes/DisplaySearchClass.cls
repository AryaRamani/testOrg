public class DisplaySearchClass {
    
     @AuraEnabled
    public Static List<contact> fetchlist(){
        List<contact> contactlist=[select id,name from contact];
        return contactlist;
    }

    @AuraEnabled
 public static List < contact> fetchcontact(String searchKeyWord) {
  String searchKey = searchKeyWord + '%';
  List < contact > returnList = new List < contact > ();
  List < contact > lstOfAccount = [select id, Name from contact where Name LIKE: searchKey];
 
  for (contact acc: lstOfAccount) {
   returnList.add(acc);
      
  }
  return returnList;
 }
   
}