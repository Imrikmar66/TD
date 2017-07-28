var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TOWERTYPE;
(function (TOWERTYPE) {
    TOWERTYPE[TOWERTYPE["SLOW"] = 0] = "SLOW";
    TOWERTYPE[TOWERTYPE["MACHINEGUN"] = 1] = "MACHINEGUN";
    TOWERTYPE[TOWERTYPE["CANON"] = 2] = "CANON";
})(TOWERTYPE || (TOWERTYPE = {}));
var TowerManager = (function (_super) {
    __extends(TowerManager, _super);
    function TowerManager() {
        var _this = _super.call(this) || this;
        _this.towersPrices = {
            MACHINEGUN: 5,
            SLOW: 5,
            CANON: 5
        };
        _this.menu = new TowerMenu();
        return _this;
    }
    TowerManager.prototype.getTowerPrice = function () {
        return this.towersPrices;
    };
    TowerManager.prototype.preload = function () {
        var game = ContextManager.getContext();
        game.load.atlas('machine-tower', 'assets/img/towers.png', 'assets/atlas/tower.json');
        game.load.atlas('slow-tower', 'assets/img/towers-5.png', 'assets/atlas/tower-5.json');
        game.load.atlas('canon-tower', 'assets/img/towers-4.png', 'assets/atlas/tower-4.json');
        game.load.image('arrow', 'assets/img/arrow.png');
        game.load.image('fire', 'assets/img/fire.png');
        game.load.image('bullet', 'assets/img/bullet.png');
        game.load.spritesheet('snowflakes', 'assets/img/snowflakes.png', 17, 17);
        game.load.spritesheet('explosion', 'assets/img/explosion.png', 64, 64, 7);
        this.menu.preload();
    };
    TowerManager.prototype.create = function (point, towerType) {
        var tower;
        if (tower = this.getElementByPoint(point)) {
            return tower;
        }
        switch (towerType) {
            case TOWERTYPE.MACHINEGUN:
            default:
                if (ContextManager.getPlayer().canPay(this.towersPrices.MACHINEGUN)) {
                    ContextManager.getPlayer().pay(this.towersPrices.MACHINEGUN);
                    tower = new MachinegunTower(point, 'machine-tower');
                }
                else
                    return null;
                break;
            case TOWERTYPE.SLOW:
                if (ContextManager.getPlayer().canPay(this.towersPrices.SLOW)) {
                    ContextManager.getPlayer().pay(this.towersPrices.SLOW);
                    tower = new SlowTower(point, 'slow-tower');
                }
                else
                    return null;
                break;
            case TOWERTYPE.CANON:
                if (ContextManager.getPlayer().canPay(this.towersPrices.CANON)) {
                    ContextManager.getPlayer().pay(this.towersPrices.CANON);
                    tower = new CanonTower(point, 'canon-tower');
                }
                else
                    return null;
                break;
        }
        tower.display(this.layer);
        tower.getSprite().events.onInputDown.add(this.menu.openMenu, this.menu, 0, tower);
        ContextManager.getCurrentMap().getGroundTileManager().getElementByPoint(point).setConstructible(false);
        this.register(tower);
        return tower;
    };
    TowerManager.prototype.updates = function () {
        for (var _i = 0, _a = this.managed_elements; _i < _a.length; _i++) {
            var tower_model = _a[_i];
            var tower = tower_model;
            tower.update();
        }
    };
    TowerManager.getInstance = function () {
        if (TowerManager.instance == null) {
            TowerManager.instance = new TowerManager();
        }
        return TowerManager.instance;
    };
    return TowerManager;
}(ComponentManager));
TowerManager.instance = null;
