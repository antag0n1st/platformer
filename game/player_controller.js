(function(window,undefined){
    
    function PlayerController(){
        this.initialize();
    }    
    //PlayerController.prototype = new ParentClassName();
    //PlayerController.prototype.parent_initialize = PlayerController.prototype.initialize;    
    PlayerController.prototype.initialize = function(){        
       // this.parent_initialize();
       
        var that = this;
        
        this.is_up = false;
        this.is_right = false;
        this.is_down = false;
        this.is_left = false;
        
        
        this.is_up_pressed = false;
        this.is_right_pressed = false;
        this.is_down_pressed = false;
        this.is_left_pressed = false;
        
        this.is_attacking = false;
               
        this.last_pressed = 0;
        
        this.kibo = new Kibo();
        
         this.kibo.down('space', function() {
            that.is_attacking = true;  
        });
        
        this.kibo.down('up', function() {            
            that.is_up_pressed = true;
            that.handle_down();
        });
        this.kibo.down('right', function() {
            that.is_right_pressed = true;
            that.last_pressed = 2;
            that.handle_down();
        });
        this.kibo.down('down', function() {
            that.is_down_pressed = true;
            that.handle_down();
        });
        this.kibo.down('left', function() {
            that.is_left_pressed = true;   
            that.last_pressed = 4;
            that.handle_down();
        });
        
       
        
        
        
        
        this.kibo.up('up', function() {
            that.is_up_pressed = false;
            that.handle_up();
        });
        this.kibo.up('right', function() {
            that.is_right_pressed = false;
            that.handle_up();
        });
        this.kibo.up('down', function() {
            that.is_down_pressed = false;
            that.handle_up();
        });
        this.kibo.up('left', function() {
            that.is_left_pressed = false;   
            that.handle_up();
        });
        
//        this.kibo.up('space', function() {
//            that.is_attacking = false;   
//        });
        
    };
    
    PlayerController.prototype.handle_down = function(){
        
         if(this.is_left_pressed && !this.is_right_pressed){
                 this.is_left = true;
                 this.is_right = false;
         }
         
         if(this.is_right_pressed && !this.is_left_pressed){
                 this.is_right = true;
                 this.is_left = false;
         }
         
        if(this.is_left_pressed && this.is_right_pressed){
             
             if(this.last_pressed == 2){
                 this.is_right = true;
                 this.is_left = false;
             }else if(this.last_pressed == 4){
                 this.is_left = true;
                 this.is_right = false;
             }             
        }
        
        if(this.is_up_pressed){
            this.is_up = true;
        }
        
    };
    
    PlayerController.prototype.handle_up = function(){
        
        if(this.is_left_pressed && !this.is_right_pressed){             
                  this.is_left = true;
                  this.is_right = false;
        }
         
        if(this.is_right_pressed && !this.is_left_pressed){   
                 this.is_right = true;
                 this.is_left = false;
        }
        
        if(!this.is_left_pressed && !this.is_right_pressed){
                 this.is_left = false;
                 this.is_right = false;
        }
        
        if(!this.is_up_pressed){
            this.is_up = false;
        }
        
    };
    
    window.PlayerController = PlayerController;
    
}(window));