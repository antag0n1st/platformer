(function(window, undefined) {

    function GameScreen() {
        this.initialize();
    }

    GameScreen.prototype = new Screen();
    GameScreen.prototype.screen_initialize = GameScreen.prototype.initialize;

    GameScreen.prototype.initialize = function() {
        this.screen_initialize();  
        
        
        // bojan added this
    
        this.hero = new Hero();
        this.hero.set_position(300,250);
        this.hero.play('run');
        this.add_child(this.hero);
        
        var that = this;
        
        this.kibo = new Kibo();
        
        this.kibo.down('left', function() {
            that.up_key = true;          
        }).down('right', function() {
            that.down_key = true;
        });
        
        
        this.kibo.up('left', function() {
            that.up_key = false;          
        }).up('right', function() {
            that.down_key = false;
        });
        
    };   

    GameScreen.prototype.game_over = function() {
        this.is_game_over = true;
    };

    GameScreen.prototype.update = function(dt) {
        
      

    };

    GameScreen.prototype.show = function() {
        Screen.prototype.show.call(this);
    };

    GameScreen.prototype.hide = function() {
        Screen.prototype.hide.call(this);
    };

    window.GameScreen = GameScreen;

}(window));