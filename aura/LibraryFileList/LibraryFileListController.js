({
    preview : function(cmp, e, helper) {
        helper.openPreview(cmp,e); 
    },
    
    openActions : function(cmp, e, helper) {
        if(e.getParam("value") == 'preview') {
            helper.openPreview(cmp,e);
        } 
    }
})