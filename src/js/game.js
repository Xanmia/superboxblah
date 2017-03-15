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

$.jump = 32;
$.left = 37;
$.right = 39;
$.shoot = 88;

 var sound = {
     music: new Howl({ src: ['sounds/songtest.m4a'],
                        autoplay: true,
                        loop: true,
                        volume: 0.6}),
     enemyspawn: new Howl({ src: ['sounds/spawn.mp3'],
                        volume: 0.0}),
     enemywalk: new Howl({ src: ['sounds/knock.mp3'],volume: 0.1}),
     enemyhit: new Howl({ src: ['sounds/explode.mp3'],volume: 0.4}),//
     wallBullethit: new Howl({ src: ['sounds/knock.mp3']}),//
     land: new Howl({ src: ['sounds/knock.mp3']}),
     jump: new Howl({ src: ['sounds/knock.mp3']}),//
     walk: new Howl({ src: ['sounds/knock.mp3'],volume: 0.3}),
     shoot: new Howl({ src: ['sounds/shot.mp3'],volume: 1.5}),//
     powerup: new Howl({ src: ['sounds/powerup.mp3'],volume: 0.5}),//
     laser: new Howl({ src: ['sounds/laser2.mp3'],volume: 0.1}),//
     fail : new Howl({ src: ['sounds/fail.mp3'],volume: 0.7})
 }
 Howler.mute(true);
 
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
    if (e.keyCode === $.left) { $.key.left = 1; };
    if (e.keyCode === $.right) { $.key.right = 1; };
    if (e.keyCode === $.jump) { $.key.space = 1; };//32 //jump
    if (e.keyCode === $.shoot) { $.key.x = 1; };//shoot
}

$.keyup = function (e) {
    if (e.keyCode === $.left) { $.key.left = 0; };
    if (e.keyCode === $.right) { $.key.right = 0; };
    if (e.keyCode === $.jump) { $.key.space = 0; };
    if (e.keyCode === $.shoot) { $.key.x = 0; };
}


$.loadImages = function () {
    var images = $.data.i, n, i_count = 0;
	var total = Object.keys(images).length;

    var check_done = function (count) {
        if (count >= total) {
       		$.state = new $.title();
			$.loop();
         //   sound.music.play();
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
    //$.mainctx.save();
    //$.mainctx.scale(.375,.25);
    $.mainctx.clearRect(0, 0, $.W, $.H);
    $.state.render();
    //$.mainctx.restore();

}

window.addEventListener('load', function () {
    $.setup();
});