({  
    preview : function(component, event, helper) {
        var a = component.get('v.theFile');
        $A.get('e.lightning:openFiles').fire({
		    recordIds: [a.ContentDocumentId]
	   });  
    }
})