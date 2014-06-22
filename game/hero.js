//(function(window,undefined){
    
    function Hero(){
        this.initialize();
    }    
    
    Hero.prototype = new AnimationAtlas();
    Hero.prototype.animation_initialize = Hero.prototype.initialize;    
    Hero.prototype.initialize = function(){        
        
        var sprite_sheet = [{
                frame: {width:314,height:282},
                image: ContentManager.images.hero_run,
                frames: '[{"index":0,"x":0,"y":1128,"width":314,"height":282},{"index":1,"x":0,"y":846,"width":314,"height":282},{"index":2,"x":628,"y":564,"width":314,"height":282},{"index":3,"x":1256,"y":564,"width":314,"height":282},{"index":4,"x":1570,"y":846,"width":314,"height":282},{"index":5,"x":942,"y":0,"width":314,"height":282},{"index":6,"x":1256,"y":282,"width":314,"height":282},{"index":7,"x":1570,"y":564,"width":314,"height":282},{"index":8,"x":1256,"y":0,"width":314,"height":282},{"index":9,"x":1570,"y":282,"width":314,"height":282},{"index":10,"x":314,"y":1128,"width":314,"height":282},{"index":11,"x":0,"y":564,"width":314,"height":282},{"index":12,"x":314,"y":846,"width":314,"height":282},{"index":13,"x":628,"y":1128,"width":314,"height":282},{"index":14,"x":0,"y":282,"width":314,"height":282},{"index":15,"x":314,"y":564,"width":314,"height":282},{"index":16,"x":628,"y":846,"width":314,"height":282},{"index":17,"x":942,"y":1128,"width":314,"height":282},{"index":18,"x":0,"y":0,"width":314,"height":282},{"index":19,"x":314,"y":282,"width":314,"height":282},{"index":20,"x":942,"y":846,"width":314,"height":282},{"index":21,"x":1256,"y":1128,"width":314,"height":282},{"index":22,"x":314,"y":0,"width":314,"height":282},{"index":23,"x":628,"y":282,"width":314,"height":282},{"index":24,"x":942,"y":564,"width":314,"height":282},{"index":25,"x":1256,"y":846,"width":314,"height":282},{"index":26,"x":1570,"y":1128,"width":314,"height":282},{"index":27,"x":628,"y":0,"width":314,"height":282},{"index":28,"x":942,"y":282,"width":314,"height":282}]',
                animations: {
                    run: {start: 0, end: 28, loop: true, duration: 500}
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