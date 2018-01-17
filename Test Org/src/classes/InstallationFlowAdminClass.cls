public with sharing class InstallationFlowAdminClass {

	@AuraEnabled
	public static List < BA_Task_Chapter__c > getTaskChapters(String taskId) {
		// Add Check to make sure all fields are accessible to this user
		return [SELECT Id, ba_Sequence_Number__c, Name, ba_Chapter_Name__c, ba_Display_Name__c, ba_Chapter_Component_Name__c
			FROM BA_Task_Chapter__c WHERE ba_Task_Flow__r.Id =: taskId ORDER BY ba_Sequence_Number__c
		];
	}

	@AuraEnabled
	public static Account getGroupInformation(String GroupId) {
		// Add Check to make sure all fields are accessible to this user
		return [SELECT Id, Name, AccountNumber, ba_LegalEntityName__c, Ownership, Sic, ba_Email_Address__c, ba_RatingCounty__c, ba_RatingCounty__r.Name, TIN_EIN__c, ba_GroupStatus__c from Account where id =: GroupId];
	}
	
	
	@AuraEnabled
	public static Flow_Navigation__c navigationlogic(String flowname) {
		Flow_Navigation__c seq = Flow_Navigation__c.getInstance('BAMInstallationFlow');
		return seq;
		
	}
	
	@AuraEnabled
	public static void navigationlogicupdate(String status) {
		Flow_Navigation__c seq = Flow_Navigation__c.getInstance('BAMInstallationFlow');
		seq.Status__c = status;
		update seq;
		
	}
	
	
	

	@AuraEnabled
	public static void creategroupInformation(String GroupId, String info) {
		system.debug('Info' + info);
		Map < String, Object > objlist = (Map < String, Object > ) JSON.deserializeUntyped(info);
		system.debug('Eligibility' + objlist);
		system.debug(objlist.get('enrollselectedlst'));
		//to update group info
		Object groupdata = objlist.get('group');
		Map < String, Object > groupinfo = (Map < String, Object > ) groupdata;
		Account acc = new Account(Id = (String) groupinfo.get('Id'));
		acc.Name = (String) groupinfo.get('Name');
		acc.AccountNumber = (String) groupinfo.get('AccountNumber');
		system.debug('SIC' + (string) groupinfo.get('Sic'));
		BA_SicCode__c code = [Select id, ba_SICCode__c from BA_SicCode__c where ba_SICCode__c =: (string) groupinfo.get('Sic')];
		acc.Ownership = (String) groupinfo.get('Ownership');
		acc.Sic = code.ba_SICCode__c;
		acc.ba_RatingCounty__c = (string) groupinfo.get('ba_RatingCounty__c');
		if ((string) groupinfo.get('zipcode') != null) {
			BA_Zipcode_Admin__c admin = [Select ba_Zipcode__c, ba_City__c from BA_Zipcode_Admin__c where id =: (string) groupinfo.get('zipcode')];

			acc.ba_RatingZipcode__c = admin.ba_Zipcode__c;
			acc.ba_RatingZipcode__c = admin.ba_City__c;
		}
		acc.TIN_EIN__c = (Decimal) groupinfo.get('TIN_EIN__c');
		if (string.valueof(groupinfo.get('ba_EffectiveDate__c')) != null) {
			List < String > effectivedate = string.valueof(groupinfo.get('ba_EffectiveDate__c'))
				.split('-');
			Date groupeffdate = Date.newInstance(Integer.valueOf(effectivedate[0]), Integer.valueOf(effectivedate[1]), Integer.valueOf(effectivedate[2]));

			acc.ba_EffectiveDate__c = groupeffdate;
		}
		update acc;

		/* to insert eligibility information*/
		try {
			List < Object > eligibilitylst = (List < Object > ) objlist.get('BA_Eligiblity_Administration__c');

			BA_Group_Eligibilty__c eligible = new BA_Group_Eligibilty__c();
			system.debug('Eligibility info' + eligibilitylst);
			if (eligibilitylst != null) {

				eligible.ba_ParentGroup__c = GroupId;
				eligible.ba_Status__c = 'Current';
				eligible.ba_CreatedBy__c = System.now();
				insert eligible;
				list < BA_Group_Eligibilty__c > updatelist = new list < BA_Group_Eligibilty__c > ();
				list < BA_Group_Eligibilty__c > groupeligible = [Select id, ba_Status__c from BA_Group_Eligibilty__c where ba_ParentGroup__c =: GroupId
					AND id !=: eligible.Id
				];

				for (BA_Group_Eligibilty__c e: groupeligible) {
					e.ba_Status__c = 'History';
					updatelist.add(e);
				}

				update updatelist;

				list < BA_Group_Eligibility_Questions__c > questionlst = new list < BA_Group_Eligibility_Questions__c > ();
				for (Object eligiblity: eligibilitylst) {
					Map < String, Object > eligibleMap = (Map < String, Object > ) eligiblity;
					BA_Group_Eligibility_Questions__c questn = new BA_Group_Eligibility_Questions__c();
					questn.ba_Eligiblity_Question__c = (String) eligibleMap.get('Id');
					questn.ba_Eligiblity_Answer__c = (String) eligibleMap.get('ba_Default_Value__c');
					questn.ba_Eligibility__c = eligible.Id;
					questionlst.add(questn);
				}
				insert questionlst;
			}
		} catch (DMLException e) {
			system.debug('Error');
		}

		/* TO insert Quote Line Items as Benefit package*/
		try {
			list < Object > benefitpackagelst = (list < Object > ) objlist.get('SelectedQuoteLine');
			system.debug('Benefit Package' + benefitpackagelst);
			if (benefitpackagelst != null) {
				list < BA_Asset__c > benefitlst = new list < BA_Asset__c > ();
				for (Object pack: benefitpackagelst) {
					BA_Asset__c benefit = new BA_Asset__c();
					Map < String, Object > a2 = (Map < String, Object > ) pack;
					system.debug('Pack' + pack);
					benefit.ba_BenefitPackage__c = (String) a2.get('Predefined_Packages__c');
					benefit.ba_Group__c = GroupId;
					benefit.ba_QuoteLineID__c = (String) a2.get('Id');
					benefit.ba_Status__c = 'Active';
					benefit.ba_Type__c = 'Group Asset';
					/*	List < String > dateParts = string.valueof(a2.get('ServiceDate'))
							.split('-');
						Date dateform = Date.newInstance(Integer.valueOf(dateParts[0]), Integer.valueOf(dateParts[1]), Integer.valueOf(dateParts[2]));
						system.debug(dateform);
						List < String > terminatedateParts = string.valueof(a2.get('ba_TerminationDate__c'))
							.split('-');
						Date dateformterminate = Date.newInstance(Integer.valueOf(terminatedateParts[0]), Integer.valueOf(terminatedateParts[1]), Integer.valueOf(terminatedateParts[2]));
						system.debug(dateform);
						//String dayOrDate = dateform.format();

						benefit.ba_RateEffectiveDate__c = dateform;
						benefit.ba_RateTerminationDate__c = dateformterminate;*/

					Object quotelst = a2.get('Quote');
					Map < String, Object > quotelist = (Map < String, Object > ) quotelst;
					List < String > effdate = string.valueof(quotelist.get('ba_EffectiveDate__c'))
						.split('-');
					Date effdateform = Date.newInstance(Integer.valueOf(effdate[0]), Integer.valueOf(effdate[1]), Integer.valueOf(effdate[2]));
					system.debug(effdateform);
					List < String > terminatedate = string.valueof(quotelist.get('ba_TerminationDate__c'))
						.split('-');
					Date terminatedateform = Date.newInstance(Integer.valueOf(terminatedate[0]), Integer.valueOf(terminatedate[1]), Integer.valueOf(terminatedate[2]));
					system.debug(terminatedateform);

					benefit.ba_PolicyEffectiveDate__c = effdateform;
					benefit.ba_PolicyTerminationDate__c = terminatedateform;
					benefit.ba_RateEffectiveDate__c = effdateform;
					benefit.ba_RateTerminationDate__c = terminatedateform;
					benefit.ba_RatingRegion__c = (string) quotelist.get('ba_RatingRegion__c');

					benefitlst.add(benefit);
				}
				insert benefitlst;
				system.debug(benefitlst);
			}
		} catch (DMLException e) {

		}

		//To insert Group Class from the class Admin object
		List < Object > GroupClasslist = (List < Object > ) objlist.get('enrollselectedlst');
		list < BA_Classes__c > Classlist = new list < BA_Classes__c > ();
		Object GrpClass = objlist.get('GrpClass');
		Map < String, Object > GrpMap = (Map < String, Object > ) GrpClass;
		Map < String, BA_Classes__c > GrpClassMap = new Map < String, BA_Classes__c > ();
	if(GroupClasslist!=null){
		for (Object gclass: GroupClasslist) {
			Map < String, Object > ClassMap = (Map < String, Object > ) gclass;
			system.debug('Class' + classMap);
			BA_Classes__c cl = new BA_Classes__c();
			cl.ba_ClassDescription__c = (String) classMap.get('ba_Class_Description__c');
			cl.Name = (String) classMap.get('Name');
			cl.ba_ClassStatus__c = 'Active';
			cl.ba_EffectiveDate__c = acc.ba_EffectiveDate__c;
			cl.Enrollable_Class__c = (Boolean) classMap.get('ba_EnrollableClass__c');

			system.debug('#########Probationary' + GrpMap);
			if (!GrpMap.isEmpty()) {
				cl.ba_ProbationaryPeriod__c = (String) GrpMap.get('ba_ProbationaryPeriod__c');
				cl.ba_Waive_Probationary__c = Boolean.valueof(GrpMap.get('ba_Waive_Probationary__c'));
			} else {
				cl.ba_ProbationaryPeriod__c = 'None';
				cl.ba_Waive_Probationary__c = false;
			}

			Classlist.add(cl);

		}
		insert Classlist;
		
		system.debug(Classlist);
	}

		try {
			system.debug('&&&&&&&&&&&& Sub Group'+  objlist.get('subgrouplst'));
			/* to insert sub group information*/
			list < Object > subgrplst = (list < Object > ) objlist.get('subgrouplst');
			system.debug('SubGrp' + subgrplst);
			list < BA_Subgroup__c > sublist = new list < BA_Subgroup__c > ();
			Map < String, Object > addinfo = new Map < String, Object > ();
		if(subgrplst!=null){	
			for (Object sub: subgrplst) {
				BA_Subgroup__c subgrp = new BA_Subgroup__c();
				Map < String, Object > grp = (Map < String, Object > ) sub;
				system.debug('SubGrp' + sub);
				subgrp.Name = (String) grp.get('Name');
				subgrp.ba_SubgroupNumber__c = (String) grp.get('Number');
				subgrp.ba_Group__c = GroupId;
				subgrp.ba_SubgroupType__c = (String) grp.get('type');
				subgrp.ba_SubgroupStatus__c = (String) grp.get('status');
				subgrp.ba_TiNEiN__c = String.valueof(grp.get('TIN_EIN__c'));

				List < String > dateParts = string.valueof(grp.get('ba_EffectiveDate__c'))
					.split('-');
				Date dateform = Date.newInstance(Integer.valueOf(dateParts[0]), Integer.valueOf(dateParts[1]), Integer.valueOf(dateParts[2]));
				subgrp.ba_EffectiveDate__c = dateform;
				subgrp.ba_RatingCounty__c = (String) grp.get('groupregion');
				system.debug('Sub Group' + subgrp);

				if (addinfo.containsKey(subgrp.ba_SubgroupNumber__c)) {

				} else {
					addinfo.put(subgrp.ba_SubgroupNumber__c, grp.get('Address'));
				}
				system.debug(addinfo);

				sublist.add(subgrp);

			}
			insert sublist;
			system.debug('%%%%%%% Inserted Sub Group'+sublist);
			list < Ba_SubGroup_Addr_Intersection__c > addrlst = new list < Ba_SubGroup_Addr_Intersection__c > ();
			Map < Id, Object > addrMap = new Map < Id, Object > ();
			system.debug(addinfo);
			for (String grp: addinfo.keyset()) {
				system.debug(addinfo.get(grp));
				for (BA_Subgroup__c num: sublist) {
					if (num.ba_SubgroupNumber__c == grp) {
						addrMap.put(num.Id, addinfo.get(grp));
					}
				}
			}

			for (String subid: addrMap.keyset()) {
				list < Object > addrlist = (list < Object > ) addrMap.get(subid);
				system.debug(addrlist.size());
				for (Object interadd: addrlist) {
					Map < String, Object > addrlstMap = (Map < String, Object > ) interadd;
					Ba_SubGroup_Addr_Intersection__c intersect = new Ba_SubGroup_Addr_Intersection__c();
					if ((String) addrlstMap.get('primary') == 'Primary Address') {
						intersect.ba_Primary__c = true;
					}
					intersect.Address__c = (String) addrlstMap.get('value');
					intersect.Subgroup__c = subid;

					addrlst.add(intersect);
				}
			}
			insert addrlst;
			system.debug('Address Intersection' + addrlst);
			system.debug('Address list' + addrMap);
		}
		} catch (DMLException e) {
			system.debug('Error');
		}

		//To insert billing profile
		try {
			Object billing = objlist.get('BP');
			Map < String, Object > bill = (Map < String, Object > ) billing;
			Ba_Billing_Profile__c bprofile = new Ba_Billing_Profile__c();
			Object billAddress = objlist.get('Address');
			Map < String, Object > billaddr = (Map < String, Object > ) billAddress;
			system.debug('Billing Profile' + bprofile);
			system.debug('Billing Address' + billaddr);
			if(billaddr!=null){
			bprofile.Name = (String) bill.get('Name');
			//bprofile.Ba_Email__c=(String)bill.get('Ba_Email__c');
			if((String)bill.get('Ba_Bill_Cycle__c')!='None'){
			bprofile.Ba_Bill_Cycle__c=(String)bill.get('Ba_Bill_Cycle__c');
			}
			bprofile.Ba_Group__c = GroupId;
			if((String) bill.get('Ba_Bill_Method__c')!='None'){
			    bprofile.Ba_Bill_Method__c = (String) bill.get('Ba_Bill_Method__c');
			}
			bprofile.Ba_Address1__c = (String) billaddr.get('ba_AddressLine_1__c');
			bprofile.Ba_Address2__c = (String) billaddr.get('ba_AddressLine2__c');
			bprofile.City__c = (String) billaddr.get('ba_City__c');
			bprofile.Ba_Country__c = (String) billaddr.get('ba_County__c');
			bprofile.Ba_State__c = (String) billaddr.get('Ba_State__c');
			bprofile.Ba_ZipCode__c = (String) billaddr.get('Ba_ZipCode__c');
			//bprofile.ba_NextDue__c=(String)bill.get('ba_NextDue__c');
			insert bprofile;
			system.debug(bprofile);
			}
		} catch (DMLException e) {
			system.debug('Error');
		}

		// to insert notes
		list < Object > notelst = (list < Object > ) objlist.get('Notes');
		system.debug('Notes' + notelst);
		list < ContentNote > notelist = new list < ContentNote > ();
		list < ContentDocumentLink > Contentnotelist = new list < ContentDocumentLink > ();
		if(notelst!=null){
		for (Object n: notelst) {
			ContentNote noteobj = new ContentNote();
			Map < String, Object > notes = (Map < String, Object > ) n;
			noteobj.Content = Blob.valueOf((String) notes.get('Content'));
			noteobj.Title = (String) notes.get('title');
			notelist.add(noteobj);
		}
		insert notelist;
		for (ContentNote notein: notelist) {
			ContentDocumentLink link = new ContentDocumentLink();
			link.LinkedEntityId = GroupId;
			link.ContentDocumentId = notein.Id;
			link.ShareType = 'V';
			Contentnotelist.add(link);
		}

		upsert Contentnotelist;
		}
	}

	@AuraEnabled
	public static void pauseFlowInfo(String GroupId, String info, Id task, String flowname) {
		// Add Check to make sure all fields are accessible to this user
		Account GroupInfo = [Select name from Account where Id =: GroupId];
		system.debug('Task' + task);
		system.debug('Pause info' + info);
		Pause_Task__c pause = new Pause_Task__c();
		pause.Name = flowname + ' - ' + GroupInfo.Name;
		pause.Task_Chapter__c = task;
		pause.Ba_Parent_Id__c = GroupId;
		insert pause;
		ContentVersion conVer = new ContentVersion();
		//conVer.ContentLocation = 'E'; // S specify this document is in SF, use E for external files
		conVer.PathOnClient = 'Paused Attributes'; // The files name, extension is very important here which will help the file in preview.
		conVer.Title = 'Paused Attributes'; // Display name of the files
		conVer.VersionData = Blob.valueof(info); // converting your binary string to Blob
		conVer.IsMajorVersion = false;
		insert conVer;

		Id conDoc = [SELECT ContentDocumentId FROM ContentVersion WHERE Id =: conVer.Id].ContentDocumentId;

		//Create ContentDocumentLink
		ContentDocumentLink cDe = new ContentDocumentLink();
		cDe.ContentDocumentId = conDoc;
		cDe.LinkedEntityId = pause.Id; // you can use objectId,GroupId etc
		cDe.ShareType = 'V'; // Inferred permission, checkout description of ContentDocumentLink object for more details
		//cDe.Visibility = 'InternalUsers';
		insert cDe;
	}

	@AuraEnabled
	public static String resumetaskflow(Pause_Task__c pauseFlow) {
		ContentDocumentLink link = [select ContentDocumentId from ContentDocumentLink where LinkedEntityId =: pauseFlow.Id];
		ContentVersion doc = [Select id, VersionData from ContentVersion where ContentDocumentId =: link.ContentDocumentId limit 1];
		system.debug('Version' + doc.VersionData.toString());
		return doc.VersionData.toString();
	}

	//Commit logic for New Quote Request flow
	@AuraEnabled
	public static void commitRecordInfo(String GroupId, String AttInfo, String flowname) {
		if (flowname == 'BAMInstallEmployerGroup') {
			creategroupInformation(GroupId, AttInfo);
		} else if (flowname == 'BAMQuoteRequestFlow') {
			system.debug('Info' + AttInfo);
			Map < String, Object > objlist = (Map < String, Object > ) JSON.deserializeUntyped(AttInfo);
			system.debug('Eligibility' + objlist);

			//to update group info
			Object groupdata = objlist.get('group');
			Map < String, Object > groupinfo = (Map < String, Object > ) groupdata;
			Account acc = new Account(Id = (String) groupinfo.get('Id'));
			acc.Name = (String) groupinfo.get('Name');
			acc.AccountNumber = (String) groupinfo.get('AccountNumber');
			BA_SicCode__c code = [Select id, ba_SICCode__c from BA_SicCode__c where id =: (string) groupinfo.get('groupsic')];
			acc.Ownership = (String) groupinfo.get('Ownership');
			acc.Sic = code.ba_SICCode__c;
			acc.ba_RatingCounty__c = (string) groupinfo.get('ba_RatingCounty__c');
			acc.TIN_EIN__c = (Decimal) groupinfo.get('TIN_EIN__c');

			system.debug('@@@@@@@@@@Zip Code' + (string) groupinfo.get('ba_RatingCounty__c'));
			if ((string) groupinfo.get('ba_RatingCounty__c') != null) {
				BA_Zipcode_Admin__c admin = [Select ba_Zipcode__c, ba_City__c from BA_Zipcode_Admin__c where id =: (string) groupinfo.get('ba_RatingCounty__c')];
				system.debug('####' + admin);
				acc.ba_RatingZipcode__c = admin.ba_Zipcode__c;
				acc.ba_RatingCity__c = admin.ba_City__c;
			}

			List < String > effectivedate = string.valueof(groupinfo.get('ba_EffectiveDate__c'))
				.split('-');
			//system.debug('Date split'+effectivedate);
			Date groupeffdate = Date.newInstance(Integer.valueOf(effectivedate[0]), Integer.valueOf(effectivedate[1]), Integer.valueOf(effectivedate[2]));
			//system.debug('Account date'+groupeffdate);	
			acc.ba_EffectiveDate__c = groupeffdate;
			acc.ba_TermindationDate__c = groupeffdate.addMonths(12);
			acc.ba_RenewalMonth__c = (string) groupinfo.get('ba_RenewalMonth__c');
			acc.Industry = (string) groupinfo.get('Industry');
			update acc;

			/* to insert eligibility information*/
			try {
				List < Object > eligibilitylst = (List < Object > ) objlist.get('BA_Eligiblity_Administration__c');
				system.debug('Eligibility info' + eligibilitylst.size());
				BA_Group_Eligibilty__c eligible = new BA_Group_Eligibilty__c();
				if (eligibilitylst.size() > 0) {

					eligible.ba_ParentGroup__c = GroupId;
					eligible.ba_Status__c = 'Current';
					eligible.ba_CreatedBy__c = System.now();
					insert eligible;
					list < BA_Group_Eligibilty__c > updatelist = new list < BA_Group_Eligibilty__c > ();
					list < BA_Group_Eligibilty__c > groupeligible = [Select id, ba_Status__c from BA_Group_Eligibilty__c where ba_ParentGroup__c =: GroupId
						AND id !=: eligible.Id
					];

					for (BA_Group_Eligibilty__c e: groupeligible) {
						e.ba_Status__c = 'History';
						updatelist.add(e);
					}

					update updatelist;
				}

				list < BA_Group_Eligibility_Questions__c > questionlst = new list < BA_Group_Eligibility_Questions__c > ();
				for (Object eligiblity: eligibilitylst) {
					Map < String, Object > eligibleMap = (Map < String, Object > ) eligiblity;
					BA_Group_Eligibility_Questions__c questn = new BA_Group_Eligibility_Questions__c();
					questn.ba_Eligiblity_Question__c = (String) eligibleMap.get('Id');
					questn.ba_Eligiblity_Answer__c = (String) eligibleMap.get('ba_Default_Value__c');
					questn.ba_Eligibility__c = eligible.Id;
					questionlst.add(questn);
				}
				insert questionlst;

			} catch (DMLException e) {
				system.debug('Error');
			}

			/* to insert account team*/

			try {
				Object Accteam = objlist.get('AccTeam');
				System.debug('Account Team' + Accteam);
				AccountTeamMember team = new AccountTeamMember();
				team.TeamMemberRole = 'Account Manager';
				team.UserId = (String) AccTeam;
				team.OpportunityAccessLevel = 'Edit';
				team.ContactAccessLevel = 'Edit';
				team.AccountAccessLevel = 'Edit';
				team.CaseAccessLevel = 'Edit';
				team.AccountId = GroupId;
				insert team;
				Object Accteam1 = objlist.get('AccTeam1');
				AccountTeamMember team1 = new AccountTeamMember();
				team1.TeamMemberRole = 'Sales Manager';
				team1.UserId = (String) AccTeam1;
				team1.OpportunityAccessLevel = 'Edit';
				team1.ContactAccessLevel = 'Edit';
				team1.AccountAccessLevel = 'Edit';
				team1.CaseAccessLevel = 'Edit';
				team1.AccountId = GroupId;
				insert team1;
				Object Accteam2 = objlist.get('AccTeam2');
				AccountTeamMember team2 = new AccountTeamMember();
				team2.TeamMemberRole = 'Underwriter';
				team2.UserId = (String) AccTeam2;
				team2.OpportunityAccessLevel = 'Edit';
				team2.ContactAccessLevel = 'Edit';
				team2.AccountAccessLevel = 'Edit';
				team2.CaseAccessLevel = 'Edit';
				team2.AccountId = GroupId;
				insert team2;

			} catch (DMLException e) {
				system.debug('Error');
			}

			//to insert Group competitor
			List < Object > Competitorlist = (List < Object > ) objlist.get('packagelist');
			list < BA_Group_Competitor__c > complist = new list < BA_Group_Competitor__c > ();
			list < BA_Group_Competitor_Product__c > comproductlist = new list < BA_Group_Competitor_Product__c > ();

			Map < Integer, Object > productMap = new Map < Integer, Object > ();
			Map < Integer, BA_Group_Competitor__c > competitorMap = new Map < Integer, BA_Group_Competitor__c > ();
			Map < Integer, Object > ratelistMap = new Map < Integer, Object > ();

			system.debug('Wrapper' + Competitorlist);
			for (integer i = 0; i < Competitorlist.size(); i = i + 1) {
				Object wrp = Competitorlist[i];
				Map < String, Object > WrpMap = (Map < String, Object > ) wrp;
				BA_Group_Competitor__c grpcomp = new BA_Group_Competitor__c();
				grpcomp.ba_CompetitorName__c = (String) WrpMap.get('CarrierName');
				grpcomp.ba_Group__c = GroupId;
				// grpcomp.ba_ContractsEnrolled__c=0; //needs to be discussed
				complist.add(grpcomp);
				BA_Group_Competitor_Product__c product = new BA_Group_Competitor_Product__c();
				if (competitorMap.containsKey(i)) {

				} else {
					competitorMap.put(i, grpcomp);
				}

				if (productMap.containsKey(i)) {

				} else {
					productMap.put(i, WrpMap.get('competitorproduct'));
				}

				if (ratelistMap.containsKey(i)) {

				} else {
					//System.debug(WrpMap.get('productrates').size());
					ratelistMap.put(i, WrpMap.get('productrates'));
				}

			}

			insert complist;
			// system.debug('Map after insert'+productMap);
			system.debug('@@@@@@@@@@//' + competitorMap);
			system.debug('@@@@@@@@@@' + productMap);

			Map < Integer, BA_Group_Competitor_Product__c > insertedproduct = new Map < Integer, BA_Group_Competitor_Product__c > ();
			Map < Integer, Object > productratelistMap = new Map < Integer, Object > ();

			for (Integer k: competitorMap.keySet()) {
				for (Integer m: productMap.keyset()) {
					if (k == m) {
						system.debug(productMap.get(m));
						if (productMap.get(m) != null) {
							integer i = 0;
							Object wrpComp = Competitorlist[m];
							Map < String, Object > CompWrpMap = (Map < String, Object > ) wrpComp;
							BA_Group_Competitor_Product__c product = new BA_Group_Competitor_Product__c();
							Object productObj = productMap.get(m);
							Map < String, Object > prod = (Map < String, Object > ) productObj;
							product.ba_HdhpOption__c = (String) prod.get('ba_HdhpOption__c');
							product.ba_ProductName__c = (String) prod.get('PlanName');
							system.debug('########' + prod.get('ba_MedicalBenefits__c'));
							if ((String) CompWrpMap.get('Category') != 'None') {
								product.ba_ProductCategory__c = (String) CompWrpMap.get('Category');
							}
							product.ba_LineOfBusiness__c = 'Large Group';
							if (CompWrpMap.get('Type') != 'None') {
								product.ba_PlanType__c = (String) CompWrpMap.get('Type');
							}
							if (prod.get('ba_MedicalBenefits__c') != null) {
								product.ba_MedicalBenefits__c = (Boolean) prod.get('ba_MedicalBenefits__c');
							}
							if (prod.get('ba_PrescriptionDrugsBenefits__c') != null) {
								product.ba_PrescriptionDrugsBenefits__c = (Boolean) prod.get('ba_PrescriptionDrugsBenefits__c');
							}
							if (prod.get('ba_ReligiousOrganizationException__c') != null) {
								product.ba_ReligiousOrganizationException__c = (Boolean) prod.get('ba_ReligiousOrganizationException__c');
							}

							if (prod.get('ba_IncentiveProgram__c') != null) {
								product.ba_IncentiveProgram__c = (Boolean) prod.get('ba_IncentiveProgram__c');
							}
							if (prod.get('ba_RemoveDomesticPartner__c') != null) {
								product.ba_RemoveDomesticPartner__c = (Boolean) prod.get('ba_RemoveDomesticPartner__c');
							}
							if (prod.get('ba_CareManagement__c') != null) {
								product.ba_CareManagement__c = (Boolean) prod.get('ba_CareManagement__c');
							}
							if (prod.get('ba_FederalMentalHealth__c') != null) {
								product.ba_FederalMentalHealth__c = (Boolean) prod.get('ba_FederalMentalHealth__c');
							}
							product.ba_PcpSpcCopay__c = (String) prod.get('ba_PcpSpcCopay__c');
							product.ba_Deductitble__c = (String) prod.get('ba_Deductitble__c');
							product.ba_InpatientCopay__c = (String) prod.get('ba_InpatientCopay__c');
							product.ba_Dme__c = (String) prod.get('ba_Dme__c');
							product.ba_EmergencyRoomCopay__c = (String) prod.get('ba_EmergencyRoomCopay__c');
							product.ba_DependentStudentAge__c = (String) prod.get('ba_DependentStudentAge__c');
							product.ba_EquipmentRider__c = (String) prod.get('ba_EquipmentRider__c');
							product.ba_DrugOptions__c = (String) prod.get('ba_DrugOptions__c');
							product.ba_PackageId__c = (String) prod.get('ba_PackageId__c');
							product.ba_ParentCompetitor__c = competitorMap.get(k)
								.Id;
							comproductlist.add(product);
							if (insertedproduct.containsKey(m)) {

							} else {
								insertedproduct.put(m, product);
							}

							if (productratelistMap.containsKey(m)) {

							} else {
								productratelistMap.put(m, ratelistMap.get(m));
							}

						}
					}
				}

			}

			insert comproductlist;
			system.debug('Product' + comproductlist);
			list < BA_Group_Comp_Product_Rates__c > ratelist = new list < BA_Group_Comp_Product_Rates__c > ();

			system.debug('Inserted product' + insertedproduct);
			system.debug('Inserted rates' + productratelistMap);

			for (Integer k: insertedproduct.keyset()) {
				for (Integer l: productratelistMap.keyset()) {
					system.debug(productratelistMap.get(l));
					if (k == l) {
						system.debug('k' + k);
						system.debug('l' + l);
						if (productratelistMap.get(l) != null) {

							Object ratesObj = productratelistMap.get(l);
							system.debug('Obj' + ratesObj);
							list < Object > ratingMap = (list < Object > ) ratesObj;
							system.debug('list' + ratingMap);
							for (Object r: ratingMap) {
								Map < String, Object > ratesMap = (Map < String, Object > ) r;
								system.debug('Map' + ratesMap);

								system.debug('!!!!!!!!!' + productMap.get(l));
								Map < String, Object > p = (Map < String, Object > ) productMap.get(l);
								List < String > dateto = string.valueof(p.get('ba_RateEffectiveDate__c'))
									.split('-');
								Date expto = Date.newInstance(Integer.valueOf(dateto[0]), Integer.valueOf(dateto[1]), Integer.valueOf(dateto[2]));

								List < String > datefrom = string.valueof(p.get('ba_RateTerminationDate__c'))
									.split('-');
								Date expfrom = Date.newInstance(Integer.valueOf(datefrom[0]), Integer.valueOf(datefrom[1]), Integer.valueOf(datefrom[2]));

								if (ratesMap.get('name') != 'total') {

									if (ratesMap.get('subscriber') != null) {

										BA_Group_Comp_Product_Rates__c rates = new BA_Group_Comp_Product_Rates__c();
										rates.ba_Rate_Type__c = (String) ratesMap.get('name');
										rates.ba_RateTier__c = (String) p.get('ba_RateTier__c');
										rates.ba_Competitor_Product__c = (String) insertedproduct.get(l)
											.Id;
										rates.ba_Rate_Level__c = 'Subscriber';
										rates.ba_Rate__c = Decimal.valueof((String) ratesMap.get('subscriber'));
										rates.ba_RateEffectiveDate__c = expto;
										rates.ba_RateTerminationDate__c = expfrom;
										ratelist.add(rates);
									}
									if (ratesMap.get('spouse') != null) {

										BA_Group_Comp_Product_Rates__c rates1 = new BA_Group_Comp_Product_Rates__c();
										rates1.ba_Rate_Type__c = (String) ratesMap.get('name');
										rates1.ba_RateTier__c = (String) p.get('ba_RateTier__c');
										rates1.ba_Competitor_Product__c = (String) insertedproduct.get(l)
											.Id;
										rates1.ba_Rate_Level__c = 'Subscriber/Spouse';
										rates1.ba_Rate__c = Decimal.valueof((String) ratesMap.get('spouse'));
										rates1.ba_RateEffectiveDate__c = expto;
										rates1.ba_RateTerminationDate__c = expfrom;
										ratelist.add(rates1);
									}
									if (ratesMap.get('children') != null) {
										BA_Group_Comp_Product_Rates__c rates2 = new BA_Group_Comp_Product_Rates__c();
										rates2.ba_Rate_Type__c = (String) ratesMap.get('name');
										rates2.ba_RateTier__c = (String) p.get('ba_RateTier__c');
										rates2.ba_Competitor_Product__c = (String) insertedproduct.get(l)
											.Id;
										rates2.ba_Rate_Level__c = 'Subscriber/Children';
										rates2.ba_Rate__c = Decimal.valueof((String) ratesMap.get('children'));
										rates2.ba_RateEffectiveDate__c = expto;
										rates2.ba_RateTerminationDate__c = expfrom;
										ratelist.add(rates2);
									}
									if (ratesMap.get('family') != null) {
										BA_Group_Comp_Product_Rates__c rates3 = new BA_Group_Comp_Product_Rates__c();
										rates3.ba_Rate_Type__c = (String) ratesMap.get('name');
										rates3.ba_RateTier__c = (String) p.get('ba_RateTier__c');
										rates3.ba_Competitor_Product__c = (String) insertedproduct.get(l)
											.Id;
										rates3.ba_Rate_Level__c = 'Family';
										rates3.ba_Rate__c = Decimal.valueof((String) ratesMap.get('family'));
										rates3.ba_RateEffectiveDate__c = expto;
										rates3.ba_RateTerminationDate__c = expfrom;
										ratelist.add(rates3);
									}

									system.debug('rates+' + ratelist);
								}

							}
						}
					}
				}
			}

			insert ratelist;

			Opportunity opp = new Opportunity();

			List < Opportunity > opt = [Select id from Opportunity where ba_TargetEffectiveDate__c =: acc.ba_TermindationDate__c
				AND ba_OpportunityStatus__c = 'Open'
				LIMIT 1
			];

			if (opt.size() > 0) {
				opp = opt[0];
			} else {
				opp.ba_FinancialArrangement__c = 'Prospective';
				opp.AccountId = GroupId;
				opp.Name = 'New Quote';
				opp.StageName = 'Proposal/Price Quote';
				opp.CloseDate = acc.ba_TermindationDate__c;
				opp.ba_BusinessSegment__c = 'large Group';
				opp.ba_OpportunityStatus__c = 'open';
				opp.ba_TargetEffectiveDate__c = acc.ba_TermindationDate__c;
				insert opp;
			}
			Quote q = new Quote();
			system.debug('*******' + acc);
			RecordType objRecType = [SELECT Id, Name FROM RecordType where Name = 'New Quote Request'
				limit 1
			];
			q.RecordTypeId = objRecType.Id;
			q.OpportunityId = opp.Id;
			q.Name = 'New Quote Request';
			q.Status = 'Created';
			q.ba_RatingRegion__c = acc.ba_RatingZipcode__c;
			q.ba_EffectiveDate__c = acc.ba_EffectiveDate__c;
			q.ba_TerminationDate__c = acc.ba_TermindationDate__c;
			//q.ba_RatingMethodology__c = 'Composite'; //needs to be discussed
			insert q;

			try {
				system.debug('Census Data' + objlist.get('data'));
				//to insert quote census
				List < Object > Datalist = (List < Object > ) objlist.get('data');
				//Map <String,Object> DataMap =  (Map<String,Object> ) objlist.get('data');
				list < BA_Quote_Census__c > Censuslist = new list < BA_Quote_Census__c > ();
				for (Object census: Datalist) {

					Map < String, Object > CensusMap = (Map < String, Object > ) census;
					BA_Quote_Census__c quote = new BA_Quote_Census__c();
					quote.ba_Member__c = (String) CensusMap.get('FirstName') + (String) CensusMap.get('LastName');
					System.debug('Date' + CensusMap.get('Date'));
					List < String > BirthDate = string.valueof(CensusMap.get('Date'))
						.split('/');
					system.debug('Date split' + BirthDate);
					Date birthinfo = Date.newInstance(Integer.valueOf(BirthDate[2]), Integer.valueOf(BirthDate[1]), Integer.valueOf(BirthDate[0]));
					system.debug('Date of birth' + birthinfo);
					quote.ba_MemberDOB__c = birthinfo;
					quote.ba_MemberGender__c = (String) CensusMap.get('Gender');
					quote.ba_Relation__c = (String) CensusMap.get('Relation');
					quote.ba_EmployeeNumber__c = (String) CensusMap.get('EmployeeId');
					quote.Quote__c = q.Id;
					quote.ba_CensusEffectiveDate__c = q.ba_EffectiveDate__c;
					quote.ba_CensusTerminationDate__c = q.ba_TerminationDate__c;
					quote.ba_Status__c = 'Active';
					quote.ba_TobaccoUse__c = Boolean.valueof(CensusMap.get('Tobacco'));
					Censuslist.add(quote);

				}
				insert Censuslist;
			} catch (DMLException e) {
				system.debug('Error');
			}

			//to insert claims Experience

			try {
				Object ClaimsExp = objlist.get('CERx');
				Map < String, Object > exp = (Map < String, Object > ) ClaimsExp;
				Ba_Claim_Experience__c claims = new Ba_Claim_Experience__c();
				system.debug('@@@@@@@@@@@@' + exp);
				if (!exp.isEmpty()) {
					system.debug('##############' + Decimal.valueof((String) exp.get('Ba_High_Level_Claims__c')));
					claims.Ba_High_Level_Claims__c = Decimal.valueof((String) exp.get('Ba_High_Level_Claims__c'));
					claims.Ba_Current_Polling_Point__c = Integer.valueOf(exp.get('Ba_Current_Polling_Point__c'));
					claims.Ba_Category__c = 'Prescription/Rx';
					claims.Ba_High_Level_Claims__c = Decimal.valueof((String) exp.get('Ba_High_Level_Claims__c'));
					claims.Ba_Captation__c = (Decimal) exp.get('Ba_Captation__c');
					claims.Ba_Average_Entrollment__c = Integer.valueof((String) exp.get('Ba_Average_Entrollment__c'));
					claims.Ba_Average_Entrolled_Members__c = Integer.valueof((String) exp.get('Ba_Average_Entrolled_Members__c'));
					claims.Ba_Claims__c = Integer.valueof((String) exp.get('Ba_Claims__c'));
					claims.Ba_Billed_Premium__c = Decimal.valueof((String) exp.get('Ba_Billed_Premium__c'));
					List < String > datefrom = string.valueof(exp.get('Ba_Experience_Date_From__c'))
						.split('-');
					Date expdate = Date.newInstance(Integer.valueOf(datefrom[0]), Integer.valueOf(datefrom[1]), Integer.valueOf(datefrom[2]));

					claims.Ba_Experience_Period_From__c = expdate;
					List < String > dateto = string.valueof(exp.get('Ba_Experience_Date_To__c'))
						.split('-');
					Date expto = Date.newInstance(Integer.valueOf(dateto[0]), Integer.valueOf(dateto[1]), Integer.valueOf(dateto[2]));

					claims.Ba_Experience_Period_To__c = expto;
					claims.Ba_Group__c = GroupId;
					insert claims;
				}
			} catch (DMLException e) {
				system.debug('Error');
			}

			try {
				Object Claimshealth = objlist.get('CEHealth');
				Map < String, Object > health = (Map < String, Object > ) Claimshealth;
				Ba_Claim_Experience__c claims = new Ba_Claim_Experience__c();
				if (!health.isEmpty()) {
					claims.Ba_High_Level_Claims__c = Decimal.valueof((String) health.get('Ba_High_Level_Claims__c'));
					claims.Ba_Current_Polling_Point__c = Integer.valueof((String) health.get('Ba_Current_Polling_Point__c'));
					claims.Ba_Category__c = 'Health';
					claims.Ba_High_Level_Claims__c = Decimal.valueof((String) health.get('Ba_High_Level_Claims__c'));
					system.debug('##############' + health);
					claims.Ba_Captation__c = (Decimal) health.get('Ba_Captation__c');
					claims.Ba_Average_Entrollment__c = Integer.valueof((String) health.get('Ba_Average_Entrollment__c'));
					claims.Ba_Average_Entrolled_Members__c = Integer.valueof((String) health.get('Ba_Average_Entrolled_Members__c'));
					claims.Ba_Claims__c = Integer.valueof((String) health.get('Ba_Claims__c'));
					claims.Ba_Billed_Premium__c = Decimal.valueof((String) health.get('Ba_Billed_Premium__c'));
					List < String > datefrom = string.valueof(health.get('Ba_Experience_Date_From__c'))
						.split('-');
					Date expdate = Date.newInstance(Integer.valueOf(datefrom[0]), Integer.valueOf(datefrom[1]), Integer.valueOf(datefrom[2]));

					claims.Ba_Experience_Period_From__c = expdate;
					List < String > dateto = string.valueof(health.get('Ba_Experience_Date_To__c'))
						.split('-');
					Date expto = Date.newInstance(Integer.valueOf(dateto[0]), Integer.valueOf(dateto[1]), Integer.valueOf(dateto[2]));

					claims.Ba_Experience_Period_From__c = expto;
					claims.Ba_Group__c = GroupId;
					insert claims;
				}
			} catch (DMLException e) {
				system.debug('Error');
			}

			//to insert group class
			List < Object > GroupClasslist = (List < Object > ) objlist.get('enrollselectedlst');
			list < ba_Quote_Request_Class__c > Classlist = new list < ba_Quote_Request_Class__c > ();
			Object GrpClass = objlist.get('GrpClass');
			Map < String, Object > GrpMap = (Map < String, Object > ) GrpClass;
			Map < String, ba_Quote_Request_Class__c > GrpClassMap = new Map < String, ba_Quote_Request_Class__c > ();

			for (Object gclass: GroupClasslist) {
				Map < String, Object > ClassMap = (Map < String, Object > ) gclass;
				system.debug('Class' + classMap);
				ba_Quote_Request_Class__c cl = new ba_Quote_Request_Class__c();
				cl.ba_ClassDescription__c = (String) classMap.get('ba_Class_Description__c');
				cl.Name = (String) classMap.get('Name') + ' Quote Request';
				cl.ba_ClassStatus__c = 'Active';
				cl.ba_EffectiveDate__c = acc.ba_EffectiveDate__c;
				cl.ba_EnrollableClass__c = (Boolean) classMap.get('ba_EnrollableClass__c');
				cl.ba_Quote__c = q.Id;
				cl.ba_ClassID__c = (String) classMap.get('Name');
				cl.ba_TerminationDate__c = q.ba_TerminationDate__c;

				system.debug('#########Probationary' + GrpMap);
				if (!GrpMap.isEmpty()) {
					cl.ba_ProbationaryPeriod__c = (String) GrpMap.get('ba_ProbationaryPeriod__c');
					cl.ba_Waive_Probationary__c = Boolean.valueof(GrpMap.get('ba_Waive_Probationary__c'));
				} else {
					cl.ba_ProbationaryPeriod__c = 'None';
					cl.ba_Waive_Probationary__c = false;
				}

				String classId = (String) classMap.get('Id');
				if (GrpClassMap.containsKey(classId)) {

				} else {
					GrpClassMap.put(classId, cl);
				}

				Classlist.add(cl);

			}
			insert Classlist;
			system.debug('%%%%%%%%%%Map' + GrpClassMap);
			List < Object > ClassPackagelist = (List < Object > ) objlist.get('Classpackagelist');
			list < ba_QuoteRequestClassPackage__c > Quotepacklist = new list < ba_QuoteRequestClassPackage__c > ();
			for (String grp: GrpClassMap.keyset()) {
				for (Object pack: ClassPackagelist) {
					Map < String, Object > PackageMap = (Map < String, Object > ) pack;
					system.debug('Id' + grp);
					system.debug('Package Id' + PackageMap);
					if (grp == PackageMap.get('ClassId')) {

						Object packObj = PackageMap.get('packlist');
						Map < String, Object > packMap1 = (Map < String, Object > ) packObj;
						//system.debug('List'+packagelist);
						Object packrows = packMap1.get('rows');
						list < Object > packagelist = (list < Object > ) packrows;
						for (Object packlist: packagelist) {
							ba_QuoteRequestClassPackage__c quotepack = new ba_QuoteRequestClassPackage__c();
							Map < String, Object > packMap = (Map < String, Object > ) packlist;
							quotepack.ba_PredefinedPackage__c = (String) packMap.get('Id');
							quotepack.ba_ClassID__c = GrpClassMap.get(grp)
								.Id;
							quotepack.ba_Quote__c = q.Id;
							quotepack.ba_EffectiveDate__c = q.ba_EffectiveDate__c;
							quotepack.ba_RateEffectiveDate__c = q.ba_EffectiveDate__c;
							quotepack.ba_TerminationDate__c = q.ba_TerminationDate__c;
							quotepack.ba_RateTerminationDate__c = q.ba_TerminationDate__c;
							Quotepacklist.add(quotepack);

						}
					}
				}
			}

			insert Quotepacklist;

		}

	}

}