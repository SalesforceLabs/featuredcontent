({   
    openSubFolder : function(cmp, e) {
        var folder = cmp.get('v.sFold');
        var e = $A.get("e.c:openSFolder");
        e.setParams({
            contFolderId : folder.Id,
            libName : folder.Name
        });
        e.fire();
    }
})