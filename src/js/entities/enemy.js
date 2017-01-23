$.enemy = function (e, d) {
    this.x = e.x;
    this.y = e.y;
    this.w = 25;
    this.h = 40;
    //  var direction = 1;

    var ttws = 20;
    var walkTick = 20;

    var velocityX = 2 * d;
    var velocityY = 0;
    var weight = 2;
    var gravity = -15;
    var id2 = sound.enemyspawn.play();
    this.status = true;

    var element = document.getElementById("enemy")
    this.htmlOBJ = element.cloneNode(true);
    this.htmlOBJ.id = "dupenemy";
    var htmlHead = this.htmlOBJ.children[1];
    document.body.appendChild(this.htmlOBJ);

    sound.enemyspawn.rate((Math.random() * 1) + 1, id2);

    this.update = function (objs) {

        if (velocityY > gravity) {//-15 is limit of drop speed  && !collide.hit
            velocityY -= weight * $.dt;
        }
        this.checkSurfaces(objs);
        if(this.status){
            this.x += velocityX * $.dt;
        }

        this.y -= velocityY * $.dt;
    }

    this.eat = function(){
        //this.addAnim(this.htmlOBJ, ["enemy","fadeRight","enemyDeath"]);
        this.addAnim(htmlHead, ["eat","head"]);
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

    this.playWalkSound = function () {
        ttws += 1;//add * $.dt?
        if (ttws > walkTick) {
            ttws = 0;
            sound.enemywalk.play();
            // sound.walk.rate((Math.random()*1)+1, id2);
        }
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
                    this.playWalkSound();
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

    this.addAnim = function (obj, type) {
        obj.className = "";
        void obj.offsetWidth;
       // htmlHead.classList.add("head") 
        for(var i = 0;i<type.length;i++){
            obj.classList.add(type[i]);
        }
    }


    this.destroy = function (playerDirection, animationType) {
        this.status = false;
        emitter.start(100, this.x + 10, this.y + 10, 1, $.explosionEmit.settings, $.explosionEmit.changes);
        emitter.start(4, this.x, this.y, 1, $.smokeEmit.settings, $.smokeEmit.changes);
       // document.body.removeChild(this.htmlOBJ);

        var id2 = sound.enemyhit.play();
        sound.enemyhit.rate((Math.random() * 1) + 1, id2);
       if(animationType==1){
        if(playerDirection>0){
            if(velocityX<0){
                this.addAnim(this.htmlOBJ, ["enemy","fadeRight","enemyDeath"]);
                this.addAnim(htmlHead, ["enemyDeath","head"]);
            }
            else{
               this.addAnim(this.htmlOBJ, ["enemy","fade"]);
               this.addAnim(htmlHead, ["fadeRightBehind","head"]);
            }
          
        }
        else{
            if(velocityX>0){
                this.addAnim(this.htmlOBJ, ["enemy","fadeLeft","enemyDeath"]);
                this.addAnim(htmlHead, ["enemyDeath","head"]);
            }
            else{
               this.addAnim(this.htmlOBJ, ["enemy","fade"]);
               this.addAnim(htmlHead, ["fadeLeftBehind","head"]);
            }
              
        }
      

        htmlHead.addEventListener("animationend", AnimationEnded, false);
        function AnimationEnded(e) {
            if (e.animationName == "enemyDeath" || e.animationName=="fling") {
                e.currentTarget.removeEventListener("animationend", AnimationEnded, false);
                document.body.removeChild(e.currentTarget.parentNode);
            }

        }
       }
       else{
             document.body.removeChild(this.htmlOBJ);
       }
    }

    this.render = function () {

        //    $.mainctx.fillStyle = "rgb(0,255,255)";
        //    $.mainctx.fillRect(this.x, this.y, this.w, this.h);
        this.htmlOBJ.style.left = this.x + "px";
        this.htmlOBJ.style.top = this.y - 5 + "px";
        //  this.htmlOBJ.style.transform = "scale(.75,.75) rotate(" + $.util.range(this.velocityX.toFixed(1) * 4, 51) + "deg) rotateY(" + $.util.range(this.velocityX.toFixed(1) * 12, 80) + "deg)";
       // this.htmlOBJ.style.transform = "scaleX(" + (velocityX > 0 ? -1 : 1) + ") ";
        this.htmlOBJ.style.transform = "rotateY(" + (velocityX > 0 ? 180 : 0)  + "deg)";
       
        //      $.mainctx.fillStyle = "rgb(0,0,255)";
        // $.mainctx.font = "20px 'Open Sans', sans-serif";
        //$.mainctx.fillText("{}", this.x, this.y+40);
        //  emitter.start(1, this.x, this.y, 1,$.fireContain.settings,$.fireContain.changes);
    }
}