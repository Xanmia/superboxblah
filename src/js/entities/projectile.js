$.projectile = function(e,d,range,des,vel){
    this.x = e.x;
    this.y = e.y;
    this.w = 20;
    this.h = 12;
    this.ttl = range || 100;
    this.tick = 0;
    this.destroyable = des;
    this.status = true;
    if(vel!=undefined){
        this.velocityX = vel.velX*d;
        this.velocityY = vel.velY;
    }else{
        this.velocityX = 7*d;
        this.velocityY = 0;
    }


    this.update = function(){
        this.x += this.velocityX * $.dt;
        this.y += this.velocityY * $.dt;
        this.tick+=1;
        if(this.tick>this.ttl){
            this.status = false;
        }
    }

    this.render = function(){
       // $.mainctx.fillStyle = "rgb(0,0,255)";
       // $.mainctx.fillRect(this.x, this.y, this.w, this.h);

        $.mainctx.drawImage($.images['laser'], 0 ,0, 6, 6, this.x, this.y, this.w, this.h);
       // $.mainctx.drawImage($.images['star'], this.x, this.y);
    }
}