/*layer
-
*/

(function(){
window.Layer = function (canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
};

window.Layer.prototype.draw = function (objs){
    this.ctx.clearRect(0,0,this.canvas.width, this.canvas.height);

    var i, l = objs.length;
    for(i = 0; i < l ; i++){
        objs[i].draw(this.ctx);
    }
};

})();

