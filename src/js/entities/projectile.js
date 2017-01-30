$.projectile = function(e,d,weapon,vel ){//range,des,vel
    this.x = e.x;
    this.y = e.y;
    this.w = weapon.projectileW || 20;
    this.h = weapon.projectileH || 12;
    this.ttl = weapon.range || 100;
    this.tick = 0;
    this.destroyable = weapon.destroyable;
    this.status = true;
    if(vel!=undefined){
        this.velocityX = vel.velX*d;
        this.velocityY = vel.velY;
        this.diminishX = vel.dimX||0;
        this.diminishY = vel.dimY||0;
    }else{
        this.velocityX = 7*d;
        this.velocityY = 0;
        this.diminishX = 0;
        this.diminishY = 0;
    }


    this.update = function(){
        this.x += (this.velocityX + (this.tick*this.diminishX)) * $.dt;
        this.y += (this.velocityY + (this.tick*this.diminishY)) * $.dt;
        this.tick+=1;
        if(this.tick>this.ttl){
            this.status = false;
        }
    }

    this.explode = function(){
        emitter.start(4, this.x, this.y, 1, $.smokeEmit.settings, $.smokeEmit.changes);
        sound.wallBullethit.play();
    }

    this.render = function(){
       // $.mainctx.fillStyle = "rgb(0,0,255)";
       // $.mainctx.fillRect(this.x, this.y, this.w, this.h);
    $.mainctx.drawImage($.images[weapon.projectileImage], 0 ,0, $.images[weapon.projectileImage].width, $.images[weapon.projectileImage].height, this.x, this.y, this.w, this.h);
       // $.mainctx.drawImage($.images[weapon.projectileImage], 0 ,0, 6, 6, this.x, this.y, this.w, this.h);
       // $.mainctx.drawImage($.images['star'], this.x, this.y);
    }
}