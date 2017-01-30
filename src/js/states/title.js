$.title = function(){
    var htmlOBJ = document.getElementById('title');
    var backOBJ = document.getElementById('prev');
    backOBJ.style.display = "none";
    this.update = function(){
            if ($.key.space) {
                htmlOBJ.style.display = "none";
                $.state = new $.play();
            }
    }
    this.back = function(){
        htmlOBJ.style.display = "none";
        var titleOBJ = document.getElementById('title');
        titleOBJ.style.display = "block";
    }

    this.play = function(){
        htmlOBJ.style.display = "none";
        $.state = new $.play();
    }

    this.options = function(){
        htmlOBJ.style.display = "none";
        $.state = new $.options();
    }


    this.stats = function(){
        htmlOBJ.style.display = "none";
        $.state = new $.stats();
    }

    this.render = function(){
       // $.mainctx.save();
       // $.mainctx.shadowBlur=2;
       // $.mainctx.shadowColor="black";
      //  $.mainctx.shadowOffsetX = 4;
       // $.mainctx.shadowOffsetY = 4;
       // $.mainctx.fillStyle = "rgb(255,255,255)";
       // $.mainctx.font = "60px 'Open Sans', sans-serif";
      //  $.mainctx.fillText("Super Blah Box", 250, 220);
       // $.mainctx.fillText("Crates: " + parent.cratesCaptured, 270, 290);
//        $.mainctx.restore();

    }
}