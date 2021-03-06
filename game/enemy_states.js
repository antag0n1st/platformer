(function(window, undefined) {

    function EnemyStates(knight) {
        this.initialize(knight);
    }
    //EnemyStates.prototype = new ParentClassName();
    //EnemyStates.prototype.parent_initialize = EnemyStates.prototype.initialize;    
    EnemyStates.prototype.initialize = function(knight) {
        // this.parent_initialize();

        this.knight = knight;

        // idle
        // running
        // jumping
        // falling
        // attacking
        

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
        this.fsm.subscribe("*", this);
    };

    EnemyStates.prototype.update = function() {

        var that = this;

        if (this.knight.velocity.y > 0) {
            this.knight.is_on_ground = false;
        }

        //if (this.enemy.is_on_ground) {

            this.fsm.set('running');
            
        //} 
//        else {
//
//            if (this.enemy.controller.is_attacking) {
//                this.fsm.set('attacking');
//            } else if (this.enemy.velocity.y > 0) {
//                this.fsm.set('falling');
//            } else {
//                this.fsm.set('jumping');
//            }
//
//        }


    };

    EnemyStates.prototype.on_state = function(prev_state, current_state, data) {

        if (current_state.name === 'idle') {
            this.knight.play('idle', true, this.knight.current_flipped);
        } else if (current_state.name === 'running') {
            this.knight.play('run', true, this.knight.current_flipped);
        } else if (current_state.name === 'jumping') {
            this.knight.play('jump', true, this.knight.current_flipped);
        } else if (current_state.name === 'falling') {
            this.knight.play('fall', true, this.knight.current_flipped);
        } else if (current_state.name === 'attacking') {
          
            this.knight.play('fight', false, this.knight.current_flipped, function()
            {
              this.controller.is_attacking = false;
            });
        }

    };

    EnemyStates.prototype.on_note = function(event_name, data, sender) {

        if (this.knight.current_animation !== 'fight') {
            this.knight.play(this.knight.current_animation, true, this.knight.current_flipped);
        }

    };

    window.EnemyStates = EnemyStates;

}(window));