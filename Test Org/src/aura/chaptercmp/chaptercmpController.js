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
        console.log('Id'+component.find('task-id'));
		var taskChapters = component.get("v.taskChapters");
		
		var taskChapter;
		var currentChapterPassed = false;
		for ( var idx in taskChapters) {
			taskChapter = taskChapters[idx];
			console.log('task Id'+idx);
			if (component.get("v.activeChapter") === taskChapter.ba_Chapter_Name__c){
				currentChapterPassed = true;
				if(component.find('task-id').length!==taskChapters.length){
				var idy=parseInt(idx)+3;
				}
				else{
				var idy=idx;
				}
				console.log('Cuurent Id'+idy);
                console.log("active chapter in chapter task current chapter true"+component.get("v.activeChapter"));

				}
			if (currentChapterPassed) {
				  $A.util.removeClass(component.find('task-id')[idx], 'current');
					$A.util.removeClass(component.find('task-id')[idx], 'passed');	
				
			} else {
				$A.util.removeClass(component.find('task-id')[idx], 'current');
					$A.util.addClass(component.find('task-id')[idx], 'passed');
			}

		}
		$A.util.addClass(component.find('task-id')[idy], 'current');	
		
	},

})