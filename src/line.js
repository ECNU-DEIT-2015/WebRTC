var line = function(ctx1, ctx2, that) {
    var canvas1 = ctx1.canvas,
        canvas2 = ctx2.canvas;
    return {
        ing: function (start, end) {
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            ctx2.beginPath();
            ctx2.moveTo(start.left, start.top);
            ctx2.lineTo(end.left, end.top);
            ctx2.stroke();
        },
        end: function (start, end) {
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            var color = ctx1.strokeStyle;
            var lineWidth = ctx1.lineWidth;
            var draw = function () {
                ctx1.save();
                ctx1.strokeStyle = color;
                ctx1.lineWidth = lineWidth;
                ctx1.beginPath();
                ctx1.moveTo(start.left, start.top);
                ctx1.lineTo(end.left, end.top);
                ctx1.stroke();
                ctx1.restore();
            }
            draw();
            that.stack.push(draw);
            that.rstack = [];
        }
    }
};