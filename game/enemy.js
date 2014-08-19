(function(window, undefined) {

    function Enemy() {
        this.initialize();
    }

    Enemy.prototype = new SpineAnimation();
    Enemy.prototype.spine_initialize = Enemy.prototype.initialize;
    Enemy.prototype.initialize = function() {
        this.spine_initialize('knight'); // your image name
        this.bounds = new Polygon(new Vector(0, 0), [new Vector(0, 0), new Vector(32, 0), new Vector(32, 80), new Vector(0, 80)]);
        this.bounds.translate(-14, -112);
        this.play('idle');
        this.velocity = new Vector();
        this.run_speed = 110 / 1000;//px/s
        this.is_on_ground = true;
        this.jump_speed = 640 / 1000; //px/s

        this.gravity = new Vector(0, 0.0015);

        this.animation_states = new EnemyStates(this);
        this.platforms = [];

        this.stateData.setMixByName("run", "fall", 0.1);

        this.checkpoints = [{x: 30, y: 460}, {x: 530, y: 460}];
        this.set_position(this.checkpoints[0].x, this.checkpoints[0].y);
        this.next_position = 1;
    };

    Enemy.prototype.on_added_to_parent = function(parent) {
        Drawable.prototype.on_added_to_parent.call(this, parent);
        Notes.add(this.animation_states, Notes.NOTE_SIDE_FLIPPED);
    };
    Enemy.prototype.on_remove_from_parent = function(parent) {
        Drawable.prototype.on_remove_from_parent.call(this, parent);
        Notes.remove(this.animation_states, Notes.NOTE_SIDE_FLIPPED);
    };
    Enemy.prototype.update = function(dt) {
        SpineAnimation.prototype.update.call(this, dt);

        var v = this.gravity.clone().scale(dt);
        this.velocity.add(v);


        ////////////////////////////////update movement

        var v = this.velocity.clone();
        v.scale(dt);

        var p = this.get_position();
        this.velocity.x = this.run_speed;
        p.add(v);

        this.set_position(p.x, p.y);

        //////////////////////////////resolve collisions

        for (var i = 0; i < this.platforms.length; i++)
        {
            this.platforms[i].check(this);
        }

        console.log(this.checkpoints.length);
        console.log(this.next_position);


        //////////////////////////next checkpoint
        if (p.x > (this.checkpoints[this.next_position].x - 5) && p.x < (this.checkpoints[this.next_position].x + 5))
        {
            this.next_position++;
            if(this.next_position == this.checkpoints.length)
            {
                this.next_position = 0;
            }
            
            this.run_speed = -this.run_speed;
        }

        //////////////////////////////////// handle animations

        this.animation_states.update();

    };
    window.Enemy = Enemy;

}(window));