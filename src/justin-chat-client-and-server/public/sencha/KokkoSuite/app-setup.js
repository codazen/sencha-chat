KokkoSuite =
{
	utils: 
	{
		getWindowAxisLength: function(axis)
		{
			if (axis.toLowerCase() === 'width')
			{
				axis = 'Width';
			}
			
			else if (axis.toLowerCase() === 'height')
			{
				axis = 'Height';
			}
		
			var axisLength = 0;
			
			if (document.body && document.body['offset' + axis])
			{
				axisLength = document.body['offset' + axis];
			}
			
			if (document.compatMode=='CSS1Compat' &&
				document.documentElement &&
				document.documentElement['offset'+ axis]) 
			{
				axisLength = document.documentElement['offset'+ axis];
			}
			if (window.innerWidth && window.innerHeight) 
			{
				axisLength = window['inner'+ axis] ;
			}
			
			return axisLength;
		}
	}
};

window.onresize = function ()
{
    Ext.each(ExtSizing.functions,function(value,index)
	{
		value();
	});
};

var ExtSizing =
{
	functions: [],
	
	runAll: function ()
	{
		Ext.each(ExtSizing.functions,function(value,index)
		{
			value();
		});
	},
	
	initialize: function()
	{
		ExtSizing.addFunction(function()
		{
			Ext.each(Ext.DomQuery.select('.x-toolbar .x-title > .x-innerhtml'), function (value, index)
			{
				value.style.width = Math.floor(KokkoSuite.utils.getWindowAxisLength('width') / 3) + 'px';
			});
		}, 'titlebars');
	},
	
	functionNames: [],
	
	addFunction: function(newFunction, functionName)
	{
		ExtSizing.functions.push(newFunction);
		ExtSizing.functionNames.push(functionName);
	}
};


var ExtReady = 
{
	start: function ()
	{
		setTimeout(this.callback,500);
	},
	
	ready: false,
	
	titleSet: false,
	
	callback: function()
	{
		if (Ext)
		{
			ExtSizing.initialize();
		}
		
		else
		{
			startExtInitializedTimer();
		}
	}
};

ExtReady.start();

