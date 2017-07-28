abstract class Model {

  private static last_id: number = 1;

  protected id: number;
  protected model: string;
  protected sprite: Phaser.Sprite;
  protected position: Phaser.Point = new Phaser.Point();

  public _frame: string|number = 0;
    set frame(frame: string|number){
      this._frame = frame;
      if(typeof frame == "number"){
        this.sprite.frame = frame;
      }
      else{
        this.sprite.frameName = frame;
      }
  }

    getId(): number{
        return this.id;
    }

    getSpritePosition(): Phaser.Point{
       return new Phaser.Point(this.sprite.x, this.sprite.y);
    }

    getPosition(sprite?: boolean): Phaser.Point{
        return this.position;
    }

    getSprite(): Phaser.Sprite{
      return this.sprite;
    }

    constructor(position: Phaser.Point, model: string){
      this.id = (Model.last_id++);
      this.position = position;
      this.model = model;
    }

    getClassName(): string{
      return this.constructor.name
    }

    abstract display(layer?: Phaser.Group, ...options: Array<any>): void;

}
