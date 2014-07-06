(function(window, undefined) {

    function GameScreen() {
        this.initialize();
    }

    GameScreen.prototype = new Screen();
    GameScreen.prototype.screen_initialize = GameScreen.prototype.initialize;

    GameScreen.prototype.initialize = function() {
        this.screen_initialize();


        this.knight = new Knight();
        this.knight.set_position(400,200);
        //this.knight.play('run');    
        this.knight.set_scale(0.4);
        this.add_child(this.knight);
        
        this.platforms = [];
        
        var solid_platform = new SolidPlatform();
        solid_platform.set_size(800, 50);
        solid_platform.set_position(0,450);
        this.platforms.push(solid_platform);
        
        solid_platform = new SolidPlatform();
        solid_platform.set_size(80, 50);
        solid_platform.set_position(300,350);
        this.platforms.push(solid_platform);
        
        solid_platform = new SolidPlatform();
        solid_platform.set_size(80, 50);
        solid_platform.set_position(400,250);
        this.platforms.push(solid_platform);
        
        solid_platform = new SolidPlatform();
        solid_platform.set_size(80, 50);
        solid_platform.set_position(500,150);
        this.platforms.push(solid_platform);
        
        solid_platform = new SolidPlatform();
        solid_platform.set_size(80, 50);
        solid_platform.set_position(600,50);
        this.platforms.push(solid_platform);
        
        
        for(var i=0;i<this.platforms.length;i++)
        {
            this.add_child(this.platforms[i]);
        }
        
        this.knight.platforms = this.platforms;
        
    };

    GameScreen.prototype.game_start = function(skeletonName, atlas, skeletonData) {

        


    };

    GameScreen.prototype.game_over = function() {
        this.is_game_over = true;
    };

    

    GameScreen.prototype.update = function(dt) {
        
      
    };

    GameScreen.prototype.draw = function(context) {

        Screen.prototype.draw.call(this, context);

        

    };

    GameScreen.prototype.show = function() {
        Screen.prototype.show.call(this);
    };

    GameScreen.prototype.hide = function() {
        Screen.prototype.hide.call(this);
    };

    window.GameScreen = GameScreen;

}(window));