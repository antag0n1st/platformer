//(function(window,undefined){
    
    function Smoke(){
        this.initialize();
    }    
    
    Smoke.prototype = new Sprite();
    Smoke.prototype.sprite_initialize = Smoke.prototype.initialize;    
    Smoke.prototype.initialize = function(){        
        
        this.sprite_initialize('smoke'); // the image name of the particle

        this.duration = 500;
        this.total_time = 0;
        this.emitter = null;

        ////////////////////////////////////////////////////////////////////////
        ///////// Set custom properties to the particle
        
        
        this.direction = new Vector(1, 1);
        this.direction.setAngle(Math.degrees_to_radians(180));
        this.trust_magnitude = 180 / 1000;

        this.begin_scale = 0.1;
        this.end_scale = 0.7;

        this.begin_alpha = 0.9;
        this.end_alpha = 0.0;
        this.set_anchor(0.5,0.5);
        this.set_scale(this.begin_scale);
        this.set_alpha(this.begin_alpha);
        
    };
    
    Smoke.prototype.reset = function(){
        
        // RESET YOUR PARTICLE PROPERTIES 
        
        this.total_time = 0;        
        this.set_scale(this.begin_scale);
        this.set_alpha(this.begin_alpha);
                
    };
    
    Smoke.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
        // DELETE THIS CODE IF YOU DON'T NEED DISPLACMENT FROM THE EMISSION PONIT 
        
        var r1 = Math.random_int(0, 6);
        var r2 = Math.random_int(0, 6);
        var pos = this.get_position();
        this.set_position(pos.x + r1 - 3, pos.y + r2 - 3);
        
    };
    
    Smoke.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    Smoke.prototype.update = function(dt) {

        this.total_time += dt;
        var t = this.total_time / this.duration;
        
        if (t > 1.0) {
            this.emitter.recycle_particle(this);
        } else {
            
            ////////////////////////////////////////////////////////////////////
            ////////////// Particle Behaviour code

            var pos = this.get_position();

            this.direction.setLength(dt * this.trust_magnitude);
            pos.add(this.direction);
            this.set_position(pos.x, pos.y);

            var f = this.begin_scale + (this.end_scale - this.begin_scale) * t;

            var a = this.begin_alpha + (this.end_alpha - this.begin_alpha) * t;

            this.set_scale(f);
            this.set_alpha(a);

        }

    };
    
    
//    window.Smoke = Smoke;
    
//}(window));