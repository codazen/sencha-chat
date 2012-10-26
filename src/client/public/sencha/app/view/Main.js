Ext.define("SenchaChat.view.Main", {
    extend: 'Ext.Panel',
	xtype:'main',
	
    requires: [
        'Ext.TitleBar',
		'Ext.dataview.List'
    ],
	
	layout:'fit',
	
    config: {
        layout:
		{
			type:'vbox',
			start:'pack',
			align:'stretch'
		},

		items:
		[{
			xtype: 'toolbar',
			title: 'SenchaChat',
			height:50
		},{
			xtype: 'toolbar',
			height:50,
			cls:'light-gray-gradient',
			layout:
			{
				type:'hbox',
				pack:'start',
				align:'center'
			},
			items:
			[{
				xtype:'textfield',
				flex:1,
				id:'username-textfield',
				placeHolder:'Enter a username'
			}]
		},{
			xtype: 'list',
			id:'chat-box',
			flex:1,
			baseCls:'main-panel',
			store: 'Messages',
			itemTpl: new Ext.XTemplate(
					'<span class="bold">{username}: </span>',
					'<span>{message}</span>'
					)
		},{
			xtype: 'toolbar',
			height:50,
			cls:'light-gray-gradient',
			layout:
			{
				type:'hbox',
				pack:'start',
				align:'center'
			},
			items:
			[{
				xtype:'textfield',
				flex:1,
				id:'message-textfield',
				placeHolder:'Message'
			},{
				xtype:'button',
				text:'Send',
				action:'send-message',
				height:30,
			}]
		}]
    }
});
