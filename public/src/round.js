var round;
(function() {
    var len = util.len;
    round = function(ctx1, ctx2, that) {
        var canvas1 = ctx1.canvas,
            canvas2 = ctx2.canvas;
        return {
            ing: function (start, end) {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                ctx2.beginPath();
                ctx2.arc( start.left + (end.left-start.left)/2, start.top + (end.top-start.top)/2, len(start, end)/2, 0, 2*Math.PI );
                ctx2.stroke();
            },
            end: function (start, end) {
                ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
                var color = ctx1.strokeStyle;
                var lineWidth = ctx1.lineWidth;
                var draw = function () {
                    ctx1.save();
                    ctx1.lineWidth = lineWidth;
                    ctx1.strokeStyle = color;
                    ctx1.beginPath();
                    ctx1.arc( start.left + (end.left-start.left)/2, start.top + (end.top-start.top)/2, len(start, end)/2, 0, 2*Math.PI );
                    ctx1.stroke();
                    ctx1.restore();
                }
                draw();
                that.stack.push(draw);
                that.rstack = [];
            }
        }
    }
})();