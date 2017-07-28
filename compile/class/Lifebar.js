var Lifebar = (function () {
    function Lifebar(x, y) {
        this.percent = 100;
        this.graphics = new Phaser.Graphics(ContextManager.getContext());
        this.maxW = 32;
        this.maxH = 2;
        this.w = this.maxW;
        this.h = this.maxH;
        this.x = x;
        this.y = y;
        this.display();
    }
    Lifebar.prototype.setPercent = function (value) {
        var x = this.x;
        var y = this.y;
        this.percent = value;
        this.graphics.clear();
        this.w = Math.floor((value * this.maxW) / 100);
        this.display();
    };
    Lifebar.prototype.getGraphics = function () {
        return this.graphics;
    };
    Lifebar.prototype.display = function () {
        this.graphics.lineStyle(2, 0x42f45f, 1);
        this.graphics.beginFill(0x42f45f);
        this.graphics.drawRect(this.x, this.y, this.w, this.h);
        this.graphics.endFill();
    };
    return Lifebar;
}());
