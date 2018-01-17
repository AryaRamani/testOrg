({
	/**
	 * Init Component
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	doInit : function(component, event, helper) {
		var currentTaskflow = component.get("v.currentTaskFlow");
		var chatperName = "";
		if (!$A.util.isEmpty(currentTaskflow)) {
			helper.showSpinner(component);
			helper.fetchTaskChapters(component, currentTaskflow);
		} else {
			console.log("currentTaskFlow attribute is null");
		}
	},

	/**
	 * Handler Method For Child ChapterInitCmpEvt Events
	 * 
	 * @param {Component}
	 *            component
	 * @param {c:ChapterInitCmpEvt}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	childInitComplete : function(component, event, helper) {
		// console.log("Handler Triggered");
		var childChapterInits = component.get("v.childChapterInits");
		var taskChapters = component.get("v.taskChapters");
		var childInitComplete = event.getParam("componentName");
		childChapterInits.push(childInitComplete);
		component.set("v.childChapterInits", childChapterInits);
		childChapterInits = component.get("v.childChapterInits");
		if (taskChapters.length == childChapterInits.length) {
			// console.log("All Chapters Initalized");
			// Navigate to First Chapter
			component.set("v.currentChapterSequence",0);
			var navFooter = component.find("navfooter");
			$A.util.removeClass(navFooter, "slds-hide");
			$A.util.addClass(navFooter, "slds-show");
			helper.navigateChapter(component, taskChapters, 0, -1);
			helper.hideSpinner(component);
		}
	},

	/**
	 * Handler Method For Child navigateNextEvt Events
	 * 
	 * @param {Component}
	 *            component
	 * @param {c:NavigateFlowEvt}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	handleNavigateNext : function(component, event, helper) {
		helper.showSpinner(component);
		var navigateFromChapterNo = component.get("v.currentChapterSequence");
		var navigateToChapterNo = navigateFromChapterNo + 1;
		var taskChapters = component.get("v.taskChapters");
		helper.navigateChapter(component, taskChapters, navigateToChapterNo,
				navigateFromChapterNo);
		component.set("v.currentChapterSequence",navigateToChapterNo);
		helper.hideSpinner(component);
	},

	/**
	 * Handler Method For Child navigatePrevEvt Events
	 * 
	 * @param {Component}
	 *            component
	 * @param {c:NavigateFlowEvt}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	handleNavigatePrevious : function(component, event, helper) {
		helper.showSpinner(component);
		var navigateFromChapterNo = component.get("v.currentChapterSequence");
		var navigateToChapterNo = navigateFromChapterNo - 1;
		var taskChapters = component.get("v.taskChapters");
		helper.navigateChapter(component, taskChapters, navigateToChapterNo,
				navigateFromChapterNo);
		component.set("v.currentChapterSequence",navigateToChapterNo);
		helper.hideSpinner(component);
	},

	/**
	 * Handler Method For Child flowPauseEvt Events
	 * 
	 * @param {Component}
	 *            component
	 * @param {c:NavigateFlowEvt}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	handleFlowPause : function(component, event, helper) {
	},

	/**
	 * Handler Method For Child flowCancelEvt Events
	 * 
	 * @param {Component}
	 *            component
	 * @param {c:NavigateFlowEvt}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	handleFlowCancel : function(component, event, helper) {
	},
})