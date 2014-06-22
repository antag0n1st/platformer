//(function(window) {

function AnimationAtlas(sprite_sheet) {
    if (sprite_sheet) {
        this.initialize(sprite_sheet);
    }
}

AnimationAtlas.prototype = new Drawable();
AnimationAtlas.prototype.drawable_initialize = AnimationAtlas.prototype.initialize;

AnimationAtlas.prototype.initialize = function(sprite_sheet) {

    this.drawable_initialize();

    this.animation_index = 0;
    this.is_animation_stopped = false;

    if (sprite_sheet) {


        this.position = new Vector();
        this.current_frame = 0;
        this.time_elapsed = 0;
        this.current_animation = null;
        this.current_animation_name = "";
        this.ticked = 0;
        this.backround_offset_x = 0;
        this.backround_offset_y = 0;
        this.is_removable = true;
        this.is_visible = true;

        this.image = sprite_sheet[0].image.image;
        this.frame = sprite_sheet[0].frame;

        this.animations = [];
        this._frames = [];
        this.images = [];
        this.regs = [];

        this.frames = [];



        for (var i = 0; i < sprite_sheet.length; i++) {
            var config = sprite_sheet[i];
            this.animations.push(config.animations);
            this._frames.push( JSON.parse(config.frames) );
            this.images.push(config.image.image);
            this.regs.push(config.reg);

        }
        

        this.width = this.frame_width = this.frame.width;
        this.height = this.frame_height = this.frame.height;


        if (sprite_sheet[0].reg) {
            var reg = sprite_sheet[0].reg;

        } else {
            var reg = {x: 0, y: 0, width: 1, height: 1};
        }

        this.set_size(this.width * reg.width, this.height * reg.height);
        this.set_anchor(reg.x, reg.y);




        this.sprite_sheet = sprite_sheet;

        this.has_ended = false;
        this.lock_callback = false;


    }



};

AnimationAtlas.prototype.on_frame = function(frame_index, animation_name) {
};

AnimationAtlas.prototype.play = function(anime_name, start_at_begining) {
    this.is_animation_stopped = false;
    var animations = this.animations;
    var count = animations.length;
    this.current_animation_name = anime_name;
    
    var reg;

    for (var i = 0; i < count; i++) {

        var animation = animations[i];
        this.animation_index = 0;
        if (animation[anime_name]) {
            // lets set 
            this.current_animation = animation[anime_name];
            this.image = this.images[i];
            this.frames = this._frames[i];
            this.frame = this.sprite_sheet[i].frame;
            reg = this.sprite_sheet[i].reg;
            break;
        }


    }


    this.time_elapsed = (start_at_begining === undefined || this.time_elapsed > this.current_animation.duration) ? 0 : this.time_elapsed;
    this.set_frame(this.get_current_frame());
    this.ticked = 0;
    this.has_ended = false;
    this.lock_callback = false;
    
    var pos = this.get_position();
  
    this.bounds = new SAT.Box(new Vector(pos.x,pos.y), this.frame.width, this.frame.height);
    
    this.width = this.frame_width = this.frame.width;
    this.height = this.frame_height = this.frame.height;



        this.set_size(this.width * reg.width, this.height * reg.height);
        this.set_anchor(reg.x, reg.y);


};

AnimationAtlas.prototype.stop = function() {
    this.is_animation_stopped = true;
};

AnimationAtlas.prototype.get_current_frame = function() {
    var p = this.time_elapsed / this.current_animation.duration;
    p = (p < 1.0) ? p : 0.99;
    return this.current_animation.start + Math.floor((this.current_animation.end - this.current_animation.start + 1) * p);

};

AnimationAtlas.prototype.set_frame = function(frame) {
    if (frame !== this.current_frame) {
        this.current_frame = frame;
        this.on_frame(this.current_frame, this.current_animation_name);
    }

};


AnimationAtlas.prototype.advance = function(dt) {

    this.time_elapsed += dt;



    if (this.time_elapsed >= this.current_animation.duration) {
        if (this.current_animation.loop) {
            this.time_elapsed -= this.current_animation.duration;
        } else {

            this.set_frame(this.current_animation.end);

            if (!this.has_ended) {
                this.has_ended = true;
            }
        }
    } else {

        this.set_frame(this.get_current_frame());

    }
    
    this.backround_offset_x = this.frames[this.current_frame].x;
    this.backround_offset_y = this.frames[this.current_frame].y;

};

AnimationAtlas.prototype.on_draw = function(context) {
};

AnimationAtlas.prototype.draw = function(context) {

    var w = this.frame_width;
    var h = this.frame_height;
    var anchor = this.bounds.pos;
    var ach = this.get_anchor();
    var pos = SAT.pool.get();
    pos.x = this.bounds.pos.x + (-w * ach.x);
    pos.y = this.bounds.pos.y + (-h * ach.y);

    if (this.is_visible) {

        this._alpha = context.globalAlpha;

        if (this.angle !== 0) {
            context.save();
            context.translate(anchor.x, anchor.y);
            context.rotate(this.angle);
            pos.x = -w * ach.x;
            pos.y = -h * ach.y;
        }


        if (this.alpha !== 1) {
            context.globalAlpha = context.globalAlpha * this.alpha;
        }

        var new_width = w * this.scale_x;
        var new_height = h * this.scale_y;

        context.drawImage(this.image,
                Math.round_decimal((this.backround_offset_x), 2),
                Math.round_decimal(this.backround_offset_y, 2),
                w,
                h,
                Math.round_decimal(pos.x - ach.x * (new_width - w), 2),
                Math.round_decimal(pos.y - ach.y * (new_height - h), 2),
                new_width,
                new_height
                );


        this.on_draw(context);

        if (this.angle !== 0) {
            context.restore();
        }

    }

    if (Config.debug) {
        this.debug_bounds(context);
    }


    if (!this.lock_callback && this.has_ended) {
        if (this.current_animation.callback) {
            this.current_animation.callback();
        }
        this.lock_callback = true;
    }

};

AnimationAtlas.prototype.on_draw_finished = function(context) {
    context.globalAlpha = this._alpha;
};

AnimationAtlas.prototype.clear = function(context) {

};

AnimationAtlas.prototype.update = function(dt) {
    if (!this.is_animation_stopped) {
        this.advance(dt);
    }
};


//    window.AnimationAtlas = AnimationAtlas;
//
//}(window));