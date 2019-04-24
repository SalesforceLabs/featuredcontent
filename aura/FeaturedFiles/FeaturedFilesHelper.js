({
    getFiles : function(component,event) {
        var action = component.get("c.getFeaturedFiles");
        var newArray = [component.get('v.file1'),component.get('v.file2'),component.get('v.file3'),component.get('v.file4'),component.get('v.file5'),component.get('v.file6')];
        action.setParams({
            "fileArray" : newArray
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(component.isValid() && state == 'SUCCESS') {
                component.set('v.docs',response.getReturnValue());
            } else {
                console.log('Failed with state: ', state);
            }
        });
        $A.enqueueAction(action);
    }
})