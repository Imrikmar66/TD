var MenuManager = (function () {
    function MenuManager() {
        this.all_menus = [];
    }
    MenuManager.prototype.addMenu = function (menu) {
        this.all_menus.push(menu);
    };
    MenuManager.prototype.getOpens = function () {
        var open_menus = [];
        for (var _i = 0, _a = this.all_menus; _i < _a.length; _i++) {
            var menu = _a[_i];
            if (menu.isOpen())
                open_menus.push(menu);
        }
        return open_menus;
    };
    MenuManager.prototype.getClose = function () {
        var closed_menus = [];
        for (var _i = 0, _a = this.all_menus; _i < _a.length; _i++) {
            var menu = _a[_i];
            if (!menu.isOpen())
                closed_menus.push(menu);
        }
        return closed_menus;
    };
    MenuManager.prototype.atLeastOneOpen = function () {
        return this.getOpens().length > 0;
    };
    MenuManager.prototype.closeAll = function () {
        for (var _i = 0, _a = this.getOpens(); _i < _a.length; _i++) {
            var menu = _a[_i];
            menu.close();
        }
    };
    return MenuManager;
}());
