({
	doInit : function(component, event, helper) {
        var myBreadcrumbs = [{label: component.get('v.cmpLabel'), name: 'home' }];
        component.set('v.myBreadcrumbs', myBreadcrumbs);
        helper.getLibraryNames(component);
        helper.getAllLibraries(component, event);
    },
    
    openFromMain : function(cmp, e, helper) {
        cmp.set('v.contentVersions',null);
        cmp.set('v.subFolders',null);
        cmp.set('v.selectedLibraryId',e.getParam('contFolderId'));
        cmp.set('v.selectedLibraryName',e.getParam('libName'));
        cmp.set('v.currentWorkspaceName',e.getParam('libName'));
        var spinner = cmp.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");
        var spinner2 = cmp.find("mySpinnerMob");
        $A.util.toggleClass(spinner2, "slds-hide");
        var myBread = cmp.get('v.myBreadcrumbs');
        myBread.push({
            label: e.getParam('libName'), 
            name: e.getParam('contFolderId') 
        });
        cmp.set('v.myBreadcrumbs', myBread);
        $A.util.addClass(cmp.find("libTiles"), "viewOpen");
        $A.util.addClass(cmp.find("libListMobile"), "viewOpen");
        $A.util.addClass(cmp.find("allLibs"), "viewOpen");
        $A.util.removeClass(cmp.find("libFiles"), "viewOpen");
        $A.util.removeClass(cmp.find("fileListMobile"), "viewOpen");
        if(e.getParam('isSub')) {
            helper.openSubFolder(cmp,e);
        } else {
            helper.openWorkspace(cmp,e);
        }
    },
    
    openSubF : function(cmp,e, helper) { 
        cmp.set('v.contentVersions',null);
        cmp.set('v.subFolders',null);
        cmp.set('v.selectedLibraryId',e.getParam('contFolderId'));
        cmp.set('v.selectedLibraryName',e.getParam('libName'));
        var spinner = cmp.find("mySpinner");
        $A.util.toggleClass(spinner, "slds-hide");
        var spinner2 = cmp.find("mySpinnerMob");
        $A.util.toggleClass(spinner2, "slds-hide");
        var myBread = cmp.get('v.myBreadcrumbs');
        myBread.push({
            label: e.getParam('libName'), 
            name: e.getParam('contFolderId') 
        });
        cmp.set('v.myBreadcrumbs', myBread);
        helper.openSubFolder(cmp,e);
    },
    
    navigateTo : function(cmp,e, helper) {
        var bre = cmp.get('v.myBreadcrumbs');
        var index = bre.findIndex(function(person) {
            return person.name == e.getSource().get('v.name');
        });
        bre.length= index +1;
        cmp.set('v.myBreadcrumbs', bre);
        
        cmp.set("v.selectedLibraryId",e.getSource().get('v.name'));
        
        if(e.getSource().get('v.name') == 'home') {
            $A.util.removeClass(cmp.find("libTiles"), "viewOpen");
            $A.util.addClass(cmp.find("libFiles"), "viewOpen");
            $A.util.addClass(cmp.find("allLibs"), "viewOpen");
        } else if(e.getSource().get('v.name') == 'all') {
            $A.util.removeClass(cmp.find("allLibs"), "viewOpen");
            $A.util.addClass(cmp.find("libFiles"), "viewOpen");
        }else if(e.getSource().get('v.name').startsWith('058')) {
            var spinner = cmp.find("mySpinner");
            $A.util.toggleClass(spinner, "slds-hide");
            helper.openWorkspace(cmp,e);
        } else{
            var spinner = cmp.find("mySpinner");
            $A.util.toggleClass(spinner, "slds-hide");
            helper.openSubFolder(cmp,e);
        }
    },
    
    toggleView : function(cmp, e, helper) {
        if(e.getParam("value") == 'table') {
            cmp.set('v.isTile',false);
        } else if(e.getParam("value") == 'tile') {
            cmp.set('v.isTile',true);
        }
    },
    
    navBack : function(cmp, e, helper) {
        var spinner = cmp.find("mySpinnerMob");
        $A.util.toggleClass(spinner, "slds-hide");
        cmp.set('v.contentVersions',null);
        cmp.set('v.subFolders',null);
        helper.backFolder(cmp,e);
    },
    
    libraryList : function(cmp, e, helper) {
        $A.util.addClass(cmp.find("libTiles"), "viewOpen");
        $A.util.addClass(cmp.find("libListMobile"), "viewOpen");
        $A.util.removeClass(cmp.find("allLibs"), "viewOpen");
        var myBread = cmp.get('v.myBreadcrumbs');
        myBread.push({
            label: cmp.get('v.libraryAll'), 
            name: 'all' 
        });
        cmp.set('v.myBreadcrumbs', myBread);
        helper.getAllLibraries(cmp, e);
    }
})