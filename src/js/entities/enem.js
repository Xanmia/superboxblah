class Spawn {
    constructor(e,enemyOBJ) {
        this.x = e.x;
        this.y = e.y;
        this.w = 30;
        this.h = 10;
        this.tts = 0;
        this.spawnTick = 100;
    }

    update() {
        this.this.tts += 1;//add * $.dt?
        if (this.tts > this.spawnTick) {
            var dir = Math.round(Math.random() * 1);
            enemyOBJ.push(new $.enemy(this, dir == 0 ? -1 : 1));
            tts = 0;
        }
    }

    render() {
        $.mainctx.fillStyle = "rgb(120,32,255)";
        $.mainctx.fillRect(this.x, this.y, this.w, this.h);
    }
}