//(function(window,undefined){
    
    function Collision(){
        this.initialize();
    }    
    //Collision.prototype = new ParentClassName();
    //Collision.prototype.parent_initialize = Collision.prototype.initialize;    
    Collision.prototype.initialize = function(){        
       // this.parent_initialize();
        throw "This class is not for initialization";
    };
    
    Collision.detect= function(object1,object2){
        if(object1 instanceof Rect){
            
            if(object2 instanceof Rect){
                return Collision.test_rect_with_rect(object1,object2);
            } else if(object2 instanceof Circle){
                return Collision.test_circle_with_rect(object2,object1);
            } else {
                return Collision.test_point_with_rect(object2,object1);
            }
            
        } else if(object1 instanceof Circle){
            
            if(object2 instanceof Rect){
                return Collision.test_circle_with_rect(object1,object2);
            } else if(object2 instanceof Circle){
                return Collision.test_circle_with_circle(object2,object1);
            } else {
                return Collision.test_point_with_circle(object2,object1);
            }
            
        } else {
            
            if(object2 instanceof Rect){
                return Collision.test_point_with_rect(object1,object2);
            } else if(object2 instanceof Circle){
                return Collision.test_point_with_circle(object1,object2);
            } else {
                return object1.x === object2.x && object1.y === object2.y;
            }
        }
    };
        
    Collision.test_circle_with_rect = function(circle,rect){
        
        var circleDistance = {x:0,y:0};
        
        circleDistance.x = Math.abs(circle.get_center().x - rect.get_center().x);
        circleDistance.y = Math.abs(circle.get_center().y - rect.get_center().y);

        if (circleDistance.x > (rect.width/2 + circle.radius)) { return false; }
        if (circleDistance.y > (rect.height/2 + circle.radius)) { return false; }

        if (circleDistance.x <= (rect.width/2)) { return true; } 
        if (circleDistance.y <= (rect.height/2)) { return true; }

        var cornerDistance_sq = Math.pow((circleDistance.x - rect.width/2),2) +
                             Math.pow((circleDistance.y - rect.height/2),2);

        return (cornerDistance_sq <= Math.pow(circle.radius,2));
    };
    
    Collision.test_circle_with_circle = function(circle1,circle2){
        
        var distance = Math.get_distance(circle1.get_center(),circle2.get_center());        
        return (circle1.radius + circle2.radius) >= distance;
        
    };
    
    Collision.test_point_with_circle = function(point,circle){        
        var distance = Math.get_distance(point,circle.get_center());        
        return  distance < circle.radius;        
    };
    
    Collision.test_rect_with_rect = function (rect1, rect2) {
        return !(rect2.get_left() > rect1.get_right() || 
                 rect2.get_right() < rect1.get_left() || 
                 rect2.get_top() > rect1.get_bottom() ||
                 rect2.get_bottom() < rect1.get_top());
    };
    
    Collision.test_point_with_rect = function (point, rect) {
        var position = rect.get_position();
      
        return  point.x > position.x &&
                point.x < (position.x+rect.width) &&
                point.y > position.y && 
                point.y < position.y+rect.height;
        
    };
    
//    window.Collision = Collision;
//    
//}(window));