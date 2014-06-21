(function(window) {

    function Game() {
        this.initialize();
    }

    Game.prototype.initialize = function() {

        this.stage = new Stage();

        this.input = new Input();

        this.input.add_listener('stage');

        this.navigator = new Navigator();

        ////////////////////////////////////////////////////////////////////////////
        ////////////////////  LOADING SCREEN ASSETS ////////////////////////////////

        ContentManager.add_image('dot', 'assets/images/dot.png');
        ContentManager.add_image('anchor', 'assets/images/anchor.png');
        ContentManager.add_image('blank_black', 'assets/images/blank_black.png');
        ContentManager.add_image('blank_black_highlighted', 'assets/images/blank_black_highlighted.png');
        ContentManager.add_image('lights1', 'assets/images/lights1.png');
        ContentManager.add_image('lights2', 'assets/images/lights2.png');
        ContentManager.add_image('logo', 'assets/images/logo.png');
        ContentManager.add_image('loading_fr', 'assets/images/loading_fr.png');
        ContentManager.add_image('loading_bg', 'assets/images/loading_bg.png');

        // DON'T ADD ASSETS HERE !!!

        ////////////////////////////////////////////////////////////////////////////

        window.game = this;

        ContentManager.download_resources(this.stage, function() {

            game.load_assets();

            game.navigator.add(new LoadingScreen());
            Ticker.add_listener(game);
            Ticker.set_fps(30);
            Ticker.start();

            ContentManager.download_resources(this.stage, function() {
               // window.setTimeout(function() {
                    game.navigator.add(new GameScreen(),"FADEIN");
               // }, 1500);
            });

        });

    };

    /**
     * @description This is the main game loop
     */
    Game.prototype.tick = function() {

        this.stage.clear_canvas();

        this.navigator.update();

        Actions.run();

        if (Config.debug) {
            this.stage.debug_grid();
        }

        this.stage.draw();

        SAT.pool.reset();

    };

    window.Game = Game;

}(window));