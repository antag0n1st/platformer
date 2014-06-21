(function(window,undefined){
    
    function ImageView(image){
        this.initialize(image);
    }    
    
    ImageView.prototype = new Drawable();
    ImageView.prototype.drawable_initialize = ImageView.prototype.initialize;    
    ImageView.prototype.initialize = function(image){        
        this.drawable_initialize();
        
        this.image = image;
        this.set_size(image.image.width,image.image.height);
        
    };
    
    ImageView.prototype.on_added_to_parent = function(parent){
        Drawable.prototype.on_added_to_parent.call(this,parent);
        
    };
    
    ImageView.prototype.on_remove_from_parent = function(parent){
        Drawable.prototype.on_remove_from_parent.call(this,parent);
        
    };
    
    ImageView.prototype.draw = function(context){
        var position = this.bounds.pos;
        context.drawImage(this.image.image,position.x,position.y);
    };
    
    ImageView.prototype.clear = function(context){
        
    };
    
    window.ImageView = ImageView;
    
}(window));