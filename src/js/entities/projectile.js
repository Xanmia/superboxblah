$.projectile = function(e,d){
    this.x = e.x;
    this.y = e.y;
    this.w = 20;
    this.h = 12;
    this.velocityX = 7*d;

    this.update = function(){
        this.x += this.velocityX * $.dt;
    }

    this.render = function(){
       // $.mainctx.fillStyle = "rgb(0,0,255)";
       // $.mainctx.fillRect(this.x, this.y, this.w, this.h);

        $.mainctx.drawImage($.images['bullet2'], 0 ,0, 10, 6, this.x, this.y, this.w, this.h);
        ///$.mainctx.drawImage($.images['bullet'], this.x, this.y);
    }
}