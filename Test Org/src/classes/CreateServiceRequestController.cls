public class CreateServiceRequestController {
    
    @AuraEnabled
   public static Case createservice (String memberId,Boolean waitinginfo) {
  Case service=new Case();
  Contact con=[Select id from Contact where ba_ExchangeMemberID__c=:memberId];
  service.Type='PCP Change';
  service.ba_Member__c=con.id;
  service.status='Open';
  insert service;
  Case servicereq=[Select id,CaseNumber,CreatedDate from case where id=:service.id];
  Task t=new Task();			 
   		t.WhatId = servicereq.id;
   		t.status='completed';
   		t.Subject='PCP Change';
   		t.Description='Service Request Created for PCP Change';
   		t.ActivityDate=system.today();
   		t.OwnerId=UserInfo.getUserId();
   		if(waitinginfo){
   		t.status='Pending';
   		}
   		else
   		{
   			t.status='Completed';
   		}
   		insert t;
  return servicereq;
  
 	 	
 }
    

}