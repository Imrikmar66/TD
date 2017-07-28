var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BuildMenu = (function (_super) {
    __extends(BuildMenu, _super);
    function BuildMenu() {
        return _super.apply(this, arguments) || this;
    }
    BuildMenu.prototype.preload = function () {
        ContextManager.getContext().load.image('item-1', 'assets/img/menu-item-1.png');
        ContextManager.getContext().load.image('item-2', 'assets/img/menu-item-2.png');
        ContextManager.getContext().load.image('item-3', 'assets/img/menu-item-3.png');
    };
    BuildMenu.prototype.create = function (point, towerManager) {
        if (!_super.prototype.create.call(this, point))
            return false;
        var game = ContextManager.getContext();
        var map = ContextManager.getCurrentMap();
        var groundTile = map.getGroundTileManager().getElementByPoint(point);
        if (!groundTile.isConstructible())
            return false;
        var w = map.getTileWidth();
        var h = map.getTileHeight();
        var thePoint = new Phaser.Point(point.x, point.y);
        thePoint.x *= w;
        thePoint.y *= h;
        this.menu = game.add.group();
        this.item1 = new MenuItem(thePoint, 'item-1', towerManager.getTowerPrice().MACHINEGUN + "c", { font: "15px Arial", fontWeight: "bold", fill: "#000" });
        this.item1.getGroup().onChildInputDown.add(this.select, this, 0, towerManager, point);
        this.item1.animateTop();
        this.item2 = new MenuItem(thePoint, 'item-2', towerManager.getTowerPrice().SLOW + "c", { font: "15px Arial", fontWeight: "bold", fill: "#000" });
        this.item2.getGroup().onChildInputDown.add(this.select, this, 0, towerManager, point);
        this.item2.animateRight();
        this.item3 = new MenuItem(thePoint, 'item-3', towerManager.getTowerPrice().CANON + "c", { font: "15px Arial", fontWeight: "bold", fill: "#000" });
        this.item3.getGroup().onChildInputDown.add(this.select, this, 0, towerManager, point);
        this.item3.animateBottom();
        this.menu.add(this.item1.getGroup());
        this.menu.add(this.item2.getGroup());
        this.menu.add(this.item3.getGroup());
        return true;
    };
    BuildMenu.prototype.select = function (event, pointer, element, position) {
        var map = ContextManager.getCurrentMap();
        var groundTile = map.getGroundTileManager().getElementByPoint(position);
        if (groundTile.isConstructible()) {
            if (event.key == "item-1") {
                element.create(position, TOWERTYPE.MACHINEGUN);
            }
            else if (event.key == "item-2") {
                element.create(position, TOWERTYPE.SLOW);
            }
            else if (event.key == "item-3") {
                element.create(position, TOWERTYPE.CANON);
            }
        }
        this.close();
    };
    return BuildMenu;
}(Menu));
