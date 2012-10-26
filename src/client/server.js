var express = require('express'),
	app = express();

//This routes all document requests to the public folder
app.use('/', express.static(__dirname + '/public'));

//Chat messages are stored here
var chatMessages = [];

//Chat update object, which is sent to the client after every UpdateChat request
var ChatUpdate = function (newMessages, lastUpdate)
{
	this.newMessages = newMessages;
	this.lastUpdate = lastUpdate;
}

//Sends all the new messages since the client's last update, expects a Date() string
app.get('/UpdateChat', function(req, res)
{
	var lastUpdate = req.query["lastUpdate"];
	
	if (!lastUpdate)
	{
		res.send(JSON.stringify(new ChatUpdate([],new Date())));
	}
	
	else
	{
		var newMessages = [];
				
		for (var i = chatMessages.length - 1; i >= 0 && chatMessages[i].sentTime >= new Date(lastUpdate); i--)
		{
			newMessages.push(chatMessages[i]);
		}
		
		//reverse the list since it's iterating backwards
		res.send(JSON.stringify(new ChatUpdate(newMessages.reverse(),new Date())));
	}
});

//Receives messages, expects a JSON Object
app.get('/SendMessage',function(req, res)
{
	try
	{
		var message = eval('(' + req.query["message"] + ')');
		
		message.sentTime = new Date();
		
		delete message.id;
		
		chatMessages.push(message);
	
		res.send(true);
	}
	
	catch(err)
	{
		res.send(false);
	}
});

//Routes to index on root
app.get('/',function(req, res)
{
	res.sendfile(__dirname + '/public/index.html');	
});

//Routes to index on Sencha
app.get('/Sencha',function(req, res)
{
	res.sendfile(__dirname + '/public/sencha/index.html');	
});

app.listen(3000);

console.log('Listening on port 3000');