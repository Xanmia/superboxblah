var emitter = (function () {

    function startEmit(_total, _x, _y, _dur, _settings, _changes) {
        var objs = []
        var duration = _dur;
        var settings =  {
            minX: _settings.minX,
            maxX: _settings.maxX,
            minY: _settings.minY,
            maxY: _settings.maxY,
            minW: _settings.minW,
            maxW: _settings.maxW,
            minH: _settings.minH,
            maxH: _settings.maxH,
            minL: _settings.minL,
            maxL: _settings.maxL,
            color: _settings.color
        };
        var changes = _changes || {
            minX: -.2,
            maxX: .2,
            minY: -4,
            maxY: -.2,
            minW: -.5,
            maxW: .5,
            minH: -.2,
            maxH: -.1
        }

        settings.minX = Number(_x) + settings.minX;
        settings.maxX = Number(_x) + settings.maxX;
        settings.minY = Number(_y) + settings.minY;
        settings.maxY = Number(_y) + settings.maxY;
        //life min / max
        //x min / max
        //y min / max
        //w min / max
        //h min / max 

        //{ x: _x, y: _y, w: 3, h: 3, l: Math.random() * 10, change: { x: -Math.random() * 30, y: -Math.random() * 30, w: -.1, h: -.2 } }
        requestAnimationFrame(emit);

        function emit() {
            if (duration > 0) {
                var objsToSpawn = _total;
                while (objsToSpawn--) {//create new objects, init with random x,y,w,h changes based on _element, _element needs to be in the obj
                    var newOBJ = {
                        x: Math.random() * (settings.maxX - settings.minX) + settings.minX,
                        y: Math.random() * (settings.maxY - settings.minY) + settings.minY,
                        w: Math.random() * (settings.maxW - settings.minW) + settings.minW,
                        h: Math.random() * (settings.maxH - settings.minH) + settings.minH,
                        l: Math.random() * (settings.maxL - settings.minL) + settings.minL,
                        change: {
                            x: Math.random() * (changes.maxX - changes.minX) + changes.minX,
                            y: Math.random() * (changes.maxY - changes.minY) + changes.minY,
                            w: Math.random() * (changes.maxW - changes.minW) + changes.minW,
                            h: Math.random() * (changes.maxH - changes.minH) + changes.minH
                        }
                    }
                    // Math.random() * ( settings.maxX - settings.minX ) + settings.minX;
                    // Math.random() * ( settings.maxY - settings.minY ) + settings.minY;
                    objs.push(newOBJ);
                }
            }


            var i = objs.length;
            while (i--) { //apply _element, and render objects
                for (ob in objs[i].change) {
                    //objs[i][ob] += objs[i].change[ob];
                    if (ob == 'w' || ob == 'h') {
                        objs[i][ob] = Math.max(0, objs[i][ob] + objs[i].change[ob]);
                    }
                    else {
                        objs[i][ob] += objs[i].change[ob];
                    }

                }


                $.mainctx.save();
                //             $.mainctx.globalCompositeOperation = "screen"; //xor
                //              	var grad = $.mainctx.createRadialGradient(objs[i].x, objs[i].y, 0, objs[i].x, objs[i].y, objs[i].h);
                //	grad.addColorStop(0, 'rgba(252, 220, 70, 1)');
                //	grad.addColorStop(1, 'rgba(252, 0, 0, .2)');
                //	$.mainctx.fillStyle = grad;
                $.mainctx.globalAlpha = objs[i].l / 20;
                $.mainctx.fillStyle = settings.color;//'rgb(255,0,0)';
                $.mainctx.fillRect(objs[i].x, objs[i].y, objs[i].w, objs[i].h);
                $.mainctx.restore();
                objs[i].l -= 1;
                if (objs[i].l <= 0) { objs.splice(i, 1); }
            }
            duration--;
            //new particle object 


            if (objs.length > 0) { requestAnimationFrame(emit); }

        }
    }

    return {
        start: function (_total, _x, _y, _dur, _setting, _changes) {
            startEmit(_total, _x, _y, _dur, _setting, _changes);
        }
    };
})();