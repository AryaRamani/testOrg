public with sharing class SearchContactClass {
    
   @AuraEnabled
   public static list<contact> fetchlist() {
                
        list<contact> contactall = [SELECT Id, Name FROM contact ];

  return contactall;
        
    }
    

    @AuraEnabled
 public static AccountPagerWrapper fetchcontact(String searchKeyWord,Decimal pageNumber,integer recordToDisply) {
      Integer pageSize = recordToDisply;
     System.debug('pagenumber1'+pageNumber);
          System.debug('recordtodisplay1'+recordToDisply);

     Integer offset = ((Integer)pageNumber - 1) * recordToDisply;

     System.debug('offset'+offset);

            AccountPagerWrapper obj =  new AccountPagerWrapper();
      //  obj.total = [SELECT count() FROM contact];

         obj.pageSize = pageSize;
     system.debug('pagesize'+pageSize);
        obj.page = (Integer) pageNumber;
     
     system.debug('pagenumber'+pageNumber);
     

  String searchKey = searchKeyWord + '%';
  List < contact > allcontacts = [select id, Name from contact  LIMIT:recordToDisply   OFFSET :offset ];
     system.debug('all contacts'+allcontacts);
  List < contact > returnList = new List < contact > ();
 
  
 
     if(searchKeyWord !=NULL)
         {
              List < contact > lstOfAccount = [select id, Name from contact where Name LIKE: searchKey LIMIT:recordToDisply   OFFSET :offset ];
             system.debug('searchresultlist'+lstOfAccount);
             for (contact acc: lstOfAccount) {
                  returnList.add(acc);
                      }
              obj.contact=returnList;
              system.debug('return list'+returnList);
              return obj;
         }
     system.debug('searchvaluefinal'+searchKeyWord);
     
     obj.contact=allcontacts;
    system.debug('obj'+obj);
     return obj;
     
}
 
 // create a wrapper class with @AuraEnabled Properties    
 public  class AccountPagerWrapper {
    @AuraEnabled public Integer pageSize {get;set;}
    @AuraEnabled public Integer page {get;set;}
         @AuraEnabled public Integer total {get;set;}
     @AuraEnabled public List<contact>contactall{get;set;}
    @AuraEnabled public List<contact> contact {get;set;}
  //   @AuraEnabled public List<contact> wholeList{get;set;}
   }
}