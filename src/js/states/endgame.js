$.endgame = function(parent)
{
    var ttRestart = 0;
    var restartTime = 100;

    this.update = function(){
        ttRestart += 1;
            if (ttRestart > restartTime && $.key.space) {
                ttRestart = 0;
                parent.init();
            }
    }

    this.render = function(){
        $.mainctx.save();
        $.mainctx.shadowBlur=2;
        $.mainctx.shadowColor="black";
        $.mainctx.shadowOffsetX = 4;
        $.mainctx.shadowOffsetY = 4;
        $.mainctx.fillStyle = "rgb(255,255,255)";
        $.mainctx.font = "60px 'Open Sans', sans-serif";
        $.mainctx.fillText("Game Over", 250, 220);
        $.mainctx.fillText("Crates: " + parent.cratesCaptured, 270, 290);
        if (ttRestart > restartTime){
            $.mainctx.font = "30px 'Open Sans', sans-serif";
            $.mainctx.fillText("Press Space to restart ", 255, 360);
        }
        $.mainctx.restore();
    }
}