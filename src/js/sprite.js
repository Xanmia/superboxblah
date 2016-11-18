$.sprite = function (options) {
	this.x = 10;
	this.y = 10;
    this.canvas = options.canvas;
    this.width = options.width;
    this.height = options.height;
    this.image = options.image;
    this.ticksPerFrame = options.ticksPerFrame || 8;  // 0 will hold
    this.numberOfFrames = options.numberOfFrames || 1;
    this.frameStart = options.frameStart-1 || 0;
    this.frameEnd = options.frameEnd-1 || options.numberOfFrames-1;

    this.loop = true;
    this.currentLoop = 0;

    this.frameIndex = this.frameStart; ///can specify specific frame to start on
    this.tickCount = 0;

    this.states = { default: { start: 1, end: 1, delay: 5, loop: 0},
                    walk: { start: 1, end: 5, delay: 3, loop: 10} };
/* 
				    frontgrind: { start: 2, end: 2, delay: 0, loop: 100, trick: false}, 
					crash: { start: 30, end: 31, delay: 15000, loop: 0 , trick: false}, 
				    flip: { start: 21, end: 29, delay:4, loop: 0 , trick: true}, 
	                kickflip: { start: 16, end: 20, delay: 6, loop: 0 , trick: true}, 
	                pop: { start: 11, end: 15, delay: 5, loop: 0 , trick: true}, 
	                wait: { start: 9, end: 10, delay: 30, loop: 500000 , trick: false}, 
	                go: { start: 7, end: 8, delay: 15, loop: 4 , trick: false}, 
	                jump: { start: 1, end: 5, delay: 6, loop: 0 , trick: false} 
                    */
};

$.sprite.prototype.setState = function (state) {
    this.currentState = this.states[state];
    this.frameStart = this.currentState.start - 1;
    this.frameEnd = this.currentState.end - 1;
    this.frameIndex = this.frameStart;
    this.loop = this.currentState.loop;
    this.ticksPerFrame = this.currentState.delay;
    this.currentLoop = 0;
}

$.sprite.prototype.update = function() {
    this.tickCount += $.dt;
    if (this.tickCount > this.ticksPerFrame && this.ticksPerFrame != 0) {
        this.tickCount = 0;
        if (this.frameIndex < this.frameEnd ) {
            this.frameIndex += 1;
        }
        else if (this.loop > this.currentLoop) {
            this.frameIndex = this.frameStart;
            this.currentLoop += 1;
        }
        else {
            this.setState('default');
        }
    }
}

$.sprite.prototype.render = function () {
	//this.canvas.save();
	//this.canvas.scale(1.05,1.05);
    this.canvas.drawImage(
        this.image,
        this.frameIndex*this.width / this.numberOfFrames,
        0,
        this.width / this.numberOfFrames,
        this.height,
        this.x,
        this.y,
        this.width / this.numberOfFrames,
        this.height);
	//this.canvas.restore();

};
    