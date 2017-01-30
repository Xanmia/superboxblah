$.player = function () {
    this.x = $.board.p.x;
    this.y = $.board.p.y;
    this.w = 25;
    this.h = 40;
    this.velocityX = 0;
    this.velocityY = 0;
    this.lastVX = 0;
    var maxJumpHeight = 16;
    var lateralMovement = .2;
    var weight = 1;
    var gravity = -10;
    var lastJump = 0;
    var currjump = 0;
    var doJump = true;
    var canJump = 0;
    this.status = true;

    var tts = 0;
    var shootTick = 8;

    var ttws = 20;
    var walkTick = 20;

    this.projectiles = [];

    this.direction = 1;

    this.weapon = $.weapons[2];

    this.htmlOBJ = document.getElementById("bob");
    this.eyelOBJ = document.getElementById("eyeLeft");
    this.eyerOBJ = document.getElementById("eyeRight");
    this.bodyOBJ = document.getElementById("bobody");
    // var playerSprite = new $.sprite({ canvas: $.mainctx, width: 160, height: 32, image: $.images['blob'], numberOfFrames: 5, frameStart: 0, frameEnd: 4 });
    // playerSprite.setState('default');

    this.jump = function () {
        this.velocityY = maxJumpHeight;
        this.addAnim('bounce');
        sound.jump.play();
        //    var id2 = sound.play();

        //      sound.rate((Math.random()*3)+1, id2);
        //$.main.style.transform = ""
    }

    this.moveLeft = function () {
        if (this.velocityX > -4) {
            this.velocityX -= lateralMovement;
            //   playerSprite.setState('walk');
        }
    }

    this.moveRight = function () {
        if (this.velocityX < 4) {
            this.velocityX += lateralMovement;
            //     playerSprite.setState('walk');
        }

    }

    this.shoot = function () {
        // tts += 1;//add * $.dt?
        if (tts > this.weapon.firerate) {
            var i = this.weapon.projectiles != undefined ? this.weapon.projectiles.length : 0;
            if (i <= 0) {//single projectile per shot
                this.projectiles.push(new $.projectile({ x: this.x - ((this.weapon.x - 25) * this.direction), y: this.y + this.weapon.y + 3 }, this.direction, this.weapon));
            }
            while (i--) {//multiple projectiles per shot
                this.projectiles.push(new $.projectile({ x: this.x - ((this.weapon.x - 25) * this.direction), y: this.y + this.weapon.y + 3 }, this.direction, this.weapon, this.weapon.projectiles[i]));
            }

            tts = 0;
            this.velocityX += this.weapon.recoil * (this.direction * -1);
            var id2 = sound[this.weapon.sound].play();

            sound.shoot.rate((Math.random() * .1) + 1, id2);
        }
    }

    this.checkCollision = function (objs) {
        var meNext = { x: this.x + (this.velocityX * $.dt), y: this.y - (this.velocityY * $.dt), w: this.w, h: this.h }
        var _objs = [];
        var i = objs.length; while (i--) {
            if ($.util.rectInRect(meNext, objs[i])) {
                _objs.push({ hit: true, e: objs[i] });
                // sound.land.rate((Math.random()*3)+2, id2);
            }
        }
        return _objs;
    }

    this.playWalkSound = function () {
        ttws += 1;//add * $.dt?
        if (ttws > walkTick) {
            ttws = 0;
            sound.walk.play();
            // sound.walk.rate((Math.random()*1)+1, id2);
        }
    }

    this.addAnim = function (type) {
        if (type && type != "success") {
            if (type.substring(0, 4) == "walk" && this.bodyOBJ.className == type) { return; }
            this.bodyOBJ.className = "";
            void this.bodyOBJ.offsetWidth;

            if (type) { this.bodyOBJ.classList.add(type) };
        }
        else {
            this.htmlOBJ.className = "";
            void this.htmlOBJ.offsetWidth;
            if (type) { this.htmlOBJ.classList.add(type) };
        }

    }


    this.update = function (objs) {
        for (i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].update();
            if (!this.containBounds(this.projectiles[i])) {
                this.projectiles[i].explode();
                this.projectiles.splice(i, 1);
            } else if (!this.projectiles[i].status) {
                this.projectiles.splice(i, 1);
            }
        }


        if (this.status) {
            tts += 1;
            $.main.style.transform = "translate(" + this.velocityX * 4 + "px," + this.velocityY / 2 * -1 + "px ) skewX(" + this.velocityX.toFixed(1) / 10 * -1 + "deg) rotate(" + this.velocityX.toFixed(1) / 10 + "deg)";

            // $.main.style.transform = "skewX(" + this.velocityX.toFixed(1)/4*-1 + "deg) rotate(" + this.velocityX.toFixed(1)/4 + "deg)";

            //  if (!this.status) { return };


            lastJump = currjump;
            currjump = $.key.space;
            doJump = (lastJump === 0 & currjump === 1 & canJump === 1) ? true : false;

            if (doJump ) {//&& this.velocityY==0
                this.jump();
                canJump = 0;

                //   emitter.start(3,400,300,100);
            }

            if ($.key.left) {
                this.moveLeft();
                this.direction = -1;
            }
            else if ($.key.right) {
                this.moveRight();
                this.direction = 1;
            }
            if ($.key.x) {
                this.shoot();
            }

            //   var collide = this.checkCollision(objs);

            //  var i = collide.length; while (i--) {
            //      if (collide[i].hit) {

            //        collide[i].e.ontouch();
            //       if (doJump) {
            //    this.jump();
            //            collide[i].e.add();
            //        }


            //     }
            // }

            if (this.velocityY > gravity) {//-15 is limit of drop speed  && !collide.hit
                this.velocityY -= weight * $.dt;

            }

            //this.lastVX = this.velocityX.toFixed(1);
            ///////////////////////////////////////////////////

            if (!doJump) {
                this.checkSurfaces(objs);
            }



            this.y -= this.velocityY * $.dt;
            this.x += this.velocityX * $.dt;
            if (!$.key.right && !$.key.left) { this.diminishReturns(); }
            this.containBounds(this);

            if (this.velocityX < .2 && this.velocityX > -.2) {
                //   playerSprite.setState('default');
            }

        }
    }


    this.checkSurfaces = function (objs) {
        var collide = this.checkCollision(objs);
        weight = 1;

        var i = collide.length; while (i--) {
            if (collide[i].e.y > this.y) {
                if (this.velocityY <= 0) {
                    // this.y += this.velocityY;
                    this.velocityY = 0;
                    weight = 0;
                    this.y = collide[i].e.y - this.h;
                    canJump = 1;
                }

            }
            else if (collide[i].e.x + collide[i].e.w < this.x + this.w) {
                this.x = collide[i].e.x + collide[i].e.w;
                this.velocityX = 0;
                // hit right side
            }
            else if (collide[i].e.x > this.x) {
                this.x = collide[i].e.x - this.w;
                this.velocityX = 0;
                //hit left side
            }


            if (weight != 0 && collide[i].e.y + collide[i].e.h < this.y) {
                this.y = collide[i].e.y + collide[i].e.h;
                this.velocityY = gravity;
                //hit ceiling
            }

        }

    }

    this.death = function () {
        sound.music.stop();
        sound.fail.play();
        this.status = false;
        this.htmlOBJ.style.top = -500 + "px";
        emitter.start(100, this.x + 10, this.y + 10, 1, $.explosionEmit.settings, $.explosionEmit.changes);
        emitter.start(4, this.x, this.y, 1, $.smokeEmit.settings, $.smokeEmit.changes);
        // window.body.removeChild(this.htmlOBJ);
    }


    this.containBounds = function (e) {
        var inbounds = true;
        if (e.y > $.H - e.h) {
            e.y = $.H - e.h;
            inbounds = false;
          //  this.death();
        }
        else if (e.y < 0) {
            e.y = e.h;
            e.velocityY = 0;
            inbounds = false;
        }
        if (e.x < 0) {
            e.x = 0;
            inbounds = false;
        }
        else if (e.x > $.W - e.w) {
            e.x = $.W - e.w;
            inbounds = false;

        }
        return inbounds;
    }

    this.diminishReturns = function () {
        this.velocityX *= .9;
    }

    this.render = function () {
        var eye = 0;
        for (i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].render();
        }
        if (this.status) {

            //      $.mainctx.fillStyle = "rgb(255,0,0)";
            //  $.mainctx.fillRect(this.x, this.y, this.w, this.h);


            $.mainctx.save();
            $.mainctx.translate(this.x + 12, this.y);
            $.mainctx.scale(this.direction * -this.weapon.scale, this.weapon.scale);

            $.mainctx.drawImage($.images[this.weapon.image], this.weapon.x, this.weapon.y);
            if (this.direction == 1) {

                // $.mainctx.drawImage($.images['uzi'], -18, -2); //-20, -6 -- -28, -2
                eye = 5;
            }
            else {
                //    $.mainctx.drawImage($.images[this.weapon.image], this.weapon.x, this.weapon.y);
                //$.mainctx.drawImage($.images['pistol'], -10, -2); //-12, -6 -- -21,-2
                eye = -5;
            }
            $.mainctx.restore();


       //     if (this.lastVX != this.velocityX.toFixed(1)) {
                // mostly animating the character here//////
                if (this.velocityY >= 0 && this.velocityY <= 1) {
                    if (this.velocityX < 1.5 && this.velocityX > -1.5) {
                        ///remove walk if not moving and not in the air
                        if (this.bodyOBJ.className.substring(0, 4) == "walk") { this.bodyOBJ.className = "" };
                    }
                    else if (this.velocityX < 0) {
                        //do walk left if moving and not in the air
                        this.addAnim('walk');
                    }
                    else if (this.velocityX > 0) {
                        //do walk right if moving and not in the air
                        this.addAnim('walkR');

                    }
       //         }

                this.eyelOBJ.style.left = (7 + eye + (this.velocityX.toFixed(2) / 2)) + "px";
                this.eyerOBJ.style.left = (23 + eye + (this.velocityX.toFixed(2) / 2)) + "px";
                this.htmlOBJ.style.transform = "scale(.75,.75) rotate(" + $.util.range(this.velocityX.toFixed(1) * 4, 51) + "deg) rotateY(" + $.util.range(this.velocityX.toFixed(1) * 12, 80) + "deg)";
            }
           // this.lastVX = this.velocityX.toFixed(1);


            this.htmlOBJ.style.left = this.x - 6 + "px";
            this.htmlOBJ.style.top = this.y - 35 + "px";
            // this.htmlOBJ.style.transform = "scale(.75,.75) translate(" + this.x*1.5 + "px," + (this.y +25) + "px) rotate(" + $.util.range(this.velocityX.toFixed(1) * 4, 51) + "deg) rotateY(" + $.util.range(this.velocityX.toFixed(1) * 12, 80) + "deg)";

        }

    }
}

