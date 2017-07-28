var GameMap = (function () {
    function GameMap(tw, th) {
        this.all_layers = [];
        this.tileWidth = tw;
        this.tileHeight = th;
    }
    GameMap.prototype.getTileHeight = function () {
        return this.tileWidth;
    };
    GameMap.prototype.getTileWidth = function () {
        return this.tileHeight;
    };
    GameMap.prototype.getGroundTileManager = function () {
        return this.ground_tiles_manager;
    };
    GameMap.prototype.getCurrentLayer = function () {
        return this.currentLayer;
    };
    GameMap.prototype.getMap = function () {
        return this.map;
    };
    GameMap.prototype.preload = function () {
        ContextManager.getContext().load.image('ground', 'assets/img/ground-layer1.png');
    };
    GameMap.prototype.create = function () {
        this.map = ContextManager.getContext().add.tilemap();
        this.ground = this.map.addTilesetImage('ground', 'ground', this.tileWidth, this.tileHeight);
        this.ground_tiles_manager = new GroundTileManager('ground', this.tileWidth, this.tileHeight);
    };
    GameMap.prototype.putTile = function (tileIndex, x, y, layer) {
        return this.map.putTile(tileIndex, x, y, layer);
    };
    GameMap.prototype.createLayer = function (layerName, tw, th, w, h, main) {
        if (main === void 0) { main = true; }
        var layer = this.map.create(layerName, tw, th, w, h);
        this.all_layers.push(layer);
        if (main)
            this.currentLayer = layer;
        return layer;
    };
    GameMap.prototype.generateLevel = function (level) {
        this.tileMapLayer = this.createLayer(level, 30, 11, this.getTileWidth(), this.getTileHeight());
        this.tileMapLayer.resizeWorld();
        this.tileMapLayer.inputEnabled = true;
    };
    GameMap.prototype.generate = function (layer) {
        var the_layer;
        if (typeof layer == "string")
            the_layer = this.getLayerByName(layer);
        else
            the_layer = layer;
        if (!the_layer)
            throw new Error("Layer " + layer + " does not exist");
        for (var i = 0; i < the_layer.map.width; i++) {
            for (var y = 0; y < the_layer.map.height; y++) {
                var tileIndex = void 0;
                var constructible = void 0;
                if (y == Math.floor(the_layer.map.height / 2)) {
                    tileIndex = 1;
                    constructible = false;
                }
                else {
                    tileIndex = 0;
                    constructible = true;
                }
                var point = new Phaser.Point(i, y);
                var tile = this.ground_tiles_manager.create(point, the_layer, tileIndex, constructible);
                this.map.putTile(tile.getPhaserTile(), i, y);
            }
        }
    };
    GameMap.prototype.getLayerByName = function (layerName) {
        for (var _i = 0, _a = this.all_layers; _i < _a.length; _i++) {
            var layer = _a[_i];
            if (layer.name == layerName) {
                return layer;
            }
        }
        return null;
    };
    return GameMap;
}());
