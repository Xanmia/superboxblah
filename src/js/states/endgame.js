$.endgame = function(parent)
{

    this.update = function(){
            if ($.key.space) {
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
        $.mainctx.restore();
    }
}