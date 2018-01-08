({
	validate: function(component) {
        //Simplisting Required Check
        var validproduct = true;
        var nameField = component.find("ProductName");
        var nameValue = nameField.get("v.value");
        if ($A.util.isEmpty(nameValue)) {
            validproduct = false;
            nameField.set("v.errors", [{
                message: "Product Name can't be blank."
            }]);
        } else {
            nameField.set("v.errors", null);
        }
        return (validproduct);
    },

    /**
	 * Save Action Helper
	 * 
	 * @param {Component}
	 *            component
	 * @param {BA_Group_Competitor_Product__c}
	 *            newCompetitor
	 */
    saveProduct: function(component, newProduct) {
        var saveProduct = component.getEvent("saveProduct");          
        newProduct.ba_ParentCompetitor__c = component.get("v.parentCompetitorId");
        saveProduct.setParams({
            "product": newProduct
        });
        saveProduct.fire();//dbt
         component.set("v.product", {
            'sobjectType': 'BA_Group_Competitor_Product__c',
             'ba_EffectiveDate__c':'',
             'ba_Family__c':'',
             'Financial_Arrangement__c':'',
             'Name':'',
             'Line_Of_Business__c':'',
             'ba_ParentCompetitor__c':'',
             'ba_Product_Category__c':'',
             'ba_ProductName__c':'',
             'ba_RateEffectiveDate__c':'',
             'ba_RateTerminationDate__c':'',
             'Rate_Tier__c':'',
             'ba_Subscriber__c':'',
             'ba_SubscriberChild__c':'',
             'ba_SubscriberOneChild__c':'',
             'ba_SubscriberSpouse__c':'',
             'ba_SubscriberTwo__c':'',
             'ba_TerminationDate__c':'',
             'ba_TwoPerson__c':'',             
           
        });
    },
})