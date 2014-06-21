//(function(window,undefined){

function StateMachine(states) {
    this.initialize(states);
}
//State_machine.prototype = new ParentClassName();
//State_machine.prototype.parent_initialize = State_machine.prototype.initialize;    
StateMachine.prototype.initialize = function(states) {
    // this.parent_initialize();

    this.states = states;
    this.subscribers = [];
    this.currentState = '';
    this.initial_state = null;
    
    this.indexes = {}; //just for convinience
    for (var i = 0; i < this.states.length; i++) {
        this.indexes[this.states[i].name] = i;
        if (this.states[i].initial) {            
            this.currentState = this.states[i];
            this.initial_state = this.currentState;
        }
    }

    if(!this.initial_state){
            throw "you must have initial state when configuring a state machine";
    }

};


StateMachine.prototype.set = function(state,data) {
    if (this.currentState.events[state]) {
        var prev_state = this.currentState;
        this.currentState = this.states[this.indexes[this.currentState.events[state]]];
        console.log("going to state: "+this.currentState.name);
        var listeners = this.subscribers[this.currentState.name];
        if (listeners) {
                    
            var count = listeners.length;                   
            for (var i = 0; i < count; i++) {
                listeners[i].on_state(prev_state,this.currentState,data);
            }
        }
    }else{
        console.log('state not allowed: '+state);
    }
};
StateMachine.prototype.get = function() {
    return this.currentState.name;
};

StateMachine.prototype.reset = function(){
    this.set(this.initial_state.name);
    this.subscribers = [];
};

StateMachine.prototype.subscribe = function(event, object) {
    
    if (!this.subscribers[event]) {        
        this.subscribers[event] = [];        
    }
    this.subscribers[event].push(object);
};
StateMachine.prototype.unsubscribe = function(event, object) {
    var events = this.subscribers[event];
    if (events) {
        var index = events.indexOf(object);
        if (index !== -1) {
            events.splice(index, 1);
        }
    }

};

StateMachine.prototype.get_subscribers = function(){
    return this.subscribers;
};
StateMachine.prototype.unsubscribe_from_all = function(object) {

    for (var event in this.subscribers) {
        var events = this.subscribers[event];
        if (events) {
            var index = events.indexOf(object);
            if (index !== -1) {
                events.splice(index, 1);
            }
        }
    }

};

StateMachine.prototype.unsubscribe_all = function() {
    this.subscribers = [];

};


//  window.StateMachine = StateMachine;

//}(window));