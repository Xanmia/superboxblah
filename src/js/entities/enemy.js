$.enemy = function(e,d){
    this.x = e.x;
    this.y = e.y;
    this.w = 20;
    this.h = 20;
  //  var direction = 1;
    var velocityX = 3*d;
    var velocityY = 0;
    var weight = 2;
    var gravity = -15;
   
    this.update = function(objs){
        
        if (velocityY > gravity) {//-15 is limit of drop speed  && !collide.hit
            velocityY -= weight * $.dt;
        }
        this.checkSurfaces(objs);
        this.x += velocityX * $.dt;
        this.y -= velocityY * $.dt;
    }

    this.checkCollision = function (objs) {
        var meNext = { x: this.x + (velocityX * $.dt), y: this.y - (velocityY * $.dt), w: this.w, h: this.h }
        var _objs = [];
        var i = objs.length; while (i--) {
            if ($.util.rectInRect(meNext, objs[i])) {
                _objs.push({ hit: true, e: objs[i] });
            }
        }
        return _objs;
    }

    this.checkSurfaces = function (objs) {
        var collide = this.checkCollision(objs);
        weight = 1;

        var i = collide.length; while (i--) {
            if (collide[i].e.y > this.y) {
                if (velocityY <= 0) {
                    // this.y += this.velocityY;
                    velocityY = 0;
                    weight = 0;
                    this.y = collide[i].e.y - this.h;
                }

            }
            else if (collide[i].e.x + collide[i].e.w < this.x + this.w) {
               // this.x = collide[i].e.x + collide[i].e.w;
                velocityX *= -1;
                //velocityX = 0;
            }
            else if (collide[i].e.x > this.x) {
               // this.x = collide[i].e.x - this.w;
               velocityX *= -1;
                //velocityX = 0;
            }
        }
    }

    this.render = function(){
        
        $.mainctx.fillStyle = "rgb(0,255,255)";
        $.mainctx.fillRect(this.x, this.y, this.w, this.h);
      //  emitter.start(1, this.x, this.y, 1,$.fireContain.settings,$.fireContain.changes);
    }
}