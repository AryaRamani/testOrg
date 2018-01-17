({
	doInit : function(component, event, helper) {
	var Contact = component.get('v.objecttype');
        console.log('Object'+JSON.stringify(Contact));
        var FieldName = component.get('v.fieldName');
        var outputText = component.find("outputTextId");
        if (FieldName.indexOf(".") >= 0) {
            var ParentSobject = Contact[FieldName.split(".")[0]];
            if(ParentSobject != undefined){
                 console.log('Chheck'+ParentSobject[FieldName.split(".")[1]]);
                if(ParentSobject[FieldName.split(".")[1]]==true||ParentSobject[FieldName.split(".")[1]]==false){
                   
                } else{
                outputText.set("v.value",ParentSobject[FieldName.split(".")[1]]);
                }
            }
        }
        else{
            console.log('here'+Contact[FieldName]);
            if(component.get("v.objectName")==='QuoteLineItem'){
              outputText.set("v.value",Contact[FieldName]);
            }else
            {
            if(Contact[FieldName]==true||Contact[FieldName]==false){
       
                component.set("v.bool",true);
               component.find('booleanId').set("v.checked",Contact[FieldName]);
            }else{
             component.set("v.bool",false);   
            outputText.set("v.value",Contact[FieldName]);
                
            }
            }
        }
        
       console.log('Text'+outputText.get("v.value"));
    }
})