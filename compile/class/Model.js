var Model = (function () {
    function Model(position, model) {
        this.position = new Phaser.Point();
        this._frame = 0;
        this.id = (Model.last_id++);
        this.position = position;
        this.model = model;
    }
    Object.defineProperty(Model.prototype, "frame", {
        set: function (frame) {
            this._frame = frame;
            if (typeof frame == "number") {
                this.sprite.frame = frame;
            }
            else {
                this.sprite.frameName = frame;
            }
        },
        enumerable: true,
        configurable: true
    });
    Model.prototype.getId = function () {
        return this.id;
    };
    Model.prototype.getSpritePosition = function () {
        return new Phaser.Point(this.sprite.x, this.sprite.y);
    };
    Model.prototype.getPosition = function (sprite) {
        return this.position;
    };
    Model.prototype.getSprite = function () {
        return this.sprite;
    };
    Model.prototype.getClassName = function () {
        return this.constructor.name;
    };
    return Model;
}());
Model.last_id = 1;
