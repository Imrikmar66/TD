var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EnemiManager = (function (_super) {
    __extends(EnemiManager, _super);
    function EnemiManager() {
        return _super.call(this) || this;
    }
    EnemiManager.prototype.preload = function () {
        ContextManager.getContext().load.atlas('enemi', 'assets/img/enemi.png', 'assets/atlas/character.json');
    };
    EnemiManager.prototype.create = function (point, wave) {
        var enemi = new Enemi(point, 'enemi');
        if (wave)
            enemi.renforce(wave);
        enemi.display();
        this.register(enemi);
        return enemi;
    };
    EnemiManager.prototype.clear = function () {
        for (var _i = 0, _a = this.managed_elements; _i < _a.length; _i++) {
            var model_enemi = _a[_i];
            var enemi = model_enemi;
            if (!enemi.isAlive()) {
                this.removeElement(model_enemi);
            }
        }
    };
    EnemiManager.prototype.getEnemiRangedAt = function (point, range) {
        var enemiList = [];
        for (var _i = 0, _a = this.managed_elements; _i < _a.length; _i++) {
            var model_enemi = _a[_i];
            var enemi = model_enemi;
            var spritePos = model_enemi.getSpritePosition();
            var currentRange = Math.sqrt(Math.pow((spritePos.x - point.x), 2) + Math.pow((spritePos.y - point.y), 2));
            if (currentRange <= range)
                enemiList.push(enemi);
        }
        return enemiList;
    };
    EnemiManager.getInstance = function () {
        if (EnemiManager.instance == null) {
            EnemiManager.instance = new EnemiManager();
        }
        return EnemiManager.instance;
    };
    return EnemiManager;
}(ComponentManager));
EnemiManager.instance = null;
