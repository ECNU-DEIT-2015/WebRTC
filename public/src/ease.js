var ease = function(ctx1, ctx2, that) {
    var canvas1 = ctx1.canvas,
        canvas2 = ctx2.canvas,
        easeFn = [];
    return {
        ing: function (start, end) {
            function c2(){
                ctx2.clearRect(0,0,canvas2.width,canvas2.height);
                ctx2.beginPath();
                ctx2.arc(Math.floor(end.left), Math.floor(end.top), 10, 0, 2*Math.PI);
                ctx2.stroke();
            }
            c2 = util.throttle(c2, 140);
            c2();
            var draw = function () {
                ctx1.globalCompositeOperation = "destination-out";  //鼠标覆盖区域不显示
                ctx1.beginPath();
                ctx1.arc(Math.floor(end.left), Math.floor(end.top), 10, 0, 2*Math.PI, true);
                ctx1.closePath();
                ctx1.fill();
                ctx1.globalCompositeOperation = "source-over";
            }
            draw();
            easeFn.push(draw);
        },
        end: function (start, end) {
            that.ctx2.clearRect(0,0,that.canvas2.width,that.canvas2.height);
            var stackFn = easeFn.slice(0);
            that.stack.push(function () {
                $.each(stackFn, function () {
                    this();
                });
            });
            that.rstack = [];
            that.easeFn = [];
        }
    };
}