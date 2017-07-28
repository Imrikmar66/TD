var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TowerMenu = (function (_super) {
    __extends(TowerMenu, _super);
    function TowerMenu() {
        return _super.apply(this, arguments) || this;
    }
    TowerMenu.prototype.preload = function () {
        ContextManager.getContext().load.image('item-upgrade', 'assets/img/upgrade.png');
    };
    TowerMenu.prototype.create = function (point, tower) {
        if (!_super.prototype.create.call(this, point) || !tower.canUpgrade())
            return false;
        var game = ContextManager.getContext();
        var map = ContextManager.getCurrentMap();
        var w = map.getTileWidth();
        var h = map.getTileHeight();
        var thePoint = new Phaser.Point(point.x, point.y);
        thePoint.x *= w;
        thePoint.y *= h;
        this.menu = game.add.group();
        this.itemUpgrade = new MenuItem(thePoint, 'item-upgrade', tower.upgradeCost() + "c", { font: "15px Arial", fontWeight: "bold", fill: "#000" });
        this.itemUpgrade.getGroup().onChildInputDown.add(this.select, this, 0, tower);
        this.itemUpgrade.animateFadeOut();
        this.menu.add(this.itemUpgrade.getGroup());
        return true;
    };
    TowerMenu.prototype.select = function (event, pointer, tower) {
        tower.upgrade();
        this.close();
    };
    return TowerMenu;
}(Menu));
