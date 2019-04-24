({    
    preview : function(component, event, helper) {
        var a = component.get('v.doc');
        $A.get('e.lightning:openFiles').fire({
		    recordIds: [a.ContentDocumentId]
	   });  
    }
})