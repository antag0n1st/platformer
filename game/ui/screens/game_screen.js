(function(window, undefined) {

    function GameScreen() {
        this.initialize();
    }

    GameScreen.prototype = new Screen();
    GameScreen.prototype.screen_initialize = GameScreen.prototype.initialize;

    GameScreen.prototype.initialize = function() {
        this.screen_initialize();


        this.knight = new SpineAnimation('knight');
        var bounds = new Polygon(new Vector(0,0), [ new Vector(0,0), new Vector(80,0), new Vector(80,190), new Vector(0,190) ]);  
        bounds.translate(-40,-190);
        this.knight.bounds = bounds;
        this.knight.set_position(400,400);        
        this.knight.play('run');
        this.add_child(this.knight);
        
        
        this.goblin = new SpineAnimation('goblins');
        this.goblin.set_position(650,400);
        
        this.goblin.play('walk');
        this.add_child(this.goblin);
        
        this.squashi = new SpineAnimation('squashi');
        this.squashi.set_position(130,400);
        
        this.squashi.play('jump');
        this.add_child(this.squashi);
        
        return;

        /////////////////////////////////////////////////////////////////////////




        

        /////////////////////////////////////////////////////////////////////////

//        blue = new Sprite('blue');
//        blue.set_position(200,200);
//         
//        blue.rotate_to(Math.degrees_to_radians(20));
//        blue.set_anchor(0.5,0.5); 
////        blue.rotate_to(Math.degrees_to_radians(0));
////        blue.set_anchor(0.5,0.8); 
//        
//        
//        red = new Sprite('red');
//        red.set_position(50,50);
//        
//        
//        yellow = new Sprite('yellow');
//        yellow.set_position(50,50);
//        
//        
//        this.add_child(blue);
//        blue.add_child(red);
//        red.add_child(yellow);
//        



//        plane = this.plane = new Plane();
//        this.plane.set_position(300,240);
//        this.plane.play('fly');
//        
//        hero = this.hero = new Sprite('hero');
//        this.hero.set_position(200,100);
//        this.hero.set_anchor(0.5,0.5);
//        this.hero.rotate_to(Math.degrees_to_radians(30));
//        this.hero.z_index = 1;
//        this.add_child(this.hero);
//        
//        
//        this.hero2 = new Sprite('hero');
//        this.hero2.set_position(230,100);
//        this.hero2.set_anchor(0.5,0.5);
//        this.hero2.rotate_to(Math.degrees_to_radians(30));
//        this.hero2.z_index = 1;
//        this.add_child(this.hero2);

//        hero_tween = new TweenTime(1,new Bezier(.17,.67,.64,.98),800);        
//        hero_tween.run();

//        hero_tween = new TweenRotate(hero,-1,null,2000);        
//        hero_tween.run();

//        hero_tween = new TweenRotateBy(hero,Math.degrees_to_radians(90),null,1000);        
//        hero_tween.run();

//        hero_tween = new TweenRotateTo(hero, Math.degrees_to_radians(90) ,new Bezier(.32,.99,.67,1.35),1000);        
//        hero_tween.run();

//        hero_tween = new TweenPulsate(this.hero,0.05,null,300);        
//        hero_tween.run();

        this.up_key = false;
        this.down_key = false;

        // this.add_child(this.plane);

        var that = this;

        this.kibo = new Kibo();

        this.kibo.down('left', function() {
            that.up_key = true;
        }).down('right', function() {
            that.down_key = true;
        });


        this.kibo.up('left', function() {
            that.up_key = false;
        }).up('right', function() {
            that.down_key = false;
        });

    };

    GameScreen.prototype.game_start = function(skeletonName, atlas, skeletonData) {

        


    };

    GameScreen.prototype.game_over = function() {
        this.is_game_over = true;
    };

    

    GameScreen.prototype.update = function(dt) {

        return;
    

        if (this.up_key) {
            this.plane.steer_up(dt);
        }

        if (this.down_key) {
            this.plane.steer_down(dt);
        }

        var y = Math.sin(this.plane.angle);
        this.plane.velocity.setY(y * 0.2 * dt);

        var p = this.plane.get_position();
        p.add(this.plane.velocity);
        this.plane.set_position(p.x, p.y);




    };

    GameScreen.prototype.draw = function(context) {

        Screen.prototype.draw.call(this, context);

        

    };

    GameScreen.prototype.show = function() {
        Screen.prototype.show.call(this);
    };

    GameScreen.prototype.hide = function() {
        Screen.prototype.hide.call(this);
    };

    window.GameScreen = GameScreen;

}(window));