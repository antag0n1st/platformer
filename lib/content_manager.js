//(function(window){
    
 
    var ContentManager = function(){
       throw 'cant initialize';
    };
    
    ContentManager.stage = null;
    ContentManager.callback = function(){};
    ContentManager.loaded_resources = 0;
    ContentManager.count_resources = 0;
    ContentManager.images  = [];
    ContentManager.sounds = [];
    ContentManager.sounds_to_load = [];
    ContentManager.maps = {};
    
    ContentManager.add_image = function (index,url){
        var ind = ContentManager.images.indexOf(index);
        if(ind !== -1){
            throw "the name of the image: '"+url+"' already exists";
        }
        ContentManager.images[index] = {image:new Image(),url : url,image_name:index};
        ContentManager.count_resources++;
    };
    
    ContentManager.add_sound = function (index,url){
        var ind = ContentManager.sounds_to_load.indexOf(index);
        if(ind !== -1){
            throw "the name of the sound: '"+url+"' already exists";
        }
        ContentManager.sounds_to_load[index] = url;
        ContentManager.count_resources++;
    };
    
    ContentManager.add_audio = function (index,url){
        
        var sound = new Howl({
                urls: [url+'.mp3',url+'.wav'],
                onload: function(){},
                onloaderror :  function(){}
            });
            
            this.sounds[index] = sound;
        
    };
    
    ContentManager.clear_image = function(index){
        delete ContentManager.images[index];
        ContentManager.count_resources--;
    };
    
    ContentManager.clear_all_images = function(){
        ContentManager.images = {};
        ContentManager.count_resources = 0;
    };
    
    ContentManager.add_maps = function (index,url){
        ContentManager.maps[index] = {image:new Image(),url : url};
        ContentManager.count_resources++;
    };
    
    ContentManager.clear_maps = function (){
        ContentManager.maps = {};
        ContentManager.count_resources = 0;
    };
    
    ContentManager.download_resources = function (stage,callback,base_url){
        
        ContentManager.callback = callback || function(){};
        ContentManager.stage = stage;
        ContentManager.base_url = base_url;
       
        for(var index in this.sounds_to_load ){
            var sound = new Howl({
                urls: [this.sounds_to_load[index]+'.mp3',this.sounds_to_load[index]+'.wav'],
                onload: this.resource_loaded,
                onloaderror :  this.handle_resource_error
            });
            
            this.sounds[index] = sound;
            
        }
        
        
        
        for(var item in this.images){
                this.images[item].image.onload = this.resource_loaded;
                this.images[item].image.onerror = this.handle_resource_error;
                this.images[item].image.src = (ContentManager.base_url ? ContentManager.base_url : '')+this.images[item].url;
        }        
    };
    
    ContentManager.download_images = function (stage,callback,base_url){
        
        ContentManager.callback = callback || function(){};
        ContentManager.stage = stage;
        ContentManager.base_url = base_url;
        
        for(var item in this.images){
                this.images[item].image.onload = this.resource_loaded;
                this.images[item].image.onerror = this.handle_image_error;
                this.images[item].image.src = (ContentManager.base_url ? ContentManager.base_url : '')+this.images[item].url;
        }        
    };
    
    ContentManager.download_maps = function (stage,callback,base_url){
        
        ContentManager.callback = callback || function(){};
        ContentManager.stage = stage;
        ContentManager.base_url = base_url;
        
        for(var item in this.maps){
            this.maps[item].image.onload = this.resource_loaded;
            this.maps[item].image.onerror = this.handle_image_error;
            this.maps[item].image.src = (ContentManager.base_url ? ContentManager.base_url : '')+this.maps[item].url;
        }
    };
    
    ContentManager.handle_image_error = function(e) {
        alert("Error Loading Image : " + e.target.src);
    };
    
    ContentManager.handle_resource_error = function(e) {
        log(e);
        alert("Error Loading Resource , try again !");
    };
    
    ContentManager.resource_loaded = function(){
        ContentManager.loaded_resources++;
       
        if(ContentManager.loaded_resources == ContentManager.count_resources){
            
            ContentManager.base_url = null;
            ContentManager.loaded_resources = 0;
            ContentManager.count_resources = 0;
            
            ContentManager.callback();
        }
        
    };
    
//    window.ContentManager = ContentManager;
//    
//}(window));