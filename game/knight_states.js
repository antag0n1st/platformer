(function(window, undefined) {

    function KnightStates(knight) {
        this.initialize(knight);
    }
    //KnightStates.prototype = new ParentClassName();
    //KnightStates.prototype.parent_initialize = KnightStates.prototype.initialize;    
    KnightStates.prototype.initialize = function(knight) {
        // this.parent_initialize();

        this.knight = knight;

        // idle
        // running
        // jumping
        // falling
        // attacking
        Notes.add(this, Notes.NOTE_SIDE_FLIPPED );

        var states = [
            {
                name: 'idle',
                initial: true,
                events: {
                    running: 'running',
                    jumping: 'jumping',
                    attacking: 'attacking'
                }
            },
            {
                name: 'running',
                events: {
                    idle: 'idle',
                    jumping: 'jumping',
                    falling: 'falling',
                    attacking: 'attacking'
                }
            },
            {
                name: 'jumping',
                events: {
                    idle: 'idle',
                    falling: 'falling',
                    attacking: 'attacking',
                    running: 'running'
                }
            },
            {
                name: 'falling',
                events: {
                    idle: 'idle',
                    attacking: 'attacking',
                    running: 'running',
                    jumping: 'jumping'
                }
            },
            {
                name: 'attacking',
                events: {
                    idle: 'idle',
                    running: 'running',
                    jumping: 'jumping',
                    falling: 'falling'
                }
            }
        ];

        this.fsm = new StateMachine(states);
        this.fsm.subscribe("*",this);
    };

    KnightStates.prototype.update = function() {
        
        var that = this;
        
        if(this.knight.velocity.y > 0){
            this.knight.is_on_ground = false;
        }

        if(this.knight.is_on_ground){
            
            if(this.knight.controller.is_attacking){
                this.fsm.set('attacking');
            }else if(this.knight.velocity.x !== 0){
                this.fsm.set('running');
            }else{
                this.fsm.set('idle');
            }
            
        }else{
            
            if(this.knight.controller.is_attacking){               
              this.fsm.set('attacking');               
            }else if(this.knight.velocity.y > 0){
                this.fsm.set('falling');
            }else{
                this.fsm.set('jumping');
            }
                        
        }


    };
    
    KnightStates.prototype.on_state = function(prev_state,current_state,data){
        
      
//        if(prev_state.name === 'attacking'){           
//            this.knight.stop();
//        }


       
        if(current_state.name === 'idle'){
           this.knight.play('idle',true,this.knight.current_flipped);
        }else if(current_state.name === 'running'){
           this.knight.play('run',true,this.knight.current_flipped);
        }else if(current_state.name === 'jumping'){
           this.knight.play('jump',true,this.knight.current_flipped);
        }else if(current_state.name === 'falling'){
           this.knight.play('fall',true,this.knight.current_flipped);
        }else if(current_state.name === 'attacking'){
           var that = this;
           this.knight.play('fight',false,this.knight.current_flipped, function()
               {
                    that.knight.controller.is_attacking = false;
                    log('fight callback');
               });
        }
        
    };
    
    KnightStates.prototype.on_note = function(event_name,data,sender){
        log(event_name);
        if( this.knight.current_animation !== 'fight' ){
            this.knight.play(this.knight.current_animation,true,this.knight.current_flipped);
        }
        
    };

    window.KnightStates = KnightStates;

}(window));