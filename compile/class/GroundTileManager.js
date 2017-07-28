var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var GroundTileManager = (function (_super) {
    __extends(GroundTileManager, _super);
    function GroundTileManager(tileSetImage, w, h) {
        var _this = _super.call(this) || this;
        _this.tileSetImage = tileSetImage;
        _this.tileWidth = w;
        _this.tileHeight = h;
        return _this;
    }
    GroundTileManager.prototype.preload = function () {
    };
    GroundTileManager.prototype.create = function (point, layer, tileIndex, constructible) {
        var groundTile = new GroundTile(layer, tileIndex, point, this.tileWidth, this.tileHeight, constructible);
        this.register(groundTile);
        return groundTile;
    };
    GroundTileManager.prototype.getElementByPoint = function (point) {
        return _super.prototype.getElementByPoint.call(this, point);
    };
    return GroundTileManager;
}(ComponentManager));
