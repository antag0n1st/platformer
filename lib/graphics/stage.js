(function(window) {

function Stage(dom_id) {
    this.initialize(dom_id);
}

Stage.prototype.initialize = function(dom_id) {

    this.tickable_objects = [];
    this.layers = [];
    this.non_tickable_objects = [];
    this.containers = [];
    this.remove_queue = [];
    this.is_children_sortable = true;
    this.position = {x: 0, y: 0};
    this.width = Config.screen_width;
    this.height = Config.screen_height;


    if (dom_id) {
        if (Config.is_mobile) {

            this.context = window.document.getElementById(dom_id).getContext('2d');
        } else {

            this.context = window.document.getElementById(dom_id).getContext('2d');
            this.context.canvas.width = Config.screen_width;
            this.context.canvas.height = Config.screen_height;
            this.context.canvas.style.width = Config.screen_width;
            this.context.canvas.style.height = Config.screen_height;

        }



    } else {

        var canvas = window.document.getElementById('stage');

        if (canvas.id) {

            this.context = canvas.getContext('2d');
            this.context.canvas.width = Config.screen_width;
            this.context.canvas.height = Config.screen_height;
            this.context.canvas.style.width = Config.screen_width;
            this.context.canvas.style.height = Config.screen_height;

        } else {

            var canvas = document.createElement("canvas");
            canvas.width = 800;
            canvas.height = 480;

            this.context = canvas.getContext("2d");

        }






//            this.context.canvas.width = Config.screen_width;
//                this.context.canvas.height = Config.screen_height;
//                this.context.canvas.style.width = Config.screen_width;
//                this.context.canvas.style.height = Config.screen_height;


//            console.log("please set an ID for the stage");
//            return;
    }



//        this.context.mozImageSmoothingEnabled = false;
//        this.context.webkitImageSmoothingEnabled = false;
//        this.context.imageSmoothingEnabled = false;
//        


};

Stage.prototype.add = function(o) {
    o.parent = this;
    o.on_added_to_parent(this);
    this.tickable_objects.push(o);
};

Stage.prototype.clear = function() {
    
    var l = this.tickable_objects.length;

    for (var i = l - 1; i >= 0; i--) {
        if (this.tickable_objects[i].is_removable) {
            var index = this.tickable_objects.indexOf(this.tickable_objects[i]);
            if (index !== -1) {
                this.tickable_objects.splice(index, 1);
            }
        }
    }

    var l = this.containers.length;

    for (var i = l - 1; i >= 0; i--) {
        if (this.containers[i].is_removable) {
            var index = this.containers.indexOf(this.containers[i]);
            if (index !== -1) {
                this.containers.splice(index, 1);
            }
        }
    }

};

Stage.prototype.remove = function(o) {
    //o.on_remove_from_parent();
    this.remove_queue.push(o);
};



// usefull for updating the stage outside the ticker
Stage.prototype.update = function() {
    this.tick();
};

Stage.prototype.draw = function() {
    this.tick();
};

// should not be overriden 
Stage.prototype.tick = function() {

    // this.context.clearRect(0,0,Config.screen_width,Config.screen_height);
    this.draw_children(this.tickable_objects, this.context, this);

};

Stage.prototype.draw_children = function(children, context, parent) {

    if (parent.is_children_sortable) {
        this.sort_objects(children);
    }

    var i = children.length;
    while (i--) {
        var child = children[i];
        child.draw(context);
        this.draw_children(child.get_children(), context, child);
        child.on_draw_finished(context);
    }


};

Stage.prototype.sort_strategy = function(a, b) {
        return a.z_index < b.z_index;
};

Stage.prototype.sort_objects = function(objects) {

   // Math.bubble_sort(objects, this.sort_strategy);
   Math.insertionSort(objects,this.sort_strategy);

};

Stage.prototype.clear_canvas = function() {


    this.context.clearRect(0, 0, Config.screen_width, Config.screen_height);


    var i = this.remove_queue.length;
    //console.log(this.remove_queue);
    while (i--) {
        var o = this.remove_queue[i];
        //console.log(o);
        o.clear(this.context);
        if (o.get_parent() instanceof Stage) {
            var index = this.tickable_objects.indexOf(o);
            if (index !== -1) {
                this.tickable_objects.splice(index, 1);
                this.remove_children(o);
            }
        } else {
            o.remove_from_parent();
        }


    }
    
    this.remove_queue.length = 0;

    this.clear_children(this.tickable_objects, this.context);
};

Stage.prototype.clear_children = function(children, context) {

    // then clear the rest of the canvas        
    var i = children.length;
    while (i--) {
        var child = children[i];
        children[i].clear(context);
        this.clear_children(child.get_children(), context);
    }

};

Stage.prototype.remove_children = function(parent) {

    var children = parent.get_children();
    var i = children.length;
    while (i--) {
        var child = children[i];
        child.on_remove_from_parent(parent);
        this.remove_children(child);
    }

};

Stage.prototype.remove_child = function(child) {
    this.remove(child);
};

Stage.prototype.get_position = function() {
    return this.position;
};

// -------------------------------------------------------------
// --------------------------------------------------------------

Stage.prototype.debug_grid = function() {

    if (Config.is_mobile) {
        var x = Config.height_in_tiles;
        var y = Config.width_in_tiles;
        var tile_width = Config.tile_width;
        var tile_height = Config.tile_height;

        for (var i = 0; i < x; i++) {

            for (var j = 0; j < y; j++) {
                this.context.drawImage(Images.dot.image, i * tile_width, j * tile_height);
            }

        }
    } else {

        this.context.save();

        this.context.fillStyle = "#206838";
        this.context.beginPath();
        this.context.rect(0, 0, Config.screen_width, Config.screen_height);
        this.context.fill();
        this.context.closePath();

        this.context.strokeStyle = "#fff";
        this.context.lineWidth = 1;
        this.context.globalAlpha = 0.2;

        var x = Config.height_in_tiles;
        var y = Config.width_in_tiles;
        var tile_width = Config.tile_width;
        var tile_height = Config.tile_height;

        // draw verticals first

        this.context.beginPath();

        for (var i = 0; i < y; i++) {
            // console.log(y);
            this.context.moveTo((tile_width * i), 0);
            this.context.lineTo((tile_width * i), Config.game_height);
        }

        for (var i = 0; i < x; i++) {
            //console.log(y_offset);
            this.context.moveTo(0, (tile_height * i));
            this.context.lineTo(Config.game_width, (tile_height * i));
        }

        this.context.stroke();
        this.context.closePath();

        this.context.globalAlpha = 1.0;

        this.context.restore();


    }






};


    window.Stage = Stage;

}(window));