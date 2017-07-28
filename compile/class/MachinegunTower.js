var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var MachinegunTower = (function (_super) {
    __extends(MachinegunTower, _super);
    function MachinegunTower(position, model, name) {
        var _this = _super.call(this, position, model) || this;
        _this.fireRate = 2;
        return _this;
    }
    MachinegunTower.prototype.display = function (layer) {
        var map = ContextManager.getCurrentMap();
        _super.prototype.display.call(this, layer);
        this.fireSprite = layer.create(this.position.x * map.getTileWidth() + 5, this.position.y * map.getTileHeight() + 26, 'fire', 0);
        this.fireSprite.anchor.set(0, 0);
        this.fireSprite.alpha = 0;
        this.fireSprite2 = layer.create(this.position.x * map.getTileWidth() + 5, this.position.y * map.getTileHeight() + 26, 'fire', 0);
        this.fireSprite2.anchor.set(0, 0);
        this.fireSprite2.alpha = 0;
    };
    MachinegunTower.prototype.upgrade = function () {
        _super.prototype.upgrade.call(this);
        this.damage += this.step;
    };
    MachinegunTower.prototype.setFireByTopLeft = function () {
        switch (this.step) {
            case 0:
            case 1:
            default:
                this.setFireRender(8, 12, 135);
                break;
            case 2:
                this.setDoubleFireRender(8, 12, 15, 6, 135);
                break;
        }
    };
    MachinegunTower.prototype.setFireByTopRight = function () {
        switch (this.step) {
            case 0:
            case 1:
            default:
                this.setFireRender(24, 17, -135);
                break;
            case 2:
                this.setDoubleFireRender(33, 12, 22, 8, -135);
                break;
        }
    };
    MachinegunTower.prototype.setFireByBottomLeft = function () {
        switch (this.step) {
            case 0:
            case 1:
            default:
                this.setFireRender(5, 26, 45);
                break;
            case 2:
                this.setDoubleFireRender(5, 22, 10, 25, 45);
                break;
        }
    };
    MachinegunTower.prototype.setFireByBottomRight = function () {
        switch (this.step) {
            case 0:
            case 1:
            default:
                this.setFireRender(22, 32, -45);
                break;
            case 2:
                this.setDoubleFireRender(22, 32, 28, 28, -45);
                break;
        }
    };
    MachinegunTower.prototype.setFireRender = function (x, y, angle) {
        this.fireSprite.x = this.sprite.x + x;
        this.fireSprite.y = this.sprite.y + y;
        this.fireSprite.angle = angle;
        this.fireSprite.alpha = 1;
    };
    MachinegunTower.prototype.setDoubleFireRender = function (x1, y1, x2, y2, angle) {
        this.setFireRender(x1, y1, angle);
        this.fireSprite2.x = this.sprite.x + x2;
        this.fireSprite2.y = this.sprite.y + y2;
        this.fireSprite2.angle = angle;
        this.fireSprite2.alpha = 1;
    };
    MachinegunTower.prototype.fireOn = function (enemi) {
        if (enemi.getSpritePosition().y > this.sprite.y) {
            if (enemi.getSpritePosition().x < this.sprite.x)
                this.setFireByBottomLeft();
            else
                this.setFireByBottomRight();
        }
        else {
            if (enemi.getSpritePosition().x < this.sprite.x)
                this.setFireByTopLeft();
            else
                this.setFireByTopRight();
        }
        _super.prototype.fireOn.call(this, enemi);
    };
    MachinegunTower.prototype.notFiring = function () {
        this.fireSprite.alpha = 0;
        this.fireSprite2.alpha = 0;
    };
    return MachinegunTower;
}(Tower));
