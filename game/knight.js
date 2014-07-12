(function(window,undefined){

function Knight() {
    this.initialize();
}

Knight.prototype = new SpineAnimation();
Knight.prototype.spine_initialize = Knight.prototype.initialize;
Knight.prototype.initialize = function() {
    this.spine_initialize('knight'); // your image name
    this.bounds = new Polygon(new Vector(0, 0), [new Vector(0, 0), new Vector(32, 0), new Vector(32, 80), new Vector(0, 80)]);
    this.bounds.translate(-14, -112);
    this.play('idle');
    this.velocity = new Vector();
    this.run_speed = 110 / 1000;//px/s
    this.current_flipped = false;
    this.is_on_ground = true;
    this.jump_speed = 640 / 1000; //px/s

    this.gravity = new Vector(0, 0.0015);

    this.controller = new PlayerController();
    this.animation_states = new KnightStates(this);
    this.platforms = [];

};

Knight.prototype.on_added_to_parent = function(parent) {
    Drawable.prototype.on_added_to_parent.call(this, parent);
};
Knight.prototype.on_remove_from_parent = function(parent) {
    Drawable.prototype.on_remove_from_parent.call(this, parent);
};
Knight.prototype.update = function(dt) {
    SpineAnimation.prototype.update.call(this, dt);

    //////////////////////////////////// update movement

    
    if (this.controller.is_left) {
        this.velocity.x = -this.run_speed;
        this.current_flipped = true;
    } else if (this.controller.is_right) {
        this.velocity.x = this.run_speed;
        this.current_flipped = false;
    } else {
        this.velocity.x = 0;
    }

    if (this.controller.is_up) {
        if (this.velocity.y === 0 && this.is_on_ground) {
            this.velocity.y = -this.jump_speed;
            this.is_on_ground = false;            
        }
    }


    var v = this.gravity.clone().scale(dt);
    this.velocity.add(v);


    ////////////////////////////////update movement

    var v = this.velocity.clone();
    v.scale(dt);

    var p = this.get_position();
    p.add(v);

    this.set_position(p.x, p.y);

    //////////////////////////////resolve collisions

    for (var i = 0; i < this.platforms.length; i++)
    {
        this.platforms[i].check(this);
    }

    //////////////////////////////////// handle animations
    
    this.animation_states.update();
    
};
    window.Knight = Knight;

}(window));