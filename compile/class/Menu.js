var Menu = (function () {
    function Menu() {
        this.open = false;
        ContextManager.getMenus().addMenu(this);
    }
    Menu.prototype.isOpen = function () {
        return this.open;
    };
    Menu.prototype.preload = function () { };
    Menu.prototype.openMenu = function (context, pointer, element, options) {
        var menuManager = ContextManager.getMenus();
        if (ContextManager.getMenus().atLeastOneOpen())
            menuManager.closeAll();
        var game = ContextManager.getContext();
        var layer = ContextManager.getCurrentMap().getCurrentLayer();
        var x = game.input.activePointer.x + game.camera.x;
        var y = game.input.activePointer.y + game.camera.y;
        var coord = layer.getTileXY(x, y, new Phaser.Point());
        if (this.create(coord, element))
            this.open = true;
    };
    Menu.prototype.create = function (point) {
        var opts = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            opts[_i - 1] = arguments[_i];
        }
        if (this.menu)
            return false;
        return true;
    };
    Menu.prototype.close = function () {
        this.open = false;
        this.menu.destroy();
        this.menu = null;
    };
    return Menu;
}());
