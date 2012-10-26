Ext.define('KokkoSuite.list.RootListView', {
    extend: 'Ext.Panel',
    xtype: 'rootlistview',

    requires:
    [
        'Ext.Label',
        'Ext.dataview.List'
    ],

    config:
	{
	    layout: 'fit',
	    listStore: null,
	    listItemTpl: null,
	    stackIndex: 1,

	    items:
		[{
		    xtype: 'titlebar',
		    docked: 'top',
		    height: 46,
            title:''
		}, {
		    xtype: 'container',
		    baseCls: 'root-list-container',
		    layout:
			{
			    type: 'vbox',
			    pack: 'start',
			    align: 'stretch'
			},
		    items:
			[{
			    flex: 1,
			    xtype: 'list'
			}]
		}]
	},

    constructor: function (config)
    {
        config = config || {};

        if (config.title !== undefined)
        {
            this.setHeader(config.title);
        }

        if (config.listStore !== undefined)
        {
            this.setHeader(config.title);
        }


        this.callParent([config]);
    },

    getStackIndex: function ()
    {
        return this.config.stackIndex;
    },

    setListStore: function ()
    {
        var self = this;

        setTimeout(function ()
        {
            Ext.ComponentQuery.query('#' + self.id + ' > container > list')[0].setStore(self.config.listStore);
        }, 10);
    },

    setHeader: function ()
    {
        var self = this;

        setTimeout(function ()
        {
            Ext.ComponentQuery.query('#' + self.id + ' > titlebar')[0].setTitle(self.config.title);
        }, 10);
    }
});