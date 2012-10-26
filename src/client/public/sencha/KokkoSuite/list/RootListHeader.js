Ext.define('KokkoSuite.list.RootListHeader',
{
    extend: 'toolbar',

    xtype: 'rootlistheader',

    config:
    {
        docked: 'top',
        title: 'test',
        padding: 6,
        height:46,

        baseCls: 'kokko-suite-list-header',
        layout:
        {
            type: 'hbox',
        	pack: 'start',
        	align:'center'
        },
        items:
        [{
	        xtype:'label',
	        html: this.title,
	        baseCls:'kokko-suite-list-header-title'
	    }]
    },
});