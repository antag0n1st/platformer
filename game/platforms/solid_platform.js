(function(window, undefined) {

    function SolidPlatform() {
        this.initialize();
    }
    SolidPlatform.prototype = new Drawable();
    SolidPlatform.prototype.parent_initialize = SolidPlatform.prototype.initialize;    
    SolidPlatform.prototype.initialize = function() {
        this.parent_initialize();

        this.response = new Response();

    };

    SolidPlatform.prototype.check = function(object) {
        var polygon = this.bounds;

        if (SAT.testPolygonPolygon(object.bounds, polygon, this.response)) {

            var overlap = this.response.overlapV;
            var pos = object.get_position();

            pos.sub(overlap);
            object.set_position(pos.x, pos.y);




            if (overlap.y !== 0 && overlap.x !== 0) {
                object.is_on_ground = false; // the edge is not the ground
            } else if (overlap.y > 0 && overlap.x === 0) {
                // if it resoves on the top of the obsticle
                if (object.velocity.y > -0.05) {
                    object.velocity.y = 0;
                    object.is_on_ground = true;
                }

            } else if (overlap.y < 0 && overlap.x === 0) {
                // if it is resolving below the obsticle , head hits the sealing
                object.velocity.y = 0;
            }





        }
        this.response.clear();
    };
    
    SolidPlatform.prototype.draw = function(context){
        Drawable.draw_polygon(this.bounds, context);
    }
    
    SolidPlatform.prototype.clear = function(context){
        
    }

    window.SolidPlatform = SolidPlatform;

}(window));
