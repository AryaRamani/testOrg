({
	evalExpression : function(component, event, helper) {
		var params = event.getParam("arguments");
		var result;
		if(params){
			var baExpressionType = params.baExpressionType;
			var baExpressionInput = params.baExpressionInput;
			//'Boolean','Integer','String','double'
			switch(baExpressionType){
				case "checkbox":
					result = helper.parseBooleanExpression(baExpressionInput);
					break;
				case "number":
					result = helper.parseIntegerExpression(baExpressionInput);
					break;
				case "text":
					result = helper.parseStringExpression(baExpressionInput);
					break;				
				}
				return(result);
		}
	},
	
})