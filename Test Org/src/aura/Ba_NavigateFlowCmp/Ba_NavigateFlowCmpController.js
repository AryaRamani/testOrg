({

	/**
	 * Enable and Disable Previous Button & Submit Button If First & Last Chapters Respectively
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	 
	 handleNavigateAction : function(component, event, helper){
	 
	 var selection = event.getParam("selection");
	
	 component.set("v.Selection",selection);
	
	 },
	 
	setNavActions : function(component, event, helper) {
		var isFirstChapter = component.get("v.firstChapter");
		var isLastChapter = component.get("v.lastChapter");
		var prevBtn = component.find("prevBtn");
		var nextBtn = component.find("nextBtn");
		var submitBtn = component.find("SubmitBtn");
		if(isFirstChapter)
		{
			prevBtn.set("v.disabled",true);
		}
		else
		{
			prevBtn.set("v.disabled",false);
		}
		if(isLastChapter)
		{
			$A.util.addClass(nextBtn, "slds-hide");
			$A.util.removeClass(submitBtn, "slds-hide");
		}
		else
		{
			$A.util.addClass(submitBtn, "slds-hide");
			$A.util.removeClass(nextBtn, "slds-hide");
		}
	},

	/**
	 * Navigate Previous Button Action
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	navigatePrevious : function(component, event, helper) {
		var navigatePreviousEvt = component.getEvent("navigatePreviousEvt");
		navigatePreviousEvt.fire();
	},

	/**
	 * Navigate Next Button Action
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	navigateNext : function(component, event, helper) {
		//var navigateNextEvt = component.getEvent("navigateNextEvt");
		var navigateNextEvt = component.getEvent("navigateNextEvt");
		var select = component.get("v.Selection");
		component.set("v.Selection",'');
		console.log('Label' + event.getSource().get("v.label") );
       
		navigateNextEvt.setParams({
            "label" : select
        });
		navigateNextEvt.fire();
		
		
	},

	/**
	 * Pause Flow Button Action
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	flowPause : function(component, event, helper) {
	},

	/**
	 * Cancel Flow Button Action
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	flowCancel : function(component, event, helper) {
	},

	/**
	 * Submit Flow Button Action
	 * 
	 * @param {Component}
	 *            component
	 * @param {Event}
	 *            event
	 * @param {Helper}
	 *            helper
	 * @return {}
	 */
	flowSubmit : function(component, event, helper) {
	var navigateSubmitEvt = component.getEvent("flowSubmitEvt");
		navigateSubmitEvt.fire();
	},
})