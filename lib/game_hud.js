//(function(window,undefined){
    
    function GameHUD(context){
        this.initialize(context);
    }
    
    GameHUD.prototype = new Drawable();
    GameHUD.prototype.parent_initialize = Drawable.prototype.initialize;    
    
    GameHUD.prototype.initialize = function(context){        
        this.parent_initialize();
    };
    
    // should not be overriden 
    GameHUD.prototype.draw = function() {
        
    };
 
    GameHUD.prototype.clear = function() {
       
    };
    
//    window.GameHUD = GameHUD;
//    
//}(window));