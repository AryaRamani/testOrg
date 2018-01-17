({
	showMember: function(component, event, helper) {
	/*to display created member*/
		var cellobj = component.get("v.cellinfo");
		if (cellobj === undefined || cellobj ===null) {
			cellobj = [];
		}
		if (component.get("v.tobacco")) {
			component.set("v.newinfo.Tobacco", 'true');
			component.set("v.newinfo.CheckVal", true);
		} else {
			component.set("v.newinfo.Tobacco", 'false');
			component.set("v.newinfo.CheckVal", false);
		}
		cellobj.push(component.get("v.newinfo"));
		component.set("v.cellinfo", cellobj);
		console.log(JSON.stringify(component.get("v.cellinfo")));
		$A.util.addClass(component.find('popUpId'), 'hideContent');
		$A.util.addClass(component.find('popUpBackgroundId'), 'hideContent');
		component.set("v.newinfo", {});
		component.set("v.tobacco",false);
	},
})