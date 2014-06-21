//(function(window, undefined) {

    function Button(config) {
        this.initialize(config);
    }
    
    Button.prototype = new Drawable();
    Button.prototype.parent_initialize = Drawable.prototype.initialize;   
    

    Button.prototype.initialize = function(config) {
        
        this.parent_initialize();
        this.text = null;
        this.text_color = "#000000";
        this.font_size = 14;
        this.font_family = 'Verdana';
        this.image = config.image;
        this.set_size(this.image.image.width,this.image.image.height);
        this.priority_listener = 10; // top listener

    };

    Button.prototype.draw = function(context) {

        var position = this.bounds.pos.clone();
        var image = null;
        
        if(this.is_mouse_down){
           if(ContentManager.images[this.image.image_name+'_highlighted']){
               image = ContentManager.images[this.image.image_name+'_highlighted'];   
           }else{
               image = this.image;
           }
                     
        }else{
            image = this.image;
        }
        context.drawImage(image.image, position.x, position.y);
           
        if(this.text){
            context.font = this.font_size+"px "+this.font_family;
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            context.fillStyle = this.text_color;
            context.fillText(this.text, position.x + this.image.image.width/2, position.y + this.image.image.height / 2);
        }

    };

    Button.prototype.clear = function(context) {

    };

//    window.Button = Button;
//
//}(window));
