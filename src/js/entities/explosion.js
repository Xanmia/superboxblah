$.explosion = function (e) {
    var radius = 30;
    this.contain=false;

    this.x = e.x-radius;
    this.y = e.y-radius;
    this.ax = e.x;
    this.ay = e.y;

    this.w = radius*2;
    this.h = radius*2;
    this.status = true;
    
    this.NullProjectileDamage = false;
    sound.explode.play();
    var velocity = 2.5;//velocity of expolosion increase
    var max = 80; //max size of explosion
    var dissipatePercent = .7; // flip to black percent point
    var shade = .9; //shading of starting fade out
// ctx.fillRect (200-(radius), 100-radius, radius*2, radius*2);

    this.update = function () {

        // ctx.translate(xanchor,yanchor);
        radius += velocity;
        this.x = e.x-(radius*.75);
        this.y = e.y-(radius*.75);
        this.w = radius*1.5;
        this.h = radius*1.5;
        if (radius > max) {
            velocity = 0;
            shade -= .02;
        }
        if(shade<0){
            this.status = false;
        }

    }

    this.render = function () {
        
        $.mainctx.beginPath();
        // ctx.strokeStyle = "rgba(0, 0, 0, 0.03)";
        // ctx.fillRect (200-(radius), 100-radius, radius*2, radius*2);
        if ((radius / max) <= dissipatePercent) {
            $.mainctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        }
        else {
            $.mainctx.fillStyle = "rgba(0, 0, 0, " + shade + ")";
        }

        $.mainctx.arc(this.ax, this.ay, radius, 0, 2 * Math.PI);
        $.mainctx.fill();
         $.mainctx.closePath();
        // $.mainctx.fillRect (this.x, this.y, radius*2, radius*2);

       //  ctx.fillRect (this.x-(radius), this.y-radius, radius*2, radius*2);
        // $.mainctx.fillStyle = "rgb(0,0,255)";
        // $.mainctx.fillRect(this.x, this.y, this.w, this.h);
      //  $.mainctx.drawImage($.images[weapon.projectileImage], 0, 0, $.images[weapon.projectileImage].width, $.images[weapon.projectileImage].height, this.x, this.y, this.w, this.h);
        // $.mainctx.drawImage($.images[weapon.projectileImage], 0 ,0, 6, 6, this.x, this.y, this.w, this.h);
        // $.mainctx.drawImage($.images['star'], this.x, this.y);
    }
}