//(function(window, undefined) {

    function Input() {
        this.initialize();
    }


    Input.prototype.initialize = function() {

        this.point = {x: false, y: false};
        this.tmp_point = {x: false, y: false};
        this.prev_point_type = -1;
        this.type = 0; //
        // 0 - up
        // 1 - down
        // 2 - move

        this.elements = [];

    };

    Input.prototype.add_listener = function(element_id) {
        var element = window.document.getElementById(element_id);
        var that = this;
        
        
        if (!element.id) {
            
                window.addEventListener("touchmove", function (evt) {                     
                        that.set_mouse_move(evt.pageX, evt.pageY);
                });
                
                window.addEventListener("touchend", function (evt) {                     
                        that.set_mouse_up(evt.pageX, evt.pageY);
                });
                
                window.addEventListener("touchstart", function (evt) {                     
                        that.set_mouse_down(evt.pageX, evt.pageY);
                });
                
                
            
            return;
        }
        
        
        
        element.addEventListener('mouseup', function(event) {
      
            that.fixWhich(event);
            
            var posx = 0;
            var posy = 0;
            if (!event)
                event = window.event;
            if (event.pageX || event.pageY) {
                posx = event.offsetX ? (event.offsetX) : event.layerX;
                posy = event.offsetY ? (event.offsetY) : event.layerY;

            }
            else if (event.clientX || event.clientY) {
                posx = event.clientX + document.body.scrollLeft
                        + document.documentElement.scrollLeft;
                posy = event.clientY + document.body.scrollTop
                        + document.documentElement.scrollTop;
            }
            if (event.which === 1) {
                that.set_mouse_up(posx, posy);
            }else{
                 that.set_right_mouse_up(posx, posy);
            }
        
        }, false);

        element.addEventListener('mousedown', function(event) {
            
            that.fixWhich(event);
            
            var posx = 0;
            var posy = 0;
            if (!event)
                event = window.event;
            if (event.pageX || event.pageY) {
                posx = event.offsetX ? (event.offsetX) : event.layerX;
                posy = event.offsetY ? (event.offsetY) : event.layerY;

            }
            else if (event.clientX || event.clientY) {
                posx = event.clientX + document.body.scrollLeft
                        + document.documentElement.scrollLeft;
                posy = event.clientY + document.body.scrollTop
                        + document.documentElement.scrollTop;
            }
            
            if (event.which === 1) {
                that.set_mouse_down(posx, posy);
            }else{
                that.set_right_mouse_down(posx, posy);
            }
        
        }, false);

        element.addEventListener('mousemove', function(event) {
            
            that.fixWhich(event);
            
            var posx = 0;
            var posy = 0;
            if (!event)
                event = window.event;
            if (event.pageX || event.pageY) {
                posx = event.offsetX ? (event.offsetX) : event.layerX;
                posy = event.offsetY ? (event.offsetY) : event.layerY;

            }
            else if (event.clientX || event.clientY) {
                posx = event.clientX + document.body.scrollLeft
                        + document.documentElement.scrollLeft;
                posy = event.clientY + document.body.scrollTop
                        + document.documentElement.scrollTop;
            }

            if (event.which === 1) {
                that.set_mouse_move(posx, posy);
            }else{
                that.set_right_mouse_move(posx, posy);
            }
            
            
        }, false);
        
        element.addEventListener("contextmenu",function(event){
            event.preventDefault();
        });



    };
    
