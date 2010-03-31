// Sammy.Broadcast
// Adds a broadcast helper to your sammy app
// Choose a selector, put it in your layout, and pass it to Sammy.Broadcast like so:
// this.use(Sammy.Broadcast, '#messages')
// Define some styles to use as message types:
// .error{background:red}; / .success{background:green};
// Call broadcast with a message and a message type:
// this.broadcast({'success':'great job!'})
// You can also provide a custom callback function which should show and hide the selector:
// this.use(Sammy.Broadcast,'#messages',{'callback':function(){$(this).fadeIn(1000,function(){$(this).fadeOut(1000)});}});

(function($) {
  Sammy = Sammy || {};

  var Broadcast = {
    default_config: {
      callback: function(){ $(this).slideDown(400, function(){$(this).slideUp(1000)}); }
    },
		config: {},
    parse_config: function(app, config, selector){
			var context = this;
			$.each(context.default_config, function(property){
				context.config[property] = config[property] || context.default_config[property];
			})
			context.config.selector = $(selector);
    }, 
		send_message: function(app,message,selector,config){
      this.parse_config(app,config,selector);
			this.parse_message(message);
			this.config.selector
				.html(this.message)
				.removeClass()
				.addClass(this.message_type)
				.bind('broadcast-callback', this.config.callback)
				.trigger('broadcast-callback');
		},
		parse_message: function(message){
			var context = this;
			if(typeof(message) == "object"){
				$.each(message, function(key){
					context.message_type = key;
					context.message = message[key];
				});
			}
		}
  }

  Sammy.Broadcast = function(app, selector, config){
    app.helpers({
      broadcast:function(message){
        config = config || {}
				Broadcast.send_message(app,message,selector,config);
      }
    })
  };
})(jQuery);

