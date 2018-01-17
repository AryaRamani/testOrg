public class AccountListViewClass {
 @AuraEnabled
 public static AccountPagerWrapper fetchAccount(Decimal pageNumber ,Integer recordToDisply,String Type) {
      Integer pageSize = recordToDisply;
      Integer offset = ((Integer)pageNumber - 1) * pageSize;
    
    // create a instance of wrapper class.
    AccountPagerWrapper obj =  new AccountPagerWrapper();
    // set the pageSize,Page(Number), total records and Accounts List(using OFFSET)   
        obj.pageSize = pageSize;
        obj.page = (Integer) pageNumber;
        obj.total = [SELECT count() FROM Account where RecordType.Name = :Type];
         
     
     
      //  obj.Accounts = [SELECT Id, Name,Site,Phone FROM Account ORDER BY Name LIMIT :recordToDisply OFFSET :offset];
  obj.Accounts =  [SELECT Id, Name,Site,Phone,RecordType.Name FROM Account where RecordType.Name = :Type ORDER BY Name LIMIT :recordToDisply OFFSET :offset];
    // return the wrapper class instance .
        return obj;
     }
    @AuraEnabled
    public static List<Account> QueryCntct( String Name1, String Value1) {
    
    List<Account> Ct1 = new List<Account>();
    // create a instance of wrapper class.
 //  System.assertEquals(result, 1);
 
 
 
        Integer Result1 = Name1.compareTo('FirstName');
        //System.assertEquals(Result1, 0);
        Integer Result2 = Name1.compareTo('LastName');
        //System.assertEquals(Result2, 1);
        Integer Result3 = Name1.compareTo('Id');
        //System.assertEquals(Result3, 1);
       if(Result1==0) {
       Ct1 =  [SELECT Name,Site,Phone From Account where Name like :Value1];
          }
        
        else if(Result2==0){
       Ct1 =  [SELECT Name,Site,Phone From Account where Name like :Value1];
          }
         else if(Result3==0) {
       Ct1 =  [SELECT Name,Site,Phone From Account where Id = :Value1];
         }
        else{
            //Ct1 =  [SELECT Id,FirstName,Lastname,Account.Name,Fax,Email,Phone From Account where FirstName like :Value1];
             Ct1 =  [SELECT Name,Site,Phone FROM Account ORDER BY Name];
        }
       // return 'Sucess';
        return Ct1;
      // return [SELECT Id, FirstName,LastName,Account.Name,Fax,Email,Phone FROM Account ORDER BY Name where FirstName like :Value1];
   }
      @AuraEnabled   
    public static Account UpdtGrp(Account Acc){
       // return [SELECT Id, Name,Site,Phone From Account Limit 10];
      /* if(Action=='Insert'){
         Insert Acc;
        }
        else{
         Upsert Acc;
        }*/
        Update Acc;
       return Acc;
       
    }
    @AuraEnabled   
    public static String DltGrp(Account Accn){
      // Account Ac = [SELECT Id, Name,Site,Phone From Account where Id =:Accn];
      //  ID Id1 = Accn;
        delete Accn;
       return 'Accn';
       
    }
     @AuraEnabled   
    public static Account CrtAgncy(Account Agncy){
       // return [SELECT Id, Name,Site,Phone From Account Limit 10];
      // Account Agen = new Account(Name='TestShibija', Phone='1234567890');
      //  Agen= Agncy;
     // Agncy.RecordType.Name='Agency'     
      // System.debug(Agncy);
       insert Agncy;
       // System.debug(Agncy);
       return Agncy;
       
    }
   
    
 // create a wrapper class with @AuraEnabled Properties    
 public class AccountPagerWrapper {
    @AuraEnabled public Integer pageSize {get;set;}
    @AuraEnabled public Integer page {get;set;}
    @AuraEnabled public Integer total {get;set;}
    @AuraEnabled public List<Account> Accounts {get;set;}
  // @AuraEnabled public List<Integer> IdNum {get;set;}
   }
    @AuraEnabled
    public static Account[] AssociateCntct(Account[] Con, String GroupId, Integer Index){
        //var ConId = Con[0.Id]
    /* for(integer i=0;i<5;i++)
        {
            Con[i].AccountId = '0017F0000060ubhQAA';
      system.debug(i);
          // Con[i].AccountId = '0017F0000060ubhQAA';
          
        }*/
        //Update Con;
      //  Con[0].AccountId = '0017F0000060ubhQAA';
       /* Con[1].AccountId = '0017F0000060ubhQAA';
        Con[2].AccountId = '0017F0000060ubhQAA';
        Con[3].AccountId = '0017F0000060ubhQAA';*/
        Update Con; 
        return Con;
    }
 

}