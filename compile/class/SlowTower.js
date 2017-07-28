var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var SlowTower = (function (_super) {
    __extends(SlowTower, _super);
    function SlowTower(position, model, name) {
        var _this = _super.call(this, position, model, name) || this;
        _this.fireRate = 30;
        _this.slowPower = 1000;
        _this.slowTime = 1000;
        return _this;
    }
    SlowTower.prototype.upgrade = function () {
        _super.prototype.upgrade.call(this);
        this.range += 100;
        this.slowTime += 1000;
    };
    SlowTower.prototype.renderFire = function (point) {
        var game = ContextManager.getContext();
        var graphics = game.add.graphics(0, 0);
        graphics.beginFill();
        graphics.moveTo(this.sprite.position.x + 18, this.sprite.position.y);
        graphics.lineStyle(1, 0x4dc7df, 1);
        graphics.lineTo(point.x + 16, point.y);
        graphics.endFill();
        var emitter = game.add.emitter(point.x + 16, point.y + 16);
        emitter.makeParticles('snowflakes', 10);
        emitter.gravity = 10;
        emitter.maxParticleSpeed.setTo(10, 10);
        emitter.start(true, 500, null, 10);
        emitter.forEachAlive(function (p) {
            var tween = game.add.tween(p);
            tween.to({ alpha: 0 }, 500, Phaser.Easing.Linear.None, true);
        }, emitter);
        game.time.events.add(50, function () {
            graphics.clear();
        });
    };
    SlowTower.prototype.fireOn = function (enemi) {
        this.renderFire(enemi.getSpritePosition());
        enemi.slow(this.slowPower, this.slowTime);
    };
    return SlowTower;
}(Tower));
