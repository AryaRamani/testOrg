({
    doInit : function(component, event, helper) {
        
     $A.util.removeClass(component.find('Taskcmp'), 'adwidth');  
        
        
        
    },
    
    DisplayTask : function(component,event,helper)
    {
        var body = component.find("Taskcmp");
         var RltdBody =  component.find("RltdListCmp");
        if(event.getParam("StrtTask")=="Hide"){
            /*   $A.removeComponent("c:TaskViewCmp", {

        }, function(newCmp) {
            if (component.isValid()) {
                component.set("v.body", newCmp);
            }
        });
        */
            body.set("v.body", []);
             $A.util.removeClass(body, 'bounceInRight');
            // to show related list componnet 
             $A.util.addClass(RltdBody, 'slds-show'); 
             $A.util.removeClass(RltdBody, 'slds-hide'); 
            $A.createComponent("c:RelatedListCmp", {"Account":""},
                               function(RltdListCmp) {
                                   if (RltdBody.isValid()) {
                                       
                                   //   RltdBody.set("v.body",RltdListCmp);
                                   
                                   }
                               }); 
                               
                               
       $A.util.addClass(component.find('taskFormContainer'), 'adjustwidth');
        $A.util.removeClass(component.find('Taskcmp'), 'adwidth');
        $A.util.addClass(component.find('RltdListCmp'), 'adwidth');
        }
        else{
            
            $A.createComponent("c:TaskViewCmp", {"TaskEntity":event.getParam("StrtTask")
                                                 
                                                }, function(newCmp) {
                                                    if (body.isValid()) {
                                                        body.set("v.body", newCmp);
                                                    }
                                                });
            // to hide related list componentn
            
        //    RltdBody.set("v.body",[]);
             $A.util.addClass(RltdBody, 'slds-hide'); $A.util.removeClass(RltdBody, 'slds-show'); 
            $A.util.addClass(body, 'bounceInLeft');
             $A.util.addClass(component.find('taskFormContainer'), 'adjustwidth');
        $A.util.addClass(component.find('Taskcmp'), 'adwidth');
        $A.util.removeClass(component.find('RltdListCmp'), 'adwidth');
        }
        
    },
    HideCmp: function(component,event,helper)
    {
        $A.util.removeClass(component.find('taskFormContainer'), 'slds-show'); 
        $A.util.addClass(component.find('taskFormContainer'), 'adjustwidth');
        $A.util.addClass(component.find('Taskcmp'), 'adwidth');
       
        $A.util.addClass(component.find('taskFormContainer'), 'slds-hide'); 
    },
   DisplayRelatedList:function(component,event,helper){
        var body =  component.find("RltdListCmp");
        if(event.getParam("GroupId")){
            $A.createComponent("c:RelatedListCmp", {"Account": event.getParam("GroupId")},
                               function(RltdListCmp) {
                                   if (body.isValid()) {
                                       
                                 //      body.set("v.body",RltdListCmp);
                                   }
                               }); 
        }  
        else {
          //  body.set("v.body", []);
        }
    }	
    
})