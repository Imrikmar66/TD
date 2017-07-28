class GroundTile extends Model {

    private tile: Phaser.Tile;
    private constructible: boolean;

    isConstructible(): boolean{
      return this.constructible;
    }

    setConstructible(value: boolean){
        this.constructible = value;
    }

    getPhaserTile(): Phaser.Tile {
        return this.tile;
    }

    constructor(
      layer: string|Phaser.TilemapLayer,
      tileIndex: number,
      point: Phaser.Point,
      w: number,
      h: number,
      constructible: boolean
      ){

      super(point, '');
      this.tile = new Phaser.Tile(layer, tileIndex, point.x, point.y, w, h);
      this.constructible = constructible;

    }

    display(){}

}
