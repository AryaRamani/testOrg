/*Strike by Appiphony

Version: 0.9.0
Website: http://www.lightningstrike.io
GitHub: https://github.com/appiphony/Strike-Components
License: BSD 3-Clause License*/
({
	onInit: function(component, event, helper) {
		var fields = component.get('v.fields');
       console.log("flds"+fields);

		fields.forEach(function(field, index) {
			if (field.dataType == 'COMPONENT') {
				var type = field.value.type;
				var attributes = field.value.attributes;

                $A.createComponent(type, attributes, function(newCmp, status, errorMessage) {
					if (status === 'SUCCESS') {
						var valueOutput = component.find('value-output')[index];
                        valueOutput.set('v.body', newCmp);
                    }
				});
			}
		});
	},
     slctrw : function(component, event, helper) {
  
       var id = event.currentTarget.id;
      // alert('Id'+id);
      var parent = component.get("v.parent");
        console.log(parent);
   //     if(parent=="parent"){
       //var id = component.get("v.fields.id");
        console.log("id"+id);
        var setEvent = $A.get("e.c:Ba_Strike_RowCmpEvt");
        setEvent.setParams({'Indx':event.currentTarget.id});
        setEvent.fire();
       console.log(setEvent.getParam('Indx'));
  //  } 
    }
})
/*Copyright 2017 Appiphony, LLC

Redistribution and use in source and binary forms, with or without modification, are permitted provided that the 
following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this list of conditions and the following 
disclaimer.
2. Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following 
disclaimer in the documentation and/or other materials provided with the distribution.
3. Neither the name of the copyright holder nor the names of its contributors may be used to endorse or promote 
products derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, 
INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE 
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, 
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR 
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, 
WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE 
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.*/