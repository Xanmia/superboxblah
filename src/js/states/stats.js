$.stats = function(){
    var htmlOBJ = document.getElementById('stats');
    htmlOBJ.style.display = "block";    
    var backOBJ = document.getElementById('prev');
    backOBJ.style.display = "block";
    
    this.update = function(){

    }

    this.back = function(){
        htmlOBJ.style.display = "none";
        var titleOBJ = document.getElementById('title');
        titleOBJ.style.display = "block";
        $.state = new $.title();
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