public with sharing class Ba_QuoteLstClass {
	
	private static integer pagesize = 5; /* static page size*/
	private static integer offset;
	
	
	@AuraEnabled
    public static QuoteWrpClass getQuoteinfo(Id groupId, boolean next, boolean prev, decimal off, String searchtype, String searchtext){
    	
    	Account acc=[Select Id, ba_EffectiveDate__c from Account where id=:groupId ];  /*Query Account to get Effective date*/
    	System.debug('Search type'+searchtype);
    	integer offset = Integer.ValueOf(off);
    	Integer listlength;
    	list<Quote> Quotelst=new list<Quote>();
    	/*check the length of records based on the filter*/
    	if(searchtype=='All'||searchtext==null || searchtext==''){
    	listlength = [Select count() from Quote
    							where ba_EffectiveDate__c=:acc.ba_EffectiveDate__c];
    	}
    	else if(searchtype=='segment'){
    		
    	}
    	else if(searchtype == 'region'){
    		listlength = [Select count() from Quote
    							where ba_EffectiveDate__c=:acc.ba_EffectiveDate__c
    							AND ba_RatingRegion__c=:searchtext];
    	}
    							
    	/*Apply pagination*/						
        if (next == false && prev == false) {
			offset = 0;

		} else if (next == true && (offset + pagesize) <= listlength) {
			offset = offset + pagesize;

		} else if (prev == true && offset > 0) {
			offset = offset - pagesize;

		}
    	/* Query the Quote based on matching effective date and filtered search*/
    	 if(searchtype=='All'|| searchtext==null|| searchtext==''){
    	 Quotelst=[Select id, QuoteNumber, Status, ba_RatingRegion__c, ba_EffectiveDate__c, ba_Owner__c, ba_Owner__r.Name,ba_Agency__r.Name
    							from Quote 
    							where ba_EffectiveDate__c=:acc.ba_EffectiveDate__c
    							LIMIT: pagesize OFFSET: offset
    	                     ];
    	 }    
    	 else if(searchtype=='region'){
    	 	Quotelst=[Select id, QuoteNumber, Status, ba_RatingRegion__c, ba_EffectiveDate__c, CreatedBy.Name
    							from Quote 
    							where ba_EffectiveDate__c=:acc.ba_EffectiveDate__c
    							AND ba_RatingRegion__c=:searchtext
    							LIMIT: pagesize OFFSET: offset
    	                     ];
    	 }    
    	 else if(searchtype == 'segment'){           
    	 	
    	 }
    	 QuoteWrpClass wrp=new QuoteWrpClass();
    	                     
    	wrp.Quotelist = Quotelst;
		wrp.offst = offset;
		wrp.hasprev = hasprev(offset);
		wrp.hasnext = hasnxt(offset, listlength, pagesize);
    	                     
    	                 
    	/*Return back wrapper object*/                     
    	return wrp;
    	
    }
    
    private static boolean hasprev(integer off) {
		if (off > 0)
			return false;
		return true;
	}
	private static boolean hasnxt(integer off, integer li, integer ps) {
		if (off + ps < li)
			return false;
		return true;
	}
    
    
    @AuraEnabled
    public static QuoteWrpClass getLineIteminfo(Id groupId,Id QuoteId,boolean next, boolean prev, decimal off, String searchtype, String searchtext){
    	
    	Integer listlength;
    	
    	/*Query Account for effective date*/
    	Account acc=[Select Id, ba_EffectiveDate__c from Account where id=:groupId ];
    	integer offset = Integer.ValueOf(off);
    	list<QuoteLineItem> LineItemlst=new list<QuoteLineItem>();
    	
    	/* Get the count of records*/
    	if(searchtype=='All'||searchtext==null || searchtext==''){
    	listlength = [Select count() from QuoteLineItem
    							where ServiceDate=:acc.ba_EffectiveDate__c];
    							
    	}	
    	else if(searchtype=='package'){		
    		listlength = [Select count() from QuoteLineItem
    							where ServiceDate=:acc.ba_EffectiveDate__c
    							  AND Product2.Name=:searchtext];
    	}	
    	
    	/* Apply pagination*/		
    	if (next == false && prev == false) {
			offset = 0;

		} else if (next == true && (offset + pagesize) <= listlength) {
			offset = offset + pagesize;

		} else if (prev == true && offset > 0) {
			offset = offset - pagesize;

		}
		
		
		/*Query line Items based on the search filter*/
		if(searchtype=='All'||searchtext==null || searchtext==''){
    							
    	 LineItemlst=[Select QuoteId, id, LineNumber, Product2.Name, Predefined_Packages__r.ba_ProductLine__c
    									from QuoteLineItem 
    									where QuoteId=:QuoteId
    									AND ServiceDate= :acc.ba_EffectiveDate__c
    									 
    									LIMIT: pagesize OFFSET: offset
    	                     ];
		}
		else if(searchtype=='package'){
			 LineItemlst=[Select id, LineNumber, Product2.Name 
    									from QuoteLineItem 
    									where QuoteId=:QuoteId
    									AND ServiceDate= :acc.ba_EffectiveDate__c
    									 AND Product2.Name=:searchtext
    									LIMIT: pagesize OFFSET: offset
    	                     ];
		}
		
    	QuoteWrpClass wrp = new QuoteWrpClass();
    	wrp.lineItemlist = LineItemlst;
    	wrp.offst = offset;
		wrp.hasprev = hasprev(offset);
		wrp.hasnext = hasnxt(offset, listlength, pagesize);
    	   
    	/*return back the wrapper object*/                     
    	return wrp;
    	
    }
    
    
    
    public with sharing class QuoteWrpClass {
		
		
       
		@AuraEnabled
		public list < Quote > Quotelist;  //list of Quote
		
	

		@AuraEnabled
		public list < QuoteLineItem > lineItemlist; //list of line Item

		@AuraEnabled
		public integer offst;  //offset value

		 

		@AuraEnabled
		public boolean hasprev; //check previous

		@AuraEnabled
		public boolean hasnext; //check next

	}
    
    
}