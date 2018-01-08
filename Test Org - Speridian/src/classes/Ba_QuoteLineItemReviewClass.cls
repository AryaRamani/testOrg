public class Ba_QuoteLineItemReviewClass {
   @AuraEnabled   
   public static QuoteLineItem SrchQuote(String QLIId){
      return [Select Id,ba_RatingMethodology__c,ba_TerminationDate__C,ServiceDate,ba_MonthlyRate__C From QuoteLineItem where Id= :QLIId];
             
    }
    @AuraEnabled   
    public static String SrchFA(String QLIId){
        QuoteLineItem QL = new QuoteLineItem();
     QL = [Select QuoteId From QuoteLineItem where Id= :QLIId];
        
        String Qls = String.valueOf(QL.QuoteId);
        System.debug('123'+Qls);
        Quote Op = new Quote();
         
       Op = [Select Opportunity.ba_FinancialArrangement__c From Quote where Id= :Qls];
         
        String Ops = String.valueOf(Op.Opportunity.ba_FinancialArrangement__c);
        System.debug(Ops);
           return Ops;
             
    }
    @AuraEnabled   
    public static QuoteOutputs SrchFR(String QLIId){
        List<ba_Quote_Line_Census__c> QLC = new List<ba_Quote_Line_Census__c>();
     QLC = [Select ba_FamilyRate__c From ba_Quote_Line_Census__c where Quote_Line__c = :QLIId];
  
       QuoteOutputs obj =  new QuoteOutputs();
     
       obj.EntroleeCount =[SELECT count() FROM ba_Quote_Line_Census__c where Quote_Line__c = :QLIId];
           obj.Rate = 0;
        for(integer i=0;i<obj.EntroleeCount;i++)
        {
            obj.Rate = obj.Rate + Integer.valueOf(QLC[i].ba_FamilyRate__c);
        }
        System.debug(obj.Rate);
          return obj;
             
    }
    
   public class QuoteOutputs {
    @AuraEnabled public Integer EntroleeCount {get;set;}
    @AuraEnabled public Integer Rate {get;set;}
  // @AuraEnabled public List<Integer> IdNum {get;set;}
   
}
}