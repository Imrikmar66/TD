enum AnimationEnemi {
    WALK_LEFT,
    WALK_RIGHT
};

class Enemi extends Model {

    public name: string;

    private entity: Phaser.Group;
    private lifebar: Lifebar;

    private speed: number;
    private currentSpeed: number;
    private max_lifePoints: number;
    private lifePoints: number;
    private alive: boolean;
    private reward: number;
    private tween: Phaser.Tween;

    getLifePoints(): number {
        return this.lifePoints;
    }

    getSpritePosition(): Phaser.Point{
        return this.entity.position;
    }

    isAlive(): boolean {
        return this.alive;
    }

    isSlow(): boolean {
      return this.currentSpeed > this.speed;
    }

    constructor(position: Phaser.Point, model: string, speed?: number, name?: string){
        super(position, model);
        this.name = name;
        this.speed = speed ? speed : 1500;
        this.currentSpeed = this.speed;
        this.max_lifePoints = 100;
        this.lifePoints = 100;
        this.alive = true;
        this.reward = 2;
        this.entity = ContextManager.getContext().add.group();
    }

    display(){
        let map = ContextManager.getCurrentMap();
        this.entity.x = this.position.x * map.getTileWidth();
        this.entity.y = this.position.y * map.getTileWidth();

        this.sprite = this.entity.create(
          0,
          0,
          this.model,
          this._frame
        );
        this.sprite.animations.add('walk_left', [4, 5, 6, 5]);
        this.sprite.animations.add('walk_right', [6, 7, 8, 7]);


        this.lifebar = new Lifebar(0, -10);
        this.entity.add(this.lifebar.getGraphics());


    }

    playAnimation(animation: AnimationEnemi){
        switch(animation){
            case AnimationEnemi.WALK_LEFT :
                this.sprite.animations.play('walk_left', 5, true);
                break;

            case AnimationEnemi.WALK_RIGHT :
                this.sprite.animations.play('walk_right', 5, true);
                break;

            default: break;
        }

    }

    walk(){
        let game = ContextManager.getContext();
        let map = ContextManager.getCurrentMap();

        if(this.tween)
          this.tween.stop;

        this.tween = game.add.tween(this.entity);
        let timeForWalkOneTile: number = (game.width/ map.getTileWidth()) * this.currentSpeed;

        this.tween.to(
            { x: game.world.width },
            timeForWalkOneTile,
            Phaser.Easing.Linear.None,
            true
        );
    }

    renforce(value: number){
      this.max_lifePoints += 50*value;
      this.lifePoints += 50*value;
    }

    isHit(damage: number){
        this.lifePoints -= damage;
        if(this.lifePoints <= 0)
            this.die();
        else {
            this.lifebar.setPercent(Math.floor(this.lifePoints*100 / this.max_lifePoints));
        }
    }

    slow(value: number, slowTime: number){
      this.currentSpeed = this.speed + value;
      ContextManager.getContext().time.events.add(
        slowTime,
        this.endSlow,
        this
      );
      this.walk();
    }

    endSlow(){
      this.currentSpeed = this.speed;
      this.walk();
    }

    die(){
        ContextManager.getPlayer().gainGold(this.reward);
        this.alive = false;
        this.entity.destroy();
    }

}
