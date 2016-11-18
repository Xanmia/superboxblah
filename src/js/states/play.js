


$.play = function () {
    var player = new $.player();
    var surface = [];
    var enemies = [];
    var spawner = new $.spawner({ x: 385, y: 0 }, enemies);
    // enemies.push(new $.enemy());
    // surface.push(new $.surface());
    var crate = new $.crate({ x: 385, y: 375 });

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
                enemies.splice(i, 1);
            }
            else {
                if ($.util.rectInRect(enemies[i], player)) {
                    enemies.splice(i, 1);
                    player.death();
                }
                else {
                    var p = player.projectiles.length; while (p--) {
                        if ($.util.rectInRect(enemies[i], player.projectiles[p])) {
                            emitter.start(100, enemies[i].x+10, enemies[i].y+10, 1,$.explosionEmit.settings,$.explosionEmit.changes);
                            emitter.start(4, enemies[i].x, enemies[i].y, 1,$.smokeEmit.settings,$.smokeEmit.changes);
                       
                            enemies.splice(i, 1);
                            player.projectiles.splice(p, 1);
                        }
                    }
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

        emitter.start(2, 395, 600, 1,$.fireEmit.settings,$.fireEmit.changes);
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