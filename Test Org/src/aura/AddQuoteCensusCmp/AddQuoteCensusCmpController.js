({
	doInit: function(component, event, helper) {
 /*Get member information on page load */
		var cellinfo = {
			'ID': '',
			'LastName': '',
			'FirstName': '',
			'Date': '',
			'Tobacco': '',
			'Relation': '',
			'CheckVal': false
		};
		component.set("v.newinfo", cellinfo);
		
		/*if no dependent table should not exist */
		if (component.get("v.Dependent").length > 0) {
			$A.util.removeClass(component.find('dep-id'), 'hideContent');
		}
	},

	readCSV: function(component, event, helper) {
   /*Read CSV file data and display in the table*/
		component.set("v.showSpinner", false);
		var cellsdata = [];

		var cellobj = [];
		var depobj = [];
		if (cellobj === undefined) {
			cellobj = [];
		}
		if (depobj === undefined) {
			depobj = [];
		}
		console.log(JSON.stringify(event.getSource().get("v.files")));
		var filename = event.getSource().get("v.files");  /*To get the file details*/
		
		/* If no file selected display toast message*/
		if (filename[0] === undefined || filename[0] === null || filename[0] === '') {

			var toastEvent = $A.get("e.force:showToast");
			toastEvent.setParams({
				"title": "Warning!",
				"message": "No file inserted"
			});
			toastEvent.fire();
		} else {
			$A.util.addClass(component.find('dep-id'), 'hideContent');
			console.log('Size' + filename[0].size);
			var textdata;
			var reader = new FileReader();
			reader.onload = function() {
				var text = reader.result; /*Get the data stored in file*/
				console.log(reader.result.substring(0, 200));
				console.log('Data from CSV file' + text);
				textdata = text;
				var header = textdata.split('\n'); /*Spilt based on new line to get each row*/
				console.log('header' + header[0]);
				/* Ignore the first row and start from second*/
				for (var i = 1; i < header.length; i = i + 1) {
					console.log('Length', +header[i].length);
					/*Spilt based on the comma*/
					var cells = header[i].split(',');
					console.log('Cells' + cells);
					console.log('Cell length' + cells.length);
					/*Store the retrieved records in object*/
					// console.log('Relation type'+cells[5]);
					if (header[i].length === 0) {} else {
						var relation = cells[5].split('\r');
						var cellinfo = {
							'ID': cells[0],
							'LastName': cells[1],
							'FirstName': cells[2],
							'Date': cells[3],
							'Tobacco': cells[4],
							'Relation': relation[0],
							'CheckVal': false
						};
						if (cellinfo.Tobacco === 'TRUE') {
							cellinfo.CheckVal = true;
						}
						if (cellinfo.Relation !== 'Dependent') {
							cellobj.push(cellinfo);
						} else {
							depobj.push(cellinfo);
						}
					}
				}
				/* set the data in an attribute of type object*/
				component.set("v.cellinfo", cellobj);
				component.set("v.AllDependent", depobj);
				if (component.get("v.Dependent")
					.length > 0) {
					$A.util.removeClass(component.find('dep-id'), 'hideContent');
				}
				console.log('CSV info' + JSON.stringify(component.get("v.cellinfo")));
			}
		};
		if (filename[0] !== undefined && filename[0] !== null && filename[0] !== '') {
			reader.readAsText(filename[0]);
		}
		component.set("v.showSpinner", false);
	},

	deleteinfo: function(component, event, helper) {
		/* To delete all the members and dependents*/
		component.set("v.cellinfo", );
		component.set("v.Dependent", );
		component.set("v.AllDependent", );
		$A.util.addClass(component.find('dep-id'), "hideContent");
		console.log('In delete' + JSON.stringify(component.get("v.cellinfo")));
		
	},

	getmembers: function(component, event, helper) {
	/* to retrieve members and related dependents*/
		
		$A.util.addClass(component.find('dep-id'), 'hideContent');
		component.set("v.showSpinner", true);
		var cellinfo = [];
		if (cellinfo === undefined) {
			cellinfo = [];
		}
		console.log('Here');
		var action = component.get("c.fetchquoteinfo");
		action.setParams({
			'GroupId': component.get("v.GroupId")
		});
		action.setCallback(this, function(response) {
			var state = response.getState();
			if (state === "SUCCESS") {
				console.log('Result' + response.getReturnValue());
				var res = response.getReturnValue();
				console.log('Result' + JSON.stringify(res));
				component.set("v.showSpinner", false);
				if (res === null || res === '' || res.length === 0) {
					 var toastEvent = $A.get("e.force:showToast");
					 toastEvent.setParams({
						 "title": "Warning!",
						 "message": "No members found."
				});
					 toastEvent.fire();
				} else {
					console.log('Length' + res.length);
					for (var i = 0; i < res.length; i = i + 1) {
						var info = {
							'conid': res[i].Id,
							'ID': res[i].ba_MemberNumber__c,
							'LastName': res[i].LastName,
							'FirstName': res[i].FirstName,
							'Date': res[i].Birthdate,
							'Tobacco': res[i].ba_TobaccoUse__c,
							'CheckVal': false,
						};
						if (info.Tobacco === 'TRUE') {
							info.CheckVal = true;
						}
						cellinfo.push(info);
					}
					component.set("v.cellinfo", cellinfo);
					component.set("v.showSpinner", true);
					var action1 = component.get("c.fetchdependents");
					action1.setParams({
						'GroupId': component.get("v.GroupId")
					});
					action1.setCallback(this, function(response) {
						var state = response.getState();
						if (state === "SUCCESS") {
							var result = response.getReturnValue();
							var depinfo = [];
							console.log(JSON.stringify(result));
							component.set("v.showSpinner", false);
							if (result === null || result === '' || result.length === 0) {
								 var toastEvent = $A.get("e.force:showToast");
					 toastEvent.setParams({
						 "title": "Warning!",
						 "message": "No Dependents found."
				});
					 toastEvent.fire();
							} else {
								for (var i = 0; i < result.length; i = i + 1) {
									var info = {
										'conid': result[i].Id,
										'ID': result[i].ba_MemberNumber__c,
										'LastName': result[i].LastName,
										'FirstName': result[i].FirstName,
										'Date': result[i].Birthdate,
										'Tobacco': result[i].ba_TobaccoUse__c,
										'CheckVal': false,
										'Relation': result[i].ba_Relation__c
									};
									if (info.Tobacco === 'TRUE') {
										info.CheckVal = true;
									}
									depinfo.push(info);
								}
								component.set("v.AllDependent", depinfo);
							}
						}
					});
					$A.enqueueAction(action1);
				}
			}
		});
		$A.enqueueAction(action);
	},

	createmembers: function(component, event, helper) {
	/*to show modal*/
		$A.util.removeClass(component.find('popUpId'), 'hideContent');
		$A.util.removeClass(component.find('popUpBackgroundId'), 'hideContent');
	},

	handleModal: function(component, event, helper) {
	if( event.getParam("ismodal")){
	/*to show modal*/
	     component.set("v.newinfo",event.getParam("info"));
	     component.set("v.tobacco",event.getParam("value"));
	     helper.showMember(component);
		$A.util.addClass(component.find('popUpId'), 'hideContent');
		$A.util.addClass(component.find('popUpBackgroundId'), 'hideContent');
		
		}
		else{
		/* to hide pop up*/
		$A.util.addClass(component.find('popUpId'), 'hideContent');
		$A.util.addClass(component.find('popUpBackgroundId'), 'hideContent');
		}
	},

	

	getdelete: function(component, event, helper) {
	/* to delete the selected member*/
		var index = event.getSource()
			.get("v.type");
		console.log('Index' + index);
		
		var cellinfo = component.get("v.cellinfo");
		var depinfo = component.get("v.AllDependent");
		var delinfo = [];
		var deplist = [];
		for (var i = 0; i < cellinfo.length; i = i + 1) {
			if (i === index) {
			if(depinfo!==undefined && depinfo!==null){
				for (var j = 0; j < depinfo.length; j = j + 1) {
					if (cellinfo[i].ID === depinfo[j].ID) {} else {
						deplist.push(depinfo[j]);
					}
				}
				}
			} else {
				delinfo.push(cellinfo[i]);
			}
		}
		console.log('After Delete' + JSON.stringify(delinfo));
		component.set("v.cellinfo", delinfo);
		component.set("v.AllDependent", deplist);
		//  component.set("v.Dependent", );
		$A.util.addClass(component.find('dep-id'), 'hideContent');
	},

	getdependents: function(component, event, helper) {
	/* to fetch dependents when a member is selected*/
		$A.util.addClass(component.find('dep-id'), 'hideContent');
		var target = event.currentTarget.dataset.rowIndex;
		var ids = component.find('row-id');
		if (ids.length === undefined) {
			$A.util.addClass(component.find('row-id'), 'row');
		}
		console.log('Id' + ids);
		for (var i = 0; i < ids.length; i = i + 1) {
			if (target == i) {
				$A.util.addClass(component.find('row-id')[i], 'row');
			} else {
				$A.util.removeClass(component.find('row-id')[i], 'row');
			}
		}
		console.log('Target index' + event.currentTarget.dataset.rowIndex);
		var cellinfo = component.get("v.cellinfo")[target];
		var dependent = component.get("v.AllDependent");
		var dep = [];
		console.log(JSON.stringify(dependent));
		for (var i = 0; i < dependent.length; i = i + 1) {
			console.log(cellinfo.ID);
			if (cellinfo.ID === dependent[i].ID) {
				dep.push(dependent[i]);
			}
		}
		console.log('Dependent' + dep);
		component.set("v.Dependent", dep);
		if (component.get("v.Dependent")
			.length > 0) {
			$A.util.removeClass(component.find('dep-id'), 'hideContent');
		}
	},

	moveback: function(component, event, helper) {
	/* on click of previous button*/
		var compEvent = component.getEvent("navigateback");
		compEvent.setParams({
			"cellinfo": component.get("v.cellinfo"),
			"AllDependent": component.get("v.AllDependent")
		});
		compEvent.fire();
	},

	movenext: function(component, event, helper) {
	/* on click of next button */
		component.set("v.showSpinner", true);
		var compEvent = component.getEvent('sendtoParent');
		compEvent.setParams({
			"cellinfo": component.get("v.cellinfo"),
			"AllDependent": component.get("v.AllDependent")
		});
		compEvent.fire();
	}
})