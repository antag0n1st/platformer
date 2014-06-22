//(function(window,undefined){
    
    function Hero(){
        this.initialize();
    }    
    
    Hero.prototype = new AnimationAtlas();
    Hero.prototype.animation_initialize = Hero.prototype.initialize;    
    Hero.prototype.initialize = function(){        
        
        var sprite_sheet = [{
                frame: {width:302,height:284},
                image: ContentManager.images.hero_run,
                frames: '[{"index":0,"x":0,"y":1136,"width":302,"height":284},{"index":1,"x":0,"y":852,"width":302,"height":284},{"index":2,"x":604,"y":568,"width":302,"height":284},{"index":3,"x":1510,"y":852,"width":302,"height":284},{"index":4,"x":906,"y":0,"width":302,"height":284},{"index":5,"x":1208,"y":284,"width":302,"height":284},{"index":6,"x":1510,"y":568,"width":302,"height":284},{"index":7,"x":1208,"y":0,"width":302,"height":284},{"index":8,"x":1510,"y":284,"width":302,"height":284},{"index":9,"x":1510,"y":0,"width":302,"height":284},{"index":10,"x":302,"y":1136,"width":302,"height":284},{"index":11,"x":0,"y":568,"width":302,"height":284},{"index":12,"x":302,"y":852,"width":302,"height":284},{"index":13,"x":604,"y":1136,"width":302,"height":284},{"index":14,"x":0,"y":284,"width":302,"height":284},{"index":15,"x":302,"y":568,"width":302,"height":284},{"index":16,"x":604,"y":852,"width":302,"height":284},{"index":17,"x":906,"y":1136,"width":302,"height":284},{"index":18,"x":0,"y":0,"width":302,"height":284},{"index":19,"x":302,"y":284,"width":302,"height":284},{"index":20,"x":906,"y":852,"width":302,"height":284},{"index":21,"x":1208,"y":1136,"width":302,"height":284},{"index":22,"x":302,"y":0,"width":302,"height":284},{"index":23,"x":604,"y":284,"width":302,"height":284},{"index":24,"x":906,"y":568,"width":302,"height":284},{"index":25,"x":1208,"y":852,"width":302,"height":284},{"index":26,"x":1510,"y":1136,"width":302,"height":284},{"index":27,"x":604,"y":0,"width":302,"height":284},{"index":28,"x":906,"y":284,"width":302,"height":284},{"index":29,"x":1208,"y":568,"width":302,"height":284}]',
                animations: {
                    run: {start: 0, end: 29, loop: true, duration: 500}
                }
                , reg: {x: 0.5, y: 0.5, width: 1.0, height: 1.0}
            }];

        this.animation_initialize(sprite_sheet);
        
        
    };
    
    Hero.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    Hero.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Hero.prototype.update = function(dt){
        Animation.prototype.update.call(this,dt);
    };
    
    Hero.prototype.clear = function(context){
        
    };
    
//    window.Hero = Hero;
    
//}(window));