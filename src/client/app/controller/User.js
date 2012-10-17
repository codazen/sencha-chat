Ext.define('SenchaChat.controller.User', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            
        },
        control: {

        },
        items: {
            xtype: 'list',
            itemTpl: '{title}'
        }
    },
    
    //called when the Application is launched, remove if not needed
    launch: function(app) {
        
    }
});