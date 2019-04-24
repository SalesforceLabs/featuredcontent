@isTest
public with sharing class ContentControllerTest {

    public static String topicName = 'Test Topic';
    public static String DocName = 'Test Document';
    
    @testSetup 
    static void setup() {
        System.runAs ( new User(Id = UserInfo.getUserId()) ) {
            Network n = [SELECT Id FROM Network WHERE Name = 'partnercentral'];
            
            ContentWorkspace tesist = [SELECT Id FROM ContentWorkspace WHERE Name = 'Asset Library'];
            ContentWorkspace newCW = new ContentWorkspace(Name = 'Test Class Library');
            insert newCW;
          
            ContentVersion testContentInsert = new ContentVersion(); 
            testContentInsert.ContentURL='http://www.google.com/'; 
            testContentInsert.Title = DocName;
            testContentInsert.NetworkId = n.Id;
            insert testContentInsert; 
            ContentVersion testContent = [SELECT ContentDocumentId FROM ContentVersion where Id = :testContentInsert.Id]; 
            
            ContentWorkspaceDoc newWorkspaceDoc = new ContentWorkspaceDoc(); 
            newWorkspaceDoc.ContentWorkspaceId = tesist.Id; 
            newWorkspaceDoc.ContentDocumentId = testContent.ContentDocumentId; 
            insert newWorkspaceDoc;
        }
    }
    
    static testMethod void testgetFeaturedFiles() {
        ContentVersion testContent = [SELECT ContentDocumentId FROM ContentVersion WHERE Title = :DocName];
        String[] fileArray = new String[] {testContent.ContentDocumentId};
            List<ContentVersion> docs = ContentController.getFeaturedFiles(fileArray);
        System.assert(!docs.isEmpty());
    }
    
    static testMethod void testgetFeaturedLibraries() {
        ContentWorkspace testContent = [SELECT Id FROM ContentWorkspace WHERE Name = 'Asset Library'];
        String[] fileArray = new String[] {testContent.Id};
            List<ContentWorkspace> docs = ContentController.getFeaturedLibraries(fileArray);
        System.assert(!docs.isEmpty());
    }
    
    static testMethod void testgetContentFolders() {
        ContentWorkspace testContent = [SELECT Id FROM ContentWorkspace WHERE Name = 'Test Class Library'];
        List<ContentFolder> result = ContentController.getContentFolders(null);
        System.assert(!result.isEmpty());
    }

    static testMethod void testgetContentFolderItems() {
        ContentWorkspace testContent = [SELECT Id FROM ContentWorkspace WHERE Name = 'Test Class Library'];
        List<ContentVersion> result = ContentController.getContentFolderItems(testContent.Id);
        System.assert(result.isEmpty());
    }
    
    static testMethod void testgetWorkspaceDocs() {
        ContentWorkspace testContent = [SELECT Id FROM ContentWorkspace WHERE Name = 'Asset Library'];
        List<ContentVersion> result = ContentController.getWorkspaceDocs(testContent.Id);
        System.assert(!result.isEmpty());
    }
    
    static testMethod void testprevFolder() {
        ContentWorkspace contw = [SELECT Id,Name,RootContentFolderId FROM ContentWorkspace WHERE Name = 'Test Class Library'];
        System.debug(contw.RootContentFolderId);
        ContentFolder contf = [SELECT Name,Id,ParentContentFolderId FROM ContentFolder WHERE Id = :contw.RootContentFolderId];
        ContentFolder result = ContentController.prevFolder(contf.Id);
        System.assertEquals(null, result);
    }                                 
    
    static testMethod void testAllLibs() {
        List<ContentWorkspace> result = ContentController.allLibs();
        System.assert(!result.isEmpty());
    }
    
    static testMethod void testSetControllerValueKB() {
        String result = ContentController.setControllerValue(5000);
        System.assertEquals('4KB', result);
    }
    
    static testMethod void testSetControllerValueB() {
        String result = ContentController.setControllerValue(50);
        System.assertEquals('50 Bytes', result);
    }
    
    static testMethod void testSetControllerValueMB() {
        String result = ContentController.setControllerValue(214748364);
        System.assertEquals('204MB', result);
    }
}