({
    parseIntegerExpression: function(input) {
    	var postFixExpr = this.infixToPostfixExpr(input);
    	var postFixArr = postFixExpr.split(" ");
    	var exprResult = this.evaluatePostfix(postFixArr);
    	return exprResult;
    },
    
    parseBooleanExpression: function(input){
    	var exprResult;
    	input = input.replace(/\s+/g, ""); 
    	input = input.split(/([\=\>\<\&\|])/);
    	var cndtn1 = input[0];
    	var exprn =  input[1];
    	var cndtn2 = input[2];
    	switch(exprn){
    		case "=":
    				if(cndtn1 == cndtn2)
    					exprResult = true;
    				else
    					exprResult = false;
    			break;
    		case "<":
    				if(parseInt(cndtn1) < parseInt(cndtn2))
    					exprResult = true;
    				else
    					exprResult = false;
    			break;
    		case ">":
    		    if(parseInt(cndtn1) > parseInt(cndtn2))
    					exprResult = true;
    				else
    					exprResult = false;
    			break;
    		case "&":
    			if(parseInt(cndtn1) && parseInt(cndtn2))
    				exprResult = true;
    			else
    				exprResult = false;
    			break;
    		case "|":
    			if(parseInt(cndtn1) || parseInt(cndtn2))
    				exprResult = true;
    			else
    				exprResult = false;
    			break
    	}
    	return exprResult;
    },
    
    parseStringExpression: function(input){
    	var exprResult;
    	input = input.replace(/\s+/g, "");
    	input = input.split(/([\?])/);
    	var boolExpr = input[0];
    	var ifResults = input[2].split(/([\,])/);
    	var exprEval = this.parseBooleanExpression(boolExpr);
    	if(exprEval == true)
    		exprResult = ifResults[0].replace(/([_])/g," ");
    	else if (exprEval == false)
    		exprResult = ifResults[2].replace(/([_])/g," ");
    	else
    		exprResult = "INVALID INPUT";
    	return exprResult;    
    },
    
    // Uses Shunting Yard Algorithm to Convert infix to postfix expression
    infixToPostfixExpr: function(infix) {
        var outputQueue = "";
        var operatorStack = [];
        var operators = {
            "^": {
                precedence: 4,
                associativity: "Right"
            },
            "/": {
                precedence: 3,
                associativity: "Left"
            },
            "*": {
                precedence: 3,
                associativity: "Left"
            },
            "+": {
                precedence: 2,
                associativity: "Left"
            },
            "-": {
                precedence: 2,
                associativity: "Left"
            }
        };
        infix = infix.replace(/\s+/g, "");
        infix = infix.split(/([\+\-\*\/\^\(\)])/);
        infix = this.cleanArray(infix);
        for (var i = 0; i < infix.length; i++) {
            var token = infix[i];
            if (this.isStrNumber(token)) {
                outputQueue += token + " ";
            } else if ("^*/+-".indexOf(token) !== -1) {
                var o1 = token;
                var o2 = operatorStack[operatorStack.length - 1];
                while ("^*/+-".indexOf(o2) !== -1 && ((operators[o1].associativity === "Left" && operators[o1].precedence <= operators[o2].precedence) || (operators[o1].associativity === "Right" && operators[o1].precedence < operators[o2].precedence))) {
                    outputQueue += operatorStack.pop() + " ";
                    o2 = operatorStack[operatorStack.length - 1];
                }
                operatorStack.push(o1);
            } else if (token === "(") {
                operatorStack.push(token);
            } else if (token === ")") {
                while (operatorStack[operatorStack.length - 1] !== "(") {
                    outputQueue += operatorStack.pop() + " ";
                }
                operatorStack.pop();
            }
        }
        while (operatorStack.length > 0) {
            outputQueue += operatorStack.pop() + " ";
        }
        return outputQueue;
    },

    isStrNumber: function(strInp) {
        return !isNaN(parseFloat(strInp)) && isFinite(strInp);
    },

    cleanArray: function(strArray) {
        for (var i = 0; i < strArray.length; i++) {
            if (strArray[i] === "") {
                strArray.splice(i, 1);
            }
        }
        return strArray;
    },

    //evaluates postfix string
    evaluatePostfix: function(strPostfix) {
        var returnValue = 0;
        var stack = [];
        strPostfix = this.cleanArray(strPostfix);
        for (var i = 0; i < strPostfix.length; i++) {
            if ("^*/+-".indexOf(strPostfix[i]) == -1) {
                stack.push(strPostfix[i]);
            } else {
                var a = parseInt(stack.pop());
                var b = parseInt(stack.pop());
                switch (strPostfix[i]) {
                    case "+":
                        stack.push(a + b);
                        break;
                    case "-":
                        stack.push(b - a);
                        break;
                    case "*":
                        stack.push(a * b);
                        break;
                    case "/":
                        stack.push(b / a);
                        break;
                    case "^":
                        stack.push(Math.pow(b, a));
                        break;
                }
            }
        }
        returnValue = parseInt(stack.pop());
        return returnValue;
    },
    
    
})