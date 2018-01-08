public class QuoteContactSearchClass {

    @AuraEnabled
 public static ContactPagerWrapper fetchContact(Decimal pageNumber ,Integer recordToDisply) {
      Integer pageSize = recordToDisply;
      Integer offset = ((Integer)pageNumber - 1) * pageSize;
    
    // create a instance of wrapper class.
    ContactPagerWrapper obj =  new ContactPagerWrapper();
    // set the pageSize,Page(Number), total records and Contacts List(using OFFSET)   
        obj.pageSize = pageSize;
        obj.page = (Integer) pageNumber;
        obj.total = [SELECT count() FROM Contact];
         
     
     
        obj.Contacts = [SELECT Id, FirstName,LastName,Account.Name,Fax,Email,Phone FROM Contact ORDER BY Name LIMIT :recordToDisply OFFSET :offset];
    // return the wrapper class instance .
        return obj;
     }
    @AuraEnabled
    public static List<Contact> QueryCntct( String Name1, String Value1) {
    
    List<Contact> Ct1 = new List<Contact>();
    // create a instance of wrapper class.
 //  System.assertEquals(result, 1);
 
 
 
        Integer Result1 = Name1.compareTo('FirstName');
        //System.assertEquals(Result1, 0);
        Integer Result2 = Name1.compareTo('LastName');
        //System.assertEquals(Result2, 1);
        Integer Result3 = Name1.compareTo('Id');
        //System.assertEquals(Result3, 1);
       if(Result1==0) {
       Ct1 =  [SELECT Id,FirstName,Lastname,Account.Name,Fax,Email,Phone From Contact where FirstName like :Value1];
          }
        
        else if(Result2==0){
       Ct1 =  [SELECT Id,FirstName,Lastname,Account.Name,Fax,Email,Phone From Contact where LastName like :Value1];
          }
         else if(Result3==0) {
       Ct1 =  [SELECT Id,FirstName,Lastname,Account.Name,Fax,Email,Phone From Contact where Id = :Value1];
         }
        else{
            //Ct1 =  [SELECT Id,FirstName,Lastname,Account.Name,Fax,Email,Phone From Contact where FirstName like :Value1];
             Ct1 =  [SELECT Id, FirstName,LastName,Account.Name,Fax,Email,Phone FROM Contact ORDER BY Name];
        }
       // return 'Sucess';
        return Ct1;
      // return [SELECT Id, FirstName,LastName,Account.Name,Fax,Email,Phone FROM Contact ORDER BY Name where FirstName like :Value1];
   }
    @AuraEnabled
    public static String CrtCntact(String FstName,String LstName,String Email, String Phone, String Gender){
     // insert Cntct;
        Contact Cnt = new Contact(FirstName= FstName,LastName= LstName,Email=Email,Phone=Phone,ba_Gender__c=Gender,ba_Relation1__c='Test');
        //Contact Cnt = new Contact();
       //system.debug(Cnt);
        //Cnt = Cntct;
        
        insert Cnt;
        return 'Cnt';
       // return 'Cntct';
        
    }
   //Querying the contact details 
    //@AuraEnabled
    //public static List<BA_EG_Contact_Intersection__c> QueryContact( String Name1, String Value1) {

        //return [SELECT Id, q.First_Name__c,q.Last_Name__c,q.Fax__c,Email__c,Phone__c FROM BA_EG_Contact_Intersection__c where ba_Record_Type__c = 'Dependent'];
        
    //}
    
    @AuraEnabled
    public static List<Contact> SCntct(String AccountID,String parentGroupId){

     return [Select q.FirstName,q.LastName,q.Fax,q.Email,Account.Name From Contact q where q.id in (select s.Contact__c From BA_EG_Contact_Intersection__c s where s.Account__c = :AccountID)];
    }

     // create a wrapper class with @AuraEnabled Properties    
 public class ContactPagerWrapper {
    @AuraEnabled public Integer pageSize {get;set;}
    @AuraEnabled public Integer page {get;set;}
    @AuraEnabled public Integer total {get;set;}
    @AuraEnabled public List<Contact> Contacts {get;set;}
  // @AuraEnabled public List<Integer> IdNum {get;set;}
   }
    @AuraEnabled
    public static Contact[] AssociateCntct(Contact[] Con, String GroupId, Integer Index){
        system.debug(Con);
        Update Con; 
        return Con;
    }

}