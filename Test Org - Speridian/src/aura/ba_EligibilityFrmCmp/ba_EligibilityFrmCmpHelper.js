({


    mapEligiblityQuestions: function(component, event, helper) {
        var eligQuestions = component.get("v.BA_Eligiblity_Administration__c");
        var eligMap = component.get("v.ba_Eligiblity_Map");
        var eligFieldName;
        for (var idx in eligQuestions) {
        	eligFieldName = eligQuestions[idx].Field_Name__c;
            eligMap[eligFieldName] = idx;
        }
        component.set("v.ba_Eligiblity_Map", eligMap);
    },
    
    updateCalculatedFields: function(component) {
        var eligQuestions = component.get("v.BA_Eligiblity_Administration__c");
        var eligMap = component.get("v.ba_Eligiblity_Map");
        var calcCmp = component.find("ExpressionEvalCmp");
        var calcType, calcExpr, calcValue, fieldName, fieldIdx;
        var calcStrikeCmp;
        for (var idx in eligQuestions) {
            if (eligQuestions[idx].ba_Calculated__c == "true") {
            	calcType = eligQuestions[idx].Data_Type__c;
            	fieldName = eligQuestions[idx].Field_Name__c;
            	fieldIdx = eligMap[fieldName];
            	calcExpr =  eligQuestions[idx].ba_Field_Values__c;
            	calcExpr = this.replaceFieldValues(component, calcExpr);
            	calcValue = calcCmp.evalExpression(calcType, calcExpr);
            	eligQuestions[idx].ba_Default_Value__c = calcValue;
            	calcStrikeCmp = this.findStrikeComponentByIdx(component,fieldIdx);
            	calcStrikeCmp.set("v.value",calcValue);
            }
        }
        component.set("v.BA_Eligiblity_Administration__c",eligQuestions);
    },
    
    findStrikeComponentByIdx: function(component,index){
    	var strikeInputs = component.find("strike_input");
    	return(strikeInputs[index]);
    },
    
    replaceFieldValues: function(component, inpExpr) {
        //(?<=\[).+?(?=\])
        var inputFields = inpExpr.match(/(?<=\[).+?(?=\])/g) || [];
        var fieldName = "";
        var fieldIdx = 0;
        var fieldValue;
        var eligQuestions = component.get("v.BA_Eligiblity_Administration__c");
        var eligMap = component.get("v.ba_Eligiblity_Map");
        for (var idx in inputFields) {
            fieldName = inputFields[idx];
            fieldIdx = eligMap[fieldName];
            fieldValue = eligQuestions[fieldIdx].ba_Default_Value__c;
            inpExpr = inpExpr.replace(fieldName, fieldValue);
        }
        inpExpr = inpExpr.replace(/\[|\]/g,'');
        return inpExpr;
    },

})