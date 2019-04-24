({
    openLibrary : function(cmp, event, helper) {
        console.log('opening');
        console.log(cmp.get('v.lib')[0].RootContentFolderId);
        var theId, isItSub;
        if(cmp.get('v.lib')[0].RootContentFolderId == null) {
            isItSub = false;
            theId = cmp.get('v.lib')[0].Id;
        } else {
            isItSub = true;
            theId = cmp.get('v.lib')[0].RootContentFolderId;
        }
        var e = $A.get("e.c:openWorkspace");
        console.log(e);
        e.setParams({
            contFolderId: theId,
            libName: cmp.get('v.lib')[0].Name,
            isSub : isItSub
        });
        e.fire(); 
    }
})