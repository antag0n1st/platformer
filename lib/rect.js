//(function(window,undefined){
    
    function Rect(position,width,height){
        this.initialize(position,width,height);
    }    
    //Rect.prototype = new ParentClassName();
    //Rect.prototype.parent_initialize = Rect.prototype.initialize;    
    Rect.prototype.initialize = function(position,width,height){        
       // this.parent_initialize();
       this.position = {x:position.x,y:position.y};
       this.reg = {x:0,y:0};
       this.width = width;
       this.height = height;
        
    };
    
    Rect.prototype.set_reg = function(reg){
         this.reg.x = reg.x * this.width;
         this.reg.y = reg.y * this.height;
    };
    
    Rect.prototype.set_position = function(point){
        this.position.x = point.x;
        this.position.y = point.y;
    };
    
    Rect.prototype.set_center = function(point){
        this.position = {x:(point.x - this.width/2),y:(point.y - this.height/2)};  
    };
    
    Rect.prototype.get_top = function(){
        return this.position.y - this.reg.y;
    };
    
    Rect.prototype.get_left = function(){
        return this.position.x - this.reg.x;
    };
    
    Rect.prototype.get_right = function(){
        return this.position.x + this.width - this.reg.x;
    };
    
    Rect.prototype.get_bottom = function(){
        return this.position.y + this.height - this.reg.y;
    };
    
    Rect.prototype.get_center = function(){
        return {x:this.position.x + (this.width/2) - this.reg.x,y:this.position.y + (this.height/2)-this.reg.y};
    };
    
    Rect.prototype.get_position = function(){
        return {x:this.position.x - this.reg.x,y:this.position.y - this.reg.y};
    };
    
//    window.Rect = Rect;
//    
//}(window));