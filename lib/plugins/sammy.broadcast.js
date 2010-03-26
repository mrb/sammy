// Sammy.Broadcast
// An abstract Broadcast system that will add a broadcast helper to your Sammy app.
// Pass it a config Object with a selector attribute, which will be where your messages appear
// Optionally pass a callback attribute which will be triggered on the selector element
// For now, send messages as a string.  Soon, messages will be accompanied by a state as well, to control styling.
(function($) {
  Sammy = Sammy || {};

  var Broadcast = {
    default_config: {
      callback: function(){$(this).slideDown(400).slideUp(1000);},
      states: {'success':{'background':'green'}, 'failire':{'background':'red'}, 'notice':{'background':'yellow'}}
    },
    parse_config: function(app, config){
      var parsed_config = {};
      for(property in Broadcast.default_config){
        parsed_config[property] = config[property] || Broadcast.default_config[property];
      }
      parsed_config.selector = config.selector || app.element_selector;
      return parsed_config;
    }
  }

  Sammy.Broadcast = function(app, config){
    app.helpers({
      broadcast:function(message){
        config = config || {}
        var broadcast_config = Broadcast.parse_config(app,config);
        var beacon = $(broadcast_config.selector);
        beacon.append(message);
        broadcast_config.callback.apply(beacon);
      }
    })
  };
})(jQuery);

