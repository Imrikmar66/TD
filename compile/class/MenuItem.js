var MenuItem = (function () {
    function MenuItem(point, sprite, text, textstyles) {
        var game = ContextManager.getContext();
        this.group = game.add.group();
        this.group.x = point.x;
        this.group.y = point.y;
        this.sprite = this.group.create(0, 0, sprite);
        this.sprite.anchor.set(0, 0);
        this.sprite.inputEnabled = true;
        this.text = new Phaser.Text(game, 0, 0, text.toString(), textstyles);
        this.group.add(this.text);
    }
    MenuItem.prototype.getGroup = function () {
        return this.group;
    };
    MenuItem.prototype.animateTop = function () {
        var game = ContextManager.getContext();
        var tween_item1 = game.add.tween(this.group);
        var map = ContextManager.getCurrentMap();
        var h = map.getTileHeight();
        tween_item1.to({ y: this.group.y - h }, 500, Phaser.Easing.Elastic.Out, true);
    };
    MenuItem.prototype.animateBottom = function () {
        var game = ContextManager.getContext();
        var tween_item1 = game.add.tween(this.group);
        var map = ContextManager.getCurrentMap();
        var h = map.getTileHeight();
        tween_item1.to({ y: this.group.y + h }, 500, Phaser.Easing.Elastic.Out, true);
    };
    MenuItem.prototype.animateLeft = function () {
        var game = ContextManager.getContext();
        var tween_item1 = game.add.tween(this.group);
        var map = ContextManager.getCurrentMap();
        var w = map.getTileWidth();
        tween_item1.to({ x: this.group.x - w }, 500, Phaser.Easing.Elastic.Out, true);
    };
    MenuItem.prototype.animateRight = function () {
        var game = ContextManager.getContext();
        var tween_item1 = game.add.tween(this.group);
        var map = ContextManager.getCurrentMap();
        var w = map.getTileWidth();
        tween_item1.to({ x: this.group.x + w }, 500, Phaser.Easing.Elastic.Out, true);
    };
    MenuItem.prototype.animateFadeOut = function () {
        var game = ContextManager.getContext();
        var map = ContextManager.getCurrentMap();
        var h = map.getTileHeight();
        this.group.alpha = 0;
        var tween_item = game.add.tween(this.group);
        tween_item.to({ y: this.group.y - h, alpha: 1 }, 500, Phaser.Easing.Cubic.Out, true);
    };
    return MenuItem;
}());
