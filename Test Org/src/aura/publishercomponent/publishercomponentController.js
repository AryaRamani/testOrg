({
	jsLoaded: function(component, event, helper) {
        console.log('canvas ready to go');
    },
    handleClick : function(cmp, event) {
         var instructions = [{name: "publisher.selectAction", payload: {actionName:"Case.Email"}},
                ];
        console.log(Sfdc)
         Sfdc.canvas.publisher.publish(instructions);
    }
})