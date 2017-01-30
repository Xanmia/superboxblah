"use strict";

$.util = {};

window.requestAnimFrame = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

$.util.range = function (n, r) {
  if (n < 0) {
    return Math.max(n, -r);
  }
  else if (n > 0) {
    return Math.min(n, r);
  }
}

$.util.rectInRect = function (r1, r2) {
  return !(r2.x > r1.x + r1.w ||
    r2.x + r2.w < r1.x ||
    r2.y > r1.y + r1.h ||
    r2.y + r2.h < r1.y);
};

$.util.range = function(n,r){
  if(n<0){
    return Math.max(n,-r);
  }
  else if(n>0){
    return Math.min(n,r);
  }
}

$.util.pickRandomFromObject = function (obj) {
    var keys = Object.keys(obj);
    return obj[keys[ keys.length * Math.random() << 0]];
}

$.board = {//jumper tutorial
            p: { x: 100, y: 450 },
            b: [{ x: 0, y: 560, w: 360, h: 40 }, { x: 440, y: 560 , w: 360, h: 40},{ x: 0, y: 520, w: 180, h: 40 },{ x: 620, y: 520, w: 180, h: 40 },{ x: 265, y: 425, w: 270, h: 40 }, { x: 495, y: 290, w: 270, h: 40 }, { x: 40, y: 290, w: 270, h: 40 }, { x: 265, y: 150, w: 270, h: 40 }, { x: 0, y: 0, w: 360, h: 40 }, { x: 450, y: 0 , w: 360, h: 40},{ x: 0, y: 0, w: 45, h: 700 }, { x: 755, y: 0, w: 45, h: 700 }]
      };



$.fireEmit = {
  settings : {
            minX: -45,
            maxX: 45,
            minY: 0,
            maxY: 0,
            minW: 10,
            maxW: 10,
            minH: 10,
            maxH: 10,
            minL: 20,
            maxL: 60,
            color: 'rgb(255,0,0)'
        },
        changes : {
            minX: -.1,
            maxX: .1,
            minY: -1.25,
            maxY: -.5,
            minW: -.2,
            maxW: -.2,
            minH: -.1,
            maxH: -.1
        }
};


$.fireContain = {
  settings : {
            minX: -5,
            maxX: 5,
            minY: 0,
            maxY: 0,
            minW: 10,
            maxW: 10,
            minH: 10,
            maxH: 10,
            minL: 20,
            maxL: 60,
            color: 'rgb(255,0,0)'
        },
        changes : {
            minX: -.1,
            maxX: .1,
            minY: -1.25,
            maxY: -.5,
            minW: -.2,
            maxW: -.2,
            minH: -.1,
            maxH: -.1
        }
};

$.smokeEmit = {
  settings : {
            minX: -15,
            maxX: 15,
            minY: -15,
            maxY: 15,
            minW: 25,
            maxW: 25,
            minH: 25,
            maxH: 25,
            minL: 10,
            maxL: 50,
            color: 'rgb(190,190,190)'
        },
        changes : {
            minX: -.4,
            maxX: .4,
            minY: -.4,
            maxY: 0,
            minW: 0,
            maxW: 0,
            minH: 0,
            maxH: 0
        }
};

$.breakboxEmit = {
  settings : {
            minX: -25,
            maxX: 25,
            minY: -1,
            maxY: 1,
            minW: 5,
            maxW: 15,
            minH: 5,
            maxH: 15,
            minL: 20,
            maxL: 20,
            color: 'rgb(85,75,63)'
        },
        changes : {
            minX: 0,
            maxX: 0,
            minY: 0,
            maxY: 2,
            minW: 0,
            maxW: 0,
            minH: 0,
            maxH: 0
        }
};

$.explosionEmit = {
  settings : {
            minX: -1,
            maxX: 1,
            minY: -1,
            maxY: 1,
            minW: 3,
            maxW: 3,
            minH: 3,
            maxH: 3,
            minL: 20,
            maxL: 30,
            color: 'rgb(255,0,0)'
        },
        changes : {
            minX: -2,
            maxX: 2,
            minY: -2,
            maxY: 2,
            minW: 0,
            maxW: 0,
            minH: 0,
            maxH: 0
        }
};

