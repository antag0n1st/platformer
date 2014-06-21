//(function(window, undefined) {

function Sprite(image_name) {
    if (image_name) {
        this.initialize(image_name);
    }
}

Sprite.prototype = new Drawable();
Sprite.prototype.drawable_initialize = Sprite.prototype.initialize;
Sprite.prototype.initialize = function(image_name) {
    this.drawable_initialize();
    this.image_name = image_name;
    this.image = ContentManager.images[image_name].image;
    this.set_size(this.image.width, this.image.height);
    

};

Sprite.prototype.on_added_to_parent = function(parent) {
    Drawable.prototype.on_added_to_parent.call(this, parent);

};

Sprite.prototype.on_remove_from_parent = function(parent) {
    Drawable.prototype.on_remove_from_parent.call(this, parent);

};

Sprite.prototype.on_draw = function(context) {
};

Sprite.prototype.draw = function(context) {
    
    var w = this.width;
    var h = this.height;
    var anchor = this.bounds.pos;
    var ach = this.get_anchor();
    var pos = SAT.pool.get();
    pos.x = this.bounds.pos.x + (-w * ach.x);
    pos.y = this.bounds.pos.y + (-h * ach.y);
  
    if (this.is_visible) {

        this._alpha = context.globalAlpha;

        if (this.angle !== 0) {
            context.save();
            context.translate(Math.round(anchor.x),Math.round(anchor.y));
            context.rotate(this.angle);
           
            pos.x = -w * ach.x;
            pos.y = -h * ach.y;
        }

        if (this.alpha !== 1) {
            context.globalAlpha = context.globalAlpha*this.alpha;
        }

        var new_width = this.width * this.scale_x;
        var new_height = this.height * this.scale_y;

        context.drawImage(this.image,
                0,
                0,
                this.width,
                this.height,
                Math.round_decimal(pos.x - ach.x * (new_width - this.width),2),
                Math.round_decimal(pos.y - ach.y * (new_height - this.height),2),
                new_width,
                new_height);

        this.on_draw(context);

        if (this.angle !== 0) {
            context.restore();
        }
        
    }

    if (Config.debug) {
        this.debug_bounds(context);
    }

};

Sprite.prototype.on_draw_finished = function(context) {    
    context.globalAlpha = this._alpha;    
};


Sprite.prototype.clear = function(context) {
};

window.Sprite = Sprite;

//}(window));