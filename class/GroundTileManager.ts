class GroundTileManager extends ComponentManager {

  private tileSetImage: string;
  private tileWidth: number;
  private tileHeight: number;

  constructor(tileSetImage: string, w: number, h: number){
    super();
    this.tileSetImage = tileSetImage;
    this.tileWidth = w;
    this.tileHeight = h;
  }

  preload(){

  }

  create(point: Phaser.Point, layer:string|Phaser.TilemapLayer, tileIndex: number, constructible: boolean): GroundTile {
    let groundTile: GroundTile = new GroundTile(
      layer,
      tileIndex,
      point,
      this.tileWidth,
      this.tileHeight,
      constructible
    );

    this.register(groundTile);

    return groundTile;
  }

  getElementByPoint(point: Phaser.Point): GroundTile {
    return <GroundTile> super.getElementByPoint(point);
  }

}
