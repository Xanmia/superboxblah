$.weapons = [
{image:'uzi',scale:2,projectileImage:'laser', x:-15, y:0, firerate:8, range:70,surfaceDestroyable:true, destroyable:true, sound:'shoot', recoil:1},//-18, -2); //-20, -6 -- -28, -2
{image:'pistol',scale:2,projectileImage:'laser', x:-17, y:3, firerate:12, range:100,surfaceDestroyable:true, destroyable:true, sound:'shoot', recoil:1},  //-10, -2); //-12, -6 -- -21,-2
{image:'launcher',explosion:true, scale:2,projectileImage:'laser', x:-26, y:2, firerate:26, range:50,surfaceDestroyable:true, destroyable:true, sound:'shoot', recoil:2, projectiles:[{velX:10,velY:-1,dimX:.01,dimY:.1}]},
{image:'magnum',scale:2.5,projectileImage:'laser', x:-17, y:3, firerate:16, range:200,surfaceDestroyable:true, destroyable:true, sound:'shoot', recoil:3},  //-10, -2); //-12, -6 -- -21,-2
//{image:'star',scale:1,projectileImage:'star',projectileW:21,projectileH:21, x:-20, y:2, firerate:50, range:200,surfaceDestroyable:true, destroyable:false,sound:'shoot',recoil:0},  //-10, -2); //-12, -6 -- -21,-2
{image:'shotgun', scale:2,projectileImage:'laser', x:-26, y:2, firerate:16, range:40,surfaceDestroyable:true, destroyable:true, sound:'shoot', recoil:2, projectiles:[{velX:8,velY:-1}, {velX:8,velY:1}, {velX:8,velY:0}]},
{image:'lasergun',scale:2, projectileImage:'laser', x:-26, y:2, firerate:1, range:50,surfaceDestroyable:true, destroyable:false,sound:'laser', recoil:.1}, //laser
{image:'dynamite',explosion:true, scale:1,projectileImage:'dynamite',projectileW:15,projectileH:30, x:-20, y:2, firerate:40, range:70,ReactOnEnvironment:true,NullProjectileDamage:true ,surfaceDestroyable:false, destroyable:false,sound:'shoot',recoil:0, projectiles:[{velX:0,velY:.1,dimX:0,dimY:.1}]}  //-10, -2); //-12, -6 -- -21,-2
];