var curve = function(ctx1, ctx2, that) {
    var canvas1 = ctx1.canvas,
        canvas2 = ctx2.canvas;
    var points = [];
    return {
        start: function (position) {
            ctx2.beginPath();
            ctx2.lineJoin = 'round';
            ctx2.moveTo(position.left, position.top);
            points.push(position);
        },
        ing: function (start, end) {
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            ctx2.lineTo(end.left, end.top);
            points.push(end);
            ctx2.stroke();
        },
        end: function () {
            ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
            //回退或前进功能中重绘时会重新读取该数组，而points是动态变化的，所以拷贝一份出来
            var stackPoints = points.slice(0);
            var color = ctx1.strokeStyle;
            var lineWidth = ctx1.lineWidth;
            var draw = function () {
                ctx1.save();
                ctx1.strokeStyle = color;
                ctx1.lineWidth = lineWidth;
                ctx1.beginPath();
                $.each(stackPoints, function(i, p){
                    if (i===0) {
                        ctx1.moveTo(p.left, p.top);
                    } else {
                        ctx1.lineTo(p.left, p.top);
                    }
                });
                ctx1.stroke();
                ctx1.restore();
            }
            draw();
            that.stack.push(draw);
            that.rstack = [];
            points = [];
        }
    };
};