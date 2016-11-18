$.player = function () {
    this.x = 200;
    this.y = 200;
    this.w = 30;
    this.h = 30;
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
    var status = true;

    var tts = 0;
    var shootTick = 9;
    this.projectiles = [];

    var direction = 1;

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
        tts += 1;//add * $.dt?
        if (tts > shootTick) {
            this.projectiles.push(new $.projectile({ x: this.x, y: this.y + 5 }, direction));
            tts = 0;
            this.velocityX += direction * -1;
        }
    }

    this.checkCollision = function (objs) {
        var meNext = { x: this.x + (this.velocityX * $.dt), y: this.y - (this.velocityY * $.dt), w: this.w, h: this.h }
        var _objs = [];
        var i = objs.length; while (i--) {
            if ($.util.rectInRect(meNext, objs[i])) {
                _objs.push({ hit: true, e: objs[i] });
            }
        }
        return _objs;
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
        $.main.style.transform = "translate(" + this.velocityX * 4 + "px," + this.velocityY / 2 * -1 + "px ) skewX(" + this.velocityX.toFixed(1) / 10 * -1 + "deg) rotate(" + this.velocityX.toFixed(1) / 10 + "deg)";

        // $.main.style.transform = "skewX(" + this.velocityX.toFixed(1)/4*-1 + "deg) rotate(" + this.velocityX.toFixed(1)/4 + "deg)";

        //  if (!this.status) { return };

        for (i = 0; i < this.projectiles.length; i++) {
            this.projectiles[i].update();
            if (!this.containBounds(this.projectiles[i])) {
                emitter.start(4, this.projectiles[i].x, this.projectiles[i].y, 1, $.smokeEmit.settings, $.smokeEmit.changes);

                this.projectiles.splice(i, 1);
            }
        }

        lastJump = currjump;
        currjump = $.key.space;
        doJump = (lastJump === 0 & currjump === 1 & canJump === 1) ? true : false;

        if (doJump) {
            this.jump();
            canJump = 0;
            //   emitter.start(3,400,300,100);
        }

        if ($.key.left) {
            this.moveLeft();
            direction = -1;
        }
        else if ($.key.right) {
            this.moveRight();
            direction = 1;
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
        //this.containBounds(this);

        if (this.velocityX < .2 && this.velocityX > -.2) {
         //   playerSprite.setState('default');
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
            }
            else if (collide[i].e.x > this.x) {
                this.x = collide[i].e.x - this.w;
                this.velocityX = 0;
            }


            if (weight != 0 && collide[i].e.y + collide[i].e.h < this.y) {
                this.y = collide[i].e.y + collide[i].e.h;
                this.velocityY = gravity;
            }

        }

    }

    this.death = function () {
        // status = false;
    }

    this.containBounds = function (e) {
        var inbounds = true;
        if (e.y > $.H - e.h) {
            e.y = $.H - e.h;
            inbounds = false;
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
        if (status) {
            for (i = 0; i < this.projectiles.length; i++) {
                this.projectiles[i].render();
            }
              //  $.mainctx.fillStyle = "rgb(255,0,0)";
             // $.mainctx.fillRect(this.x, this.y, this.w, this.h);


            $.mainctx.save();
            $.mainctx.translate(this.x + 14, this.y);
            $.mainctx.scale(direction * -2, 2);

            if (direction == 1) {
                $.mainctx.drawImage($.images[this.weapon.image], this.weapon.x, this.weapon.y);
                // $.mainctx.drawImage($.images['uzi'], -18, -2); //-20, -6 -- -28, -2
                eye = 5;
            }
            else {
                $.mainctx.drawImage($.images[this.weapon.image], this.weapon.x + 8, this.weapon.y);
                //$.mainctx.drawImage($.images['pistol'], -10, -2); //-12, -6 -- -21,-2
                eye = -5;
            }
            $.mainctx.restore();


            if (this.lastVX != this.velocityX.toFixed(1)) {
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
                }

                this.eyelOBJ.style.left = (7 + eye + (this.velocityX.toFixed(2) / 2)) + "px";
                this.eyerOBJ.style.left = (23 + eye + (this.velocityX.toFixed(2) / 2)) + "px";
                this.htmlOBJ.style.transform = "scale(.75,.75) rotate(" + $.util.range(this.velocityX.toFixed(1) * 4, 51) + "deg) rotateY(" + $.util.range(this.velocityX.toFixed(1) * 12, 80) + "deg)";
            }
            this.lastVX = this.velocityX.toFixed(1);


            this.htmlOBJ.style.left = this.x + "px";
            this.htmlOBJ.style.top = this.y - 45 + "px";
            // this.htmlOBJ.style.transform = "scale(.75,.75) translate(" + this.x*1.5 + "px," + (this.y +25) + "px) rotate(" + $.util.range(this.velocityX.toFixed(1) * 4, 51) + "deg) rotateY(" + $.util.range(this.velocityX.toFixed(1) * 12, 80) + "deg)";

        }

    }
}

