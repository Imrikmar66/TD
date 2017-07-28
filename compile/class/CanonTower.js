var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var CanonTower = (function (_super) {
    __extends(CanonTower, _super);
    function CanonTower(position, model, name) {
        var _this = _super.call(this, position, model, name) || this;
        _this.fireRate = 120;
        _this.damage = 50;
        _this.radius = 64;
        return _this;
    }
    CanonTower.prototype.upgrade = function () {
        _super.prototype.upgrade.call(this);
        this.radius += 64;
        this.damage += this.step * 25;
    };
    CanonTower.prototype.display = function (layer) {
        _super.prototype.display.call(this, layer);
    };
    CanonTower.prototype.renderFire = function (point) {
        var game = ContextManager.getContext();
        var bullet = game.add.sprite(this.sprite.x, this.sprite.y, "bullet");
        var tween = game.add.tween(bullet);
        tween.to({ x: point.x + 32, y: point.y + 32 }, 500, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function (bullet) {
            var canon = this;
            bullet.destroy();
            canon.renderExplode(bullet.position);
        }, this);
    };
    CanonTower.prototype.renderExplode = function (point) {
        var explosion = ContextManager.getContext().add.sprite(point.x, point.y, 'explosion');
        var scale = new Phaser.Point(explosion.scale.x * (1 + 0.5 * this.step), explosion.scale.y * (1 + 0.5 * this.step));
        var position = new Phaser.Point(point.x - explosion.width / 2 * (1 + 0.5 * this.step), point.y - explosion.height / 2 * (1 + 0.5 * this.step));
        explosion.scale = scale;
        explosion.position = position;
        var explode = explosion.animations.add('explode');
        explode.onComplete.add(function () {
            explosion.destroy();
        }, this);
        explosion.play('explode', 20);
        for (var _i = 0, _a = EnemiManager.getInstance().getEnemiRangedAt(point, this.radius); _i < _a.length; _i++) {
            var enemi = _a[_i];
            _super.prototype.fireOn.call(this, enemi);
        }
    };
    CanonTower.prototype.fireOn = function (enemi) {
        this.renderFire(enemi.getSpritePosition());
    };
    return CanonTower;
}(Tower));
