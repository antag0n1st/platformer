(function(window, undefined) {

    function Parallax(width,height,screen_width,screen_height,images){
        
         this.width = width;
         this.height =  height;
         this.x_tiles = Math.ceil(width/screen_width);
         this.y_tiles = Math.ceil(height/screen_height);
         this.screen_width = screen_width;
         this.screen_height = screen_height;
         this.tile_width = Config.level_tile_width;
         this.tile_height = Config.level_tile_height;
         this.images = images;
         
         this.x_visible = Math.ceil(screen_width / this.tile_width)+1;
         this.y_visible = Math.ceil(screen_height / this.tile_height)+1;
         this.tiles = [];
         
    }
    
    
            Parallax.prototype.get_tile_at = function(ox, oy, x, y) {
                
                var i = (x / this.tile_width) | 0;
                var j = (y / this.tile_height) | 0;
                
                // out of screen || 
                // coordinates out of the map are not valid 
                if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
                    return false;
                }
               // console.log(ox+' '+oy);
            
                if(Math.abs(ox - i * this.tile_width)  >= this.screen_width || Math.abs(oy - j * this.tile_height)  >= this.screen_height){
                    return false;
                }
     
               // return {i: i, j: j, x: (i * this.tile_width - ox), y: (j * this.tile_height - oy)};
                
                
                if(ox >= i * this.tile_width){
                    var stagex = 0; // where to start drawing on the stage
                    var tilex = (ox - i * this.tile_width); // where to start cliping the image
                    var tw = this.tile_width - tilex; // the width of the drawable part of the image
                }else{
                    var stagex = (i * this.tile_width - ox);
                    var tilex = 0;
                    var tw = Math.min(this.tile_width,this.screen_width - stagex);
                }
                
                if(oy >= j * this.tile_height){
                    var stagey = 0; // where to start drawing on the stage
                    var tiley = (oy - j * this.tile_height); // where to start cliping the image
                    var th = this.tile_height - tiley; // the height of the drawable part of the image
                }else{
                    var stagey = (j * this.tile_height - oy);
                    var tiley = 0;
                    var th = Math.min(this.tile_height,this.screen_height - stagey);
                }
                
                return {i:i,j:j,sx:tilex,sy:tiley,swidth:tw,sheight:th,x:stagex,y:stagey};
                
                
            };

            Parallax.prototype.get_visible_tiles = function (x, y) {
                
                var tiles = []; // calculate all neighbours (x,y) start points 
                
                for (var i = 0; i < this.x_visible; i++) {
                    for (var j = 0; j < this.y_visible; j++) {
                        var tile = null;
                        // if value is succesfuly assigned and its valid value 
                        if (tile = this.get_tile_at(x, y, x + (i * this.tile_width), y + (j * this.tile_height))) {
                            tiles.push(tile);
                        }
                    }
                }
                return tiles;
            };
            
            Parallax.prototype.tick = function(){
                this.tiles = this.get_visible_tiles(window.game.gx, window.game.gy);
            };
            
            Parallax.prototype.draw = function(context){
                             
                for (var tile in this.tiles) {

                    var w = this.tile_width;
                    var h = this.tile_height;
                    var t = this.tiles[tile];
                    
                  //  context.drawImage(this.images[t.i + '' + t.j].image, 0, 0, w, h, t.x + 0.5 | 0 , t.y + 0.5 | 0 , w, h);
                   context.drawImage(this.images[t.i + '' + t.j].image, t.sx, t.sy, t.swidth, t.sheight, t.x ,t.y , t.swidth, t.sheight);
                }
                
            };

  //          window.Parallax = Parallax;
   
}(window));