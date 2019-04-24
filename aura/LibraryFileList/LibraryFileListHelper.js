({
	openPreview : function(cmp,e) {
		var a = cmp.get('v.contentFile');
        $A.get('e.lightning:openFiles').fire({
		    recordIds: [a.ContentDocumentId]
	   });
	}
})