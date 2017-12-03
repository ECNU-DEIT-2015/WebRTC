var rect = function(ctx1, ctx2, that) {
    var canvas1 = ctx1.canvas,
        canvas2 = ctx2.canvas;
    return {
        ing: function (start, end) {
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            ctx2.strokeRect(start.left, start.top, end.left - start.left, end.top - start.top);
        },
        end: function (start, end) {
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            var color = ctx1.strokeStyle;
            var lineWidth = ctx1.lineWidth;
            var draw = function () {
                ctx1.save();
                ctx1.lineWidth = lineWidth;
                ctx1.strokeStyle = color;
                ctx1.strokeRect(start.left, start.top, end.left - start.left, end.top - start.top);
                ctx1.restore();
            }
            draw();
            that.stack.push(draw);
            that.rstack = [];
        }
    }
};