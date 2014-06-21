//(function(window,undefined){
    
    function TweenAlpha(object,to,bezier,duration,callback){
        this.initialize(object,to,bezier,duration,callback);
    }    
    //TweenAlpha.prototype = new ParentClassName();
    //TweenAlpha.prototype.parent_initialize = TweenAlpha.prototype.initialize;    
    TweenAlpha.prototype.initialize = function(object,to,bezier,duration,callback){        
    
        this.object = object;
        this.to = to;
        this.bezier = bezier;
        this.duration = duration;  
        this.callback = callback || function(){};     
        this.start_alpha = object.alpha;
        this.difference = to - this.start_alpha;
        this.time_passed = 0;
    };
    
    TweenAlpha.prototype.run = function(){
        Actions.add(this);
    };
    
    TweenAlpha.prototype.stop = function(){
        Actions.remove(this);
    };
    
    TweenAlpha.prototype.step = function(dt){
        
        this.time_passed += dt;
        
        var s = this.time_passed / this.duration;
        
        s = (s >= 1) ? 1.0 : s;
        
        var bstep = this.bezier ? this.bezier.get(s) : s;
        
        this.object.alpha = this.start_alpha + bstep*this.difference;
        
        if(s===1){
            this.callback();
            Actions.remove(this);
        }
        
    };
    
//    window.TweenAlpha = TweenAlpha;
//    
//}(window));