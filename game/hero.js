//(function(window,undefined){
    
    function Hero(){
        this.initialize();
    }    
    
    Hero.prototype = new AnimationAtlas();
    Hero.prototype.animation_initialize = Hero.prototype.initialize;    
    Hero.prototype.initialize = function(){        
        
        var sprite_sheet = [{
                frame: {width:303,height:282},
                image: ContentManager.images.hero_run,
                frames: '[{"index":0,"x":0,"y":1128,"width":303,"height":282},{"index":1,"x":0,"y":846,"width":303,"height":282},{"index":2,"x":606,"y":564,"width":303,"height":282},{"index":3,"x":1212,"y":564,"width":303,"height":282},{"index":4,"x":1515,"y":846,"width":303,"height":282},{"index":5,"x":909,"y":0,"width":303,"height":282},{"index":6,"x":1212,"y":282,"width":303,"height":282},{"index":7,"x":1515,"y":564,"width":303,"height":282},{"index":8,"x":1212,"y":0,"width":303,"height":282},{"index":9,"x":1515,"y":282,"width":303,"height":282},{"index":10,"x":303,"y":1128,"width":303,"height":282},{"index":11,"x":0,"y":564,"width":303,"height":282},{"index":12,"x":303,"y":846,"width":303,"height":282},{"index":13,"x":606,"y":1128,"width":303,"height":282},{"index":14,"x":0,"y":282,"width":303,"height":282},{"index":15,"x":303,"y":564,"width":303,"height":282},{"index":16,"x":606,"y":846,"width":303,"height":282},{"index":17,"x":909,"y":1128,"width":303,"height":282},{"index":18,"x":0,"y":0,"width":303,"height":282},{"index":19,"x":303,"y":282,"width":303,"height":282},{"index":20,"x":909,"y":846,"width":303,"height":282},{"index":21,"x":1212,"y":1128,"width":303,"height":282},{"index":22,"x":303,"y":0,"width":303,"height":282},{"index":23,"x":606,"y":282,"width":303,"height":282},{"index":24,"x":909,"y":564,"width":303,"height":282},{"index":25,"x":1212,"y":846,"width":303,"height":282},{"index":26,"x":1515,"y":1128,"width":303,"height":282},{"index":27,"x":606,"y":0,"width":303,"height":282},{"index":28,"x":909,"y":282,"width":303,"height":282}]',
                animations: {
                    run: {start: 0, end: 28, loop: true, duration: 500}
                }
                , reg: {x: 0.5, y: 0.5, width: 1.0, height: 1.0}
            },
            {
                frame: {width:303,height:282},
                image: ContentManager.images.hero_run_left,
                frames: '[{"index":0,"x":1515,"y":1128,"width":303,"height":282},{"index":1,"x":1515,"y":846,"width":303,"height":282},{"index":2,"x":909,"y":564,"width":303,"height":282},{"index":3,"x":303,"y":564,"width":303,"height":282},{"index":4,"x":0,"y":846,"width":303,"height":282},{"index":5,"x":606,"y":0,"width":303,"height":282},{"index":6,"x":303,"y":282,"width":303,"height":282},{"index":7,"x":0,"y":564,"width":303,"height":282},{"index":8,"x":303,"y":0,"width":303,"height":282},{"index":9,"x":0,"y":282,"width":303,"height":282},{"index":10,"x":1212,"y":1128,"width":303,"height":282},{"index":11,"x":1515,"y":564,"width":303,"height":282},{"index":12,"x":1212,"y":846,"width":303,"height":282},{"index":13,"x":909,"y":1128,"width":303,"height":282},{"index":14,"x":1515,"y":282,"width":303,"height":282},{"index":15,"x":1212,"y":564,"width":303,"height":282},{"index":16,"x":909,"y":846,"width":303,"height":282},{"index":17,"x":606,"y":1128,"width":303,"height":282},{"index":18,"x":1515,"y":0,"width":303,"height":282},{"index":19,"x":1212,"y":282,"width":303,"height":282},{"index":20,"x":606,"y":846,"width":303,"height":282},{"index":21,"x":303,"y":1128,"width":303,"height":282},{"index":22,"x":1212,"y":0,"width":303,"height":282},{"index":23,"x":909,"y":282,"width":303,"height":282},{"index":24,"x":606,"y":564,"width":303,"height":282},{"index":25,"x":303,"y":846,"width":303,"height":282},{"index":26,"x":0,"y":1128,"width":303,"height":282},{"index":27,"x":909,"y":0,"width":303,"height":282},{"index":28,"x":606,"y":282,"width":303,"height":282}]',
                animations: {
                    run_left: {start: 0, end: 28, loop: true, duration: 500}
                }
                , reg: {x: 0.5, y: 0.5, width: 1.0, height: 1.0}
            },
            {
                frame: {width:303,height:262},
                image: ContentManager.images.idle,
                frames: '[{"index":0,"x":0,"y":1310,"width":303,"height":262},{"index":1,"x":0,"y":1048,"width":303,"height":262},{"index":2,"x":606,"y":786,"width":303,"height":262},{"index":3,"x":909,"y":524,"width":303,"height":262},{"index":4,"x":1515,"y":1048,"width":303,"height":262},{"index":5,"x":606,"y":0,"width":303,"height":262},{"index":6,"x":909,"y":262,"width":303,"height":262},{"index":7,"x":1212,"y":524,"width":303,"height":262},{"index":8,"x":1515,"y":786,"width":303,"height":262},{"index":9,"x":909,"y":0,"width":303,"height":262},{"index":10,"x":303,"y":1310,"width":303,"height":262},{"index":11,"x":0,"y":786,"width":303,"height":262},{"index":12,"x":303,"y":1048,"width":303,"height":262},{"index":13,"x":606,"y":1310,"width":303,"height":262},{"index":14,"x":0,"y":524,"width":303,"height":262},{"index":15,"x":303,"y":786,"width":303,"height":262},{"index":16,"x":606,"y":1048,"width":303,"height":262},{"index":17,"x":909,"y":1310,"width":303,"height":262},{"index":18,"x":0,"y":262,"width":303,"height":262},{"index":19,"x":303,"y":524,"width":303,"height":262},{"index":20,"x":909,"y":1048,"width":303,"height":262},{"index":21,"x":1212,"y":1310,"width":303,"height":262},{"index":22,"x":0,"y":0,"width":303,"height":262},{"index":23,"x":303,"y":262,"width":303,"height":262},{"index":24,"x":606,"y":524,"width":303,"height":262},{"index":25,"x":909,"y":786,"width":303,"height":262},{"index":26,"x":1212,"y":1048,"width":303,"height":262},{"index":27,"x":1515,"y":1310,"width":303,"height":262},{"index":28,"x":303,"y":0,"width":303,"height":262},{"index":29,"x":606,"y":262,"width":303,"height":262},{"index":30,"x":1212,"y":786,"width":303,"height":262}]',
                animations: {
                    idle: {start: 0, end: 30, loop: true, duration: 1000}
                }
                , reg: {x: 0.5, y: 0.5, width: 1.0, height: 1.0}
            },
            {
                frame: {width:303,height:262},
                image: ContentManager.images.idle_left,
                frames: '[{"index":0,"x":1515,"y":1310,"width":303,"height":262},{"index":1,"x":1515,"y":1048,"width":303,"height":262},{"index":2,"x":909,"y":786,"width":303,"height":262},{"index":3,"x":606,"y":524,"width":303,"height":262},{"index":4,"x":0,"y":1048,"width":303,"height":262},{"index":5,"x":909,"y":0,"width":303,"height":262},{"index":6,"x":606,"y":262,"width":303,"height":262},{"index":7,"x":303,"y":524,"width":303,"height":262},{"index":8,"x":0,"y":786,"width":303,"height":262},{"index":9,"x":606,"y":0,"width":303,"height":262},{"index":10,"x":1212,"y":1310,"width":303,"height":262},{"index":11,"x":1515,"y":786,"width":303,"height":262},{"index":12,"x":1212,"y":1048,"width":303,"height":262},{"index":13,"x":909,"y":1310,"width":303,"height":262},{"index":14,"x":1515,"y":524,"width":303,"height":262},{"index":15,"x":1212,"y":786,"width":303,"height":262},{"index":16,"x":909,"y":1048,"width":303,"height":262},{"index":17,"x":606,"y":1310,"width":303,"height":262},{"index":18,"x":1515,"y":262,"width":303,"height":262},{"index":19,"x":1212,"y":524,"width":303,"height":262},{"index":20,"x":606,"y":1048,"width":303,"height":262},{"index":21,"x":303,"y":1310,"width":303,"height":262},{"index":22,"x":1515,"y":0,"width":303,"height":262},{"index":23,"x":1212,"y":262,"width":303,"height":262},{"index":24,"x":909,"y":524,"width":303,"height":262},{"index":25,"x":606,"y":786,"width":303,"height":262},{"index":26,"x":303,"y":1048,"width":303,"height":262},{"index":27,"x":0,"y":1310,"width":303,"height":262},{"index":28,"x":1212,"y":0,"width":303,"height":262},{"index":29,"x":909,"y":262,"width":303,"height":262},{"index":30,"x":303,"y":786,"width":303,"height":262}]',
                animations: {
                    idle_left: {start: 0, end: 30, loop: true, duration: 1000}
                }
                , reg: {x: 0.5, y: 0.5, width: 1.0, height: 1.0}
            }
        ];

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