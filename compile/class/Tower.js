var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Tower = (function (_super) {
    __extends(Tower, _super);
    function Tower(position, model, name) {
        var _this = _super.call(this, position, model) || this;
        _this.name = name;
        _this.range = 100;
        _this.damage = 1;
        _this.step = 0;
        _this.fireRate = 60;
        _this._frame = "base";
        _this.maxStep = 2;
        _this.firingCounter = 0;
        return _this;
    }
    Tower.prototype.upgradeCost = function () {
        var price = 0;
        switch (this.step) {
            case 0:
                price = 10;
                break;
            case 1:
                price = 20;
                break;
            default: 10;
        }
        return price;
    };
    Tower.prototype.display = function (layer) {
        this.sprite = layer.create(0, 0, this.model, this._frame);
        this.refreshPosition();
        this.sprite.inputEnabled = true;
        this.sprite.anchor.set(0, 0);
    };
    Tower.prototype.refreshPosition = function () {
        var map = ContextManager.getCurrentMap();
        this.sprite.position.set(this.position.x * map.getTileWidth() + map.getTileWidth() / 2 - this.sprite.width / 2, this.position.y * map.getTileHeight() + (map.getTileHeight() - this.sprite.height));
    };
    Tower.prototype.upgrade = function () {
        if (!ContextManager.getPlayer().canPay(this.upgradeCost())) {
            ContextManager.getContext().debug.text("Not enought money", 20, 40);
            return;
        }
        if (!this.canUpgrade())
            return;
        ContextManager.getPlayer().pay(this.upgradeCost());
        var newFrame;
        switch (this.sprite.frameName) {
            case "base":
                newFrame = "medium";
                break;
            case "medium":
                newFrame = "hight";
                break;
            case "hight":
                return;
            default:
                throw new Error("Unknow frameName: " + this.sprite.frameName);
        }
        this.frame = newFrame;
        this.step++;
        this.refreshPosition();
    };
    Tower.prototype.canUpgrade = function () {
        return this.step < this.maxStep;
    };
    Tower.prototype.isRanged = function (enemi) {
        var towerPos = this.getSpritePosition();
        var enemiPos = enemi.getSpritePosition();
        var range = Math.sqrt(Math.pow((towerPos.x - enemiPos.x), 2) + Math.pow((towerPos.y - enemiPos.y), 2));
        return range <= this.range;
    };
    Tower.prototype.canFire = function () {
        if (this.firingCounter == 0) {
            this.firingCounter = this.fireRate;
            return true;
        }
        return false;
    };
    Tower.prototype.fireOn = function (enemi) {
        enemi.isHit(this.damage);
    };
    Tower.prototype.update = function () {
        this.firingCounter = (this.firingCounter <= 0) ? 0 : this.firingCounter - 1;
    };
    Tower.prototype.notFiring = function () { };
    return Tower;
}(Model));
