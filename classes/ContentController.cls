public with sharing class ContentController {
    
    @AuraEnabled
    public static String setControllerValue(Decimal bytes) {
        String returnValue;
        if (Integer.valueOf(bytes) < 1024) {
            returnValue =  bytes + ' Bytes';
        } else if (Integer.valueOf(bytes) >= 1024 && bytes < (1024*1024)) {
            //KB
            Decimal kb = bytes;
            kb = kb.divide(1024,2);
            returnValue = kb.round(System.RoundingMode.DOWN) + 'KB';
            
        } else if (Integer.valueOf(bytes) >= (1024*1024) && bytes < (1024*1024*1024)) {
            //MB
            Decimal mb = bytes;
            mb = mb.divide((1024*1024),2);
            returnValue = mb.round(System.RoundingMode.DOWN) + 'MB';
        } else {
            //GB
            Decimal gb = bytes;
            gb = gb.divide((1024*1024*1024),2);
            
            returnValue = gb.setscale(1) + ' GB';
        }   
        return returnValue;
    }
    
    @AuraEnabled
    public static List<ContentVersion> getFeaturedFiles(String[] fileArray) {
        if (Schema.sObjectType.ContentVersion.fields.ContentDocumentId.isAccessible() && 
            Schema.sObjectType.ContentVersion.fields.FileExtension.isAccessible() &&
            Schema.sObjectType.ContentVersion.fields.Id.isAccessible() &&
            Schema.sObjectType.ContentVersion.fields.Title.isAccessible() && 
            Schema.sObjectType.ContentVersion.fields.IsLatest.isAccessible() &&
            Schema.sObjectType.ContentVersion.fields.FileType.isAccessible()) {
                List<ContentVersion> docList = new List<ContentVersion>();
                for(Integer i = 0; i < fileArray.size(); i++) {
                    if(fileArray[i] != '') {
                        try {
                            docList.add([SELECT ContentDocumentId,FileExtension,FileType,Id,Title FROM ContentVersion WHERE IsLatest = true AND ContentDocumentId = :fileArray[i]]);
                        } catch(Exception e) {
                            System.debug('Failed with Exception: ' + e);
                        }
                    }
                }
                return docList;
            } else {
                return null;
            }
    }
    
    @AuraEnabled
    public static List<ContentWorkspace> getFeaturedLibraries(String[] libraryArray) {
        if (Schema.sObjectType.ContentWorkspace.fields.Id.isAccessible() &&
            Schema.sObjectType.ContentWorkspace.fields.RootContentFolderId.isAccessible() &&
            Schema.sObjectType.ContentWorkspace.fields.Name.isAccessible()) {
                List<ContentWorkspace> workspaces = new List<ContentWorkspace>();
                for(Integer i = 0; i < libraryArray.size(); i++) {
                    if(libraryArray[i] != '') {
                        try {
                            workspaces.add([SELECT Id,Name,RootContentFolderId FROM ContentWorkspace WHERE Id = :libraryArray[i]]);
                        } catch(Exception e) {
                            System.debug('Failed with Exception: ' + e);
                        }
                    }
                }
                return workspaces;
            } else {
                return null;
            }
    }
    
    @AuraEnabled
    public static List<ContentFolder> getContentFolders(Id folderId) {
        if (Schema.sObjectType.ContentFolder.fields.Id.isAccessible() &&
            Schema.sObjectType.ContentFolder.fields.ParentContentFolderId.isAccessible() &&
            Schema.sObjectType.ContentFolder.fields.Name.isAccessible()) {
                return [SELECT Id, Name FROM ContentFolder WHERE ParentContentFolderId = :folderId];
            } else {
                return null;
            }
    } 
    
    @AuraEnabled
    public static List<ContentVersion> getContentFolderItems(Id folderId) {
        if (Schema.sObjectType.ContentVersion.fields.ContentDocumentId.isAccessible() && 
            Schema.sObjectType.ContentVersion.fields.FileExtension.isAccessible() && 
            Schema.sObjectType.ContentVersion.fields.FileType.isAccessible() && 
            Schema.sObjectType.ContentVersion.fields.Id.isAccessible() &&
            Schema.sObjectType.ContentVersion.fields.LastModifiedDate.isAccessible() &&
            Schema.sObjectType.ContentVersion.fields.Title.isAccessible() &&
            Schema.sObjectType.ContentVersion.fields.ContentSize.isAccessible() &&
            Schema.sObjectType.ContentVersion.fields.IsLatest.isAccessible() &&
            Schema.sObjectType.ContentFolderMember.fields.ChildRecordId.isAccessible() &&
            Schema.sObjectType.ContentFolderMember.fields.ParentContentFolderId.isAccessible()){
                return [SELECT ContentDocumentId,FileExtension,FileType,Id,LastModifiedDate,Title,ContentSize FROM ContentVersion WHERE IsLatest = true
                        AND ContentDocumentId IN (SELECT ChildRecordId FROM ContentFolderMember WHERE ParentContentFolderId = :folderId)];
            } else {
                return null;
            }
    } 
    
    @AuraEnabled
    public static List<ContentVersion> getWorkspaceDocs(Id folderId) {
        if (Schema.sObjectType.ContentVersion.fields.ContentDocumentId.isAccessible() && 
            Schema.sObjectType.ContentVersion.fields.FileExtension.isAccessible() && 
            Schema.sObjectType.ContentVersion.fields.FileType.isAccessible() && 
            Schema.sObjectType.ContentVersion.fields.Id.isAccessible() &&
            Schema.sObjectType.ContentVersion.fields.LastModifiedDate.isAccessible() &&
            Schema.sObjectType.ContentVersion.fields.Title.isAccessible() &&
            Schema.sObjectType.ContentVersion.fields.ContentSize.isAccessible() &&
            Schema.sObjectType.ContentVersion.fields.IsLatest.isAccessible() &&
            Schema.sObjectType.ContentWorkspaceDoc.fields.ContentDocumentId.isAccessible() &&
            Schema.sObjectType.ContentWorkspaceDoc.fields.ContentWorkspaceId.isAccessible()){
                return [SELECT ContentDocumentId,FileExtension,FileType,Id,LastModifiedDate,Title,ContentSize FROM ContentVersion WHERE IsLatest = true
                        AND ContentDocumentId IN (SELECT ContentDocumentId FROM ContentWorkspaceDoc WHERE ContentWorkspaceId = :folderId)];
            } else {
                return null;
            }
    } 
    
    @AuraEnabled
    public static ContentFolder prevFolder(Id folderId) {
        if (Schema.sObjectType.ContentFolder.fields.ParentContentFolderId.isAccessible() &&
            Schema.sObjectType.ContentFolder.fields.Id.isAccessible() &&
            Schema.sObjectType.ContentFolder.fields.Name.isAccessible()) {
                try {
                    ContentFolder cf = [SELECT ParentContentFolderId FROM ContentFolder WHERE Id = :folderId];
                    return [SELECT Id, Name, ParentContentFolderId FROM ContentFolder WHERE Id = :cf.ParentContentFolderId];
                } catch(Exception e) {
                    System.debug('Caught Exception ' + e);
                    return null;
                }
            } else {
                return null;
            }
    }
    
    @AuraEnabled
    public static List<ContentWorkspace> allLibs() {
        if (Schema.sObjectType.ContentWorkspace.fields.RootContentFolderId.isAccessible() &&
            Schema.sObjectType.ContentWorkspace.fields.LastModifiedDate.isAccessible() &&
            Schema.sObjectType.ContentWorkspace.fields.Id.isAccessible() &&
            Schema.sObjectType.ContentWorkspace.fields.Name.isAccessible()) {
                return [SELECT Id,Name,RootContentFolderId,LastModifiedDate FROM ContentWorkspace];
            } else {
                return null;
            }
    }
    
}