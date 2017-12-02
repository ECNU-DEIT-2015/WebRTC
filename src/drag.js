var drag = function(selector, option) {
    var $els = $(selector),
        dragging = option.dragging || $.noop,
        dragend = option.dragend || $.noop,
        dragcontinue = option.dragcontinue || $.noop,
        dragpause = option.dragpause || $.noop,
        dragstart = option.dragstart || $.noop;
    $els.each(function(){
        var mouse = $.proxy(function(e){
            return getMouseOffset(this, e);
        } ,this);
        var $this = $(this);
        var mousestate = {
            down: false
        };
        $this.mousedown(function(e){
            if (mousestate.down == true) {
                //如果鼠标在离开绘图区域后弹起，再次进入绘图区域，不进行重新计算，而是继续之前的绘图
                return false;
            } else {
                mousestate.down = true;
                mousestate.downOffset = mouse(e);
                dragstart.call(this, mousestate.downOffset);
            }

        });
        $this.mouseup(function(e){
            mousestate.down = false;
            if(mousestate.move == true){
                dragend.call(this, mousestate.downOffset, mouse(e));
                mousestate.move = false;
            }
        });
        $this.mouseout(function (e) {
            if(!mousestate.down) return;
            dragpause.call(this, mouse(e));
            mousestate.out = true;
        });
        var move = function(e){
            if(!mousestate.down) return;
            if(mousestate.out === true) {
                //如果鼠标在离开绘图区域后弹起，再次进入绘图区域，不进行重新计算，而是继续之前的绘图
                dragcontinue.call(this, mouse(e));
            }
            mousestate.out = false;
            mousestate.move = true;
            dragging.call(this, mousestate.downOffset, mouse(e));
        }
        $this.mousemove(move);
    });
};