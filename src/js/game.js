$.key = {
    left: 0,
    right: 0,
    up: 0,
    space: 0,
    x:0
}

$.images={};

$.mute = 0;

$.state;


$.W = Math.min(window.innerWidth,800);
$.H = Math.min(window.innerHeight,600);


$.setup = function () {
    $.main = document.getElementById('main');
    $.mainctx = $.main.getContext('2d');
    $.back = document.getElementById('back');
    $.backctx = $.main.getContext('2d');

    $.main.width = $.W;
    $.main.height = $.H;
    $.back.width = $.W;
    $.back.height = $.H;

    $.mainctx.webkitImageSmoothingEnabled = $.backctx.webkitImageSmoothingEnabled =false;
    $.mainctx.mozImageSmoothingEnabled = $.backctx.mozImageSmoothingEnabled =  false;
    $.mainctx.imageSmoothingEnabled = $.backctx.imageSmoothingEnabled = false; /// future

    window.addEventListener('keydown', $.keydown, false);
    window.addEventListener('keyup', $.keyup, false);
    $.updateDelta();
   // $.state = new $.play();

	$.loadImages();
}


$.keydown = function (e) {
    if (!$.canEdit) { e.preventDefault() };
    if (e.keyCode === 37) { $.key.left = 1; };
    if (e.keyCode === 39) { $.key.right = 1; };
    if (e.keyCode === 32) { $.key.space = 1; };//32
    if (e.keyCode === 88) { $.key.x = 1; };
}

$.keyup = function (e) {
    if (e.keyCode === 37) { $.key.left = 0; };
    if (e.keyCode === 39) { $.key.right = 0; };
    if (e.keyCode === 32) { $.key.space = 0; };
    if (e.keyCode === 88) { $.key.x = 0; };
}


$.loadImages = function () {
    var images = $.data.i, n, i_count = 0;
	var total = Object.keys(images).length;

    var check_done = function (count) {
        if (count >= total) {
       		$.state = new $.play();
			$.loop();
        }
    };

   // var i_count = 0;
	for (n in images) {
		var imageObj = new Image();
        imageObj.onload = function () {
            i_count++;
            check_done(i_count);
        };
        var append = 'data:image/png;base64,';

        imageObj.src = append + images[n];
        $.images[n] = imageObj;
	}
};


$.updateDelta = function () {
    var now = Date.now();
    $.dt = (now - $.lt) / (1000 / 60);
    $.lt = now;
    $.elapsed += $.dt / 60;
}

$.loop = function () {
    //  setTimeout(function () {
    window.requestAnimFrame($.loop);
    $.update();
    $.render();
    // }, 1000 / 50);
}


$.update = function () {
    $.updateDelta();
    $.state.update();
}

$.render = function () {
    $.mainctx.save();
    //$.mainctx.scale(.375,.25);
    $.mainctx.clearRect(0, 0, $.W, $.H);
    $.state.render();
    $.mainctx.restore();

}

window.addEventListener('load', function () {
    $.setup();
});