class GameMap implements IComponentManager{

  private all_layers: Array<Phaser.TilemapLayer> = [];
  private currentLayer: Phaser.TilemapLayer;
  private ground_tiles_manager: GroundTileManager;

  private map: Phaser.Tilemap;
  private tileMapLayer: Phaser.TilemapLayer;
  private ground: Phaser.Tileset;
  private tileWidth: number;
  private tileHeight: number;

 /* Getters */
  public getTileHeight(): number {
    return this.tileWidth;
  }

  public getTileWidth(): number {
      return this.tileHeight;
  }

  public getGroundTileManager(): GroundTileManager {
      return this.ground_tiles_manager;
  }

  public getCurrentLayer(): Phaser.TilemapLayer {
      return this.currentLayer;
  }

  public getMap(): Phaser.Tilemap {
      return this.map;
  }

  constructor(tw: number, th: number){
    this.tileWidth = tw;
    this.tileHeight = th;
  }

  public preload(){
    ContextManager.getContext().load.image('ground', 'assets/img/ground-layer1.png');
  }

  public create(){
    //add a tileset whose name is ground, with preloaded ground image, sprite are 64 x 64
    this.map = ContextManager.getContext().add.tilemap();
    this.ground = this.map.addTilesetImage('ground', 'ground', this.tileWidth, this.tileHeight);
    this.ground_tiles_manager = new GroundTileManager('ground', this.tileWidth, this.tileHeight);
  }

  public putTile(tileIndex: number, x: number, y: number, layer: Phaser.TilemapLayer): Phaser.Tile {
    return this.map.putTile(tileIndex, x, y, layer);
  }

  public createLayer(layerName: string, tw: number, th:number, w: number, h:number, main = true): Phaser.TilemapLayer {
    var layer: Phaser.TilemapLayer = this.map.create(layerName, tw, th, w, h);
    this.all_layers.push(layer);
    if(main)
        this.currentLayer = layer;
    return layer;
  }

  public generateLevel(level:string){
    this.tileMapLayer = this.createLayer(level, 30, 11, this.getTileWidth(), this.getTileHeight());
    this.tileMapLayer.resizeWorld();
    this.tileMapLayer.inputEnabled = true;
  }

  public generate(layer: string|Phaser.TilemapLayer){

    var the_layer: Phaser.TilemapLayer;

    if(typeof layer == "string")
      the_layer = this.getLayerByName(layer);
    else
      the_layer = layer;

    if (!the_layer)
      throw new Error("Layer " + layer + " does not exist");

    for(let i = 0; i < the_layer.map.width; i++){

      for(let y = 0; y < the_layer.map.height; y++){

        let tileIndex: number;
        let constructible: boolean;

        if( y == Math.floor(the_layer.map.height / 2)){
          tileIndex = 1;
          constructible = false;
        }
        else{
          tileIndex = 0;
          constructible = true;
        }

        //tilemap put tile in the world :)
        let point: Phaser.Point = new Phaser.Point(i, y);
        let tile:GroundTile = this.ground_tiles_manager.create(point, the_layer, tileIndex, constructible);
        this.map.putTile(tile.getPhaserTile(), i, y);
      }

    }
  }

  private getLayerByName(layerName: string): Phaser.TilemapLayer {
    for(let layer of this.all_layers){
      if (layer.name == layerName){
        return layer;
      }
    }
    return null;
  }

}
