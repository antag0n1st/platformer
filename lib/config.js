//(function(window,undefined){
    
    var Config = function(){};
    
    Config.tile_width = 0;
    Config.tile_height = 0;
    Config.game_width = 1600;
    Config.game_height = 920;
    Config.ratio = 0;
    Config.scale_x = 0;
    Config.scale_y = 0;
    Config.scale_down_x=0;
    Config.scale_down_y=0;
    Config.is_mobile = false;
    Config.level_tile_width = 0;
    Config.level_tile_height = 0;
    Config.screen_width = 0;
    Config.screen_height = 0;
    
    Config.remaining_height = 0;
    Config.remaining_width = 0;
    
    Config.graphics_size = 0;
    
    Config.height_in_tiles = 48; // 48;
    Config.width_in_tiles = 80; // 80;
    Config.debug = true;
    Config.slow_motion_factor = 1;
    
    Config.set_screen_size = function(width,height){
        
        var rate = 1.0;
        
        Config.screen_width = width/rate;
        Config.screen_height = height/rate;
        
        var playing_ratio = 1.7066; // this is a very slim screen size
                
        // I should know which graphics size will be loaded
        
//        if (width <= 800) {
//            Config.graphics_size = 0;   
//            Config.game_width = 800;            
//        } else if (width <= 1280) {
//            Config.graphics_size = 1;
//            Config.game_width = 1280;
//        } else if (width <= 1920) {
//            Config.graphics_size = 2;
//            Config.game_width = 1920;
//        } else {
//            Config.graphics_size = 3;
//            Config.game_width = 2560;
//        }  
        
        Config.scale_x = 1; Config.game_width/Config.screen_width;
        Config.scale_y = 1; Config.scale_x;    
        
        Config.scale_down_x = 1; Config.screen_width/Config.game_width;
        Config.scale_down_y = 1; Config.scale_down_y;
        
        Config.tile_width = Config.game_width/Config.width_in_tiles;
        Config.tile_height = Config.tile_width;
        
        Config.game_height = Config.height_in_tiles * Config.tile_height;
        
        Config.remaining_height = 0; height - Config.game_height;
        Config.remaining_width = 0; width - Config.game_width;
        Config.x_offset = 0; Config.remaining_width;
        Config.y_offset = 0; Config.remaining_height;
        
        
//        var transformation = 'transform: scale('+Config.scale_x+','+Config.scale_y+'); -ms-transform: scale('+Config.scale_x+','+Config.scale_y+'); -webkit-transform: scale('+Config.scale_x+','+Config.scale_y+');'; 
//                
//        var style = '<style type="text/css">#stage{'+transformation+'} .element{'+transformation+'}</style>';
//
//        var div = document.createElement('div');
//        div.innerHTML = style;
//
//        window.document.body.appendChild(div);
        
        
//    console.log('Config.tile_width: '+Config.tile_width);
//    console.log('Config.tile_height: '+Config.tile_height);
//    console.log('Config.game_width: '+Config.game_width);
//    console.log('Config.game_height: '+Config.game_height);
//    console.log('Config.ratio: '+Config.ratio);
//    console.log('Config.scale_x: '+Config.scale_x);
//    console.log('Config.scale_y: '+Config.scale_y);
//    console.log('Config.is_mobile: '+Config.is_mobile);
//    console.log('Config.level_tile_width: '+Config.level_tile_width);
//    console.log('Config.level_tile_height: '+Config.level_tile_height);
//    console.log('Config.screen_width: '+Config.screen_width);
//    console.log('Config.screen_height: '+Config.screen_height);
//    
//    console.log('Config.remaining_height: '+Config.remaining_height);
//    console.log('Config.remaining_width: '+Config.remaining_width);
//    
//    console.log('Config.graphics_size: '+Config.graphics_size);
//    
//    console.log('Config.height_in_tiles: '+Config.height_in_tiles);
//    console.log('Config.width_in_tiles: '+Config.width_in_tiles);
//    
//    console.log("#########################################");
       
    };
  
    Config.window_size = function() {
        var e = window, a = 'inner';
        if (!('innerWidth' in window)) {
            a = 'client';
            e = document.documentElement || document.body;
        }
        return {width: e[ a + 'Width' ], height: e[ a + 'Height' ]};
    };
    
    Config.get_querystring = function(name)
    {
      name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
      var regexS = "[\\?&]" + name + "=([^&#]*)";
      var regex = new RegExp(regexS);
      var results = regex.exec(window.location.search);
      if(results == null)
        return "";
      else
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    };
    
    Config.resize = function(){
        
//        var size = Config.window_size();
//        
//        if(size.width - Config.new_game_width < size.height - Config.new_game_height){            
//            // resize by X
//            Config.new_game_width = size.width;
//            Config.new_game_height = parseInt(size.width/Config.ratio);
//            
//        }else{            
//            // resuze by Y
//            Config.new_game_height = size.height;
//            Config.new_game_width = parseInt(size.height*Config.ratio);
//        }
//        
//        Config.scale_x = Config.new_game_width / Config.game_width;
//        Config.scale_y = Config.new_game_height / Config.game_height;
//        
//        Config.tile_width *= Config.scale_x;
//        Config.tile_height *= Config.scale_y;
        
        
    };
    
   // window.Config = Config;
    
//}(window));



