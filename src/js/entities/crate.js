$.crate = function(e, parent){
    this.x = e.x;
    this.y = e.y;
    this.w = 50;
    this.h = 50;
   // this.parent = parent;
    //this.velocityX = 7*d;
    this.locs = [{x: 385, y: 375}, {x: 305, y: 100}, {x: 455, y: 100}, {x: 700, y: 240}, {x: 700, y: 470}, {x: 85, y: 240}, {x: 85, y: 470}, {x: 250, y: 510}, {x: 500, y: 510}];

    this.update = function(obj){
      //  this.x += this.velocityX * $.dt;

      if ($.util.rectInRect(this, obj)) {
          parent.cratesCaptured++;
          console.log(parent.cratesCaptured);
          var nextLoc = $.util.pickRandomFromObject(this.locs);
          emitter.start(3, this.x+25, this.y, 25,$.breakboxEmit.settings,$.breakboxEmit.changes);
         // emitter.start(100, this.x+10, this.y+10, 1,$.explosionEmit.settings,$.explosionEmit.changes);
          emitter.start(2, this.x+25, this.y+25, 10,$.smokeEmit.settings,$.fireEmit.changes);

          this.x = nextLoc.x;
          this.y = nextLoc.y;
          obj.weapon = $.util.pickRandomFromObject($.weapons);
         
          var id2 =  sound.powerup.play();
  
          sound.powerup.rate((Math.random()*3)+1, id2);
      }
    }

    this.render = function(){
       // $.mainctx.fillStyle = "rgb(0,0,255)";
       // $.mainctx.fillRect(this.x, this.y, this.w, this.h);

        $.mainctx.drawImage($.images['crate'], 0 ,0, 50, 50, this.x, this.y, this.w, this.h);
        ///$.mainctx.drawImage($.images['bullet'], this.x, this.y);
    }
}