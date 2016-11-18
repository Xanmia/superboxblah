$.surface = function(opt){
    for (var e in opt) {
        this[e] = opt[e];
    }
    this.x = this.x;// || 500;
    this.y = this.y;// || 350;
    this.w = this.w;// || 200;
    this.h = this.h;// || 100;

    this.update = function(){

    }

    this.render = function(){

   
       // $.mainctx.save();
       // $.mainctx.translate(this.x,this.y);
        //     var pattern = $.mainctx.createPattern($.images['floor'], 'repeat');


  
      //var pattern = $.mainctx.createPattern(tempCanvas, 'repeat');
        //$.mainctx.fillStyle = pattern;

        if(this.h>45){
        $.mainctx.fillStyle = "rgb(0,0,0)";
                $.mainctx.fillRect(this.x, this.y, 5, this.h);
        }
        else{
        for(i=0; i<(this.w/45); i++)
        {
            $.backctx.drawImage($.images['floor2'], 0 ,0, 15, 15, this.x+(i*45), this.y, 45, 45);
        }
        }

       // $.mainctx.scale(3,3);
      //  $.mainctx.drawImage($.images['floor'],0,0);
      //  $.mainctx.restore();
    }
}




