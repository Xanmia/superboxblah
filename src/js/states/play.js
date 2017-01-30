
$.play = function () {
    var player = new $.player();
    var surface = [];
    var enemies = [];
    this.cratesCaptured = 0;
    var spawner = new $.spawner({ x: 385, y: 10 }, enemies);
    var endgame = new $.endgame(this);
    // enemies.push(new $.enemy());
    // surface.push(new $.surface());
    var crate = new $.crate({ x: 385, y: 375 }, this);

    for (var i = 0; i < $.board.b.length; i++) {
        surface.push(new $.surface($.board.b[i]));
    }

    this.init = function(){
         for (i = 0; i < enemies.length; i++) {
             if(enemies[i].status){
                enemies[i].destroy();
             }

         }
        player = new $.player();
        //surface = [];
        enemies = [];
        this.cratesCaptured = 0;
        spawner = new $.spawner({ x: 385, y: 10 }, enemies);
    }


    this.surfaceContact = function(obj){
        var i = surface.length; while (i--) {
            if ($.util.rectInRect(surface[i], obj)) {
                return true;
            }
        }
        return false;
    }

    this.update = function () {
        player.update(surface);
        spawner.update();
        crate.update(player);
        for (i = 0; i < enemies.length; i++) {
            enemies[i].update(surface);
            if (!this.containBounds(enemies[i])) {
                enemies[i].respawn();
                //enemies[i].destroy();
               // enemies.splice(i, 1);
            }
            else {
                if ($.util.rectInRect(enemies[i], player) && player.status==true && enemies[i].status) {
                    // enemies[i].destroy();
                    // enemies.splice(i, 1);
                    enemies[i].eat();
                    player.death();

                }
                else {
                    var p = player.projectiles.length; while (p--) {
                        if ($.util.rectInRect(enemies[i], player.projectiles[p])) {
                            if (enemies[i].status) {
                                enemies[i].destroy(player.direction, 1);
                                //    enemies.splice(i, 1); 
                                if (player.projectiles[p].destroyable) {
                                    player.projectiles.splice(p, 1);
                                }
                            }

                        }
                        if(this.surfaceContact(player.projectiles[p])){
                            player.projectiles[p].explode();
                            player.projectiles.splice(p, 1);
                        }

                    }
                }
            }
        }
        this.cleanup();
        if(!player.status){
            endgame.update();
        }
    }

    this.cleanup = function(){
        if(enemies.length > 20){//this exists so gravity can affect death animation
           // enemies.splice(0,enemies.length-20);
            for (i = 0; i < enemies.length-20; i++) {
                if(enemies[i].status==false){
                    enemies.splice(i,1);
                }
            }
        }
    }

    this.render = function () {
        player.render();
        spawner.render();
        crate.render();
        for (i = 0; i < surface.length; i++) {
            surface[i].render();
        }
        for (i = 0; i < enemies.length; i++) {
            enemies[i].render();
        }
//draw score////
        $.mainctx.save();
        $.mainctx.shadowBlur=0;
        $.mainctx.shadowColor="black";
        $.mainctx.shadowOffsetX = 2;
        $.mainctx.shadowOffsetY = 6;
        $.mainctx.fillStyle = "rgb(255,255,255)";
        $.mainctx.font = "60px 'Open Sans', sans-serif";
        $.mainctx.fillText(this.cratesCaptured, this.cratesCaptured<10?385:370, 50);
        $.mainctx.restore();
///////

        emitter.start(2, 395, 600, 1, $.fireEmit.settings, $.fireEmit.changes);

        if(!player.status){
            endgame.render();
        }
    }


    this.containBounds = function (e) {
        var inbounds = true;
        if (e.y > $.H - e.h) {
            e.y = $.H - e.h;
            inbounds = false;
        }
        return inbounds;
    }


}