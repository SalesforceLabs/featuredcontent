({
    openLibrary : function(cmp, event, helper) {
        var theId, isItSub;
        if(cmp.get('v.library').RootContentFolderId == null) {
            isItSub = false;
            theId = cmp.get('v.library').Id;
        } else {
            isItSub = true;
            theId = cmp.get('v.library').RootContentFolderId;
        }
        
        var ev = $A.get("e.c:openWorkspace");
        ev.setParams({
            contFolderId: theId,
            libName: cmp.get('v.library').Name,
            isSub : isItSub
        });
        ev.fire();
    }
})