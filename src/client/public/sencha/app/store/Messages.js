Ext.define('SenchaChat.store.Messages', 
{
	extend: 'Ext.data.Store',
	config:
	{
    	model: 'SenchaChat.model.Message',
    	reader: {
            type: 'json',
            rootProperty: 'root'
        },
    	data: []
	}
});