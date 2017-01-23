
$.play = function () {
    var player = new $.player();
    var surface = [];
    var enemies = [];
    this.cratesCaptured = 0;
    var spawner = new $.spawner({ x: 385, y: 0 }, enemies);
    // enemies.push(new $.enemy());
    // surface.push(new $.surface());
    var crate = new $.crate({ x: 385, y: 375 }, this);

    for (var i = 0; i < $.board.b.length; i++) {
        surface.push(new $.surface($.board.b[i]));
    }

    this.update = function () {
        player.update(surface);
        spawner.update();
        crate.update(player);
        for (i = 0; i < enemies.length; i++) {
            enemies[i].update(surface);
            if (!this.containBounds(enemies[i])) {
                enemies[i].destroy();
                enemies.splice(i, 1);
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
                    }
                }
            }
        }
        this.cleanup();
    }

    this.cleanup = function(){
        if(enemies.length > 25){//only 25 enemies allowed on screen
            enemies.splice(0,enemies.length-25);
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

        emitter.start(2, 395, 600, 1, $.fireEmit.settings, $.fireEmit.changes);
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