Input.prototype.fixWhich = function(e) {

    if (!e.which && e.button) {

        if (e.button & 1) {
            e.which = 1      // Left
        } else if (e.button & 4) {
            e.which = 2 // Middle
        } else if (e.button & 2) {
            e.which = 3 // Right
        } 

    }

};



    Input.prototype.add = function(element) {
        var index = this.elements.indexOf(element);
        if(element){
            if(index === -1){
                this.elements.push(element);
            }
        }else{
            throw "can't add undefined value to Input";
        }
        
    };

    Input.prototype.remove = function(element) {
        var index = this.elements.indexOf(element);
        if(index !== -1){
            this.elements.splice(index, 1);
        }
        
    };

    Input.prototype.remove_all = function() {
        this.elements = [];
    };

    Input.prototype.sort_input = function() {
        Math.bubble_sort(this.elements, function(a, b) {
            return a.priority > b.priority;
        });
    };

    Input.prototype.process_click = function() {

        this.sort_input();

        var circlePoint = this.point;
        var type = this.type;
        var elements = this.elements;
        var count = elements.length;
        var event = new Event();
        event.point = {x: this.point.x, y: this.point.y};
        //console.log(event.point);
        if (type === 0) {

            for (var i = count; i--; ) {

                var element = elements[i];
                if (element.check(circlePoint)) {
                    
                    if (element.is_mouse_down) {
                        element.on_mouse_up(event,element);
                    }

                    if (!event.propagate) {
                        return;
                    }
                }
            }

        } else if (type === 1) {

            for (var i = count; i--; ) {

                var element = elements[i];

                if (element.check(circlePoint)) {
                    
                    element.is_mouse_down = true;
                    element.on_mouse_down(event,element);

                    if (!event.propagate) {
                        return;
                    }
                }
            }

        }


    };
    
    Input.prototype.process_right_click = function() {

        this.sort_input();

        var circlePoint = this.point;
        var type = this.type;
        var elements = this.elements;
        var count = elements.length;
        var event = new Event();
        event.point = {x: this.point.x, y: this.point.y};
        //console.log(event.point);
        if (type === 0) {

            for (var i = count; i--; ) {

                var element = elements[i];
                if (element.check(circlePoint)) {
                    
                    if (element.is_mouse_down) {
                        element.on_right_mouse_up(event,element);                        
                    }

                    if (!event.propagate) {
                        return;
                    }
                }
            }

        } else if (type === 1) {

            for (var i = count; i--; ) {

                var element = elements[i];

                if (element.check(circlePoint)) {
                    
                    element.is_mouse_down = true;
                    element.on_right_mouse_down(event,element);

                    if (!event.propagate) {
                        return;
                    }
                }
            }

        }


    };

    Input.prototype.process_move = function() {

        var elements = this.elements;
        var count = elements.length;
        var event = new Event();
        event.point = {x: this.point.x, y: this.point.y};
        for (var i = count; i--; ) {
            var element = elements[i];
            if (element.is_mouse_down) {

                if (event.propagate) {
                    element.on_mouse_move(event,element);
                } else {
                    element.on_mouse_cancel(element);
                    element.is_mouse_down = false;
                }
            }
        }

    };
    
    Input.prototype.process_right_move = function() {

        var elements = this.elements;
        var count = elements.length;
        var event = new Event();
        event.point = {x: this.point.x, y: this.point.y};
        for (var i = count; i--; ) {
            var element = elements[i];
            if (element.is_mouse_down) {

                if (event.propagate) {
                    element.on_right_mouse_move(event,element);
                } else {
                    element.on_mouse_cancel(element);
                    element.is_mouse_down = false;
                }
            }
        }

    };

    Input.prototype.process_cancel = function() {
        var elements = this.elements;
        var count = elements.length;

        for (var i = count; i--; ) {
            if (elements[i].is_mouse_down) {
                elements[i].on_mouse_cancel(elements[i]);
                elements[i].is_mouse_down = false;
            }
        }
    };

    Input.prototype.set_mouse_up = function(x, y) {

        this.type = 0;
        this.point.x = x;
        this.point.y = y;
        this.process_click();
        this.process_cancel(); // we will sea about this
    };

    Input.prototype.set_mouse_down = function(x, y) {

        this.type = 1;
        this.point.x = x;
        this.point.y = y;
        this.process_click();
    };

    Input.prototype.set_mouse_move = function(x, y) {

        this.type = 2;
        this.point.x = x;
        this.point.y = y;
        this.process_move();
    };
    
    Input.prototype.set_right_mouse_up = function(x, y) {

        this.type = 0;
        this.point.x = x;
        this.point.y = y;
        this.process_right_click();
        this.process_cancel(); // we will sea about this
    };

    Input.prototype.set_right_mouse_down = function(x, y) {

        this.type = 1;
        this.point.x = x;
        this.point.y = y;
        this.process_right_click();
    };

    Input.prototype.set_right_mouse_move = function(x, y) {

        this.type = 2;
        this.point.x = x;
        this.point.y = y;
        this.process_right_move();
    };

    Input.prototype.set_mouse_cancel = function() {

        this.type = -1;
        this.point.x = false;
        this.point.y = false;
        this.process_cancel();
    };

//    window.Input = Input;
//
//}(window));




