var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GroundTile = (function (_super) {
    __extends(GroundTile, _super);
    function GroundTile(layer, tileIndex, point, w, h, constructible) {
        var _this = _super.call(this, point, '') || this;
        _this.tile = new Phaser.Tile(layer, tileIndex, point.x, point.y, w, h);
        _this.constructible = constructible;
        return _this;
    }
    GroundTile.prototype.isConstructible = function () {
        return this.constructible;
    };
    GroundTile.prototype.setConstructible = function (value) {
        this.constructible = value;
    };
    GroundTile.prototype.getPhaserTile = function () {
        return this.tile;
    };
    GroundTile.prototype.display = function () { };
    return GroundTile;
}(Model));
