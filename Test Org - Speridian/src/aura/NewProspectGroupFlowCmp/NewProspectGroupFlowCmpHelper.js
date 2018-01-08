({
	/**
	 * Initializes Chapter Components on Page From Server
	 * 
	 * @param {Component}
	 *            component
	 * @param {String}
	 *            currentTaskflow
	 * @return {}
	 */
	fetchTaskChapters : function(component, currentTaskflow) {
		var helper = this;
		var chapterName = "";
		var componentName = "";
		// Apex Class Action
		var getTaskChptrAction = component.get("c.getTaskChapters");
		getTaskChptrAction.setParams({
			"taskName" : currentTaskflow
		});

		// Add Asynch Callback For Class Action
		getTaskChptrAction
				.setCallback(
						this,
						function(response) {
							var state = response.getState();
							if (component.isValid() && state === "SUCCESS") {
								component.set("v.taskChapters", response
										.getReturnValue());
								var taskChapters = component
										.get("v.taskChapters");
								for ( var taskChapter in taskChapters) {
									chapterName = taskChapters[taskChapter].ba_Chapter_Name__c;
									componentName = "c:"
											+ taskChapters[taskChapter].ba_Chapter_Component_Name__c;
									// Create Chapter
									helper.createChapterDiv(component,
											chapterName, componentName, helper);
								}
							} else {
								// Replace With Error Handler f/w once available
								console.log("Failed with state: " + state);
							}
						});
		// Enqueue Class Action
		$A.enqueueAction(getTaskChptrAction);
	},

	/**
	 * Creates Div Container For Chapter Component
	 * 
	 * @param {Component}
	 *            component
	 * @param {String}
	 *            chapterName
	 * @param {String}
	 *            componentName
	 * @param {helper}
	 *            helper
	 * @return {}
	 */
	createChapterDiv : function(component, chapterName, componentName, helper) {
		$A.createComponent("aura:HTML", {
			tag : "div",
			"aura:id" : chapterName,
			HTMLAttributes : {
				"id" : "div" + chapterName,
				"class" : "slds-form-element__group slds-hide"
			}
		}, function(chapterDivCmp) {
			var container = component.find("taskFormContainer");
			if (container.isValid()) {
				var body = container.get("v.body");
				body.push(chapterDivCmp);
				container.set("v.body", body);
				helper.createChapterComponent(component, chapterDivCmp,
						componentName)
			}
		});
	},

	/**
	 * Initializes Chapter Components in Div Container
	 * 
	 * @param {Component}
	 *            component
	 * @param {aura:html}
	 *            chapterDivCmp
	 * @param {String}
	 *            componentName
	 * @return {}
	 */
	createChapterComponent : function(component, chapterDivCmp, componentName) {

		$A.createComponent(componentName, {
			"ChapterInitCmpEvt" : component.getReference("c.childInitComplete")
		}, function(newCmp) {
			if (chapterDivCmp.isValid()) {
				var body = chapterDivCmp.get("v.body");
				body.push(newCmp);
				chapterDivCmp.set("v.body", body);
			}
		});
	},

	/**
	 * navigateToChapterNo taskChapters array Chapter From navigateFromChapterNo
	 * From Chapters
	 * 
	 * @param {Component}
	 *            component
	 * @param {BA_Task_Chapter__c}
	 *            taskChapters
	 * @param {Integer}
	 *            navigateToChapterNo
	 * @param {Integer}
	 *            navigateFromChapterNo
	 * @return {}
	 */
	navigateChapter : function(component, taskChapters, navigateToChapterNo,
			navigateFromChapterNo) {
		var helper = this;
		var navDirection = "forward";
		if (navigateToChapterNo > navigateFromChapterNo) {
			navDirection = "forward";
		} else {
			navDirection = "backward";
		}
		//Set First Chapter Attribute
		if (navigateToChapterNo == 0) {
			component.set("v.firstChapter", true);
		} else {
			component.set("v.firstChapter", false);
		}
		//Set Last Chapter Attribute
		if ((navigateToChapterNo + 1) == taskChapters.length) {
			component.set("v.lastChapter", true);
		} else {
			component.set("v.lastChapter", false);
		}
		// Hide & Show Components For Navigation
		var container = component.find("taskFormContainer");
		if (container.isValid()) {
			var body = container.get("v.body");
			// Hide From Navigation Div Container If Not First Chapter
			if (navigateFromChapterNo > -1) {
				var navigateFromComponentDiv = body[navigateFromChapterNo]
						.find(taskChapters[navigateFromChapterNo].ba_Chapter_Name__c);
				this.fadeOutComponent(navigateFromComponentDiv, navDirection);
			}
			// Show To Navigation Div Container If Not Last Chapter
			if (navigateToChapterNo < taskChapters.length) {
				var navigateToComponentDiv = body[navigateToChapterNo]
						.find(taskChapters[navigateToChapterNo].ba_Chapter_Name__c);
				// Set Active Chapter In Task Chapter Component
				component.set("v.activeChapter",
						taskChapters[navigateToChapterNo].ba_Chapter_Name__c);
				var taskChapterCmp = component.find("TaskChapterCmp");
				taskChapterCmp.setActiveSelection();
				// Set Navigation Component Button Actions
				var navigateFlowCmp = component.find("NavigateFlowCmp");
				navigateFlowCmp.setNavActions();
				this.fadeInComponent(navigateToComponentDiv, navDirection);
			}
		} else {
			console
					.log("No Valid Container Found with aura:id 'taskFormContainer'");
		}

	},

	/**
	 * Show Loading Spinner
	 * 
	 * @param {}
	 * 
	 * @return {}
	 */
	showSpinner : function(component) {

		component.set("v.IsSpinner", true);

	},

	/**
	 * Hide Loading Spinner
	 * 
	 * @param {}
	 * 
	 * @return {}
	 */
	hideSpinner : function(component) {

		component.set("v.IsSpinner", false);

	},

	/**
	 * Fade In Component with Animation
	 * 
	 * @param {Component}
	 *            navigateToComponentDiv
	 * @param {String}
	 *            navDirection
	 * @return {}
	 */
	fadeInComponent : function(navigateToComponentDiv, navDirection) {
		if (navigateToComponentDiv.isValid()) {
			$A.util.removeClass(navigateToComponentDiv, "slds-hide");
			if (navDirection == "forward") {
				$A.util.addClass(navigateToComponentDiv, "bounceInRight");
			} else {
				$A.util.addClass(navigateToComponentDiv, "bounceInLeft");
			}
		}
	},

	/**
	 * Hide Component
	 * 
	 * @param {Component}
	 *            navigateFromComponentDiv
	 * @param {String}
	 *            navDirection
	 * @return {}
	 */
	fadeOutComponent : function(navigateFromComponentDiv, navDirection) {
		if (navigateFromComponentDiv.isValid()) {
			$A.util.removeClass(navigateFromComponentDiv, "bounceInRight");
			$A.util.removeClass(navigateFromComponentDiv, "bounceInLeft")
			$A.util.addClass(navigateFromComponentDiv, "slds-hide");
		}
	},

})