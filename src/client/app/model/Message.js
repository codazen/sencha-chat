Ext.define('SenchaChat.model.Message', {
    extend: 'Ext.data.Model',
    
    config: {
        fields: [
            {name: 'id', type: 'int'},
            {name: 'content', type: 'auto'},
            {name: 'sender', type: 'User'},
            {name: 'date', type: 'datetime'}
        ]
    }
});