$.data = {
	i: {
        pistol: 'iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAAhUlEQVR42mNggAIlJaX/DGSAnp6e/7m5uah6fXx8/hPCIAvj4+PBGMRGl2NAdpm7uztcMS4MUoeMYeIgvRgGgnB+fj5Z2N/f/z9GcMFcSS7GGf6Ghob/ycEkRyiSBhCNEZ6UGshgZ2z0v8LP5X+0oy0Yg/gkGYruGooNRAdUN5AmhtLNQAACM/Ly/iNxJQAAAABJRU5ErkJggg==',
        crate:'iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAGFBMVEUOGQApJB5EPDJcUUNnW01wY1KCc1+NfWkFw1OkAAABP0lEQVR4AZXW4arCMAxH8dTanPd/49uYuj+D2eaeD2OU/JQFkVljNWYon5Ennq2RZkxjyM1ypoPO0mLQMA8TQ5Af2ldJ8kY1xiRhlGfA02kjiOGtnGMYTPIqNgkYI8h71t6b66sBdbKE8XEjCAeSAoL0IPQjWaJ9iR/JJYJ4hVxi3o0SkUjC8VkkRMaOSLQikXhXicQidDDfEImL4H0SfhGJKpHQiQfRs+x2dSPdg5x2JdI/xB+IxJ10fhGJJwJBtrsSIQgPRKJIJNoDySUH2e7qRjAfzo1IVInEhnSRu6gRiV8EDBDRrnakJ9nvSoQgfhGJKpHYkAH68UtsiWMsInEgfRGJtiUuou84kvU/JnEkfMklDoQkBLEURwKYJ0lxJMODfKaLBRnmxmjlhpteSGo1GFYVMpaXYhbGGv+s/QFCRSiEYgtAEwAAAABJRU5ErkJggg==',
        bullet2:'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAL0lEQVR42mNgwAT/kTBO8P/sV2Y4xqUYLPnv/18wfvI3EqdiuEKQInwKibYar2cA4xU/MTGDb0sAAAAASUVORK5CYII=',
        bullet:'iVBORw0KGgoAAAANSUhEUgAAAAoAAAAGCAYAAAD68A/GAAAAKklEQVR42mNgQID/ODAK+P/kbyRWjKwYLPDv3z8wxqcYrpBoUwkpIsozAA8fcGmgtatgAAAAAElFTkSuQmCC',
        floor:'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAASUlEQVR42mNgYGD4Tzb29PT8Ty5mQDYJKoATY5GHA2RJbICQPE4FBDXiUki0RgwDSNXIQK6NFNtMtp/JDm2y4pn8FEa1tE0qBgDFAbYXuqm4ggAAAABJRU5ErkJggg==',
		    floor2:'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAASElEQVR42mPIzc39Ty5m8PT0/E8uZrA3NP1PLmaAARCn0CcIVRAJEJLHqYCgRlwKidaIzQCSNJLsVKrZTLafyQ5tsuJ5aKZtAHMnBHaRIqAeAAAAAElFTkSuQmCC',
        sideStruct:'iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAJklEQVR42mOwNzT97+np+T83N/d/oU8QQYysnmFU86jmUc1U1gwA7PvCarwJ554AAAAASUVORK5CYII=',
        uzi: 'iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAMAAABYi/ZGAAAALVBMVEUAAAAAAAAdGiEiIiIxMTE+MzI/LDNENjpEOjtHR0dJNDFPT09WVlZbQT1fX1+Z16m6AAAAAXRSTlMAQObYZgAAAF9JREFUeNqlztsOABEMRdGag3H//8+daiUl82g9IDukaAJtAFn9XhIkeYjWGlLixueh5s4tS3sUppSrvM27qq2edMZJ/zKRc1ho4Uah9wAyYNbMTSObacYbf62UeHvvA1RLBIUZXzqVAAAAAElFTkSuQmCC',
        shotgun:'iVBORw0KGgoAAAANSUhEUgAAAB4AAAAPCAMAAADEZI+uAAAAKlBMVEUAAAAAAAAaGhoiIiIsLCwxMTE5OTk+MzJLLy1NTU1SOzdTNzRbQT1fX18gddJqAAAAAXRSTlMAQObYZgAAAGJJREFUeNqF0dEOgCAIQFECDVH8/98taE1bkXfj6TBegFUUdOneP2MmcpbPcraF6Hi2mM17r7WUMd0yVmcR1dbGiMWsztaTAQFxZpiPw8kb0M3vMKUUsTtizN6SLfp/BSw6ABJSB0tuNyjoAAAAAElFTkSuQmCC',
        shotgunDouble:'iVBORw0KGgoAAAANSUhEUgAAAB0AAAANCAYAAABVRWWUAAAAc0lEQVR42mNQUlL6T0vMgA3Ex8f/pwW2MzYCY6yW+/r6/qcFNjQ0BGOsltMiSGEWImNky2kWvOiWRjvaIiylVfDCfAayDMNSS0vL/7TAeC2lIviPTIMMp5elcAPpbSkY08tShoGylAE9eNExTS3FVfCAxAEX9Jvr23/i7QAAAABJRU5ErkJggg==',
        blob: 'iVBORw0KGgoAAAANSUhEUgAAAKAAAAAgCAMAAACioYPHAAAAElBMVEUAAAA3NUpFQWJUT3dgV4zrAAADDbxiAAAAAXRSTlMAQObYZgAAAL9JREFUeAHt0sEKAjEMRVGbTP//l+3gJQuJwVAXD+xbzj0zLeLj7Exp4zXJTmSi3RhCpLPICMl+MYRKB9B97bKbKHXAnKvPGUKkJ8AvgEqPn9gZQKefC+51RA5Euv4Fz5/wzy6o1RMBUOoBEACRDnAyQKgj3IwBxLr5YMMAze6b7yc9AQhAq3tk+u++D+Ah4MvOVgfsfz/vFs/GLd5B0QFuIzK2fr97PgCSgc8ZQSXX73fOT57UgJyLsrL2+bJ7AvJdFAEHWHH1AAAAAElFTkSuQmCC',
        star:'iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAMAAACeyVWkAAAAGFBMVEUAAAAAAAA5OTk9PT1HR0dVVVVsbGyNjY3w6xM0AAAAAXRSTlMAQObYZgAAAGtJREFUeAFlz0ECBSEIAlCwabz/jT9+Z0HJJnqsBEAFX3Kv/pBrDRbuPViYeTOE3eha6NxNaGxzMyPIC8l4nuCJEL6v2JGFgNhxap9XPDBTLOSB9UYwm7LRZ+FGV2PhanUWErxZSAz+4+DCH6I0Au3OjnwKAAAAAElFTkSuQmCC',
        laser:'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAIUlEQVR42mPo3+n8Hx0zvPov8x8dM7z77/kfHWNXic1MAK+DR5ZbxG2uAAAAAElFTkSuQmCC',
        lasergun:'iVBORw0KGgoAAAANSUhEUgAAAB0AAAANCAMAAABim5WmAAAAJFBMVEUAAAAAAAAaGhoiIiIsLCw5OTk+MzJKPj9NTU1bQT1fX1+4xQAlT03aAAAAAXRSTlMAQObYZgAAAFtJREFUeAF1y2EKgyEMg+HYWt2W+993Roej0O+hPwovAbyGLUrk6cEP791X1OOJOuJVU86VPyfPf2USoorIWvPBuZyaGbCqxkW13ruPt3K5NduVs6riC0W15IIvbowHRjxcPxsAAAAASUVORK5CYII=',
        magnum:'iVBORw0KGgoAAAANSUhEUgAAABQAAAANCAYAAACpUE5eAAAAbklEQVR42mPIz8//z0BNADKQFOzj44OBYWYZGhr+BxsYHx9PEMMMRBcHGQgyCGwYOa7G5kKQOF4D8VmAzYUkx4OSkhJMA4j+D+KjY0oMZLAzNvoPwjDDYGySDUV3DcwgsgzEBqhu4NBwJU28jQwARdy5Yz6/s6EAAAAASUVORK5CYII=',
        launcher: 'iVBORw0KGgoAAAANSUhEUgAAAB0AAAANCAMAAABim5WmAAAAIVBMVEUAAAAaGhoiIiIsLCwxMTE5OTk+MzJNTU1URURbQT1fX1+B23wJAAAAAXRSTlMAQObYZgAAAGRJREFUeAF9zEESwzAIQ1FZdSHh/gcuTBgm8qJ/+0AASZOYoftGuF0xXeZRF63uqT6Vxm5v5fToLi8meSz7zu5HM12uv/ulukxuUV1eoKgurw//LKuey1iqeC8DoFWjsAkVs8Ifm9YG5RGs4FwAAAAASUVORK5CYII='
}
}
