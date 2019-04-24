({
    getLibraryNames : function(cmp) {
        var action = cmp.get("c.getFeaturedLibraries");
        var newArray = [cmp.get('v.library1'),cmp.get('v.library2'),cmp.get('v.library3'),cmp.get('v.library4'),cmp.get('v.library5')];
        action.setParams({
            "libraryArray" : newArray
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(cmp.isValid() && state == 'SUCCESS') {
                var arr = [];
                for(var i = 0; i < response.getReturnValue().length; i++) {
                    arr.push([response.getReturnValue()[i],cmp.get('v.libImg' + (i+1).toString())]);
                }
                cmp.set('v.libraryArray',arr);
            } else {
                console.log('Failed with state: ', state);
            }
        });
        $A.enqueueAction(action);
    },

    getAllLibraries : function(cmp, e) {
        var action = cmp.get('c.allLibs');
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(cmp.isValid() && state == 'SUCCESS') {
                cmp.set('v.contentWorkspaces',response.getReturnValue());
            } else {
                console.log('Returning Workspaces failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },
    
    openSubFolder : function(cmp, e) {
        cmp.set('v.parentFolderId',cmp.get("v.selectedLibraryId"));
        var action = cmp.get('c.getContentFolders');
        action.setParams({
            folderId : cmp.get("v.selectedLibraryId")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(cmp.isValid() && state == 'SUCCESS') {
                cmp.set('v.subFolders', response.getReturnValue());
                this.getSubFolderContent(cmp,e);
            } else {
                console.log('Returning SubFolders failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);
    },
    
    getSubFolderContent : function(cmp, e) {
        var action = cmp.get('c.getContentFolderItems');
        action.setParams({
            folderId : cmp.get("v.selectedLibraryId")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(cmp.isValid() && state == 'SUCCESS') {
                var spinner = cmp.find("mySpinner");
                $A.util.toggleClass(spinner, "slds-hide");
                var spinner2 = cmp.find("mySpinnerMob");
                $A.util.toggleClass(spinner2, "slds-hide");
                cmp.set('v.contentVersions', response.getReturnValue());
            } else {
                console.log('Returning SubFolders Items failed with state: ' + state);
            }
        });
        $A.enqueueAction(action);    
    },
    
    openWorkspace : function(cmp, e) {
        var action = cmp.get('c.getWorkspaceDocs');
        action.setParams({
            folderId : cmp.get("v.selectedLibraryId")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(cmp.isValid() && state == 'SUCCESS') {
                var spinner = cmp.find("mySpinner");
                $A.util.toggleClass(spinner, "slds-hide");
                var spinner2 = cmp.find("mySpinnerMob");
                $A.util.toggleClass(spinner2, "slds-hide");
                cmp.set('v.contentVersions', response.getReturnValue());
            } else {
                console.log('Returning Workspace Items failed with state: ' + state);
            }
        });
        $A.enqueueAction(action); 
    },
    
    backFolder : function(cmp, e) {
        var action = cmp.get('c.prevFolder'); 
        action.setParams({
            folderId : cmp.get('v.parentFolderId')
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(response.getReturnValue() == null) {
                $A.util.removeClass(cmp.find("libTiles"), "viewOpen");
                $A.util.removeClass(cmp.find("libListMobile"), "viewOpen");
                $A.util.addClass(cmp.find("libFiles"), "viewOpen");
                $A.util.addClass(cmp.find("fileListMobile"), "viewOpen");
                var spinner = cmp.find("mySpinnerMob");
                $A.util.toggleClass(spinner, "slds-hide");
            } else {
                if(cmp.isValid() && state == 'SUCCESS') {
                    cmp.set('v.selectedLibraryId',response.getReturnValue().Id);   
                    if(response.getReturnValue().Name.startsWith('058')) { 
                        cmp.set('v.selectedLibraryName',cmp.get('v.currentWorkspaceName'));                    
                    } else {
                        cmp.set('v.selectedLibraryName',response.getReturnValue().Name);
                    }
                    this.openSubFolder(cmp, e);
                } else {
                    console.log('Returning Previous Folder failed with state: ' + state);
                }
            }
        });
        $A.enqueueAction(action);
    }
})