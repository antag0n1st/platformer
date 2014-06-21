//(function(window,undefined){
    
    function Circle(position,radius){
        this.initialize(position,radius);
    }    
    //Circle.prototype = new ParentClassName();
    //Circle.prototype.parent_initialize = Circle.prototype.initialize;    
    Circle.prototype.initialize = function(position,radius){        
       // this.parent_initialize();
        this.position = {x:position.x,y:position.y};
        this.radius = radius;
    };
    
    Circle.prototype.set_center = function(point){
        this.position = {x:(point.x - this.radius),y:(point.y - this.radius)};
    };
    Circle.prototype.set_position = function(point){
        this.position.x = point.x;
        this.position.y = point.y;
    };
    
    Circle.prototype.get_top = function(){
        return this.position.y;
    };
    
    Circle.prototype.get_left = function(){
        return this.position.x;
    };
    
    Circle.prototype.get_right = function(){
        return this.position.x + this.radius*2;
    };
    
    Circle.prototype.get_bottom = function(){
        return this.position.y + this.radius*2;
    };
    
    Circle.prototype.get_center = function(){
        return {x:(this.position.x+this.radius),y:(this.position.y+this.radius)};
    };
    
    Circle.prototype.get_position = function(){
        return this.position;
    };
    
//    window.Circle = Circle;
//    
//}(window));