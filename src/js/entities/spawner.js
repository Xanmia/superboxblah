$.spawner = function(e,enemyOBJ){
    this.x = e.x;
    this.y = e.y;
    this.w = 30;
    this.h = 10;

    var tts = 100;
    var spawnTick = 100;
   // this.velocityX = 7*d;

    this.update = function(){
       // this.x += this.velocityX * $.dt;
        tts += 1;//add * $.dt?
        if (tts > spawnTick) {
            var dir = Math.round(Math.random()*1);
            enemyOBJ.push(new $.enemy(this, dir==0?-1:1));
            tts = 0;
        }
    }

    this.render = function(){
        $.mainctx.fillStyle = "rgb(120,32,255)";
        $.mainctx.fillRect(this.x, this.y, this.w, this.h);
    }
}