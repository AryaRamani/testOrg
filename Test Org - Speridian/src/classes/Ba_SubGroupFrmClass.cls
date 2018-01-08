public with sharing class Ba_SubGroupFrmClass {
	
	@AuraEnabled
    public static Account getGroupInformation(String groupId){
    	
    	Account groupinfo=[Select id, Name, ba_EffectiveDate__c,TIN_EIN__c from Account where id=:groupId]; //Retrieve group information for the first sub group creation
    	return groupinfo;
    	
    }
    
    
    @AuraEnabled
    public static GroupAddress getGroupAddress(String groupId){
    	
    	list<Id> addrId=new list<Id>();
    	list<Id> addrlstId=new list<Id>();
    	Account groupinfo=[Select id, Name, ba_RatingCounty__c from Account where id=:groupId]; //To fetch Address information 
    	list<Ba_Account_Addr_Intersection__c> addrlst=[Select Id,Name,Primary__c,Address__c
    													from Ba_Account_Addr_Intersection__c
    								                   where Account__c=:groupinfo.Id ];
    								                   
     system.debug('Address'+addrlst);
    							
		GroupAddress GrpAddr=new GroupAddress();
		String primaryId;
		for(Ba_Account_Addr_Intersection__c addr:addrlst){
			addrId.add(addr.Address__c); //Address intersection Id
			if(addr.Primary__c==true){
				primaryId=addr.Address__c; //primary Address Intersection Id
			}
		}
		
		
		list<BA_Address__c> addrlist=[Select id from  BA_Address__c where Id IN:addrId];
		system.debug('Address obj'+addrlist);
		for(BA_Address__c add:addrlist){
			addrlstId.add(add.Id); //Address Id related to the group
		}
		system.debug('Primary'+primaryId);
		if(primaryId!=null){
		BA_Address__c primary=[Select id from BA_Address__c where Id=:primaryId];
		GrpAddr.primaryAddr=primary.Id; //primary address Id
		}
		
		GrpAddr.Addresslist=addrlstId;
		
		
    	return GrpAddr;
    	
    }
    
    @AuraEnabled
    public static GroupAddress getGroupRatingRegion(String groupId){
    	list<BA_Zipcode_Admin__c> ratinglist=new list<BA_Zipcode_Admin__c>();
    	
    	
    	Account groupinfo=[Select id, Name, ba_RatingCounty__c from Account where id=:groupId]; //To fetch Address information 
    	list<BA_Zipcode_Admin__c> code=[Select id,	Name from BA_Zipcode_Admin__c];
    	for(BA_Zipcode_Admin__c zip: code){
    		ratinglist.add(zip);    
    	}
    	
    	GroupAddress addr=new GroupAddress();
    	addr.Ratingregion=ratinglist; //rating region
    	addr.groupregion=groupinfo.ba_RatingCounty__c; //rating region related to the group
    	return addr;
    }
    
    
    
    
     public with sharing class GroupAddress {
     	
     	@AuraEnabled
		public list < BA_Zipcode_Admin__c > Ratingregion;  //list of rating region
		
		@AuraEnabled
		public String groupregion;  //group region-to be set as default value
		
		@AuraEnabled
		public String primaryAddr;  //primary Address Id
		
		@AuraEnabled
		public list<Id> Addresslist;  //Address Id related to group
     	
     }
    
}