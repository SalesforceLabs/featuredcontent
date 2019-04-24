({
	doInit : function(cmp, event, helper) {
		var action = cmp.get('c.setControllerValue');
        action.setParams({
            bytes : cmp.get('v.componentValue') 
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if(cmp.isValid() && state == 'SUCCESS') {
                cmp.set('v.componentValue',response.getReturnValue());
            } else {
                console.log('Failed byte conversion with state: ' + state);
            }
        });
        $A.enqueueAction(action);
	}
})