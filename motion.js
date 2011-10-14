function MotionEasing(speed, easingx, easingy){
    this.easingx = jQuery.easing[easingx];
    this.easingy = jQuery.easing[easingy];
    this.speed = speed;
}

MotionEasing.prototype.moveTo = function (deltax,deltay){
    var duration = Math.sqrt(deltax*deltax + deltay*deltay) / this.speed;
    duration = 1000;
    this.current_animation = {dest_dx: deltax,
                              dest_dy: deltay,
                              duration:duration};
}

MotionEasing.prototype.getMotion = function (){
    var out = {dx:0, dy:0};
    var current_time = new Date() / 1000,
        timedelta;
    // current animation
    if (this.current_animation){
        // start new animation
        if (! this.current_animation.start_time){
            this.current_animation.start_time = new Date() / 1000;
            this.current_animation.last_dx = 0;
            this.current_animation.last_dy = 0;
        }
        timedelta = current_time - this.current_animation.start_time;
        
        // end of animation ?
        if (timedelta >= this.current_animation.duration / 1000){
            this.current_animation = null;
        }
        else {
        // t: current time, b: begInnIng value, c: change In value, d: duration
            out.dx = this.easingx(0,
                                  timedelta, // current time
                                  0, // start
                                  this.current_animation.dest_dx, // dest 
                                  this.current_animation.duration / 1000) - this.current_animation.last_dx;
            out.dy = this.easingx(0,
                                  timedelta, // current time
                                  0, // start
                                  this.current_animation.dest_dy, // dest 
                                  this.current_animation.duration / 1000) - this.current_animation.last_dy;
            this.current_animation.last_dx += out.dx;
            this.current_animation.last_dy += out.dy;
        }
    }

    return out;
}

