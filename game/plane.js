(function(window,undefined){
    
    function Plane(){
        this.initialize();
    }    
    
    Plane.prototype = new Animation();
    Plane.prototype.animation_initialize = Plane.prototype.initialize;    
    Plane.prototype.initialize = function(){        
        
        var sprite_sheet = new SpriteSheet([{
                image: Images.sonic_plane,
                frames: {x: 4, y: 2},
                animations: {
                    fly: {start: 0, end: 3, loop: true, duration: 300}
                }
                , reg: {x: 0.6, y: 0.5, width: 0.8, height: 0.5}
            }]);

        this.animation_initialize(sprite_sheet);
        
        this.emiter_point = new Vector(-40,10);
        this.velocity = new Vector(0, 0);
        
        this.rotation = 2/1000;   
        
        this.emitter = new Emitter(this.position,null,Smoke,15/1000);
        this.emitter.run();
        
        
    };
    
    Plane.prototype.on_mouse_up = function(event){
        log("plane");
    };
    
    Plane.prototype.on_frame = function(frame_index,animation_name){
//        log("frame: "+frame_index);
//        log(animation_name);
    };
    
    Plane.prototype.update = function(dt){
        //console.log(dt);
        Animation.prototype.update.call(this,dt);
        
        this.emitter.emission_point = this.get_position().add(this.emiter_point);
        
    };
    
    Plane.prototype.steer_up = function(dt){
        var angle = this.angle;
        angle -= dt*this.rotation;
        this.rotate_to( angle);
    };
    
    Plane.prototype.steer_down = function(dt){
        var angle = this.angle;
        angle += dt*this.rotation;
        this.rotate_to( angle);
    };
    
    Plane.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        this.emitter.layer = parent;
        
    };
    
    Plane.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Plane.prototype.draw = function(context){
        Animation.prototype.draw.call(this,context);
        
        if(Config.debug){
            var pos = this.bounds.pos;
            var anchor = Vector.addition(pos,this.emiter_point);
            context.fillStyle="yellow";
            context.beginPath();
            context.arc(anchor.x,anchor.y,2,0,2*Math.PI);
            context.fill();
            context.closePath();
            context.fillStyle="black";

            this.debug_bounds(context);
        }
        
        
    };
    
    Plane.prototype.rotate_to = function(angle){
        
        var a = angle - this.angle;        
        Drawable.prototype.rotate_to.call(this,angle);
        this.emiter_point.rotate(a);
    };
    
    Plane.prototype.clear = function(context){
        
    };
    
    window.Plane = Plane;
    
}(window));