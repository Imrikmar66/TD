var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AnimationEnemi;
(function (AnimationEnemi) {
    AnimationEnemi[AnimationEnemi["WALK_LEFT"] = 0] = "WALK_LEFT";
    AnimationEnemi[AnimationEnemi["WALK_RIGHT"] = 1] = "WALK_RIGHT";
})(AnimationEnemi || (AnimationEnemi = {}));
;
var Enemi = (function (_super) {
    __extends(Enemi, _super);
    function Enemi(position, model, speed, name) {
        var _this = _super.call(this, position, model) || this;
        _this.name = name;
        _this.speed = speed ? speed : 1500;
        _this.currentSpeed = _this.speed;
        _this.max_lifePoints = 100;
        _this.lifePoints = 100;
        _this.alive = true;
        _this.reward = 2;
        _this.entity = ContextManager.getContext().add.group();
        return _this;
    }
    Enemi.prototype.getLifePoints = function () {
        return this.lifePoints;
    };
    Enemi.prototype.getSpritePosition = function () {
        return this.entity.position;
    };
    Enemi.prototype.isAlive = function () {
        return this.alive;
    };
    Enemi.prototype.isSlow = function () {
        return this.currentSpeed > this.speed;
    };
    Enemi.prototype.display = function () {
        var map = ContextManager.getCurrentMap();
        this.entity.x = this.position.x * map.getTileWidth();
        this.entity.y = this.position.y * map.getTileWidth();
        this.sprite = this.entity.create(0, 0, this.model, this._frame);
        this.sprite.animations.add('walk_left', [4, 5, 6, 5]);
        this.sprite.animations.add('walk_right', [6, 7, 8, 7]);
        this.lifebar = new Lifebar(0, -10);
        this.entity.add(this.lifebar.getGraphics());
    };
    Enemi.prototype.playAnimation = function (animation) {
        switch (animation) {
            case AnimationEnemi.WALK_LEFT:
                this.sprite.animations.play('walk_left', 5, true);
                break;
            case AnimationEnemi.WALK_RIGHT:
                this.sprite.animations.play('walk_right', 5, true);
                break;
            default: break;
        }
    };
    Enemi.prototype.walk = function () {
        var game = ContextManager.getContext();
        var map = ContextManager.getCurrentMap();
        if (this.tween)
            this.tween.stop;
        this.tween = game.add.tween(this.entity);
        var timeForWalkOneTile = (game.width / map.getTileWidth()) * this.currentSpeed;
        this.tween.to({ x: game.world.width }, timeForWalkOneTile, Phaser.Easing.Linear.None, true);
    };
    Enemi.prototype.renforce = function (value) {
        this.max_lifePoints += 50 * value;
        this.lifePoints += 50 * value;
    };
    Enemi.prototype.isHit = function (damage) {
        this.lifePoints -= damage;
        if (this.lifePoints <= 0)
            this.die();
        else {
            this.lifebar.setPercent(Math.floor(this.lifePoints * 100 / this.max_lifePoints));
        }
    };
    Enemi.prototype.slow = function (value, slowTime) {
        this.currentSpeed = this.speed + value;
        ContextManager.getContext().time.events.add(slowTime, this.endSlow, this);
        this.walk();
    };
    Enemi.prototype.endSlow = function () {
        this.currentSpeed = this.speed;
        this.walk();
    };
    Enemi.prototype.die = function () {
        ContextManager.getPlayer().gainGold(this.reward);
        this.alive = false;
        this.entity.destroy();
    };
    return Enemi;
}(Model));
