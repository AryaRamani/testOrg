({
	/**
	 * Set Active Chapter in Task Chapter Accordion
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
        setActiveChapter : function(component, event, helper) {
		var taskChapters = component.get("v.taskChapters");
		var taskChapter;
		var currentChapterPassed = false;
		for ( var idx in taskChapters) {
			taskChapter = taskChapters[idx];
			console.log('Active Chpater'+ component.get("v.activeChapter"));
			console.log('task chapters' + taskChapter.ba_Chapter_Name__c);
			if (component.get("v.activeChapter") === taskChapter.ba_Chapter_Name__c)
				currentChapterPassed = true;
			if (currentChapterPassed) {
				document.getElementById(taskChapter.ba_Chapter_Name__c).classList
						.remove("current");
				document.getElementById(taskChapter.ba_Chapter_Name__c).classList
						.remove("passed");
			} else {
				document.getElementById(taskChapter.ba_Chapter_Name__c).classList
						.remove("current");
				document.getElementById(taskChapter.ba_Chapter_Name__c).classList
						.add("passed");
			}

		}
		document.getElementById(component.get("v.activeChapter")).classList
				.add("current");
	},

})