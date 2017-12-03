var DrawBoard;
(function() {
    var ident = function() {
        return false;
    };
    /**
     * 为canvas添加绘图功能
     * @param canvas1和canvas2是两个重叠的canvas标签 canvas2在canvas1上面
     * 对于ie，不支持canvas，canvas1和canvas2是excanvas初始化的canvas对象
     */
    DrawBoard = function(option) {
        var that = this;
        this.option = option || {};
        this.type = option.type || 'rect';
        this.lineWidth = option.lineWidth || 1;
        this.color = option.color || 'rgb(0, 0, 0)'
        this.stack = []; this.rstack = [];
        var canvas1 = this.canvas1 = document.createElement('canvas'), $canvas1 = this.$canvas1 = $(canvas1),
            canvas2 = this.canvas2 = document.createElement('canvas'), $canvas2 = this.$canvas2 = $(canvas2),
            $canvases = $canvas1.add($canvas2),
            $con = $('<div></div>').append($canvas1, $canvas2);

        $con.css({ width: option.width, height: option.height, position: 'relative' });
        canvas1.width = canvas2.width = option.width;
        canvas1.height = canvas2.height = option.height;
        $canvases.css({ position: 'absolute', left: 0, top: 0 });
        $con.appendTo(option.parent);
        if (!canvas1.getContext) {
            if(window.G_vmlCanvasManager){
                canvas1=window.G_vmlCanvasManager.initElement(canvas1);
                canvas2=window.G_vmlCanvasManager.initElement(canvas2);
            } else {
                alert('对不起，您的浏览器不支持canvas!');
            }
        }
        var ctx1 = this.ctx1 = canvas1.getContext('2d');
        var ctx2 = this.ctx2 = canvas2.getContext('2d');
        var option = option || {
            clearBt: null, //清除按钮
            saveBt : null //保存按钮
        };
        ctx1.save();
        ctx2.strokeStyle = this.color;
        ctx1.strokeStyle = this.color;
        ctx2.lineWidth = this.lineWidth;
        ctx1.lineWidth = this.lineWidth;
        var mouse = {};
        $(canvas2).mousemove(function(e){
            mouse = getMouseOffset($(canvas2).get(0), e);
        });
        var draw = {};
        draw.rect = rect(ctx1, ctx2, that);
        draw.round = round(ctx1, ctx2, that);
        draw.line = line(ctx1, ctx2, that);
        draw.ease = ease(ctx1, ctx2, that);
        draw.curve = curve(ctx1, ctx2, that);

        ctx1.canvas = canvas1;
        ctx2.canvas = canvas2;
        draw.arrow = arrow(ctx1, ctx2, that);
        drag(canvas2, {
            dragstart: function (position) {
                that.refuseSelection();
                (draw[that.type].start || $.noop)(position);
            },
            dragcontinue: function (position) {
                that.refuseSelection();
                (draw[that.type]["continue"] || $.noop)(position);
            },
            dragpause: function (position) {
                that.allowSelection();
                (draw[that.type].pause || $.noop)(position);
            },
            dragging: function (start, end) {
                draw[that.type].ing(start, end);
            },
            dragend: function (start, end) {
                draw[that.type].end(start, end);
                that.allowSelection();
            }
        });
    };
    DrawBoard.prototype = {
        //撤消
        back: function () {
            this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
            var pop = this.stack.pop();
            if (pop) {
                this.rstack.push(pop);
            }
            this.drawStack();
        },
        //重做
        forward: function () {
            this.ctx1.clearRect(0, 0, this.canvas1.width, this.canvas1.height);
            var pop = this.rstack.pop();
            if (pop) {
                this.stack.push(pop);
            }
            this.drawStack();
        },
        //重绘
        drawStack: function () {
            $.each(this.stack, function () {
                this && this();
            });
        },
        setColor: function (color) {
            this.color = this.ctx1.strokeStyle = this.ctx2.strokeStyle = color;
        },
        setLineWidth: function (lineWidth) {
            this.lineWidth = this.ctx1.lineWidth = this.ctx2.lineWidth = lineWidth;
        },
        refuseSelection: function () {
            $('body').attr('unselectable','on').css({
                '-webkit-user-select': 'none', /* Chrome all / Safari all */
                '-moz-user-select': 'none',     /* Firefox all */
                '-ms-user-select': 'none',      /* IE 10+ */
                /* No support for these yet, use at own risk */
                '-o-user-select': 'none',
                'user-select': 'none'
            }).bind('selectstart', ident);
            this.clearSelection();
        },
        allowSelection: function () {
            $('body').attr('unselectable', 'off').css({
                '-webkit-user-select': 'auto', /* Chrome all / Safari all */
                '-moz-user-select': 'auto',     /* Firefox all */
                '-ms-user-select': 'auto',      /* IE 10+ */
                /* No support for these yet, use at own risk */
                '-o-user-select': 'auto',
                'user-select': 'auto'
            }).unbind('selectstart', ident);
        },
        clearSelection: function () {
            if (document.selection) {
                document.selection.empty();
            } else if (window.getSelection) {
                window.getSelection().removeAllRanges();
            }
        },
        clear: function () {
            var that = this,
                canvas2 = this.canvas2;
            var draw = function () {
                that.ctx1.clearRect(0, 0, canvas2.width, canvas2.height);
                that.rstack = [];
            }
            draw();
            this.stack.push(draw);
        },
        save: function(el) {
            if (!window.getComputedStyle) { alert('您的浏览器不支持'); return; }
            if (!window.html2canvas) {
                alert('没有引入 html2canvas.js ，不支持保存绘图功能');
            }
            var data;
            html2canvas($(el)[0] || $(this.option.parent)[0], {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL('image/jpeg');
                    var w = window.open();
                    $(w.document.body).append('<img src="'+data+'" />');
                    w.document.title = '保存绘图';
                }
            });
        }
    }
})();