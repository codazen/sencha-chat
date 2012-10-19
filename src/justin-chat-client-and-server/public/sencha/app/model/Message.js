Ext.define('SenchaChat.model.Message', {
	extend: 'Ext.data.Model',
	config:
	{
		fields:
		[
			{ name: 'username', type: 'string' },
			{ name: 'message', type: 'string' },
			{ name: 'color', type: 'string' }
		]
	}
});