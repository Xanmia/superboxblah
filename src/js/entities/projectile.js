$.projectile = function (parent, e, d, weapon, vel) {//range,des,vel
    this.contain = true;
    this.x = e.x;
    this.y = e.y;
    this.w = weapon.projectileW || 20;
    this.h = weapon.projectileH || 12;
    this.ttl = weapon.range || 100;
    this.tick = 0;
    this.destroyable = weapon.destroyable;
    this.surfaceDestroyable = weapon.surfaceDestroyable;
    this.ReactOnEnvironment = weapon.ReactOnEnvironment || false;
    this.NullProjectileDamage = weapon.NullProjectileDamage || false;
    this.status = true;
    if (vel != undefined) {
        this.velocityX = vel.velX * d;
        this.velocityY = vel.velY;
        this.diminishX = vel.dimX || 0;
        this.diminishY = vel.dimY || 0;
    } else {
        this.velocityX = 7 * d;
        this.velocityY = 0;
        this.diminishX = 0;
        this.diminishY = 0;
    }


    this.update = function (objs) {
        this.x += (this.velocityX + (this.tick * this.diminishX)) * $.dt;
        this.y += (this.velocityY + (this.tick * this.diminishY)) * $.dt;
        this.tick += 1;
        if(this.ReactOnEnvironment){this.checkSurfaces(objs);}
            
        if (this.tick > this.ttl) {
            this.status = false;
             if (weapon.explosion) { this.explosion(); }
        }
    }

    this.explode = function (i) {
        if (weapon.explosion) { this.explosion(); }
        parent.projectiles.splice(i, 1);
        emitter.start(4, this.x, this.y, 1, $.smokeEmit.settings, $.smokeEmit.changes);
        sound.wallBullethit.play();
    }

    this.explosion = function () {
       // parent.projectiles.push(new $.projectile(parent, { x: this.x, y: this.y }, d, { image: 'star', scale: 1, projectileImage: 'star', projectileW: 50, projectileH: 50, x: 0, y: 0, firerate: 50, range: 200,surfaceDestroyable:false, destroyable: false, sound: 'shoot', recoil: 0 }, {velX:0,velY:0}));
        parent.projectiles.push(new $.explosion({ x: this.x+(this.w/2), y: this.y+(this.h/2) }));

        
        //  emitter.start(4, this.x, this.y, 100, $.fireEmit.settings, $.smokeEmit.changes);
    }

    this.checkCollision = function (objs) {
        var meNext = { x: this.x + (this.velocityX * $.dt), y: this.y - (this.velocityY * $.dt), w: this.w, h: this.h }
        var _objs = [];
        var i = objs.length; while (i--) {
            if ($.util.rectInRect(meNext, objs[i])) {
                _objs.push({ hit: true, e: objs[i] });
            }
        }
        return _objs;
    }

    this.checkSurfaces = function (objs) {
        var collide = this.checkCollision(objs);
       // weight = 1;
        var i = collide.length; while (i--) {
            if (collide[i].e.y > this.y) {
                if (this.velocityY > 0) {
                    // this.y += this.velocityY;
                    this.velocityY = 0;
                    this.diminishY = 0;
                     this.velocityX = 0;
                this.diminishX = 0;
                    this.y = collide[i].e.y - this.h;
                }

            }
            else if (collide[i].e.x + collide[i].e.w < this.x + this.w) {
                // this.x = collide[i].e.x + collide[i].e.w;
                //this.velocityX *= -1;
                this.velocityX = 0;
                this.diminishX = 0;
                //velocityX = 0;
            }
            else if (collide[i].e.x > this.x) {
                // this.x = collide[i].e.x - this.w;
               // this.velocityX *= -1;
                this.velocityX = 0;
                this.diminishX = 0;
                //velocityX = 0;
            }
        }

    }

    this.render = function () {
        // $.mainctx.fillStyle = "rgb(0,0,255)";
        // $.mainctx.fillRect(this.x, this.y, this.w, this.h);
        $.mainctx.drawImage($.images[weapon.projectileImage], 0, 0, $.images[weapon.projectileImage].width, $.images[weapon.projectileImage].height, this.x, this.y, this.w, this.h);
        // $.mainctx.drawImage($.images[weapon.projectileImage], 0 ,0, 6, 6, this.x, this.y, this.w, this.h);
        // $.mainctx.drawImage($.images['star'], this.x, this.y);
    }
}