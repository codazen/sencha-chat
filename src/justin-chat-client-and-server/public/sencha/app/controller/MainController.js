Ext.define('SenchaChat.controller.MainController', {
	extend: 'Ext.app.Controller',
	
	config:
	{
		refs: {
			usernameTextField: '#username-textfield',
			messageTextField: '#message-textfield'
		},
	},
	
	init: function () 
	{
		this.control({
			'main': 
			{
				initialize: this.onViewInitialized
			},
			
			'main #username-textfield':
			{
				blur: this.validUsername,
				keyup: this.selectUsername
			},
			
			'main #message-textfield':
			{
				keyup: this.sendMessage
			},

			'main toolbar button[action=send-message]':
			{
				tap: this.sendMessage
			}
		})
	},
	
	sendMessage: function(self,event)
	{	
		if ((event.event.type === 'keyup' && event.event.keyCode === 13) || event.event.type !== 'keyup')
		{	
			if (this.validUsername())
			{
				var chatInput = this.getMessageTextField();
				
				Ext.Ajax.request({
					url: '../SendMessage',
		    		method:'GET',
		            params: {
						message: JSON.stringify(
									Ext.create('SenchaChat.model.Message', 
									{ 
										username: SenchaChat.app.globals.username, 
										message: chatInput.getValue(), 
										color: SenchaChat.app.globals.chatColors[SenchaChat.app.globals.username]
									}).getData()
								)
					},
					
					success: function(response)
					{
						if (!response.responseText)
						{
							alert('Message Fail!');
						}
						
						chatInput.focus();
					}					
				});
						
				chatInput.setValue('');
			}
		}
	},
	
	selectUsername: function (self, event)
	{
		if ((event.event.type === 'keyup' && event.event.keyCode === 13) || event.event.type !== 'keyup')
		{
			if (this.validUsername())
			{
				SenchaChat.app.globals.username = this.getUsernameTextField().getValue();				
				SenchaChat.app.globals.chatColors[SenchaChat.app.globals.username] = this.getRandomColor();
			}
		}
	},
	
	validUsername: function()
	{		
		if (!this.getUsernameTextField().getValue())
		{
			alert('Please enter a username.');
			
			return false;
		}
		
		else
		{
			SenchaChat.app.globals.username = this.getUsernameTextField().getValue();
			return true;
		}
	},
	
	onViewInitialized: function ()
	{
		this.startUpdateChatTimer();
	},
	
	printMessage: function (username, message, color)
	{
		//need to conver to sencha
		var chatString = '<span style="color: ' + color + '">' + username + '</span>: ' + message;
		$('.chat-container').append('<div>' + chatString + '<div>');
	},
	
	//Random Color generator for more clear chatting
	getRandomColor: function() 
	{
		var letters = '0123456789ABCDEF'.split('');
		var color = '#';
		for (var i = 0; i < 6; i++ ) 
		{
			color += letters[Math.round(Math.random() * 15)];
		}
		
		return color;
	},
	
	//When update chat timer finishes, checks the server for new messages
	updateChatCallback: function ()
	{
		Ext.Ajax.request({
			url: '../UpdateChat',
			method:'GET',
			params: 
			{
				lastUpdate: SenchaChat.app.globals.lastUpdate
			},
			
			success: function(response)
			{	
				//check if at bottom
				var scroller = Ext.ComponentQuery.query('main list')[0].getScrollable().getScroller();
				var wasAtBottom = false;
				
				if (scroller.position.y >= scroller.maxPosition.y -5 && scroller.position.y <= scroller.maxPosition.y + 5 )
				{
					wasAtBottom = true;
				}
			
				var update = eval('(' + response.responseText + ')');
				
				SenchaChat.app.globals.lastUpdate = update.lastUpdate;
				
				var messagesStore = Ext.getStore('Messages');
				
				for (var i = 0; update.newMessages !== undefined && i < update.newMessages.length; i++)
				{
					var message = update.newMessages[i];
					
					messagesStore.add(message);
					
				}

				scroller.scrollToEnd();
			} 
		});
		
		SenchaChat.controller.MainController.prototype.startUpdateChatTimer();
	},
	
	startUpdateChatTimer: function ()
	{
		setTimeout(this.updateChatCallback,100);
	}
});